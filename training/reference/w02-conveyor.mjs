/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.TRAINING_REFERENCE
TAG: W02_ENGINEERING_CONVEYOR
5WH:
WHAT = Fail-closed ten-gate idea-to-product training state machine.
WHY = Teach continuation across investigation, action, verification, learning, and release without skipping evidence gates.
WHO = LeeWay Machine Consciousness training boundary.
WHERE = training/reference/w02-conveyor.mjs.
WHEN = 2026-11-11.
HOW = Permit only adjacent transitions and require gate-specific evidence.
LICENSE = Repository terms unchanged; candidate reference only.
*/

export const ENGINEERING_LOOP = Object.freeze([
  'INVESTIGATE', 'DIAGNOSE', 'PLAN', 'IMPLEMENT', 'TEST', 'VALIDATE',
  'REPAIR', 'RETEST', 'VERIFY', 'EVIDENCE', 'CHECKPOINT', 'CONTINUE'
]);

export const W02_GATES = Object.freeze([
  'IDEA_INGESTED',
  'STANDARDS_AND_5W1H_LOCKED',
  'HARDWARE_AND_BRAIN_MAPPED',
  'ENGINEERING_LOOP_EXECUTED',
  'FORMULA_Q69_ELIGIBILITY_PASSED',
  'VERITAS_PRE_GATE_ISSUED',
  'BOUNDED_EXECUTION_AND_POST_STATE_OBSERVED',
  'VERITAS_POST_GATE_AND_RECEIPT_MINTED',
  'ELIGIBLE_LEARNING_AND_CHECKPOINT_COMMITTED',
  'PRODUCTION_FINAL_RELEASED'
]);

const REQUIRED_EVIDENCE = Object.freeze([
  'humanPurpose', 'fiveW1H', 'devicePreState', 'engineeringLoop', 'formulaGate',
  'veritasPre', 'postState', 'veritasPostReceipt', 'learningCheckpoint', 'humanRelease'
]);

export function advanceW02(state, evidence = {}) {
  const currentIndex = W02_GATES.indexOf(state?.gate);
  if (currentIndex < 0) return { status: 'BLOCKED', reason: 'UNKNOWN_W02_GATE' };
  if (currentIndex === W02_GATES.length - 1) return { status: 'COMPLETE', gate: state.gate };
  const expectedEvidence = REQUIRED_EVIDENCE[currentIndex];
  if (evidence[expectedEvidence] !== true) {
    return { status: 'BLOCKED', gate: state.gate, reason: `REQUIRED_EVIDENCE_MISSING:${expectedEvidence}` };
  }
  return { status: 'ADVANCED', from: state.gate, gate: W02_GATES[currentIndex + 1] };
}
