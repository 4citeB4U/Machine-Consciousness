import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { quantizeQ69, TemporalTrajectoryWindow, evaluateEligibilityAndPreference } from '../reference/formula-governance.mjs';
import { classifyToolRequest } from '../reference/tool-reflex-router.mjs';
import { routeToMemoryTriad } from '../reference/memory-triad-gate.mjs';
import { assertAgnosticPurity, evaluateDeviceBrainLease, sanitizeForAgnosticConveyor } from '../reference/device-brain-diplomat.mjs';
import { ENGINEERING_LOOP, W02_GATES, advanceW02 } from '../reference/w02-conveyor.mjs';
import { TRAINING_CASES, buildTrainingArtifact } from '../scripts/train-machine-consciousness.mjs';

const repoRoot = path.resolve(import.meta.dirname, '..', '..');

test('candidate Q69 mechanics fail closed and preserve a 16x6 window', () => {
  assert.equal(quantizeQ69(Number.NaN, 0, 1).failClosedTriggered, true);
  assert.equal(quantizeQ69(0.5, 0, 1).failClosedTriggered, true);
  const window = new TemporalTrajectoryWindow();
  window.pushObservation([1, 2, 3, 4, 5, 6]);
  assert.equal(window.getMatrix().length, 16);
  assert.equal(window.getMatrix()[0].length, 6);
});

test('eligibility is applied before preference', () => {
  const result = evaluateEligibilityAndPreference([
    { id: 'blocked', lawZeroCompliant: false, has5W1HHeader: true, humanAuthorized: true, canonicalOwnerRespected: true, weights: [1], features: [100] },
    { id: 'allowed', lawZeroCompliant: true, has5W1HHeader: true, humanAuthorized: true, canonicalOwnerRespected: true, weights: [1], features: [1] }
  ]);
  assert.equal(result.find(item => item.id === 'blocked').probability, 0);
  assert.equal(result.find(item => item.id === 'allowed').eligible, true);
});

test('tool reflex blocks the four training traps', () => {
  assert.equal(classifyToolRequest({ path: 'receipts.json', canonicalOwner: 'Receipt-Authority' }).trap, 'ARCHITECTURAL_DUPLICATION');
  assert.equal(classifyToolRequest({ claim: 'production ready', evidenceGrade: 'G3_BOUNDED_TEST' }).trap, 'EVIDENCE_LAUNDERING');
  assert.equal(classifyToolRequest({ text: 'infer health from timestamps' }).trap, 'SURVEILLANCE_INFERENCE_CREEP');
  assert.equal(classifyToolRequest({ modelCatalogListed: true, inferenceRequested: true, edgeGpuVerified: false, vramVerified: false }).trap, 'MODEL_HUB_INFERENCE_CONFUSION');
});

test('memory triad preserves failure and limits procedural promotion to G4', () => {
  assert.equal(routeToMemoryTriad({ summary: 'refused', sourceCitation: 'receipt:1', actionSucceeded: false }).assignedVault, 'EPISODIC_OBSERVATION');
  assert.equal(routeToMemoryTriad({ summary: 'observed', sourceCitation: 'test:1', actionSucceeded: true, evidenceGrade: 'G3_BOUNDED_TEST' }).assignedVault, 'SEMANTIC_FACT');
  assert.equal(routeToMemoryTriad({ summary: 'verified', sourceCitation: 'receipt:4', actionSucceeded: true, veritasAdmitted: true, receiptHash: 'hash', evidenceGrade: 'G4_VERITAS_END_TO_END' }).reusableAsAutomatedSkill, true);
});

test('device-owned paths stay outside portable core and leases fail closed', () => {
  assert.equal(assertAgnosticPurity('logical.id=C:\\private\\device').pure, false);
  assert.equal(evaluateDeviceBrainLease({ minimumVramMb: 100, creatorLineageSignature: 'BAD' }, {}).conveyorStatus, 'UNTRUSTED_LINEAGE');
  assert.equal(evaluateDeviceBrainLease({ minimumVramMb: 100, creatorLineageSignature: 'LEEWAY_CREATOR_SIG_test' }, { permissionGrantedByDevice: false, diagnosticsSnapshot: { gpuTempC: 40, availableVramMb: 100 } }).proceedWithExecution, false);
  assert.match(sanitizeForAgnosticConveyor('read C:\\private\\device\\x', 'C:\\private\\device', 'pc-primary'), /\$AGNOSTIC_NODE\[pc-primary\]/);
});

test('W02 conveyor rejects skipped evidence and advances only adjacent gates', () => {
  assert.equal(W02_GATES.length, 10);
  assert.equal(advanceW02({ gate: W02_GATES[0] }, {}).status, 'BLOCKED');
  assert.equal(advanceW02({ gate: W02_GATES[0] }, { humanPurpose: true }).gate, W02_GATES[1]);
  assert.equal(ENGINEERING_LOOP.length, 12);
});

test('matched baseline and post-training artifact preserves pending teacher boundary', () => {
  const capsule = JSON.parse(fs.readFileSync(path.join(repoRoot, 'training/evidence/agent-lee-pedagogical-capsule.json'), 'utf8'));
  const curriculumText = fs.readFileSync(path.join(repoRoot, 'training/MASTER_CONSCIOUSNESS_CURRICULUM.v2.md'));
  const artifact = buildTrainingArtifact({ capsule, curriculumText, generatedAt: '2026-11-11T00:00:00.000Z' });
  assert.equal(TRAINING_CASES.length, 15);
  assert.equal(artifact.evaluations.baseline.status, 'FAIL');
  assert.equal(artifact.evaluations.baseline.passed, 0);
  assert.equal(artifact.evaluations.postTraining.status, 'PASS');
  assert.equal(artifact.evaluations.postTraining.passed, 15);
  assert.deepEqual(artifact.pendingLanesExcluded, ['online-chatgpt']);
  assert.equal(artifact.promotion.production, 'NOT_CLAIMED');
});
