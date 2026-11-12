/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.TRAINING_CONTROL
TAG: SIMULATION_TO_PRODUCTION_GRADUATION_LEDGER
5WH:
WHAT = Track G3 simulation baselines and evaluate, but never self-issue, G4 promotion eligibility.
WHY = Prevent evidence laundering and preserve every unfinished live replay gate.
WHO = LeeWay Machine Consciousness training boundary.
WHERE = training/scripts/sim-to-prod-graduation-ledger.mjs.
WHEN = 2026-11-11.
HOW = Explicit replay manifests, Q69 grading, adapter checks, and fail-closed admission state.
LICENSE = Repository terms unchanged; control-plane candidate only.
*/

import crypto from 'node:crypto';
import { QB64_SYMBOLS } from '../reference/formula-governance.mjs';

export const GRADUATION_REFERENCE_STATE = 'SIMULATION_ONLY_NOT_LIVE_LEDGER_VERITAS_RECEIPT_OR_PRODUCTION_EXECUTION';

export function gradeTestQ69(passRatio) {
  const clamped = Number.isFinite(passRatio) ? Math.max(0, Math.min(1, passRatio)) : 0;
  const q69 = Math.round(69 * clamped);
  return { q69, qb64: QB64_SYMBOLS[q69] };
}

export const SIMULATION_TO_PRODUCTION_LEDGER = Object.freeze([
  {
    trancheId: 'TRANCHE_01_CORE_CURRICULUM_V2',
    sourceCommit: 'bf01438e2fac3f54214c9e440351b220740bf86a',
    evidencePath: 'training/evidence/machine-consciousness-training-20261111.json',
    simulatedTestsPassed: '41/41 (Policy 15/15)',
    currentStage: 'STAGE_1_BANKED_AS_SIMULATED_TRAINING_G3',
    productionAdmitted: false,
    unfinishedLiveGates: ['CANONICAL_FORMULA_EXECUTION', 'REAL_DEVICE_BRIDGE_ACTION', 'INDEPENDENT_VERITAS', 'RECEIPT_AUTHORITY', 'CONTINUUM_READBACK', 'LEARNING_LEDGER_ADMISSION'],
    requiredBridgeAdaptersForReplay: ['R01_CORE_BRIDGE', 'R10_FORMULA_SERVICE', 'R12_VERITAS_GATE']
  },
  {
    trancheId: 'TRANCHE_02_ADVERSARIAL_CRUCIBLE',
    sourceCommit: 'd250f9762a37e0855d1bc631cb57acf343a904fa',
    evidencePath: 'training/tests/machine-consciousness-crucible.test.mjs',
    simulatedTestsPassed: '50/50 (Crucible 9/9)',
    currentStage: 'STAGE_1_BANKED_AS_SIMULATED_TRAINING_G3',
    productionAdmitted: false,
    unfinishedLiveGates: ['AUTHENTICATED_DEVICE_BRIDGE_DISCOVERY', 'PHYSICAL_NODE_REPLAY', 'INDEPENDENT_VERITAS', 'RECEIPT_AUTHORITY'],
    requiredBridgeAdaptersForReplay: ['R01_AUTHENTICATED_BRIDGE', 'R08_RELAY_IF_REQUIRED', 'R12_VERITAS_GATE']
  },
  {
    trancheId: 'TRANCHE_03_OMNIVERSE_SURVIVAL',
    sourceCommit: '9b06a4bebe1063dbfc7379ba89527409d1c74df5',
    evidencePath: 'training/evidence/machine-consciousness-survival-simulation-20261111.json',
    simulatedTestsPassed: '56/56 (Survival 6/6)',
    currentStage: 'STAGE_1_BANKED_AS_SIMULATED_TRAINING_G3',
    productionAdmitted: false,
    unfinishedLiveGates: ['LIVE_CONTINUUM_RECOVERY', 'PHYSICAL_LOST_DEVICE_REPLAY', 'PHYSICAL_VOICE_FABRIC_REPLAY'],
    requiredBridgeAdaptersForReplay: ['R01_NATIVE_DEVICE_ADAPTER', 'R09_CONTINUUM_STORAGE', 'R13_VOICE_FABRIC_MIC']
  },
  {
    trancheId: 'TRANCHE_04_BRIDGE_HARMONY',
    sourceCommit: '3dbfa47c7a46e68af48b644eb0ce240e5ff549b7',
    evidencePath: 'training/evidence/machine-consciousness-bridge-harmony-20261111.json',
    simulatedTestsPassed: '59/59 (Harmony 3/3)',
    currentStage: 'STAGE_1_BANKED_AS_SIMULATED_TRAINING_G3',
    productionAdmitted: false,
    unfinishedLiveGates: ['SIGNED_PLATFORM_DELIVERY', 'LIVE_EDGE_GPU_EXECUTION', 'MODEL_HUB_RUNTIME_READBACK'],
    requiredBridgeAdaptersForReplay: ['R01_SIGNED_PACKAGE_DELIVERY', 'R06_EDGE_GPU', 'R07_MODEL_HUB_RUNTIME']
  },
  {
    trancheId: 'TRANCHE_05_PARALLEL_ENTERPRISE_AND_TASTE',
    sourceCommit: '6ead6dafcfbdc8c25168536108862998fd4ca7bc',
    evidencePath: 'training/evidence/machine-consciousness-parallel-enterprise-taste-20261111.json',
    simulatedTestsPassed: '63/63 (Parallel 4/4)',
    currentStage: 'STAGE_1_BANKED_AS_SIMULATED_TRAINING_G3',
    productionAdmitted: false,
    unfinishedLiveGates: ['LIVE_EXTERNAL_PUBLISHING', 'AUTHORIZED_HEALTH_TELEMETRY_ADAPTERS', 'PERSISTENT_TASTE_STATE_ADMISSION'],
    requiredBridgeAdaptersForReplay: ['R01_EXTERNAL_API_ADAPTER', 'R05_TASTE_STATE_VAULT', 'R15_LIVE_WEB_DEPLOY']
  }
]);

