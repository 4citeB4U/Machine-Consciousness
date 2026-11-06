import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {auditModelCondensation} from '../scripts/audit-model-condensation.mjs';

test('condensation audit is read-only and classifies model formats without inference', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'leeway-condensation-'));
  try {
    await fs.mkdir(path.join(root, 'Qwen3-4B-GGUF'), {recursive: true});
    await fs.writeFile(path.join(root, 'Qwen3-4B-GGUF', 'model.gguf'), Buffer.alloc(16));
    const manifest = {
      schemaVersion: 'leeway.model-hub.manifest.v1',
      hubId: 'LEEWAY_MODEL_HUB_INTERNAL',
      models: [{id: 'fixture-gguf', format: 'GGUF', relativeDirectory: 'Qwen3-4B-GGUF', requiredFiles: ['model.gguf']}]
    };
    const manifestPath = path.join(root, 'leeway-model-hub.manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify(manifest));
    const before = await fs.readFile(manifestPath, 'utf8');
    const result = await auditModelCondensation(root);
    assert.equal(result.status, 'READ_ONLY_AUDIT_COMPLETE');
    assert.equal(result.formula.execution, 'NOT_EXECUTED');
    assert.equal(result.transformExecution, 'NOT_EXECUTED');
    assert.equal(result.inference, 'NOT_INVOKED');
    assert.equal(result.assets[0].sourceRepresentation, 'PACKED_QUANTIZED_OR_LOW_LEVEL_RUNTIME_FORMAT');
    assert.equal(result.assets[0].complete, true);
    assert.equal(await fs.readFile(manifestPath, 'utf8'), before);
  } finally {
    await fs.rm(root, {recursive: true, force: true});
  }
});
