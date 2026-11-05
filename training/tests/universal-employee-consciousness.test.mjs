import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ENGINEERING_LOOP, validateAgentBinding, validateAgentBook, validateUniversalContract } from '../scripts/validate-universal-employee-consciousness.mjs';

const repoRoot = path.resolve(import.meta.dirname, '..', '..');
const contract = JSON.parse(readFileSync(path.join(repoRoot, 'training', 'contracts', 'leeway-universal-employee-consciousness.v1.json'), 'utf8'));
const tabletContract = JSON.parse(readFileSync(path.join(repoRoot, 'training', 'contracts', 'leeway-device-bridge-model-hub-logistics.v1.json'), 'utf8'));
const modelHubContract = JSON.parse(readFileSync(path.join(repoRoot, 'training', 'contracts', 'leeway-model-hub-lifecycle.v1.json'), 'utf8'));
const providerFabricContract = JSON.parse(readFileSync(path.join(repoRoot, 'training', 'contracts', 'leeway-model-hub-provider-fabric.v1.json'), 'utf8'));

function agent(overrides = {}) {
  return {
    systemLeewayId: 'LEEWAY_AGENT::TEST',
    immutableRoleId: 'LEEWAY_ROLE::TEST',
    displayName: 'Test Employee',
    agentFamily: 'TEST',
    allowedWorkflows: ['LEEWAY_WORKFLOW::TEST'],
    allowedTools: ['LEEWAY_TOOL::TEST'],
    allowedModelRoutes: [],
    allowedExecutionEnvironments: ['EXECUTION_ENV_TEST'],
    telemetryStreamIds: ['LEEWAY_TELEMETRY_STREAM::TEST'],
    identityPulseStatus: 'PASS',
    blockedActions: ['DIRECT_LLM_ACTION', 'UNRECEIPTED_ACTION'],
    requiresHumanApproval: true,
    canRunTerminal: false,
    ...overrides
  };
}

test('universal contract preserves the deterministic twelve-stage loop and authority boundaries', () => {
  assert.deepEqual(validateUniversalContract(contract), []);
  assert.deepEqual(contract.engineeringLoop, ENGINEERING_LOOP);
  assert.equal(contract.core.requiredForEveryEmployee, true);
  assert.equal(contract.modelPolicy.modelHubOnly, true);
  assert.equal(contract.modelPolicy.neverDirectAction, true);
  assert.equal(contract.storagePolicy.durableAuthority, 'LEEWAY_CONTINUUM_ONLY');
  assert.equal(contract.modelPolicy.consciousnessControl.authority, 'LEEWAY_MACHINE_CONSCIOUSNESS');
  assert.deepEqual(contract.modelPolicy.consciousnessControl.assistanceTarget, {minRatio: 0.04, maxRatio: 0.10, measurement: 'TASK_TELEMETRY_REQUIRED', status: 'TARGET_NOT_EXECUTION_PROOF'});
  assert.equal(contract.modelPolicy.consciousnessControl.controlReturn, 'LEEWAY_MACHINE_CONSCIOUSNESS');
});

test('manager, research, and phone employees derive the same consciousness substrate', () => {
  const result = validateAgentBook({ agents: [
    agent({ systemLeewayId: 'LEEWAY_AGENT::MANAGER', immutableRoleId: 'LEEWAY_ROLE::MANAGER', displayName: 'Manager' }),
    agent({ systemLeewayId: 'LEEWAY_AGENT::RESEARCH', immutableRoleId: 'LEEWAY_ROLE::RESEARCH', displayName: 'Research' }),
    agent({ systemLeewayId: 'LEEWAY_AGENT::PHONE', immutableRoleId: 'LEEWAY_ROLE::PHONE', displayName: 'Phone' })
  ] }, contract);
  assert.equal(result.status, 'UNIVERSAL_CONSCIOUSNESS_CONTRACT_PASS');
  assert.equal(result.coveredAgents, 3);
  assert.ok(result.bindings.every(binding => binding.consciousness === 'LEEWAY_MACHINE_CONSCIOUSNESS_SHARED_SUBSTRATE'));
});

