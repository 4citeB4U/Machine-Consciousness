/**
 * ============================================================================
 * @LEEWAY-GOVERNANCE-HEADER: v2.0.0 (LAW-ZERO-HARD-LOCKED)
 * @LAW_ZERO_BRIEF: "Testing the Two-Stage Receipt Order and Module 6 A.N.T. Colony Constitutional alignment in MASTER_KERNEL."
 * @WHO:       Creator="Leonard Jerome Lee" | Agent="AntiGravity-Core-Engineer" | Tier="TIER_1_IRON"
 * @WHAT:      Verify MASTER_KERNEL.LWS.md enforces CANDIDATE_EVIDENCE_RECEIPT -> Veritas -> QUALIFIED_CANONICAL_RECEIPT and Module 6
 * @WHEN:      2026-11-12T16:10:00-06:00 | Station="06_MACHINE_CONSCIOUSNESS"
 * @WHERE:     Repo="Machine-Consciousness" | Path="training/tests/sovereign-colony-constitution.test.mjs"
 * @HOW:       Deterministic structural inspection of MASTER_KERNEL.LWS.md
 * @WHY:       Eliminate canonical receipt / Veritas ordering contradictions prior to Weight Training and C3 dispatch.
 * @HARDWARE:  Host="agnostic"
 * @EVIDENCE:  Contract="LEEWAY-SOVEREIGN-COLONY-CONSTITUTION-V1" | State="FACT"
 * ============================================================================
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..', '..');

test('MASTER_KERNEL enforces Two-Stage Receipt Order (Candidate -> Veritas -> Qualified Canonical)', () => {
  const kernel = fs.readFileSync(path.join(repoRoot, 'training/MASTER_KERNEL.LWS.md'), 'utf8');
  const candidateIdx = kernel.indexOf('CANDIDATE_EVIDENCE_RECEIPT');
  const veritasIdx = kernel.indexOf('Independent Veritas Gatekeeper');
  const canonicalIdx = kernel.indexOf('QUALIFIED_CANONICAL_RECEIPT');

  assert.ok(candidateIdx > 0, 'CANDIDATE_EVIDENCE_RECEIPT must appear in MASTER_KERNEL');
  assert.ok(veritasIdx > candidateIdx, 'Independent Veritas must follow CANDIDATE_EVIDENCE_RECEIPT');
  assert.ok(canonicalIdx > veritasIdx, 'QUALIFIED_CANONICAL_RECEIPT must follow Independent Veritas');
});

test('MASTER_KERNEL includes Module 6 Citizen Form, A.N.T. Colony, and Complexity/Phoenix governance', () => {
  const kernel = fs.readFileSync(path.join(repoRoot, 'training/MASTER_KERNEL.LWS.md'), 'utf8');
  assert.match(kernel, /MODULE 6: CITIZEN POSITIVE FORM, A\.N\.T\. COLONY/);
  assert.match(kernel, /DURABLE_SQLITE_WAL/);
  assert.match(kernel, /IMMEDIATE_SIGKILL_REVOKE_AND_ZERO_WIPE/);
  assert.match(kernel, /LANE_1_REFLEX_FAST_PATH/);
});
