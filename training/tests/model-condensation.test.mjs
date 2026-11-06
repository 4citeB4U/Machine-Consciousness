import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contract = JSON.parse(fs.readFileSync(path.join(root, 'contracts', 'leeway-model-condensation.v1.json'), 'utf8'));

test('Formula governs condensation policy but does not pretend to compress arbitrary bytes', () => {
  assert.equal(contract.formulaGate.formulaId, 'LEEWAY-FORMULA-v1.0');
  assert.equal(contract.formulaGate.adapterId, 'runtime-state-v1');
  assert.equal(contract.formulaGate.role, 'SELECT_AND_GATE_CONDENSATION_POLICY');
  assert.equal(contract.formulaGate.byteTransformRole, 'NOT_A_BYTE_LEVEL_COMPRESSOR');
  assert.equal(contract.formulaGate.qualityMeasurementRequiredBeforeLossyTransform, true);
});

test('condensation preserves source weights until a verified transformed artifact exists', () => {
  assert.equal(contract.transformClasses.find(item => item.id === 'METADATA_COMPACTION').preservesWeightBytes, true);
  assert.equal(contract.transformClasses.find(item => item.id === 'LOSSLESS_PACK_AND_SHARD').preservesWeightBytes, true);
  assert.equal(contract.transformClasses.find(item => item.id === 'WEIGHT_QUANTIZATION').preservesWeightBytes, false);
  assert.equal(contract.prohibitions.includes('DELETE_SOURCE_WEIGHTS_BEFORE_TRANSFORMED_ARTIFACT_AND_READBACK_VERIFIED'), true);
  assert.equal(contract.storage.durableAuthority, 'LEEWAY_CONTINUUM_ONLY');
});

test('one and ten megabyte targets are not falsely universal weight targets', () => {
  assert.equal(contract.targetPolicy.oneMegabyteTarget, 'NOT_UNIVERSAL;_ALLOWED_ONLY_FOR_METADATA_OR_A_NEW_SMALL_STUDENT');
  assert.equal(contract.targetPolicy.tenMegabyteTarget, 'NOT_UNIVERSAL;_REQUIRES_DISTILLATION_OR_SPECIALIZED_MODEL_REDESIGN');
});

test('contract contains no fixed workstation path', () => {
  assert.doesNotMatch(JSON.stringify(contract), /[A-Z]:[\\/]/);
});
