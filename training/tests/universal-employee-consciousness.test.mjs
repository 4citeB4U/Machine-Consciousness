import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ENGINEERING_LOOP, validateAgentBinding, validateAgentBook, validateUniversalContract } from '../scripts/validate-universal-employee-consciousness.mjs';

const repoRoot = path.resolve(import.meta.dirname, '..', '..');
const contract = JSON.parse(readFileSync(path.join(repoRoot, 'training', 'contracts', 'leeway-universal-employee-consciousness.v1.json'), 'utf8'));

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
