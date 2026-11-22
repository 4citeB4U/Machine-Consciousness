/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.MATRIX_OBJECTIVE
TAG: LEEWAY.MACHINE_CONSCIOUSNESS.MATRIX_OBJECTIVE.COMPOSITION.V1
5WH:
WHAT = Assemble one Machine Consciousness objective from read-only domain/skill/worker references and reconcile Runtime work orders after interruption.
WHY = Keep one deterministic cognitive substrate without duplicating employees, workplane custody, independent verification or durable state.
WHO = Creator and canonical Machine Consciousness source owner; GPT-6 outside support contributor, NOT Agent Lee.
WHERE = training/reference/matrix-objective-composition.mjs.
WHEN = 2026-11-22.
HOW = Pure source-only mapping, owner-binding check, deterministic reuse and fail-closed restart planning against original Runtime work-order observations.
LICENSE = Existing repository terms remain unchanged; source candidate only.
*/
import { requireConsciousnessBinding } from './model-support-convergence.mjs';

export const MATRIX_OBJECTIVE_BOUNDARY = Object.freeze({
  authority:'LEEWAY_MACHINE_CONSCIOUSNESS',
  canonicalOwner:'4citeB4U/Machine-Consciousness',
  currentCarrierOwner:'4citeB4U/Leeway-Runtime-Fabric',
  currentCarrierSource:'machine-consciousness/carrier-server.mjs',
  existingWorkOrderSource:'machine-consciousness/capability-work-order-router.mjs',
  employmentOwner:'ORIGINAL_LEEWAY_EMPLOYMENT_CENTER_AND_ROSTER',
  skillOwner:'ORIGINAL_LEEWAY_AGENT_SKILLS_ORCHESTRATOR',
  workplaneOwner:'ORIGINAL_LEEWAY_RUNTIME_FABRIC',
  formulaOwner:'ORIGINAL_LEEWAY_FORMULA',
  veritasOwner:'INDEPENDENT_LEEWAY_VERITAS',
  receiptOwner:'CANONICAL_RECEIPT_AUTHORITY',
  continuityOwner:'LEEWAY_CONTINUUM',
  agentLeeRole:'USER_FACING_IDENTITY_AND_INTERFACE',
  blackboardRole:'COLLABORATION_PROJECTION_NOT_WORK_STATUS_AUTHORITY',
  modelHubRole:'OPTIONAL_EVIDENCE_AND_DESIGN_ADVISOR',
  modelsRequiredForNativeAction:false,
  sourceStatus:'SOURCE_CANDIDATE_NOT_WIRED_TO_CARRIER',
  noWorkplaneCreated:true,
  noMemoryStoreCreated:true
});

const validId = v => typeof v === 'string' && /^[A-Za-z0-9][A-Za-z0-9_.:-]{1,95}$/.test(v);
const validSummary = v => typeof v === 'string' && v.trim().length >= 4 && v.length <= 1000;
const bounded = (items,n) => Array.isArray(items) && items.length <= n;
const clearClaims = x => x && typeof x === 'object' &&
  !['authority','grant','grants','permissions','verified','execute','executed','receipt','veritas','operator'].some(k=>Object.hasOwn(x,k));
const unique = xs => xs.length === new Set(xs).size;
const immutable = v => Object.freeze(v);
const sortById = (a,b) => a.capabilityId.localeCompare(b.capabilityId,'en');
export const MATRIX_COGNITIVE_OPERATIONS = immutable([
  'PERCEIVE_REQUEST','RECOVER_CONTEXT','FORM_GOAL','COMPOSE_CAPABILITIES',
  'REQUEST_AUTHORIZED_ACTION','OBSERVE_OUTCOME','PRESERVE_CONTINUITY','PROPOSE_VERIFIED_IMPROVEMENT'
]);

/**
 * Compile an *advisory* task capability weave from references that must be
 * supplied by the actual owner. A SOURCE_PRESENT or reported QUALIFIED worker
 * is never a grant. Original Employment/Skill/Formula/Runtime must requalify.
 */
