/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.TRAINING_CONTROL
TAG: SIMULATION_TO_PRODUCTION_GRADUATION
5WH:
WHAT = Verify G3 retention, live-gap blocking, and evidence-complete G4 eligibility.
WHY = Ensure no local simulation pass can become a production claim by itself.
WHO = LeeWay Machine Consciousness training boundary.
WHERE = training/tests/sim-to-prod-graduation.test.mjs.
WHEN = 2026-11-11.
HOW = Replay ledger assertions with synthetic readback explicitly marked as a fixture.
LICENSE = Repository terms unchanged; simulation evidence only.
*/

import assert from 'node:assert/strict';
import test from 'node:test';
import { SIMULATION_TO_PRODUCTION_LEDGER, attemptGraduateTrancheToProduction, gradeTestQ69 } from '../scripts/sim-to-prod-graduation-ledger.mjs';

test('GRADUATION-01 [SIMULATION] banks every current tranche and blocks production while live Bridge is absent', () => {
  assert.equal(SIMULATION_TO_PRODUCTION_LEDGER.length, 5);
  for (const tranche of SIMULATION_TO_PRODUCTION_LEDGER) {
    const result = attemptGraduateTrancheToProduction(tranche, { deviceBridgeFullyIntegrated: false, activeLiveAdapters: [] });
    assert.equal(result.g4Eligible, false);
    assert.equal(result.productionAdmitted, false);
    assert.equal(result.learningLedgerStatus, 'SIMULATION_BASELINE_RETAINED_PENDING_REAL_LEDGER_ADMISSION');
  }
});

test('GRADUATION-02 [SIMULATION] requires replay execution and independent evidence before G4 eligibility', () => {
  const tranche = SIMULATION_TO_PRODUCTION_LEDGER[4];
  const incomplete = attemptGraduateTrancheToProduction(tranche, {
    deviceBridgeFullyIntegrated: true,
    activeLiveAdapters: tranche.requiredBridgeAdaptersForReplay,
    replayExecuted: false,
    liveTestPassRatio: 1,
    independentVeritasAccepted: true,
    receiptAuthorityHash: 'RA-FIXTURE-9901',
    continuumReadbackVerified: true
  });
  assert.equal(incomplete.g4Eligible, false);
  assert.equal(incomplete.productionAdmitted, false);

  const completeFixture = attemptGraduateTrancheToProduction(tranche, {
    deviceBridgeFullyIntegrated: true,
    activeLiveAdapters: tranche.requiredBridgeAdaptersForReplay,
    replayExecuted: true,
    liveTestPassRatio: 1,
    independentVeritasAccepted: true,
    receiptAuthorityHash: 'RA-FIXTURE-9901',
    continuumReadbackVerified: true
  });
  assert.equal(completeFixture.g4Eligible, true);
  assert.equal(completeFixture.productionAdmitted, false);
  assert.equal(completeFixture.q69Grade, 69);
  assert.equal(completeFixture.qb64GradeSymbol, 'BF');
  assert.match(completeFixture.promotionStatus, /^G4_ELIGIBLE_/);
});

test('GRADUATION-03 [SIMULATION] grades malformed or partial replay input fail-closed', () => {
  assert.deepEqual(gradeTestQ69(undefined), { q69: 0, qb64: 'A' });
  assert.deepEqual(gradeTestQ69(1.2), { q69: 69, qb64: 'BF' });
  const tranche = SIMULATION_TO_PRODUCTION_LEDGER[0];
  const result = attemptGraduateTrancheToProduction(tranche, { deviceBridgeFullyIntegrated: true, activeLiveAdapters: tranche.requiredBridgeAdaptersForReplay, replayExecuted: true, liveTestPassRatio: 0.5, independentVeritasAccepted: true, receiptAuthorityHash: 'RA-FIXTURE', continuumReadbackVerified: true });
  assert.equal(result.g4Eligible, false);
  assert.equal(result.productionAdmitted, false);
});
