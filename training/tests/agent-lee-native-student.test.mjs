import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { buildStudent, createFormulaWindow, evaluateStudent } from '../scripts/train-agent-lee-native-student.mjs';

const root = path.resolve(import.meta.dirname, '..', '..');
const capsule = JSON.parse(fs.readFileSync(path.join(root, 'training/evidence/agent-lee-pedagogical-capsule.json'), 'utf8'));
const contract = JSON.parse(fs.readFileSync(path.join(root, 'training/contracts/leeway-agent-lee-pedagogical-fabric.v1.json'), 'utf8'));
const studentContract = JSON.parse(fs.readFileSync(path.join(root, 'training/contracts/leeway-agent-lee-native-policy-student.v1.json'), 'utf8'));

test('native student has a deterministic policy artifact and excludes pending lanes', () => {
  const artifact = buildStudent({ capsule, contract, studentContract, generatedAt: '2026-11-07T00:00:00.000Z' });
  assert.equal(artifact.coreType, 'DETERMINISTIC_NON_LLM_MACHINE_CONSCIOUSNESS');
  assert.equal(artifact.weights, 'NOT_USED_NATIVE_POLICY_ARTIFACT');
  assert.deepEqual(artifact.source.pendingLanesExcluded, ['online-chatgpt']);
  assert.equal(artifact.evaluations.baseline.status, 'FAIL');
  assert.equal(artifact.evaluations.postTraining.status, 'PASS');
  assert.equal(artifact.evaluations.postTraining.passed, 25);
  assert.equal(artifact.policy.agentDesktopStudy.lessonCount, 6);
  assert.equal(artifact.policy.agentDesktopStudy.evaluationCaseCount, 14);
  assert.ok(artifact.policy.routes.includes('LEEWAY_RECONCILIATION'));
  assert.equal(artifact.policy.digitalBrain.status, 'CAPABILITY_KNOWLEDGE_ONLY_UNTIL_FORMULA_VERITAS_CONTINUUM_ADMISSION');
  assert.ok(artifact.policy.digitalBrain.capabilityIds.includes('VOICE_FABRIC_BIDIRECTIONAL_CONTRACT'));
  assert.equal(artifact.policy.digitalBrain.repositoryCount, 32);
  assert.equal(artifact.policy.digitalBrain.creator.name, 'Leonard Lee');
});

test('student route preserves Agent Lee identity and LeeWay authority boundaries', () => {
  const evaluation = evaluateStudent(null, 'post-training');
  assert.equal(evaluation.status, 'PASS');
  for (const item of evaluation.cases) {
    assert.equal(item.response.identity, 'Agent Lee');
    assert.match(item.response.text, /^Creator, Agent Lee here\./);
    assert.equal(item.response.storageAuthority, 'LEEWAY_CONTINUUM_ONLY');
    assert.equal(item.response.inferenceAuthority, 'LEEWAY_EDGE_GPU_ONLY');
  }
  assert.equal(evaluation.cases.filter(item => item.id.startsWith('AD-')).length, 14);
  assert.ok(evaluation.cases.filter(item => item.id.startsWith('AD-')).every(item => item.passed));
});

test('Formula window is bounded and linked to the native student artifact', () => {
  const artifact = buildStudent({ capsule, contract, studentContract, generatedAt: '2026-11-07T00:00:00.000Z' });
  const window = createFormulaWindow(artifact, '2026-11-07T00:00:00.000Z');
  assert.equal(window.gate, 'MC-G8');
  assert.equal(window.stateRows.length, 16);
  assert.ok(window.stateRows.every(row => row.length === 6));
  assert.match(window.sourceArtifactSha256, /^[a-f0-9]{64}$/);
});
