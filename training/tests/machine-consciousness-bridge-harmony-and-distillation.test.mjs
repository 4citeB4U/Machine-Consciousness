/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.TRAINING
TAG: BRIDGE_HARMONY_AND_DISTILLATION_SIMULATION
5WH:
WHAT = Three deterministic simulations for host-policy harmony, future-device adaptation, and skill-atom routing.
WHY = Preserve the useful candidate mechanisms while rejecting unsupported live-execution claims.
WHO = LeeWay Machine Consciousness training boundary.
WHERE = training/tests/machine-consciousness-bridge-harmony-and-distillation.test.mjs.
WHEN = 2026-11-11.
HOW = Test preflight rules, abstract capability vectors, and explicit admission gates.
LICENSE = Repository terms unchanged; simulation evidence only.
*/

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  BRIDGE_HARMONY_REFERENCE_STATE,
  PAUSED_RESIDENT_POLICY,
  SubdormantSkillRouter,
  createSkillAtomCandidate,
  inspectPackageForHostHarmony,
  negotiateCapabilityVector
} from '../reference/bridge-harmony-simulation.mjs';

test('HARMONY-01 [SIMULATION] blocks unattested packages before delivery and admits only a preflight candidate', () => {
  const policy = {
    expectedKeystoreFingerprint: 'LEEWAY_SOVEREIGN_KEY_V1',
    allowedLeastPrivilegePermissions: ['INTERNET', 'FOREGROUND_SERVICE_CONNECTED_DEVICE']
  };
  const blocked = inspectPackageForHostHarmony({
    cryptographicallySigned: false,
    keystoreFingerprint: 'TEMP_DEBUG_KEY',
    sbomAttached: false,
    receiptAuthoritySha256: null,
    requestedPermissions: ['INTERNET', 'WRITE_SECURE_SETTINGS'],
    usesUnsanctionedPrivateApis: false
  }, policy);
  assert.equal(blocked.safeToDeliverToDevice, false);
  assert.equal(blocked.osWarningRisk, 'HIGH_WARNING_RISK_BLOCKED_PRE_DELIVERY');

  const governed = inspectPackageForHostHarmony({
    cryptographicallySigned: true,
    keystoreFingerprint: 'LEEWAY_SOVEREIGN_KEY_V1',
    sbomAttached: true,
    receiptAuthoritySha256: '9029c1cf64ac2c0c173f1b517eadab5046c7c2e1c4cab038bcc109c7c062e6aa',
    requestedPermissions: ['INTERNET', 'FOREGROUND_SERVICE_CONNECTED_DEVICE'],
    usesUnsanctionedPrivateApis: false
  }, policy);
  assert.equal(governed.safeToDeliverToDevice, true);
  assert.equal(governed.osWarningRisk, 'HOST_POLICY_PRECHECK_PASS_CANDIDATE');
  assert.equal(governed.executionState, BRIDGE_HARMONY_REFERENCE_STATE);
});

test('HARMONY-02 [SIMULATION] adapts by capability vector rather than device name', () => {
  const standard = negotiateCapabilityVector({ osFamily: 'Apple-iOS', computeBackend: 'METAL_A13', modalities: ['TOUCH_2D', 'VOICE'] });
  const foldable = negotiateCapabilityVector({ osFamily: 'Samsung-Android', computeBackend: 'VULKAN_ADRENO', modalities: ['FOLDABLE_CONTINUOUS_HINGE', 'STYLUS', 'VOICE'] });
  const spatial = negotiateCapabilityVector({ osFamily: 'Future-Spatial-OS', computeBackend: 'NEURAL_WEBGPU_GEN20', modalities: ['SPATIAL_3D_HOLOGRAPHIC', 'EYE_GAZE_HAND_MESH', 'VOICE'] });
  assert.equal(standard.uiProjectionMode, 'STANDARD_2D');
  assert.equal(foldable.uiProjectionMode, 'ADAPTIVE_SPLIT_POSTURE_STAGE');
  assert.equal(spatial.uiProjectionMode, 'VOLUMETRIC_3D_SPATIAL_STAGE');
  assert.equal(spatial.arHandGazeBinding, true);
  assert.equal(spatial.executionState, BRIDGE_HARMONY_REFERENCE_STATE);
});

test('HARMONY-03 [SIMULATION] keeps a candidate skill dormant until all LeeWay admission gates pass', () => {
  const router = new SubdormantSkillRouter();
  const manifest = createSkillAtomCandidate({
    skillId: 'draw_procedural_3d_architecture',
    teacherAgentId: 'Gemini-F3-Master-Trainer',
    deterministicKernelDescriptor: 'PARAMETERIZED_WEBGPU_RENDER_KERNEL_CANDIDATE'
  });
  router.registerCandidate({
    manifest,
    deterministicKernel: params => `WEBGPU_RENDERED_SCENE_CANDIDATE[mesh=${params.mesh},light=${params.light}]`
  });
  assert.equal(router.modelHubState, PAUSED_RESIDENT_POLICY);
  assert.throws(() => router.admitCandidate({ skillId: manifest.skillId, formulaPass: true, deviceBridgePass: false, gpuExecutionPass: false, veritasPass: false, continuumReceiptPass: false }), /SKILL_ATOM_ADMISSION_INCOMPLETE/);
  const beforeAdmission = router.executeTask({ skillId: manifest.skillId, params: { mesh: 'sovereign_tower', light: 'golden_hour' } });
  assert.equal(beforeAdmission.llmUsed, false);
  assert.equal(beforeAdmission.skillAtomStatus, 'CANDIDATE_NOT_ADMITTED');
  assert.equal(beforeAdmission.output, null);
  router.admitCandidate({ skillId: manifest.skillId, formulaPass: true, deviceBridgePass: true, gpuExecutionPass: true, veritasPass: true, continuumReceiptPass: true });
  const afterAdmission = router.executeTask({ skillId: manifest.skillId, params: { mesh: 'logistics_cockpit', light: 'night_hud' } });
  assert.equal(afterAdmission.executionRoute, 'LEEWAY_EDGE_GPU_KERNEL_CANDIDATE');
  assert.equal(afterAdmission.llmUsed, false);
  assert.equal(afterAdmission.modelHubState, PAUSED_RESIDENT_POLICY);
  assert.equal(afterAdmission.output, 'WEBGPU_RENDERED_SCENE_CANDIDATE[mesh=logistics_cockpit,light=night_hud]');
  assert.equal(afterAdmission.executionState, BRIDGE_HARMONY_REFERENCE_STATE);
});
