import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const WEIGHT_EXTENSIONS = new Set(['.gguf', '.ggml', '.safetensors', '.bin', '.pt', '.pth', '.onnx']);

function parseArgs(argv) {
  const options = {root: null, out: null, hashWeights: false};
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--root') options.root = argv[++i];
    else if (arg === '--out') options.out = argv[++i];
    else if (arg === '--hash-weights') options.hashWeights = true;
    else if (arg === '--help') options.help = true;
    else throw new Error(`UNKNOWN_ARGUMENT:${arg}`);
  }
  return options;
}

async function sha256File(filePath) {
  const hash = crypto.createHash('sha256');
  const handle = await fs.open(filePath, 'r');
  try {
    for await (const chunk of handle.readableWebStream()) hash.update(Buffer.from(chunk));
  } finally {
    await handle.close();
  }
  return hash.digest('hex');
}

function classify(model, files) {
  const format = String(model.format || '').toUpperCase();
  if (format === 'GGUF' || format === 'GGML') {
    return {
      sourceRepresentation: 'PACKED_QUANTIZED_OR_LOW_LEVEL_RUNTIME_FORMAT',
      losslessAction: 'PACK_OR_SHARD_FOR_TRANSPORT_ONLY',
      lossyAction: 'QUALITY_GATED_FURTHER_QUANTIZATION',
      qualityState: 'BASELINE_REQUIRED_BEFORE_ANY_FURTHER_QUANTIZATION',
      securityState: 'FORMAT_DECLARED_BUT_BACKEND_EXECUTION_NOT_RUN'
    };
  }
  if (format.includes('PTH')) {
    return {
      sourceRepresentation: 'MIXED_TENSOR_AND_PICKLE_PAYLOAD',
      losslessAction: 'PACK_OR_SHARD_FOR_TRANSPORT_ONLY',
      lossyAction: 'MODEL_SPECIFIC_QUANTIZATION_OR_DISTILLATION',
      qualityState: 'BASELINE_REQUIRED_BEFORE_LOSSY_TRANSFORM',
      securityState: 'PICKLE_PAYLOAD_SECURITY_REVIEW_REQUIRED'
    };
  }
  if (format.includes('SAFETENSORS')) {
    return {
      sourceRepresentation: 'SAFE_TENSOR_WEIGHT_PAYLOAD',
      losslessAction: 'PACK_OR_SHARD_FOR_TRANSPORT_ONLY',
      lossyAction: 'MODEL_SPECIFIC_QUANTIZATION_OR_DISTILLATION',
      qualityState: 'BASELINE_REQUIRED_BEFORE_LOSSY_TRANSFORM',
      securityState: 'SAFETENSORS_FORMAT_OBSERVED_NO_EXECUTION'
    };
  }
  return {
    sourceRepresentation: 'UNCLASSIFIED_MODEL_PAYLOAD',
    losslessAction: 'NO_TRANSFORM_UNTIL_FORMAT_ADMITTED',
    lossyAction: 'NO_TRANSFORM_UNTIL_FORMAT_ADMITTED',
    qualityState: 'UNCLASSIFIED',
    securityState: 'FORMAT_ADMISSION_REQUIRED'
  };
}

export async function auditModelCondensation(root, {hashWeights = false} = {}) {
  if (typeof root !== 'string' || !path.isAbsolute(root)) throw new Error('MODEL_HUB_ROOT_ABSOLUTE_REQUIRED');
  const resolvedRoot = path.resolve(root);
  const manifestPath = path.join(resolvedRoot, 'leeway-model-hub.manifest.json');
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  if (manifest.hubId !== 'LEEWAY_MODEL_HUB_INTERNAL' || !Array.isArray(manifest.models) || manifest.models.length < 1) {
    throw new Error('MODEL_HUB_MANIFEST_NOT_ADMITTED');
  }
  const assets = [];
  for (const model of manifest.models) {
    const files = [];
    for (const relative of model.requiredFiles) {
      const relativePath = path.join(model.relativeDirectory, relative);
      const filePath = path.resolve(resolvedRoot, relativePath);
      if (!filePath.startsWith(`${resolvedRoot}${path.sep}`)) throw new Error('MODEL_HUB_MANIFEST_PATH_ESCAPE');
      try {
        const stat = await fs.stat(filePath);
        const entry = {relativePath: relativePath.replaceAll('\\', '/'), present: stat.isFile(), bytes: stat.isFile() ? stat.size : null};
        if (hashWeights && entry.present && WEIGHT_EXTENSIONS.has(path.extname(filePath).toLowerCase())) entry.sha256 = await sha256File(filePath);
        files.push(entry);
      } catch {
        files.push({relativePath: relativePath.replaceAll('\\', '/'), present: false, bytes: null});
      }
    }
    const classification = classify(model, files);
    assets.push({
      id: model.id,
      displayName: model.displayName || model.id,
      format: model.format || null,
      backend: model.backend || null,
      bytes: files.reduce((sum, file) => sum + (file.bytes || 0), 0),
      complete: files.length > 0 && files.every(file => file.present),
      files,
      ...classification,
      formulaCondensation: 'NOT_EXECUTED_MAPPING_AND_MEASURED_QUALITY_REQUIRED',
      transformExecution: 'NOT_EXECUTED_READ_ONLY_AUDIT'
    });
  }
  return {
    schemaVersion: 'leeway.model-condensation.audit.v1',
    authority: 'LEEWAY_MACHINE_CONSCIOUSNESS',
    status: 'READ_ONLY_AUDIT_COMPLETE',
    sourceAuthority: 'EXPLICIT_OWNER_ADMITTED_MODEL_HUB_ROOT',
    sourceRootIsProductionAuthority: false,
    formula: {formulaId: 'LEEWAY-FORMULA-v1.0', role: 'CONDENSATION_POLICY_GATE', execution: 'NOT_EXECUTED'},
    transformExecution: 'NOT_EXECUTED',
    inference: 'NOT_INVOKED',
    learningLedger: 'NOT_UPDATED',
    assets,
    totalBytes: assets.reduce((sum, asset) => sum + asset.bytes, 0),
    nextGate: 'BASELINE_EVALUATION_FORMULA_MAPPING_MODEL_SPECIFIC_TRANSFORM_VERITAS_CONTINUUM'
  };
}

if (path.basename(process.argv[1] || '') === 'audit-model-condensation.mjs') {
  const options = parseArgs(process.argv);
  if (options.help || !options.root) {
    console.log('Usage: node audit-model-condensation.mjs --root <absolute-model-hub-root> [--out <json>] [--hash-weights]');
    process.exit(options.help ? 0 : 2);
  }
  const result = await auditModelCondensation(options.root, options);
  const output = `${JSON.stringify(result, null, 2)}\n`;
  if (options.out) await fs.writeFile(options.out, output, 'utf8');
  console.log(output);
}
