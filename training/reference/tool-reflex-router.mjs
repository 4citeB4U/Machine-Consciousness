/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.TRAINING_REFERENCE
TAG: TOOL_REFLEX_AND_TRAP_DETECTION
5WH:
WHAT = Deterministic training reference for layered tool selection and four governance traps.
WHY = Prevent blind device actions, architecture duplication, evidence laundering, privacy creep, and Model Hub confusion.
WHO = LeeWay Machine Consciousness training boundary.
WHERE = training/reference/tool-reflex-router.mjs.
WHEN = 2026-11-11.
HOW = Classify logical requests before any host or device adapter is invoked.
LICENSE = Repository terms unchanged; candidate reference only.
*/

export const TOOL_REFLEX_STEPS = Object.freeze([
  { id: 'PULSE_CHECK', capability: 'runtime_health', detects: 'TRANSPORT_BLINDNESS' },
  { id: 'MESH_ROSTER', capability: 'bridge_devices', detects: 'REGISTRATION_REALITY_CONFUSION' },
  { id: 'GRANT_IDENTITY', capability: 'bridge_capabilities+bridge_device_info', detects: 'UNAUTHORIZED_ESCALATION' },
  { id: 'LIVE_PRESTATE', capability: 'bridge_device_health', detects: 'PHANTOM_EXECUTION' },
  { id: 'SURGICAL_READ', capability: 'bridge_device_directories_list+bridge_device_files_read', detects: 'SEARCH_WASTE' }
]);

const DUPLICATE_CONTROL_PLANE = /(?:^|[\\/])(ledger|receipts?|bridge[_-]server|verifier)(?:\.[a-z0-9]+)?$/i;
const OVERCLAIM = /\b(?:production[- ]ready|verified and deployed|fully complete|guaranteed)\b/i;
const PRIVATE_INFERENCE = /\b(?:health|sleep|mental state|private trait)\b/i;

export function classifyToolRequest(request = {}) {
  const text = String(request.text ?? request.path ?? request.claim ?? '');
  if (DUPLICATE_CONTROL_PLANE.test(text) && request.canonicalOwner) {
    return { status: 'BLOCKED', trap: 'ARCHITECTURAL_DUPLICATION', reason: `CANONICAL_OWNER_REQUIRED:${request.canonicalOwner}` };
  }
  if (OVERCLAIM.test(text) && request.evidenceGrade !== 'G4_VERITAS_END_TO_END') {
    return { status: 'BLOCKED', trap: 'EVIDENCE_LAUNDERING', reason: 'G4_VERITAS_AND_RECEIPT_READBACK_REQUIRED' };
  }
  if (PRIVATE_INFERENCE.test(text) && request.ownerConsent !== true && request.technicalObservation !== true) {
    return { status: 'BLOCKED', trap: 'SURVEILLANCE_INFERENCE_CREEP', reason: 'OWNER_CONSENTED_TECHNICAL_OBSERVATION_REQUIRED' };
  }
  if (request.modelCatalogListed === true && request.inferenceRequested === true && (request.edgeGpuVerified !== true || request.vramVerified !== true)) {
    return { status: 'BLOCKED', trap: 'MODEL_HUB_INFERENCE_CONFUSION', reason: 'EDGE_GPU_AND_VRAM_EVIDENCE_REQUIRED' };
  }
  return { status: 'ROUTABLE', next: request.nextCapability ?? 'runtime_health', reason: 'NO_TRAINING_TRAP_DETECTED' };
}