export function composeMatrixObjective({
  consciousnessBinding, objectiveId, intendedOutcome,
  industryContexts = [], capabilityNeeds = [], workerRoster = [], skillCandidates = []
} = {}) {
  const owner = requireConsciousnessBinding(consciousnessBinding);
  if (!validId(objectiveId) || !validSummary(intendedOutcome) ||
      !bounded(industryContexts,30) || !bounded(capabilityNeeds,40) ||
      !bounded(workerRoster,100) || !bounded(skillCandidates,100) ||
      industryContexts.some(c=>!validId(c.domainId)||!validId(c.sourceRef)||!clearClaims(c)) ||
      capabilityNeeds.some(n=>!validId(n.capabilityId)||!validSummary(n.purpose)||!clearClaims(n)) ||
      workerRoster.some(w=>!validId(w.workerId)||!validId(w.capabilityId)||!validId(w.sourceRef)||
        !['QUALIFIED_REPORTED','OBSERVED','BLOCKED'].includes(w.state)||!clearClaims(w)) ||
      skillCandidates.some(s=>!validId(s.skillId)||!validId(s.capabilityId)||!validId(s.sourceRef)||!clearClaims(s)) ||
      !unique(capabilityNeeds.map(n=>n.capabilityId)) ||
      !unique(workerRoster.map(w=>w.workerId)) ||
      !unique(skillCandidates.map(s=>s.skillId+':'+s.capabilityId))) {
    throw Error('MATRIX_OBJECTIVE_SOURCE_INPUT_INVALID');
  }
  const capabilities = capabilityNeeds.map(n=>{
    const workers = workerRoster.filter(w=>w.capabilityId===n.capabilityId && w.state==='QUALIFIED_REPORTED');
    const skills = skillCandidates.filter(s=>s.capabilityId===n.capabilityId);
    const candidateWorkerIds = workers.map(w=>w.workerId).sort();
    return immutable({
      capabilityId:n.capabilityId,
      purpose:n.purpose,
      candidateWorkerIds:immutable(candidateWorkerIds),
      candidateSkillIds:immutable(skills.map(s=>s.skillId).sort()),
      selection:workers.length?'REUSE_REPORTED_EXISTING_WORKER_AFTER_OWNER_ADMISSION':
        skills.length?'REQUEST_EXISTING_SKILL_FACTORY_AND_WORKER_COVERAGE_CHECK':
          'CAPABILITY_GAP_FOR_ORIGINAL_RESILIENCE_TRIAGE',
      registrationVerified:false,
      workerPermissions:'NOT_GRANTED',
      modelMayDispatch:false,
      dispatch:'NOT_EXECUTED',
      independentVeritas:'NOT_EXECUTED'
    });
  }).sort(sortById);
  return immutable({
    status:'MATRIX_OBJECTIVE_COMPOSITION_CANDIDATE',
    objectiveId,
    ownerBindingId:owner.bindingId,
    authority:MATRIX_OBJECTIVE_BOUNDARY.authority,
    intendedOutcome,
    cognitiveOperations:MATRIX_COGNITIVE_OPERATIONS,
    crossDomainContexts:immutable(industryContexts.map(c=>immutable({domainId:c.domainId,sourceRef:c.sourceRef}))),
    capabilities:immutable(capabilities),
    nativeOnlyEligible:true,
    runtimeWorkplane:'NOT_DISPATCHED',
    formula:'NOT_EVALUATED',
    receipt:'NOT_CREATED',
    continuity:'NOT_PERSISTED',
    learning:'NOT_ADMITTED',
    noNewConsciousnessCreated:true,
    noWorkerCreated:true
  });
}

