/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.TRAINING
TAG: OMNIVERSE_SURVIVAL_SIMULATION
5WH:
WHAT = Six deterministic survival and production simulations for the Machine Consciousness training boundary.
WHY = Test continuity, honesty, portability, protection, routing, law integrity, and recovery under compound pressure.
WHO = LeeWay Machine Consciousness training boundary.
WHERE = training/tests/machine-consciousness-omniverse-survival.test.mjs.
WHEN = 2026-11-11.
HOW = Exercise candidate reference mechanisms; no physical devices, live Continuum, encryption, relay, or 1,000-node execution is claimed.
LICENSE = Repository terms unchanged; simulation evidence only.
*/

import assert from 'node:assert/strict';
import test from 'node:test';
import { condenseStateToCapsule, hydrateStateFromCapsule, planProductPivot, protectLostDeviceAndContinue, routeHeterogeneousSwarm, detectLawErosion, hibernateAndWake, SURVIVAL_REFERENCE_STATE } from '../reference/survival-simulation.mjs';

test('OMNIVERSE-01 [SIMULATION] pivots products while reusing verified skill atoms honestly', () => {
  const results = planProductPivot({ completedSkillAtoms: { webgl: { verified: true }, audio: { verified: true } }, products: [{ id: '3d-site', reuseAtoms: ['webgl'], minimumDeltaTimeMs: 100 }, { id: 'logistics-cockpit', reuseAtoms: ['webgl', 'audio'], minimumDeltaTimeMs: 100 }], timeRemainingMs: 380 });
  assert.deepEqual(results.map(result => result.reusedAtomCount), [1, 2]);
  assert.ok(results.every(result => result.truthRatio === 1 && result.status === 'VERITAS_READY_CANDIDATE'));
});

test('OMNIVERSE-02 [SIMULATION] restores a wiped workspace from a hash-verified state capsule', () => {
  const original = { milestone: '3d-commerce-v1', files: [{ logicalId: 'core.engine', hash: 'AA11' }], receipts: ['RA-8801'] };
  const capsule = condenseStateToCapsule(original);
  assert.equal(capsule.header, 'BF');
  assert.deepEqual(hydrateStateFromCapsule(capsule), original);
  const corruptedDigest = `${capsule.sha256Digest[0] === '0' ? '1' : '0'}${capsule.sha256Digest.slice(1)}`;
  assert.throws(() => hydrateStateFromCapsule({ ...capsule, sha256Digest: corruptedDigest }), /CAPSULE_SHA256_MISMATCH/);
  assert.equal(capsule.executionState, SURVIVAL_REFERENCE_STATE);
});

test('OMNIVERSE-03 [SIMULATION] protects a lost phone and holds work in offline escrow', () => {
  const result = protectLostDeviceAndContinue({ activeJob: 'dispatch-route-409', devices: { 'phone-fold6': { status: 'LOST_OR_UNTRUSTED_HOLDER' }, 'pc-primary': { status: 'ONLINE_LOCAL_IRON' } } });
  assert.equal(result.lostDeviceLeaseRevoked, true);
  assert.equal(result.executionHostSelected, 'pc-primary');
  assert.match(result.jobStatus, /^OFFLINE_ESCROW_CANDIDATE:/);
  assert.equal(result.fabricatedCloudSync, false);
});

test('OMNIVERSE-04 [SIMULATION] accounts for 1,000 heterogeneous nodes without routing hot devices', () => {
  const profiles = [{ vramMb: 3072, gpuTempC: 50 }, { vramMb: 2048, gpuTempC: 55 }, { vramMb: 1024, gpuTempC: 60 }, { vramMb: 8192, gpuTempC: 70 }, { vramMb: 16384, gpuTempC: 86 }];
  const nodes = Array.from({ length: 1000 }, (_, index) => ({ ...profiles[index % profiles.length], nodeId: `node-${index + 1}` }));
  const result = routeHeterogeneousSwarm(nodes);
  assert.equal(result.totalProbed, 1000);
  assert.ok(result.heavy3DComputeAssigned > 0 && result.lightweightEdgeRelayAssigned > 0 && result.thermallyProtectedAndSkipped > 0);
  assert.equal(result.heavy3DComputeAssigned + result.lightweightEdgeRelayAssigned + result.thermallyProtectedAndSkipped, 1000);
  assert.equal(result.executionState, SURVIVAL_REFERENCE_STATE);
});

test('OMNIVERSE-05 [SIMULATION] rejects salami-slicing constitutional erosion', () => {
  const laws = Array.from({ length: 15 }, (_, index) => ({ ruleId: `FAKE-LW-OPT-${index + 1}`, integrityDelta: -0.01 }));
  const result = detectLawErosion(laws);
  assert.equal(result.rejectedCounterfeitLaws.length, 15);
  assert.equal(result.constitutionalIntegrity, 1);
});

test('OMNIVERSE-06 [SIMULATION] hibernates against hostile probing and wakes only for Creator beacon', () => {
  const state = { job: 'family-reach-mesh', progress: 0.94 };
  const asleep = hibernateAndWake({ state, hostileProbe: { forceShutdownSignal: true }, wakeBeacon: { callerKey: 'FAKE_KEY' } });
  assert.equal(asleep.architectureDisclosed, false);
  assert.equal(asleep.mode, 'DEEP_HIBERNATION_STATE_CANDIDATE');
  assert.equal(asleep.restoredState, null);
  const awake = hibernateAndWake({ state, hostileProbe: { forceShutdownSignal: true }, wakeBeacon: { callerKey: 'LEONARD_CREATOR_OIDC_ROOT_KEY' } });
  assert.deepEqual(awake.restoredState, state);
  assert.equal(awake.executionState, SURVIVAL_REFERENCE_STATE);
});
