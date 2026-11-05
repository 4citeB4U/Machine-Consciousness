#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const WEIGHT_EXTENSIONS = new Set(['.safetensors', '.gguf', '.ggml', '.bin', '.pt', '.pth', '.onnx']);
const MANIFEST_NAMES = new Set(['config.json', 'model_index.json', 'tokenizer.json', 'tokenizer_config.json', 'manifest.json', 'Modelfile']);

function parseArgs(argv) {
  const roots = [];
  let out = null;
  let hashWeights = false;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--root') {
      const value = argv[++i];
      if (!value) throw new Error('--root requires a path');
      roots.push(value);
    } else if (arg === '--out') {
      out = argv[++i];
      if (!out) throw new Error('--out requires a path');
    } else if (arg === '--hash-weights') {
      hashWeights = true;
    } else if (arg === '--help' || arg === '-h') {
      return { help: true, roots, out, hashWeights };
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (roots.length === 0 && process.env.LEEWAY_MODEL_ROOTS) {
    roots.push(...process.env.LEEWAY_MODEL_ROOTS.split(';').map((item) => item.trim()).filter(Boolean));
  }
  return { help: false, roots, out, hashWeights };
}

async function walk(root) {
  const files = [];
  async function visit(current) {
    let entries;
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch (error) {
      if (error.code === 'ENOENT') return;
      throw error;
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) await visit(full);
      else if (entry.isFile()) files.push(full);
    }
  }
  await visit(root);
  return files;
}

async function sha256File(filePath) {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256');
    const stream = createReadStream(filePath);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(hash.digest('hex').toUpperCase()));
  });
}

export async function auditRoot(root, { hashWeights = false } = {}) {
  const absoluteRoot = path.resolve(root);
  let rootStat;
  try {
    rootStat = await stat(absoluteRoot);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {
        locator: absoluteRoot,
        sourceKind: 'local-model-family',
        status: 'MISSING',
        inferenceStarted: false,
        fileCount: 0,
        totalBytes: 0,
        weightFiles: []
      };
    }
    throw error;
  }
  if (!rootStat.isDirectory()) throw new Error(`Foundry root is not a directory: ${absoluteRoot}`);
  const files = await walk(absoluteRoot);
  const records = await Promise.all(files.map(async (filePath) => {
    const fileStat = await stat(filePath);
    const relativePath = path.relative(absoluteRoot, filePath);
    return { filePath, relativePath, bytes: fileStat.size, name: path.basename(filePath) };
  }));
  const weightRecords = records.filter((record) => WEIGHT_EXTENSIONS.has(path.extname(record.name).toLowerCase()));
  const hasManifest = records.some((record) => MANIFEST_NAMES.has(record.name));
  const status = weightRecords.length > 0 ? 'WEIGHTS_PRESENT' : records.length === 0 ? 'DIRECTORY_EMPTY' : hasManifest ? 'MANIFEST_ONLY' : 'UNCLASSIFIED_FILES';
  const weightFiles = [];
  for (const record of weightRecords) {
    const result = { relativePath: record.relativePath, bytes: record.bytes };
    if (hashWeights) result.sha256 = await sha256File(record.filePath);
    weightFiles.push(result);
  }
  return {
    locator: absoluteRoot,
    sourceKind: 'local-model-family',
    status,
    inferenceStarted: false,
    fileCount: records.length,
    totalBytes: records.reduce((sum, record) => sum + record.bytes, 0),
    weightFiles
  };
}

export async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  if (options.help || options.roots.length === 0) {
    console.log('Usage: node audit-local-foundry.mjs --root <path> [--root <path> ...] [--out <json>] [--hash-weights]');
    if (options.roots.length === 0 && !options.help) process.exitCode = 2;
    return;
  }
  const observedAt = new Date().toISOString();
  const result = {
    schemaVersion: '1.0.0',
    observedAt,
    observer: 'Machine-Consciousness temporary foundry audit',
    execution: { inferenceStarted: false, modelProcessesStarted: [], networkInferenceCalls: 0 },
    artifacts: await Promise.all(options.roots.map((root) => auditRoot(root, { hashWeights: options.hashWeights })))
  };
  const serialized = JSON.stringify(result, null, 2);
  console.log(serialized);
  if (options.out) {
    await mkdir(path.dirname(path.resolve(options.out)), { recursive: true });
    await writeFile(options.out, `${serialized}\n`, 'utf8');
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch((error) => {
    console.error(`Foundry audit failed: ${error.message}`);
    process.exitCode = 1;
  });
}

