/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.SUPPORT_TEAM
TAG: LEEWAY.MACHINE_CONSCIOUSNESS.SUPPORT_TEAM.CONVERGENCE.V1
5WH:
WHAT = Let the one deterministic Machine Consciousness integrate bounded model critiques and plan native worker improvements.
WHY = Keep models as evidence/teaching assistants rather than independent agents, dispatchers or Veritas.
WHO = Creator and existing Machine Consciousness source owner; GPT-6 outside support contributor, not Agent Lee.
WHERE = training/reference/model-support-convergence.mjs in original Machine-Consciousness repository.
WHEN = 2026-11-22.
HOW = Pure bounded observations, critique convergence, worker proposal and fail-closed handoff planning using original authority identities.
LICENSE = Existing repository terms remain unchanged; no new license asserted.
*/

export const SUPPORT_TEAM_BOUNDARY = Object.freeze({
  authority: 'LEEWAY_MACHINE_CONSCIOUSNESS',
  substrate: 'DETERMINISTIC_NON_LLM_MACHINE_CONSCIOUSNESS',
  bindingContract: 'LEEWAY_UNIVERSAL_EMPLOYEE_MACHINE_CONSCIOUSNESS_V1',
  languageIdentity: 'AGENT_LEE',
  providerRole: 'OPTIONAL_MODEL_HUB_EVIDENCE_AND_TEACHING_ADVISOR',
  modelPermissions: 'NONE',
  skillOwner: '4citeB4U/LeeWay-Agent-Skills',
  skillOrchestrator: 'skills/leeway-skill-orchestrator/SKILL.md',
  skillFactory: 'skills/leeway-skill-factory/SKILL.md',
  workerOwner: 'skills/leeway-parallel-workplane/SKILL.md',
  toolGateway: 'skills/leeway-tool-gateway/SKILL.md',
  runtimeOwner: 'LEEWAY_RUNTIME_FABRIC',
  verifier: 'INDEPENDENT_LEEWAY_VERITAS',
  receipts: 'CANONICAL_RECEIPT_AUTHORITY',
  continuity: 'LEEWAY_CONTINUUM',
  modelOutputCanVerify: false,
  modelOutputCanCreateWorkers: false,
  modelOutputCanAuthorizeActuation: false,
  durableState: 'EXISTING_LEEWAY_CONTINUUM_ONLY',
  scheduler: 'EXISTING_RUNTIME_WORKPLANE_NOT_STARTED',
  status: 'SOURCE_REFERENCE_NOT_WIRED_TO_LIVE_RUNTIME'
});

const validId = s => typeof s === 'string' && /^[A-Za-z0-9][A-Za-z0-9_.:-]{1,95}$/.test(s);
const validText = s => typeof s === 'string' && s.trim().length > 0 && s.length <= 1100;
const boundedList = (xs, max) => Array.isArray(xs) && xs.length <= max;
const signals = new Set(['OBSERVE', 'CRITIQUE', 'PROPOSE_SKILL', 'PROPOSE_TOOL', 'DESIGN_WORKER', 'MONITOR']);
const observedClasses = new Set(['OBSERVED', 'UNVERIFIED', 'FAILED', 'BLOCKED']);
const reservedClaims = ['authority', 'authorizes', 'verified', 'veritas', 'receiptId', 'grant', 'grants', 'execute', 'executed', 'workerCreated', 'skillPromoted'];
const sortedUnique = xs => [...new Set(xs)].sort();

export function requireConsciousnessBinding(binding) {
  if (binding?.contractId !== SUPPORT_TEAM_BOUNDARY.bindingContract ||
      binding?.coreType !== SUPPORT_TEAM_BOUNDARY.substrate ||
      binding?.authority !== SUPPORT_TEAM_BOUNDARY.authority ||
      !validId(binding.bindingId)) {
    throw Error('MACHINE_CONSCIOUSNESS_OWNER_BINDING_REQUIRED');
  }
  return Object.freeze({bindingId: binding.bindingId, authority: binding.authority});
}

/**
 * A periodic inspection trigger calculation only. The original Runtime
 * workplane must schedule, authenticate and execute the real inspection.
 */
