/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.TRAINING_REFERENCE
TAG: BRIDGE_HARMONY_AND_DISTILLATION_SIMULATION
5WH:
WHAT = Simulate host-policy preflight, capability-vector adaptation, and skill-atom routing.
WHY = Teach safe delivery and bounded Model Hub behavior without claiming live OS, Bridge, GPU, or LLM execution.
WHO = LeeWay Machine Consciousness training boundary.
WHERE = training/reference/bridge-harmony-simulation.mjs.
WHEN = 2026-11-11.
HOW = Fail-closed prechecks and explicit admission gates with a simulation-only state.
LICENSE = Repository terms unchanged; candidate reference only.
*/

export const BRIDGE_HARMONY_REFERENCE_STATE = 'SIMULATION_ONLY_NOT_LIVE_OS_DEVICE_BRIDGE_GPU_OR_MODEL_HUB_EXECUTION';
export const PAUSED_RESIDENT_POLICY = 'PAUSED_RESIDENT_NOT_PHYSICALLY_PROVEN';

function isSha256(value) {
  return typeof value === 'string' && /^[a-f0-9]{64}$/i.test(value);
}

export function inspectPackageForHostHarmony(pkg, hostPolicy) {
  const issues = [];
  if (!pkg?.cryptographicallySigned || pkg.keystoreFingerprint !== hostPolicy?.expectedKeystoreFingerprint) {
    issues.push('UNSIGNED_OR_MISMATCHED_KEYSTORE_WARNING_RISK');
  }
  if (!pkg?.sbomAttached || !isSha256(pkg?.receiptAuthoritySha256)) {
    issues.push('MISSING_PROVENANCE_ATTESTATION');
  }
  for (const permission of pkg?.requestedPermissions ?? []) {
    if (!(hostPolicy?.allowedLeastPrivilegePermissions ?? []).includes(permission)) {
      issues.push(`EXCESS_PERMISSION_BLOCKED_BY_LEEWAY(${permission})`);
    }
  }
  if (pkg?.usesUnsanctionedPrivateApis === true) issues.push('PRIVATE_OS_API_VIOLATION');
  return {
    safeToDeliverToDevice: issues.length === 0,
    osWarningRisk: issues.length === 0 ? 'HOST_POLICY_PRECHECK_PASS_CANDIDATE' : 'HIGH_WARNING_RISK_BLOCKED_PRE_DELIVERY',
    issues,
    executionState: BRIDGE_HARMONY_REFERENCE_STATE
  };
}

export function negotiateCapabilityVector(deviceBrainHandshake) {
  const modalities = deviceBrainHandshake?.modalities ?? [];
  const isSpatial = modalities.includes('SPATIAL_3D_HOLOGRAPHIC') || modalities.includes('AR_OPTICAL_SEE_THROUGH');
  const isFoldable = modalities.includes('FOLDABLE_CONTINUOUS_HINGE');
  const projectionMode = isSpatial
    ? 'VOLUMETRIC_3D_SPATIAL_STAGE'
    : isFoldable
      ? 'ADAPTIVE_SPLIT_POSTURE_STAGE'
      : 'STANDARD_2D';
  return {
    osFamily: deviceBrainHandshake?.osFamily ?? 'UNDECLARED',
    computeBackend: deviceBrainHandshake?.computeBackend ?? 'UNDECLARED',
    uiProjectionMode: projectionMode,
    spatialDepthEnabled: isSpatial,
    arHandGazeBinding: isSpatial && modalities.includes('EYE_GAZE_HAND_MESH'),
    policyCompliant: deviceBrainHandshake?.privateApiUse !== true,
    executionState: BRIDGE_HARMONY_REFERENCE_STATE
  };
}

export function createSkillAtomCandidate({ skillId, teacherAgentId, deterministicKernelDescriptor }) {
  return {
    leewaySkillAtomId: `SKILL_ATOM_${String(skillId).toUpperCase()}_V1`,
    skillId,
    authoredByHelper: teacherAgentId,
    status: 'CANDIDATE_NOT_ADMITTED',
    targetComputeEngine: 'LEEWAY_EDGE_GPU_PLUS_DEVICE_BRIDGE',
    llmSubdormantPolicy: 'RETURN_TO_PAUSED_RESIDENT_AFTER_BOUNDED_USE',
    deterministicKernelDescriptor,
    requiredAdmissionGates: ['FORMULA_PASS', 'DEVICE_BRIDGE_PASS', 'GPU_EXECUTION_PASS', 'VERITAS_PASS', 'CONTINUUM_RECEIPT_PASS'],
    executionState: BRIDGE_HARMONY_REFERENCE_STATE
  };
}

export class SubdormantSkillRouter {
  constructor() {
    this.modelHubState = PAUSED_RESIDENT_POLICY;
    this.candidates = new Map();
    this.admitted = new Map();
  }

  registerCandidate({ manifest, deterministicKernel }) {
    this.candidates.set(manifest.skillId, { manifest, deterministicKernel });
    return manifest;
  }

  admitCandidate({ skillId, formulaPass, deviceBridgePass, gpuExecutionPass, veritasPass, continuumReceiptPass }) {
    const gates = [formulaPass, deviceBridgePass, gpuExecutionPass, veritasPass, continuumReceiptPass];
    if (!gates.every(Boolean)) throw new Error('SKILL_ATOM_ADMISSION_INCOMPLETE');
    const candidate = this.candidates.get(skillId);
    if (!candidate) throw new Error('SKILL_ATOM_CANDIDATE_NOT_FOUND');
    this.admitted.set(skillId, candidate);
    return { skillId, status: 'ADMITTED_CANDIDATE_FOR_INDEPENDENT_READBACK', executionState: BRIDGE_HARMONY_REFERENCE_STATE };
  }

  executeTask({ skillId, params }) {
    const atom = this.admitted.get(skillId);
    if (!atom) {
      return {
        executionRoute: this.candidates.has(skillId) ? 'BOUNDED_TEACHER_CONSULT_CANDIDATE' : 'NO_ADMITTED_SKILL_ATOM',
        modelHubState: this.modelHubState,
        llmUsed: false,
        skillAtomStatus: this.candidates.has(skillId) ? 'CANDIDATE_NOT_ADMITTED' : 'NOT_FOUND',
        output: null,
        executionState: BRIDGE_HARMONY_REFERENCE_STATE
      };
    }
    return {
      executionRoute: 'LEEWAY_EDGE_GPU_KERNEL_CANDIDATE',
      modelHubState: this.modelHubState,
      llmUsed: false,
      skillAtomStatus: 'ADMITTED_CANDIDATE_FOR_INDEPENDENT_READBACK',
      output: atom.deterministicKernel(params),
      executionState: BRIDGE_HARMONY_REFERENCE_STATE
    };
  }
}
