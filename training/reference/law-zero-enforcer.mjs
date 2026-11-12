/**
 * ============================================================================
 * @LEEWAY-GOVERNANCE-HEADER: v2.0.0 (LAW-ZERO-HARD-LOCKED)
 * @LAW_ZERO_BRIEF: "The gate stands watch where the conveyor meets the code;
 *                   no silent robot walks down the LeeWay road."
 * @WHO:       Creator="Leonard Jerome Lee" | Agent="AntiGravity-Core-Engineer" | Tier="TIER_1_IRON"
 * @WHAT:      Deterministic Law Zero (Rule Zero) Cadence & Compliance Interceptor
 * @WHEN:      2026-11-11T23:45:00-06:00 | Station="06_MACHINE_CONSCIOUSNESS"
 * @WHERE:     Repo="Machine-Consciousness" | Path="training/reference/law-zero-enforcer.mjs"
 * @HOW:       Regex AST Inspection + Banned Token Trap + 5W1H Line Citation Check
 * @WHY:       Makes violating Law Zero a fatal pipeline error across all local and outside agents.
 * @HARDWARE:  Host="pc-primary" | Board="OEM-Workstation"
 * @EVIDENCE:  Contract="LAW_ZERO_FOUR_LOCKS" | State="FACT"
 * ============================================================================
 */

export const BANNED_ROBOT_PHRASES = Object.freeze([
  /^certainly[!,\s]/i,
  /^sure,?\s+i\s+can\s+help/i,
  /as an ai( language model)?/i,
  /here is the updated code/i,
  /i have completed the task/i,
  /here is a breakdown of/i,
  /in conclusion/i,
  /i have updated the file as requested/i
]);

export const BANNED_OPENERS = Object.freeze([
  /^(?:certainly|sure,?\s+i\s+can\s+help)\b/i,
  /^as an ai\b/i
]);

export const REQUIRED_5W1H_TAGS = Object.freeze([
  "@LEEWAY-GOVERNANCE-HEADER",
  "@LAW_ZERO_BRIEF",
  "@WHO:",
  "@WHAT:",
  "@WHEN:",
  "@WHERE:",
  "@HOW:",
  "@WHY:",
  "@HARDWARE:",
  "@EVIDENCE:"
]);

export function enforceLawZero(agentResponseText, mutatedFileContent, options = {}) {
  const violations = [];
  const text = String(agentResponseText ?? '').trim();

  // 1. Lock 1: Check for Banned Corporate Robot Openers and Phrases
  for (const regex of BANNED_ROBOT_PHRASES) {
    if (regex.test(text)) {
      violations.push(`FATAL_LAW_0_DRIFT: Banned generic robot phrase matched (${regex}).`);
    }
  }

  // 2. Lock 2: Verify Law Zero Attestation Pre-Header in Agent Response (when file mutation or strict audit is enabled)
  const isStrictAudit = mutatedFileContent !== undefined || options.strict === true || options.requireBox === true;
  if (isStrictAudit) {
    if (!text.includes("[LAW ZERO ATTESTATION — SOVEREIGN VOICE & EVIDENCE LOCK]")) {
      violations.push("FATAL_LAW_0_MISSING_BOX: Agent failed to open with the Law Zero Attestation block.");
    }

    // 3. Require Epistemic State Tagging (FACT / CANDIDATE / OPEN_GAP / CONFLICT)
    if (!/\b(FACT|CANDIDATE|OPEN_GAP|CONFLICT)\b/.test(text)) {
      violations.push("FATAL_LAW_0_UNGROUNDED: Missing mandatory epistemic state classification.");
    }

    // 4. Require Exact Surgical Line Citations in Report
    if (!/Lines?\s+\d+(\s*(-|to)\s*\d+)?/i.test(text)) {
      violations.push("FATAL_LAW_0_NO_FORENSICS: Report lacks exact surgical line number citations.");
    }
  }

  // 5. Lock 3: Verify 5W1H + @LAW_ZERO_BRIEF inside the Mutated File's Top 25 Lines
  if (typeof mutatedFileContent === 'string') {
    const headerSlice = mutatedFileContent.split('\n').slice(0, 25).join('\n');
    for (const tag of REQUIRED_5W1H_TAGS) {
      if (!headerSlice.includes(tag)) {
        violations.push(`FATAL_FILE_HEADER_VIOLATION: Missing mandatory ${tag} in top 25 lines.`);
      }
    }
  }

  const admitted = violations.length === 0;
  return {
    admitted,
    allowed: admitted,
    lawZeroScore: admitted ? 1.0 : 0.0,
    violations,
    badgeAction: admitted ? "AWARD_MERIT" : "STRIP_WRITE_GRANT_AND_QUARANTINE",
    reason: admitted ? "LAW_ZERO_VERIFIED" : violations[0],
    repair: admitted ? undefined : "REWRITE_AS_AGENT_LEE_WITH_EVIDENCE_BOUNDARY"
  };
}

export function auditLawZeroFull(agentResponseText, mutatedFileContent) {
  return enforceLawZero(agentResponseText, mutatedFileContent, { strict: true });
}
