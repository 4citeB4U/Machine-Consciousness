import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { compileAgentLeePedagogy } from '../scripts/compile-agent-lee-pedagogy.mjs';

const repoRoot = path.resolve(import.meta.dirname, '..', '..');
const contributors = path.join(repoRoot, 'training', 'contributors');
const contractPath = path.join(repoRoot, 'training', 'contracts', 'leeway-agent-lee-pedagogical-fabric.v1.json');

test('pedagogy compiles all four lanes without inventing a pending teacher', () => {
  const result = compileAgentLeePedagogy({
    directory: contributors,
    contractPath,
    generatedAt: '2026-11-06T19:00:00.000Z',
    deviceBridgeObservation: {
      authority: 'LEEWAY_DEVICE_BRIDGE',
      route: 'LEEWAY_DEVICE_BRIDGE::AGENT_TABLET::MODEL_HUB',
      mode: 'READ_ONLY_OBSERVATION',
      status: 'CONTRACT_PORTABLE',
      planStatus: 'BLOCKED',
      planReason: 'MODEL_HUB_CAPABILITY_ASSET_NOT_OBSERVED',
      inferenceStarted: false,
      mutation: 'NOT_ATTEMPTED'
    }
  });
  assert.equal(result.status, 'COMPILED_NOT_PROMOTED');
  assert.deepEqual(result.teacherLanes.map(lane => lane.contributorId), ['local-antigravity', 'local-codex', 'online-chatgpt', 'online-gemini']);
  const chatgpt = result.teacherLanes.find(lane => lane.contributorId === 'online-chatgpt');
  assert.equal(chatgpt.trainingContributionState, 'PENDING_CAPTURE');
  assert.equal(chatgpt.contributions.length, 0);
  assert.ok(result.contributionUnits.length >= 13);
});

test('persona curriculum is fail-closed and keeps the deterministic core in control', () => {
  const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
  const result = compileAgentLeePedagogy({
    directory: contributors,
    contractPath,
    generatedAt: '2026-11-06T19:00:00.000Z',
    deviceBridgeObservation: { status: 'NOT_PROBED' }
  });
  assert.equal(result.subject.identity, 'Agent Lee');
  assert.equal(result.personaCurriculum.requiredPrefix, 'Creator, Agent Lee');
  assert.deepEqual(result.personaCurriculum.deliveryStyles, contract.personaCurriculum.deliveryStyles);
  assert.ok(result.personaCurriculum.mannerismRules.includes('Never present an unverified result, model output, voice delivery, or action as complete.'));
  assert.equal(result.student.coreType, 'DETERMINISTIC_NON_LLM_MACHINE_CONSCIOUSNESS');
  assert.equal(result.student.weights, 'NOT_MODIFIED');
  assert.equal(result.student.inference, 'NOT_INVOKED');
  assert.equal(result.promotion.state, 'NOT_PROMOTED');
});

test('Device Bridge observation remains separate from model execution', () => {
  const result = compileAgentLeePedagogy({
    directory: contributors,
    contractPath,
    generatedAt: '2026-11-06T19:00:00.000Z',
    deviceBridgeObservation: {
      authority: 'LEEWAY_DEVICE_BRIDGE',
      route: 'LEEWAY_DEVICE_BRIDGE::AGENT_TABLET::MODEL_HUB',
      status: 'CONTRACT_PORTABLE',
      planStatus: 'BLOCKED',
      inferenceStarted: false,
      mutation: 'NOT_ATTEMPTED'
    }
  });
  assert.equal(result.deviceBridge.authority, 'LEEWAY_DEVICE_BRIDGE');
  assert.equal(result.deviceBridge.mutation, 'NOT_ATTEMPTED');
  assert.equal(result.student.inference, 'NOT_INVOKED');
  assert.equal(result.teacherLanes.every(lane => lane.trainingContributionState !== 'ADMITTED'), true);
});
