import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contract = JSON.parse(fs.readFileSync(path.join(root, 'contracts', 'leeway-model-hub-execution-supervisor.v1.json'), 'utf8'));
const githubSource = JSON.parse(fs.readFileSync(path.join(root, 'contracts', 'leeway-model-hub-github-source.v1.json'), 'utf8'));

test('GitHub is the Model Hub source authority and no fixed drive is part of the contract', () => {
  assert.equal(githubSource.canonicalRepository, '4citeB4U/LeeWay-Model-Hub');
  assert.equal(githubSource.sourceAuthority, 'GITHUB_REPOSITORY');
  assert.equal(githubSource.runtimeMaterialization.rootBinding, 'LEEWAY_MODEL_HUB_ROOT');
  assert.equal(githubSource.runtimeMaterialization.defaultRoot, null);
  assert.equal(githubSource.runtimeMaterialization.fixedDriveDefaults, false);
  assert.equal(githubSource.weightTransport.weightPayloadState, 'NOT_YET_HOSTED_IN_GITHUB');
  assert.doesNotMatch(JSON.stringify(githubSource), /[A-Z]:[\\/]/);
});

test('Machine Consciousness owns model selection and model shifting', () => {
  assert.equal(contract.authority, 'LEEWAY_MACHINE_CONSCIOUSNESS');
  assert.equal(contract.coreMode, 'DETERMINISTIC_NON_LLM_MACHINE_CONSCIOUSNESS');
  assert.equal(contract.modelHubRoute, 'LEEWAY_DEVICE_BRIDGE::AGENT_TABLET::MODEL_HUB');
  assert.equal(contract.modelRole, 'OPTIONAL_BOUNDED_CAPABILITY_LIMB');
  assert.deepEqual(contract.switchSequence, [
    'ADMIT_NEXT_MODEL',
    'WAKE_NEXT_MODEL',
    'VERIFY_NEXT_MODEL',
    'PAUSE_CURRENT_MODEL',
    'RETAIN_CONTINUUM_RECEIPT',
  ]);
});

test('physical inference is fail-closed until every LeeWay evidence gate passes', () => {
  assert.equal(contract.executionGate.inferenceAuthority, 'LEEWAY_EDGE_GPU_ONLY');
  assert.deepEqual(contract.executionGate.requiredEvidence, [
    'FORMULA_PASS',
    'DEVICE_BRIDGE_PASS',
    'GPU_EXECUTION_PASS',
    'VERITAS_PASS',
    'CONTINUUM_RECEIPT_PASS',
  ]);
  assert.equal(contract.executionGate.inferenceStartedBeforeAllEvidence, false);
  assert.equal(contract.executionGate.failureMode, 'FAIL_CLOSED');
  assert.equal(contract.controlReturn, 'LEEWAY_MACHINE_CONSCIOUSNESS');
  assert.equal(contract.storage.durableAuthority, 'LEEWAY_CONTINUUM_ONLY');
});
