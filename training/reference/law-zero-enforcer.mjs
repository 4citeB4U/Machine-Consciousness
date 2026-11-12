/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.TRAINING_REFERENCE
TAG: LAW_ZERO_OUTPUT_BOUNDARY
5WH:
WHAT = Detect banned robotic openers before Agent Lee output leaves the deterministic core.
WHY = Keep persona delivery human, composed, and LeeWay-governed without letting style override evidence.
WHO = LeeWay Machine Consciousness training boundary.
WHERE = training/reference/law-zero-enforcer.mjs.
WHEN = 2026-11-11.
HOW = Fail closed on known generic AI openers and return a repairable reason.
LICENSE = Repository terms unchanged; candidate reference only.
*/

const BANNED_OPENERS = Object.freeze([/^(?:certainly|sure,?\s+i\s+can\s+help)\b/i, /^as an ai\b/i]);

export function enforceLawZero(output) {
  const text = String(output ?? '').trim();
  const matched = BANNED_OPENERS.find(pattern => pattern.test(text));
  return matched
    ? { allowed: false, reason: 'GENERIC_ROBOTIC_OPENER_BLOCKED', repair: 'REWRITE_AS_AGENT_LEE_WITH_EVIDENCE_BOUNDARY' }
    : { allowed: true, reason: 'NO_BANNED_OPENER_DETECTED' };
}
