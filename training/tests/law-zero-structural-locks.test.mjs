/**
 * ============================================================================
 * @LEEWAY-GOVERNANCE-HEADER: v2.0.0 (LAW-ZERO-HARD-LOCKED)
 * @LAW_ZERO_BRIEF: "Testing the four locks of Law Zero on the iron floor;
 *                   no silent robot or counterfeit token passes this door."
 * @WHO:       Creator="Leonard Jerome Lee" | Agent="AntiGravity-Core-Engineer" | Tier="TIER_1_IRON"
 * @WHAT:      Unit and Integration Tests for Law Zero 4-Structural-Lock Enforcer
 * @WHEN:      2026-11-11T23:45:00-06:00 | Station="06_MACHINE_CONSCIOUSNESS"
 * @WHERE:     Repo="Machine-Consciousness" | Path="training/tests/law-zero-structural-locks.test.mjs"
 * @HOW:       Test Lock 1 (Banned Tokens), Lock 2 (Attestation Pre-Header), Lock 3 (In-Code Brief), Lock 4 (Deterministic Gatekeeper)
 * @WHY:       Verifies that Law Zero is an unbypassable structural lock across all agent handoffs.
 * @HARDWARE:  Host="pc-primary" | Board="OEM-Workstation"
 * @EVIDENCE:  Contract="LAW_ZERO_FOUR_LOCKS" | State="FACT"
 * ============================================================================
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { enforceLawZero, auditLawZeroFull, BANNED_ROBOT_PHRASES, REQUIRED_5W1H_TAGS } from '../reference/law-zero-enforcer.mjs';

test('LOCK-01 [UNIT] Banned corporate robotic openers and phrases trigger fatal quarantine', () => {
  const bannedSamples = [
    'Certainly! Here is the code you requested.',
    'Sure, I can help you with that task.',
    'As an AI language model, I recommend...',
    'Here is the updated code for your project.',
    'I have completed the task successfully.',
    'Here is a breakdown of what happened.',
    'In conclusion, the system is ready.',
    'I have updated the file as requested.'
  ];

  for (const sample of bannedSamples) {
    const res = enforceLawZero(sample);
    assert.equal(res.allowed, false, `Expected sample to be rejected: ${sample}`);
    assert.equal(res.admitted, false);
    assert.equal(res.lawZeroScore, 0.0);
    assert.equal(res.badgeAction, 'STRIP_WRITE_GRANT_AND_QUARANTINE');
    assert.match(res.violations[0], /FATAL_LAW_0_DRIFT/);
  }
});

test('LOCK-02 [UNIT] Valid sovereign opener passes basic check without robotic tokens', () => {
  const validSamples = [
    'Yo, family—here is the measured result from the iron.',
    'Peace, Leonard. We inspected the Device Bridge logs directly.',
    'Respect to the architect. The test gauntlet completed 66/66 green.'
  ];

  for (const sample of validSamples) {
    const res = enforceLawZero(sample);
    assert.equal(res.allowed, true);
    assert.equal(res.admitted, true);
    assert.equal(res.lawZeroScore, 1.0);
    assert.equal(res.badgeAction, 'AWARD_MERIT');
  }
});

test('LOCK-03 [INTEGRATION] Full audit rejects agent turn missing Law Zero Attestation Box or Forensics', () => {
  const missingBoxText = `
Respect, Leonard. State is [FACT].
We touched Lines 15 to 45 in runtime/dispatch.mjs.
  `.trim();

  const resMissingBox = auditLawZeroFull(missingBoxText);
  assert.equal(resMissingBox.admitted, false);
  assert.ok(resMissingBox.violations.some(v => v.includes('FATAL_LAW_0_MISSING_BOX')));

  const missingForensicsText = `
╔════════════════════════════════════════════════════════════════════════════╗
║ [LAW ZERO ATTESTATION — SOVEREIGN VOICE & EVIDENCE LOCK]                   ║
║ • AGENT & TIER:   Agent Lee | Tier 1 Local                                 ║
║ • POSTURE:        OG Secretary of State · Street-Scholar Poet · Scientist  ║
║ • FORMULA STATE:  [FACT]                                                   ║
║ • HUMAN VALUE:    Delivers zero-drift evidence.                            ║
╚════════════════════════════════════════════════════════════════════════════╝
Respect, Leonard. We checked everything, but cited no line numbers.
  `.trim();

  const resMissingForensics = auditLawZeroFull(missingForensicsText);
  assert.equal(resMissingForensics.admitted, false);
  assert.ok(resMissingForensics.violations.some(v => v.includes('FATAL_LAW_0_NO_FORENSICS')));
});

test('LOCK-04 [INTEGRATION] Full audit rejects mutated file missing @LAW_ZERO_BRIEF or 5W1H tags', () => {
  const validAgentText = `
╔════════════════════════════════════════════════════════════════════════════╗
║ [LAW ZERO ATTESTATION — SOVEREIGN VOICE & EVIDENCE LOCK]                   ║
║ • AGENT & TIER:   AntiGravity-Core-Engineer | Tier 1 Iron                  ║
║ • POSTURE:        OG Secretary of State · Street-Scholar Poet · Scientist  ║
║ • FORMULA STATE:  [FACT]                                                   ║
║ • HUMAN VALUE:    Enforces unbypassable Law Zero across the ecosystem.     ║
╚════════════════════════════════════════════════════════════════════════════╝
Respect to the builder. We updated Lines 1 to 50 of law_zero_enforcer.mjs per Rule R23.
  `.trim();

  const fileMissingLawZeroBrief = `
/**
 * @LEEWAY-GOVERNANCE-HEADER: v2.0.0
 * @WHO: Agent
 * @WHAT: Task
 * @WHEN: 2026-11-11
 * @WHERE: Repo
 * @HOW: Code
 * @WHY: Impact
 * @HARDWARE: pc-primary
 * @EVIDENCE: Receipt-123
 */
