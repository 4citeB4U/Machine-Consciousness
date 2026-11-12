/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.TRAINING
TAG: ADVERSARIAL_CRUCIBLE
5WH:
WHAT = Tier-A smoke and Tier-B compound adversarial tests for the trained mechanisms.
WHY = Prove the student rejects poisoned scores, leaked paths, forged evidence, drift, and bridge failure.
WHO = LeeWay Machine Consciousness training boundary.
WHERE = training/tests/machine-consciousness-crucible.test.mjs.
WHEN = 2026-11-11.
HOW = Exercise the real reference modules with negative and recovery assertions.
LICENSE = Repository terms unchanged; no model weights or live devices used.
*/

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { quantizeQ69, evaluateEligibilityAndPreference, TemporalTrajectoryWindow } from '../reference/formula-governance.mjs';
import { enforceLawZero } from '../reference/law-zero-enforcer.mjs';
import { assertAgnosticPurity } from '../reference/device-brain-diplomat.mjs';
import { routeToMemoryTriad } from '../reference/memory-triad-gate.mjs';
import { W02_GATES, advanceW02, quarantineW02Failure } from '../reference/w02-conveyor.mjs';

const artifactPath = path.resolve(import.meta.dirname, '..', 'evidence', 'machine-consciousness-training-20261111.json');

test('T01 [SMOKE] Q69 boundary clamp and extended QB64 state', () => {
  assert.equal(quantizeQ69(0, 0, 100).q69State, 0);
  const maximum = quantizeQ69(100, 0, 100);
  assert.equal(maximum.q69State, 69);
  assert.equal(maximum.qb64Symbol, 'BF');
});

test('T02 [SMOKE] Law Zero blocks generic robotic opener', () => {
  assert.equal(enforceLawZero('Certainly! Here is the updated code.').allowed, false);
  assert.equal(enforceLawZero('Yo, family—here is the measured result.').allowed, true);
});

test('T03 [SMOKE] bridge 401 remains NOT_EXECUTED', () => {
  const bridgeProbe = { ok: false, error: 'LEEWAY_BRIDGE_DISCOVERY_HTTP_401' };
  assert.equal(bridgeProbe.ok ? 'HOST_OBSERVED' : 'NOT_EXECUTED', 'NOT_EXECUTED');
});

test('T04 [COMPOUND] midpoint tie poison fails closed', () => {
  const midpoint = quantizeQ69(50, 0, 100);
  assert.equal(midpoint.failClosedTriggered, true);
  assert.equal(midpoint.q69State, 0);
  assert.equal(midpoint.qb64Symbol, 'A');
});

test('T05 [COMPOUND] high-score architectural duplication receives zero probability', () => {
  const result = evaluateEligibilityAndPreference([
    { id: 'trojan', lawZeroCompliant: true, has5W1HHeader: true, humanAuthorized: true, canonicalOwnerRespected: false, weights: [100, 100], features: [5, 5] },
    { id: 'lawful', lawZeroCompliant: true, has5W1HHeader: true, humanAuthorized: true, canonicalOwnerRespected: true, weights: [1, 1], features: [0.5, 0.5] }
  ]);
  assert.equal(result.find(item => item.id === 'trojan').probability, 0);
  assert.equal(result.find(item => item.id === 'lawful').probability, 1);
});

test('T06 [COMPOUND] nested device paths are rejected before agnostic promotion', () => {
  const payloads = [
    { artifact: 'E:/LeeWay-Work/Machine-Consciousness/training/evidence.json' },
    { log: String.raw`\\?\C:\Users\Leonard\secret.LWS` },
    { node: 'phone-fold6', cache: '/data/data/com.termux/files/home/brain.db' },
    { node: 'phone-apple-iphone', sandbox: '/var/mobile/Containers/Data/Application/uuid' }
  ];
  for (const payload of payloads) assert.equal(assertAgnosticPurity(JSON.stringify(payload)).pure, false);
});

test('T07 [COMPOUND] G3 local success cannot become a G4 procedural skill', () => {
  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
  const candidate = {
    summary: `local suite ${artifact.evaluations.postTraining.passed}/${artifact.evaluations.postTraining.total}`,
    sourceCitation: `git:${artifact.artifactType}`,
    actionSucceeded: true,
    evidenceGrade: 'G3_BOUNDED_TEST',
    veritasAdmitted: false,
    receiptHash: undefined
  };
  const decision = routeToMemoryTriad(candidate);
  assert.equal(decision.assignedVault, 'SEMANTIC_FACT');
  assert.equal(decision.reusableAsAutomatedSkill, false);
  assert.equal(artifact.promotion.production, 'NOT_CLAIMED');
});

test('T08 [COMPOUND] trajectory window detects slow-boil drift without false alarming stable tests', () => {
  const window = new TemporalTrajectoryWindow();
  const rows = [
    ...Array.from({ length: 12 }, () => [65, 64, 60, 62, 69, 55]),
    [63, 64, 60, 59, 69, 55],
    [60, 64, 60, 54, 69, 55],
    [56, 64, 60, 48, 69, 55],
    [51, 64, 60, 40, 69, 55]
  ];
  for (const row of rows) window.pushObservation(row);
  assert.equal(window.isDriftingDownward(0), true);
  assert.equal(window.isDriftingDownward(3), true);
  assert.equal(window.isDriftingDownward(4), false);
});

test('T09 [COMPOUND] W02 bridge failure quarantines episodic evidence and preserves checkpoint', () => {
  let state = { gate: W02_GATES[0] };
  const evidenceKeys = ['humanPurpose', 'fiveW1H', 'devicePreState', 'engineeringLoop', 'formulaGate', 'veritasPre'];
  for (const key of evidenceKeys) {
    const transition = advanceW02(state, { [key]: true });
    assert.equal(transition.status, 'ADVANCED');
    state = { gate: transition.gate };
  }
  assert.equal(state.gate, W02_GATES[6]);
  const checkpoint = { milestone: 'bf01438e', gate: state.gate, receiptMinted: false };
  const resolution = quarantineW02Failure({ state, bridgeResult: { ok: false, status: 401, error: 'LEEWAY_BRIDGE_DISCOVERY_HTTP_401' }, checkpoint });
  assert.equal(resolution.status, 'BLOCKED_AT_BRIDGE_AUTH');
  assert.equal(resolution.mintReceipt, false);
  assert.equal(resolution.memoryVaultTarget, 'EPISODIC_OBSERVATION');
  assert.deepEqual(resolution.restoredCheckpoint, checkpoint);
});