const runtimeStates = new Set(['PLANNED','BLOCKED','FAILED','HOLD_APPROVAL','EXECUTED_VERIFIED']);
const candidateRecovery = immutable({
  PLANNED:'ASK_ORIGINAL_RUNTIME_FOR_LIVE_ORDER_STATUS',
  BLOCKED:'DIAGNOSE_ORIGINAL_RUNTIME_BLOCKER',
  FAILED:'RECONCILE_SIDE_EFFECTS_BEFORE_POSSIBLE_REPAIR',
  HOLD_APPROVAL:'AWAIT_EXISTING_CREATOR_APPROVAL_GATE',
  EXECUTED_VERIFIED:'CHECK_INDEPENDENT_VERITAS_RECEIPT_AND_CONTINUUM_CUSTODY'
});
function normalizedRuntimeOrder(order,objectiveId){
  if (!clearClaims(order) || !validId(order.workOrderId) ||
      order.objectiveId !== objectiveId || !validId(order.capability) ||
      !runtimeStates.has(order.state) || !validId(order.sourceRef)) throw Error('MATRIX_RUNTIME_ORDER_OBSERVATION_INVALID');
  return {workOrderId:order.workOrderId,capability:order.capability,state:order.state,sourceRef:order.sourceRef};
}
/**
 * When Tablet/Blackboard/Voice disconnect, DO NOT reconstruct old work
 * from model text, issue a new dispatch, or treat a timer as completion.
 *
 * The original Continuum adapter must perform actual readback, the original
 * Runtime must reconcile live work orders and original Veritas/Receipt custody
 * must independently admit any completed state. This only builds its request.
 */
export function planMatrixObjectiveRecovery({
  consciousnessBinding, objectiveId, continuumCheckpoint = null,
  runtimeOrders = [], blackboardSignals = []
} = {}) {
  const owner=requireConsciousnessBinding(consciousnessBinding);
  if (!validId(objectiveId) || !bounded(runtimeOrders,100) ||
      !bounded(blackboardSignals,100) ||
      blackboardSignals.some(s=>!validId(s.workOrderId)||!validId(s.signalRef)||
        !['MESSAGE','ACK','TIMER','PROGRESS'].includes(s.kind)||!clearClaims(s))) {
    throw Error('MATRIX_RECOVERY_INPUT_INVALID');
  }
  const normalized=runtimeOrders.map(x=>normalizedRuntimeOrder(x,objectiveId));
  const byId=new Map();
  for(const order of normalized){
    const old=byId.get(order.workOrderId);
    if(old && JSON.stringify(old)!==JSON.stringify(order))throw Error('MATRIX_CONFLICTING_WORK_ORDER_CLAIMS');
    byId.set(order.workOrderId,order);
  }
  const observedOrders=[...byId.values()].sort((a,b)=>a.workOrderId.localeCompare(b.workOrderId,'en'));
  if (continuumCheckpoint === null || continuumCheckpoint?.state !== 'READBACK_CONFIRMED' ||
      continuumCheckpoint?.objectiveId !== objectiveId ||
      !validId(continuumCheckpoint?.checkpointId) ||
      !validId(continuumCheckpoint?.readbackRef)) {
    return immutable({
      status:'BLOCKED_ORIGINAL_CONTINUUM_READBACK_REQUIRED',
      objectiveId,
      ownerBindingId:owner.bindingId,
      knownRuntimeOrderIds:immutable(observedOrders.map(o=>o.workOrderId)),
      blackboardSignalsIgnoredForExecution:true,
      existingOrderReplay:'BLOCKED',
      newWorkOrdersCreated:0,
      safeToRetry:false,
      runtime:'NOT_DISPATCHED',
      completed:false,
      independentVerification:'NOT_PERFORMED'
    });
  }
  return immutable({
    status:'RECONCILIATION_PLAN_ONLY_REQUIRES_ORIGINAL_RUNTIME',
    objectiveId,
    ownerBindingId:owner.bindingId,
    checkpointId:continuumCheckpoint.checkpointId,
    checkpointReference:continuumCheckpoint.readbackRef,
    checkpointState:'SOURCE_CLAIM_NOT_INDEPENDENTLY_VERIFIED',
    existingWorkOrders:immutable(observedOrders.map(o=>immutable({
      ...o,
      nextOwnerAction:candidateRecovery[o.state],
      safeToRetry:false,
      statusClaimIsProof:false
    }))),
    workOrderLookupIds:immutable(observedOrders.map(o=>o.workOrderId)),
    blackboardSignalsIgnoredForExecution:true,
    originalWorkplaneMustReconcile:true,
    newWorkOrdersCreated:0,
    safeToRetry:false,
    runtime:'NOT_DISPATCHED',
    independentVerification:'NOT_PERFORMED',
    receipt:'NOT_CREATED',
    continuumWrite:'NOT_PERFORMED',
    completed:false,
    learning:'NOT_ADMITTED'
  });
}
