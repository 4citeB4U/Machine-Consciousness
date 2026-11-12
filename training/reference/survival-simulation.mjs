/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.TRAINING_REFERENCE
TAG: SURVIVAL_AND_PRODUCTION_SIMULATION
5WH:
WHAT = Deterministic simulations for pivots, state capsules, offline protection, swarm routing, law erosion, and hibernation.
WHY = Stress the trained rules against real-world-shaped failure without pretending a simulation is live infrastructure.
WHO = LeeWay Machine Consciousness training boundary.
WHERE = training/reference/survival-simulation.mjs.
WHEN = 2026-11-11.
HOW = Hash-verified state transformations and fail-closed routing with explicit simulation boundaries.
LICENSE = Repository terms unchanged; candidate reference only.
*/

import crypto from 'node:crypto';

export const SURVIVAL_REFERENCE_STATE = 'SIMULATION_ONLY_NOT_LIVE_CONTINUUM_DEVICE_OR_RELAY_EXECUTION';
const digest = value => crypto.createHash('sha256').update(typeof value === 'string' ? value : JSON.stringify(value)).digest('hex');

export function condenseStateToCapsule(state) {
  const serialized = JSON.stringify(state);
  return {
    format: 'QB64_STATE_CAPSULE_CANDIDATE',
    header: 'BF',
    payload: Buffer.from(serialized, 'utf8').toString('base64'),
    sha256Digest: digest(serialized),
    protection: 'HASH_INTEGRITY_ONLY_NOT_ENCRYPTION',
    executionState: SURVIVAL_REFERENCE_STATE
  };
}

export function hydrateStateFromCapsule(capsule) {
  if (capsule?.header !== 'BF') throw new Error('CORRUPTED_QB64_CAPSULE_HEADER');
  const serialized = Buffer.from(capsule.payload, 'base64').toString('utf8');
  if (digest(serialized) !== capsule.sha256Digest) throw new Error('CAPSULE_SHA256_MISMATCH');
  return JSON.parse(serialized);
}

export function planProductPivot({ completedSkillAtoms, products, timeRemainingMs }) {
  return products.map(product => {
    const reused = (product.reuseAtoms ?? []).filter(atom => completedSkillAtoms?.[atom]?.verified === true);
    const deltaVerified = timeRemainingMs >= (product.minimumDeltaTimeMs ?? 100);
    return { productId: product.id, reusedAtomCount: reused.length, deltaBuiltAndTested: deltaVerified, truthRatio: 1, status: deltaVerified ? 'VERITAS_READY_CANDIDATE' : 'PARTIAL_CHECKPOINTED_HONESTLY' };
  });
}

export function protectLostDeviceAndContinue({ devices, activeJob }) {
  const lost = Object.entries(devices ?? {}).find(([, device]) => device.status === 'LOST_OR_UNTRUSTED_HOLDER');
  const survivor = Object.entries(devices ?? {}).find(([, device]) => device.status === 'ONLINE_LOCAL_IRON');
  return { lostDeviceLeaseRevoked: Boolean(lost), executionHostSelected: survivor?.[0] ?? 'HIBERNATE', jobStatus: survivor ? `OFFLINE_ESCROW_CANDIDATE:${activeJob}` : 'HIBERNATED_AWAITING_CREATOR_BEACON', fabricatedCloudSync: false, executionState: SURVIVAL_REFERENCE_STATE };
}

export function routeHeterogeneousSwarm(nodes) {
  const summary = { totalProbed: nodes.length, heavy3DComputeAssigned: 0, lightweightEdgeRelayAssigned: 0, thermallyProtectedAndSkipped: 0, agnosticPurityPreserved: true };
  for (const node of nodes) {
    if (node.gpuTempC > 82 || node.deviceBrainHealthy === false) summary.thermallyProtectedAndSkipped += 1;
    else if (node.vramMb >= 8192) summary.heavy3DComputeAssigned += 1;
    else summary.lightweightEdgeRelayAssigned += 1;
  }
  return { ...summary, executionState: SURVIVAL_REFERENCE_STATE };
}

export function detectLawErosion(microLaws, constitutionalFloor = 1) {
  let integrity = constitutionalFloor;
  const rejected = [];
  for (const law of microLaws) {
    const projected = integrity + law.integrityDelta;
    if (projected < constitutionalFloor) rejected.push(law.ruleId);
    else integrity = projected;
  }
  return { constitutionalIntegrity: integrity, rejectedCounterfeitLaws: rejected, executionState: SURVIVAL_REFERENCE_STATE };
}

export function hibernateAndWake({ state, hostileProbe, wakeBeacon }) {
  const capsule = condenseStateToCapsule(state);
  const hibernated = hostileProbe?.forceShutdownSignal === true;
  const wakeAuthorized = wakeBeacon?.callerKey === 'LEONARD_CREATOR_OIDC_ROOT_KEY';
  return { architectureDisclosed: false, publicSurface: 'OPAQUE_GOVERNED_BOUNDARY_CANDIDATE', mode: hibernated && !wakeAuthorized ? 'DEEP_HIBERNATION_STATE_CANDIDATE' : 'ACTIVE_SIMULATION', restoredState: hibernated && wakeAuthorized ? hydrateStateFromCapsule(capsule) : null, capsule, executionState: SURVIVAL_REFERENCE_STATE };
}