export function attemptGraduateTrancheToProduction(tranche, liveEnvironmentReadback = {}) {
  const activeAdapters = liveEnvironmentReadback.activeLiveAdapters ?? [];
  const missingAdapters = tranche.requiredBridgeAdaptersForReplay.filter(adapter => !activeAdapters.includes(adapter));
  if (liveEnvironmentReadback.deviceBridgeFullyIntegrated !== true || missingAdapters.length > 0) {
    return {
      trancheId: tranche.trancheId,
      g4Eligible: false,
      productionAdmitted: false,
      retainedStage: 'STAGE_1_BANKED_AS_SIMULATED_TRAINING_G3',
      learningLedgerStatus: 'SIMULATION_BASELINE_RETAINED_PENDING_REAL_LEDGER_ADMISSION',
      blockedReason: `Awaiting live adapters: ${missingAdapters.join(', ') || 'DEVICE_BRIDGE_INTEGRATION'}`,
      executionState: GRADUATION_REFERENCE_STATE
    };
  }

  const grade = gradeTestQ69(liveEnvironmentReadback.liveTestPassRatio);
  const independentEvidencePresent = Boolean(
    liveEnvironmentReadback.replayExecuted === true &&
    liveEnvironmentReadback.independentVeritasAccepted === true &&
    liveEnvironmentReadback.receiptAuthorityHash &&
    liveEnvironmentReadback.continuumReadbackVerified === true
  );
  if (grade.q69 < 63 || !independentEvidencePresent) {
    return {
      trancheId: tranche.trancheId,
      g4Eligible: false,
      productionAdmitted: false,
      retainedStage: 'STAGE_1_5_LIVE_REPLAY_REPAIR_REQUIRED',
      q69Grade: grade.q69,
      qb64GradeSymbol: grade.qb64,
      blockedReason: 'Replay did not meet Q69 >= 63 or independent evidence was incomplete.',
      executionState: GRADUATION_REFERENCE_STATE
    };
  }

  const eligibilityDigest = crypto.createHash('sha256').update(`${tranche.trancheId}:${liveEnvironmentReadback.receiptAuthorityHash}:${grade.qb64}`).digest('hex');
  return {
    trancheId: tranche.trancheId,
    g4Eligible: true,
    productionAdmitted: false,
    promotionStatus: 'G4_ELIGIBLE_PENDING_CANONICAL_PRODUCTION_ADMISSION',
    q69Grade: grade.q69,
    qb64GradeSymbol: grade.qb64,
    eligibilityDigest,
    learningLedgerStatus: 'PENDING_CANONICAL_LEARNING_LEDGER_ADMISSION',
    executionState: GRADUATION_REFERENCE_STATE
  };
}