test('an employee without the universal safety boundary is blocked', () => {
  const errors = validateAgentBinding(agent({ blockedActions: [] }));
  assert.ok(errors.includes('AGENT_DIRECT_LLM_ACTION_NOT_BLOCKED'));
  assert.ok(errors.includes('AGENT_UNRECEIPTED_ACTION_NOT_BLOCKED'));
});

test('the contract does not promote model presence into consciousness training proof', () => {
  const result = validateAgentBook({ agents: [agent({ allowedModelRoutes: ['LEEWAY_LLM_ROUTE::QWEN3'] })] }, contract);
  assert.equal(result.status, 'UNIVERSAL_CONSCIOUSNESS_CONTRACT_PASS');
  assert.equal(result.bindings[0].modelOptional, true);
  assert.equal(contract.admissionPolicy.weightsAndModelOutputs.includes('VERITAS'), true);
});

test('the Device Bridge Agent Tablet retains the internal Model Hub and Logistics boundaries', () => {
  assert.equal(tabletContract.authority, 'LEEWAY_DEVICE_BRIDGE');
  assert.equal(tabletContract.modelHub.authority, 'LEEWAY_MODEL_HUB_INTERNAL');
  assert.equal(tabletContract.modelHub.externalApiFallback, 'FORBIDDEN');
  assert.equal(tabletContract.modelHub.download, 'PROVIDER_INTAKE_ONLY_WITH_EXPLICIT_OWNER_ADMISSION');
  assert.equal(tabletContract.modelHub.providerRole, 'ADAPTER_ONLY');
  assert.equal(tabletContract.logistics.locationSource, 'LEEWAY_DEVICE_BRIDGE');
  assert.equal(tabletContract.logistics.nearbyContext, 'ONLY_FROM_SUPPLIED_AUTHORIZED_MAP_EVIDENCE');
  assert.equal(tabletContract.durableStorage, 'LEEWAY_CONTINUUM_ONLY');
});

test('the internal Model Hub has a resident pool, model teams, and explicit import/swap gates', () => {
  assert.equal(modelHubContract.bodyRoute, 'LEEWAY_DEVICE_BRIDGE::AGENT_TABLET::MODEL_HUB');
  assert.equal(modelHubContract.residentPool.minimumReadyAssetCount, 2);
  assert.equal(modelHubContract.residentPool.defaultLifecycle, 'PAUSED_RESIDENT');
  assert.deepEqual(modelHubContract.modelTeams.VISION_MULTIMODAL, ['qwen3-vl-8b-instruct']);
  assert.equal(modelHubContract.importPolicy.mutation, 'EXPLICIT_EXECUTION_ONLY');
  assert.equal(modelHubContract.swapPolicy.noSilentReplacement, true);
  assert.equal(modelHubContract.consciousnessControl.directProviderRoute, 'FORBIDDEN');
  assert.deepEqual(modelHubContract.consciousnessControl.switchSequence, ['ADMIT_NEXT_MODEL', 'WAKE_NEXT_MODEL', 'VERIFY_NEXT_MODEL', 'PAUSE_CURRENT_MODEL', 'RETAIN_CONTINUUM_RECEIPT']);
});

test('providers are Model Hub intake and internal execution adapters, never the runtime authority', () => {
  assert.equal(providerFabricContract.authority, 'LEEWAY_MODEL_HUB');
  assert.equal(providerFabricContract.providerRole, 'ADAPTER_ONLY');
  assert.equal(providerFabricContract.execution.directProviderRoute, 'FORBIDDEN');
  assert.equal(providerFabricContract.intake.providerCallAfterAdmission, 'NOT_REQUIRED');
  assert.deepEqual(providerFabricContract.providerAdapters.map(adapter => adapter.id), ['OLLAMA', 'HUGGING_FACE', 'LLAMA_CPP', 'VLLM', 'TRANSFORMERS', 'LEEWAY_PROVIDER_FABRIC']);
});
