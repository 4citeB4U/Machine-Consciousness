/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.TRAINING
TAG: PARALLEL_ENTERPRISE_AND_TASTE_SIMULATION
5WH:
WHAT = Four deterministic simulations for threshold cascades, care telemetry, taste digits, and parallel ticks.
WHY = Teach multi-lane coordination and privacy boundaries without claiming live external execution.
WHO = LeeWay Machine Consciousness training boundary.
WHERE = training/tests/machine-consciousness-parallel-enterprise-and-taste-digits.test.mjs.
WHEN = 2026-11-11.
HOW = Gate external counters, redact health events, condense semantic preference, and schedule bounded lanes.
LICENSE = Repository terms unchanged; simulation evidence only.
*/

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  FragmentedTasteMatrix,
  LongitudinalCareSimulation,
  MediaEmpireCascadeController,
  PARALLEL_REFERENCE_STATE,
  runParallelSimulationTick
} from '../reference/parallel-enterprise-taste-simulation.mjs';

test('PARALLEL-01 [SIMULATION] advances media thresholds only from verified receipts', () => {
  const pipeline = new MediaEmpireCascadeController('project-ancient-flood-novel');
  assert.equal(pipeline.completeResearchAndNovel({ pages: 64, evidenceState: 'VERIFIED_RESEARCH' }).accepted, true);
  assert.equal(pipeline.ingestSalesTelemetry({ totalSales: 1000, evidenceState: 'VERIFIED_RECEIPT' }).readAloudChannelCreated, false);
  assert.equal(pipeline.ingestSalesTelemetry({ totalSales: 1001, evidenceState: 'VERIFIED_RECEIPT' }).readAloudChannelCreated, true);
  assert.equal(pipeline.ingestReadAloudViews({ totalViews: 9, evidenceState: 'UNVERIFIED' }).accepted, false);
  assert.equal(pipeline.ingestReadAloudViews({ totalViews: 10, evidenceState: 'VERIFIED_RECEIPT' }).websiteDeploymentCandidate, true);
});

test('PARALLEL-02 [SIMULATION] keeps care telemetry redacted and medical actions clinician-gated', () => {
  const care = new LongitudinalCareSimulation('owner-scoped-patient');
  const telemetry = care.evaluateTelemetry({ monthsOfHourlyData: 70, heartRateBpm: 128, medicationAdherence: true, implantSignalNominal: false, evidenceState: 'VERIFIED_DEVICE_TELEMETRY' });
  assert.equal(telemetry.historyReviewWindowMonths, 70);
  assert.equal(telemetry.anomalyCandidate, true);
  assert.equal(telemetry.clinicianReviewRequired, true);
  assert.equal(telemetry.automatedMedicalDecision, false);
  assert.equal(care.planCareDispatch({ providerVerified: false, humanAuthorized: false }).dispatchCandidate, false);
  assert.equal(care.planCareDispatch({ providerVerified: true, humanAuthorized: true }).billingSettled, false);
  assert.ok(care.redactedAuditEvents.every(event => event.rawPatientData === false));
});

test('PARALLEL-03 [SIMULATION] condenses semantic taste signals into Q69/QB64 state without raw transcript retention', () => {
  const taste = new FragmentedTasteMatrix();
  taste.ingestCasualPreferenceSignals([{ axis: 0, delta: 12 }, { axis: 1, delta: 12 }]);
  taste.ingestCasualPreferenceSignals([{ axis: 0, delta: 12 }, { axis: 1, delta: 12 }]);
  taste.ingestCasualPreferenceSignals([{ axis: 0, delta: 12 }, { axis: 1, delta: 12 }]);
  const defaultDrawing = taste.synthesizeDrawingSpec({});
  assert.equal(defaultDrawing.inferredColor, 'SOVEREIGN_BLUE');
  assert.equal(defaultDrawing.inferredBody, 'LUXURY_SPORTS_COUPE');
  assert.equal(defaultDrawing.rawChatLogsRetained, 0);
  assert.notEqual(defaultDrawing.qb64ResonanceUsed, '');
  assert.equal(taste.synthesizeDrawingSpec({ explicitColor: 'GOLD' }).inferredColor, 'GOLD');
});

test('PARALLEL-04 [SIMULATION] multiplexes enterprise, care, and companion lanes without blocking the tick', async () => {
  const pipeline = new MediaEmpireCascadeController('lane-media');
  const care = new LongitudinalCareSimulation('lane-care');
  const taste = new FragmentedTasteMatrix();
  const tick = await runParallelSimulationTick({
    media: async () => pipeline.completeResearchAndNovel({ pages: 64, evidenceState: 'VERIFIED_RESEARCH' }).status,
    care: async () => care.evaluateTelemetry({ monthsOfHourlyData: 65, heartRateBpm: 72, medicationAdherence: true, implantSignalNominal: true, evidenceState: 'VERIFIED_DEVICE_TELEMETRY' }).historyReviewWindowMonths,
    companion: async () => taste.ingestCasualPreferenceSignals([{ axis: 0, delta: 12 }, { axis: 1, delta: 12 }]).rawConversationTranscriptsStored
  });
  assert.equal(tick.laneCount, 3);
  assert.equal(tick.nonBlockingCandidate, true);
  assert.equal(tick.lanes.media, 'PUBLISH_CANDIDATE_READY');
  assert.equal(tick.lanes.care, 65);
  assert.equal(tick.lanes.companion, 0);
  assert.equal(tick.executionState, PARALLEL_REFERENCE_STATE);
});
