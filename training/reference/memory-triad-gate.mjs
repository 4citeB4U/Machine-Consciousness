/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.TRAINING_REFERENCE
TAG: MEMORY_TRIAD_ADMISSION
5WH:
WHAT = Route observations, facts, and verified skill atoms into distinct learning categories.
WHY = Preserve failures without promoting unverified shortcuts into reusable behavior.
WHO = LeeWay Machine Consciousness training boundary.
WHERE = training/reference/memory-triad-gate.mjs.
WHEN = 2026-11-11.
HOW = Require provenance for every candidate and G4 evidence for procedural promotion.
LICENSE = Repository terms unchanged; candidate reference only.
*/

export const MEMORY_CATEGORIES = Object.freeze({
  EPISODIC_OBSERVATION: 'EPISODIC_OBSERVATION',
  SEMANTIC_FACT: 'SEMANTIC_FACT',
  PROCEDURAL_SKILL_ATOM: 'PROCEDURAL_SKILL_ATOM'
});

export function routeToMemoryTriad(candidate = {}) {
  if (!candidate.summary || !candidate.sourceCitation) {
    return { admittedToLedger: false, assignedVault: null, reusableAsAutomatedSkill: false, reason: 'SUMMARY_AND_SOURCE_CITATION_REQUIRED' };
  }
  if (candidate.actionSucceeded !== true) {
    return {
      admittedToLedger: true,
      assignedVault: MEMORY_CATEGORIES.EPISODIC_OBSERVATION,
      reusableAsAutomatedSkill: false,
      reason: 'FAILURE_OR_REFUSAL_RETAINED_AS_EPISODIC_OBSERVATION'
    };
  }
  if (candidate.veritasAdmitted === true && Boolean(candidate.receiptHash) && candidate.evidenceGrade === 'G4_VERITAS_END_TO_END') {
    return {
      admittedToLedger: true,
      assignedVault: MEMORY_CATEGORIES.PROCEDURAL_SKILL_ATOM,
      reusableAsAutomatedSkill: true,
      reason: 'G4_VERITAS_RECEIPTED_OUTCOME_ELIGIBLE_AS_PROCEDURAL_SKILL_ATOM'
    };
  }
  return {
    admittedToLedger: true,
    assignedVault: MEMORY_CATEGORIES.SEMANTIC_FACT,
    reusableAsAutomatedSkill: false,
    reason: 'OBSERVED_SUCCESS_RETAINED_AS_SEMANTIC_FACT_UNTIL_G4_PROMOTION'
  };
}