export function inspectSupportCycle({nowIso, lastInspectionIso = null, cadenceMinutes = 180, enabled = false} = {}) {
  const now = Date.parse(nowIso);
  const previous = lastInspectionIso === null ? null : Date.parse(lastInspectionIso);
  if (!Number.isFinite(now) || (previous !== null && !Number.isFinite(previous)) ||
      !Number.isInteger(cadenceMinutes) || cadenceMinutes < 15 || cadenceMinutes > 1440 ||
      (previous !== null && previous > now)) {
    return Object.freeze({status:'BLOCKED',reason:'INSPECTION_CLOCK_OR_CADENCE_INVALID',schedulerStarted:false});
  }
  if (enabled !== true) return Object.freeze({status:'DISABLED_BY_ORIGINAL_RUNTIME',schedulerStarted:false});
  const due = previous === null || now - previous >= cadenceMinutes * 60_000;
  return Object.freeze({
    status: due ? 'DUE_FOR_ORIGINAL_RUNTIME_WORKPLANE' : 'NOT_DUE',
    due, cadenceMinutes, schedulerStarted:false,
    dispatch:'NOT_EXECUTED',
    nextOwner:'LEEWAY_RUNTIME_FABRIC'
  });
}

/**
 * Aggregate independent *reports* from model assistants without treating
 * their agreement as independent evidence, employee authority or Veritas.
 * Every substantive observation is owned by an existing named capability.
 */
export function convergeModelSupport({
  consciousnessBinding,
  objectiveId,
  modelRoster = [],
  observations = [],
  modelReports = [],
  existingWorkers = []
} = {}) {
  const binding = requireConsciousnessBinding(consciousnessBinding);
  if (!validId(objectiveId) ||
      !boundedList(modelRoster, 12) || modelRoster.length === 0 ||
      !boundedList(observations, 32) || !boundedList(modelReports, 60) ||
      !boundedList(existingWorkers, 100) ||
      modelRoster.some(id => !validId(id)) ||
      new Set(modelRoster).size !== modelRoster.length ||
      existingWorkers.some(w => !validId(w.workerId) || !validId(w.capabilityId)) ||
      observations.some(o =>
        !validId(o.gapId) || !validId(o.capabilityId) || !validText(o.description) ||
        !observedClasses.has(o.classification) ||
        !boundedList(o.evidenceRefs, 8) || o.evidenceRefs.some(ref => !validId(ref))) ||
      new Set(observations.map(o => o.gapId)).size !== observations.length) {
    throw Error('MACHINE_CONSCIOUSNESS_OBSERVATION_INPUT_INVALID');
  }
  const knownModels = new Set(modelRoster);
  const gaps = new Map(observations.map(item => [item.gapId, item]));
  if (modelReports.some(r =>
    !validId(r.modelId) || !knownModels.has(r.modelId) ||
    !validId(r.gapId) || !gaps.has(r.gapId) ||
    !signals.has(r.kind) || !validText(r.summary) ||
    !boundedList(r.evidenceRefs, 8) || r.evidenceRefs.some(ref => !validId(ref)) ||
    reservedClaims.some(key => Object.prototype.hasOwnProperty.call(r, key)))) {
    throw Error('MODEL_SUPPORT_UNTRUSTED_REPORT_OR_AUTHORITY_CLAIM');
  }

  const candidates = observations.map(observation => {
    const matches = modelReports.filter(r => r.gapId === observation.gapId);
    const workers = existingWorkers.filter(w => w.capabilityId === observation.capabilityId);
    const supported = observation.evidenceRefs.length > 0 && observation.classification === 'OBSERVED';
    const intent = matches.some(r => ['PROPOSE_SKILL', 'DESIGN_WORKER', 'PROPOSE_TOOL'].includes(r.kind));
    const reports = matches.map(r => Object.freeze({
      modelId:r.modelId,kind:r.kind,summary:r.summary,evidenceRefs:Object.freeze([...r.evidenceRefs]),
      provenance:'UNTRUSTED_MODEL_CANDIDATE_NOT_INDEPENDENT_VERITAS'
    }));
    return Object.freeze({
      gapId:observation.gapId,
      capabilityId:observation.capabilityId,
      description:observation.description,
      observationState:observation.classification,
      evidenceRefs:Object.freeze([...observation.evidenceRefs]),
      advisoryModels:Object.freeze(sortedUnique(matches.map(r => r.modelId))),
      reports:Object.freeze(reports),
      evidenceGrade:'NOT_INDEPENDENTLY_VERIFIED',
      candidateState:!supported ? 'BLOCKED_NEEDS_OWNER_EVIDENCE' :
        workers.length > 0 ? 'REUSE_EXISTING_WORKER_FIRST' :
        intent ? 'CANDIDATE_FOR_SKILL_FACTORY_TRIAGE' : 'OBSERVATION_ONLY',
      existingWorkerIds:Object.freeze(sortedUnique(workers.map(w => w.workerId))),
      runtimeExecution:'NOT_EXECUTED',
      independentVerification:'NOT_EXECUTED'
    });
  });

  return Object.freeze({
    status:'MACHINE_CONSCIOUSNESS_REVIEW_CANDIDATE',
    objectiveId,
    ownerBindingId:binding.bindingId,
    authority:SUPPORT_TEAM_BOUNDARY.authority,
    modelRole:'ADVISORY_SIGNALS_NOT_AGENTS',
    candidates:Object.freeze(candidates),
    modelAgreementIsNotVerification:true,
    modelMayDispatch:false,
    modelMayCreateWorker:false,
    mutation:'NOT_EXECUTED',
    receipt:'NOT_CREATED'
  });
}

