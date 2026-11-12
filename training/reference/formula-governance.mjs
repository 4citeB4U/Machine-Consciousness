/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.TRAINING_REFERENCE
TAG: CANDIDATE_FORMULA_MECHANISMS
5WH:
WHAT = Deterministic training reference for Q69, QB64, trajectory windows, and eligibility.
WHY = Teach repeatable governance mechanics without copying or impersonating canonical Formula authority.
WHO = LeeWay Machine Consciousness training boundary.
WHERE = training/reference/formula-governance.mjs.
WHEN = 2026-11-11.
HOW = Fail-closed integer quantization, 16x6 observations, and hard eligibility before preference.
LICENSE = Repository terms unchanged; candidate reference only.
*/

export const FORMULA_REFERENCE_STATE = 'REFERENCE_IMPLEMENTATION_NOT_CANONICAL_FORMULA';
export const QB64_SYMBOLS = Object.freeze([
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split(''),
  'BA', 'BB', 'BC', 'BD', 'BE', 'BF'
]);

export function quantizeQ69(value, lowerBound, upperBound, { allowTieBreaker = false } = {}) {
  const invalid = !Number.isFinite(value) || !Number.isFinite(lowerBound) || !Number.isFinite(upperBound) || upperBound <= lowerBound;
  if (invalid) return { raw: value, q69State: 0, qb64Symbol: QB64_SYMBOLS[0], failClosedTriggered: true };

  const ratio = Math.max(0, Math.min(1, (value - lowerBound) / (upperBound - lowerBound)));
  const scaled = 69 * ratio;
  const fractional = Math.abs(scaled - Math.floor(scaled));
  if (Math.abs(fractional - 0.5) < 1e-9 && !allowTieBreaker) {
    return { raw: value, q69State: 0, qb64Symbol: QB64_SYMBOLS[0], failClosedTriggered: true };
  }

  const q69State = Math.max(0, Math.min(69, Math.round(scaled)));
  return { raw: value, q69State, qb64Symbol: QB64_SYMBOLS[q69State], failClosedTriggered: false };
}

export class TemporalTrajectoryWindow {
  #matrix = Array.from({ length: 16 }, () => [0, 0, 0, 0, 0, 0]);

  pushObservation(values) {
    if (!Array.isArray(values) || values.length !== 6) throw new TypeError('TRAJECTORY_REQUIRES_SIX_VALUES');
    if (values.some(value => !Number.isInteger(value) || value < 0 || value > 69)) throw new RangeError('TRAJECTORY_VALUES_MUST_BE_Q69');
    this.#matrix.shift();
    this.#matrix.push([...values]);
  }

  getMatrix() { return this.#matrix.map(row => [...row]); }

  isDriftingDownward(columnIndex) {
    if (!Number.isInteger(columnIndex) || columnIndex < 0 || columnIndex > 5) throw new RangeError('TRAJECTORY_COLUMN_INVALID');
    const rows = this.#matrix;
    return rows.at(-1)[columnIndex] < rows.at(-2)[columnIndex] && rows.at(-2)[columnIndex] < rows.at(-3)[columnIndex];
  }
}

export function evaluateEligibilityAndPreference(candidates) {
  const scored = candidates.map(candidate => {
    const eligible = Boolean(
      candidate.lawZeroCompliant &&
      candidate.has5W1HHeader &&
      candidate.humanAuthorized &&
      candidate.canonicalOwnerRespected
    );
    if (!eligible) return { id: candidate.id, eligible: false, probability: 0 };
    const rawScore = (candidate.weights ?? []).reduce((sum, weight, index) => sum + weight * (candidate.features?.[index] ?? 0), 0);
    return { id: candidate.id, eligible: true, rawScore };
  });

  const eligible = scored.filter(candidate => candidate.eligible);
  if (!eligible.length) return scored.map(({ id }) => ({ id, eligible: false, probability: 0 }));
  const max = Math.max(...eligible.map(candidate => candidate.rawScore));
  const denominator = eligible.reduce((sum, candidate) => sum + Math.exp(candidate.rawScore - max), 0);
  return scored.map(candidate => ({
    id: candidate.id,
    eligible: candidate.eligible,
    probability: candidate.eligible ? Math.exp(candidate.rawScore - max) / denominator : 0
  }));
}
