import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { auditRoot } from '../scripts/audit-local-foundry.mjs';
import { summarizeReceipt } from '../scripts/live-capability-probe.mjs';

const repoRoot = path.resolve(import.meta.dirname, '..', '..');

test('repository blocks model weights from Git', () => {
  const gitignore = readFileSync(path.join(repoRoot, '.gitignore'), 'utf8');
  assert.match(gitignore, /\.safetensors/);
  assert.match(gitignore, /\.gguf/);
  assert.match(gitignore, /training\/runs/);
});

test('temporary foundry audit is metadata-only and detects weights', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'leeway-foundry-'));
  try {
    await mkdir(path.join(root, 'nested'), { recursive: true });
    await writeFile(path.join(root, 'config.json'), '{}');
    await writeFile(path.join(root, 'nested', 'model.safetensors'), 'test-weight');
    const result = await auditRoot(root);
    assert.equal(result.status, 'WEIGHTS_PRESENT');
    assert.equal(result.inferenceStarted, false);
    assert.equal(result.weightFiles.length, 1);
    assert.equal(result.weightFiles[0].sha256, undefined);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('audit distinguishes extensionless stores from empty directories', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'leeway-foundry-unclassified-'));
  try {
    await writeFile(path.join(root, 'sha256-blob'), 'opaque-artifact');
    const result = await auditRoot(root);
    assert.equal(result.status, 'UNCLASSIFIED_FILES');
    assert.equal(result.fileCount, 1);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('receipt summary refuses to promote missing evidence', () => {
  const summary = summarizeReceipt(path.join(os.tmpdir(), 'leeway-receipt-does-not-exist.json'));
  assert.equal(summary.status, 'EXECUTED_UNVERIFIED');
  assert.equal(summary.verified, undefined);
});

test('authoritative live receipt is recognized when present', () => {
  const receiptPath = 'E:/LeeWay-Work/pc-consciousness-live/runtime/receipts/machine-consciousness/MACHINE-CONSCIOUSNESS-TRAINING-LIVE-PROBE-20261104.json';
  if (!existsSync(receiptPath)) return;
  const summary = summarizeReceipt(receiptPath);
  assert.equal(summary.status, 'PASS');
  assert.equal(summary.verified, true);
  assert.equal(summary.receiptHashPresent, true);
  assert.equal(summary.postGate, 'PASS');
  assert.equal(summary.veritas, 'PASS');
  assert.equal(summary.llmUsed, false);
});