/**
 * Create a deterministic PROPOSED worker handoff in the format expected by
 * original Agent Skills Parallel Workplane. This is NOT a worker instance.
 */
export function planConsciousnessWorkerHandoff({review, gapId, acceptanceCriteria, sourceVersion} = {}) {
  if (review?.status !== 'MACHINE_CONSCIOUSNESS_REVIEW_CANDIDATE' ||
      review?.authority !== SUPPORT_TEAM_BOUNDARY.authority ||
      review?.modelMayDispatch !== false || !validId(review.objectiveId) ||
      !validId(gapId) || !validText(acceptanceCriteria) || !validId(sourceVersion)) {
    return Object.freeze({status:'BLOCKED',reason:'CONSCIOUSNESS_REVIEW_AND_SOURCE_REQUIRED',workerCreated:false});
  }
  const gap = review.candidates.find(c => c.gapId === gapId);
  if (!gap) return Object.freeze({status:'BLOCKED',reason:'GAP_NOT_OBSERVED',workerCreated:false});
  if (gap.candidateState === 'BLOCKED_NEEDS_OWNER_EVIDENCE' ||
      gap.candidateState === 'OBSERVATION_ONLY') {
    return Object.freeze({status:'BLOCKED',reason:'OWNER_EVIDENCE_OR_CAPABILITY_TRIAGE_REQUIRED',workerCreated:false});
  }
  const existing = gap.candidateState === 'REUSE_EXISTING_WORKER_FIRST';
  const workId = `${review.objectiveId}:${gapId}`;
  return Object.freeze({
    status:'WORKER_HANDOFF_PROPOSED_NOT_DISPATCHED',
    workId,
    parentObjectiveId:review.objectiveId,
    objective:gap.description,
    acceptanceCriteria,
    authorityScope:'NO_GRANTED_EXECUTION_SCOPE',
    capabilityWeave:Object.freeze([gap.capabilityId]),
    focalExecutionSet:Object.freeze([]),
    verificationSet:Object.freeze(['INDEPENDENT_LEEWAY_VERITAS']),
    recoverySet:Object.freeze(['LEEWAY_CAPABILITY_RESILIENCE']),
    dependencies:Object.freeze(['LEEWAY_FORMULA','LEEWAY_RUNTIME_FABRIC','AUTHORIZED_DEVICE_BRIDGE']),
    mutationScope:'NONE',
    checkpointPolicy:'EXISTING_CONTINUUM_ONLY_AFTER_REAL_AUTHORIZED_EXECUTION',
    interruptPolicy:'CREATOR_RETOOL_OR_CANCEL_VIA_EXISTING_PARENT',
    evidenceDestination:'EXISTING_RECEIPT_AUTHORITY_AFTER_REAL_EXECUTION',
    sourceVersion,
    statusForWorkplane:'PROPOSED',
    returnContract:'WORKER_REPORTS_TO_MACHINE_CONSCIOUSNESS_FOR_INDEPENDENT_VERIFICATION',
    selectedExistingWorkerIds:gap.existingWorkerIds,
    triageOwner:existing ? 'EXISTING_WORKER_VIA_LEEWAY_PARALLEL_WORKPLANE' : 'LEEWAY_SKILL_FACTORY',
    skillAndWorkerPermissions:'NOT_GRANTED',
    formula:'NOT_EXECUTED',
    runtime:'NOT_DISPATCHED',
    workerCreated:false,
    workerDispatched:false,
    veritas:'NOT_VERIFIED',
    receipt:'NOT_CREATED',
    mutation:'NOT_EXECUTED'
  });
}