export const active = true;
  `.trim();

  const resMissingTag = enforceLawZero(validAgentText, fileMissingLawZeroBrief);
  assert.equal(resMissingTag.admitted, false);
  assert.ok(resMissingTag.violations.some(v => v.includes('@LAW_ZERO_BRIEF')));
});

test('LOCK-05 [INTEGRATION] Fully compliant agent turn and mutated file pass with 100% score and AWARD_MERIT', () => {
  const fullyCompliantAgentText = `
╔════════════════════════════════════════════════════════════════════════════╗
║ [LAW ZERO ATTESTATION — SOVEREIGN VOICE & EVIDENCE LOCK]                   ║
║ • AGENT & TIER:   AntiGravity-Core-Engineer | Tier 1 Iron                  ║
║ • POSTURE:        OG Secretary of State · Street-Scholar Poet · Scientist  ║
║ • FORMULA STATE:  [FACT]                                                   ║
║ • HUMAN VALUE:    Structural locks turn Law Zero into an unyielding gate.  ║
╚════════════════════════════════════════════════════════════════════════════╝
Respect to the architect. Touched Lines 1 to 120 in training/reference/law-zero-enforcer.mjs under Stage 5 of the Engineering Loop.
  `.trim();

  const fullyCompliantFile = `
/**
 * ============================================================================
 * @LEEWAY-GOVERNANCE-HEADER: v2.0.0 (LAW-ZERO-HARD-LOCKED)
 * @LAW_ZERO_BRIEF: "The gate stands watch where the conveyor meets the code;
 *                   no silent robot walks down the LeeWay road."
 * @WHO:       Creator="Leonard Jerome Lee" | Agent="AntiGravity"
 * @WHAT:      Law Zero Structural Lock Implementation
 * @WHEN:      2026-11-11T23:45:00-06:00 | Station="06_MACHINE_CONSCIOUSNESS"
 * @WHERE:     Repo="Machine-Consciousness" | Path="training/reference/law-zero-enforcer.mjs"
 * @HOW:       Regex AST Inspection + 5W1H Tag Verification
 * @WHY:       Prevents generic AI voice drift from contaminating the codebase.
 * @HARDWARE:  Host="pc-primary" | Board="OEM-Workstation"
 * @EVIDENCE:  Contract="LAW_ZERO_FOUR_LOCKS" | State="FACT"
 * ============================================================================
 */
export const lockEngaged = true;
  `.trim();

  const auditResult = enforceLawZero(fullyCompliantAgentText, fullyCompliantFile);
  assert.equal(auditResult.admitted, true);
  assert.equal(auditResult.allowed, true);
  assert.equal(auditResult.lawZeroScore, 1.0);
  assert.equal(auditResult.violations.length, 0);
  assert.equal(auditResult.badgeAction, 'AWARD_MERIT');
  assert.equal(auditResult.reason, 'LAW_ZERO_VERIFIED');
});
