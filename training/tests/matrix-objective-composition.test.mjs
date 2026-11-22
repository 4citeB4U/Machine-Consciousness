/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.MATRIX_OBJECTIVE.TESTS
TAG: LEEWAY.MACHINE_CONSCIOUSNESS.MATRIX_OBJECTIVE.TESTS.V1
5WH:
WHAT = Prove one shared Machine Consciousness can plan cross-domain worker reuse and safe recovery without authorizing worker execution.
WHY = Avoid new consciousnesses, false Blackboard completion, duplicate replays, and missing Continuum readback.
WHO = Creator and canonical Machine Consciousness source owner; GPT-6 outside support, NOT Agent Lee.
WHERE = training/tests/matrix-objective-composition.test.mjs.
WHEN = 2026-11-22.
HOW = Node deterministic positive and negative source-only cases, no network, CLI, actual devices or independent verifier.
LICENSE = Existing repository terms remain unchanged.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {
 MATRIX_OBJECTIVE_BOUNDARY, MATRIX_COGNITIVE_OPERATIONS, composeMatrixObjective,planMatrixObjectiveRecovery
} from '../reference/matrix-objective-composition.mjs';

const binding={
  contractId:'LEEWAY_UNIVERSAL_EMPLOYEE_MACHINE_CONSCIOUSNESS_V1',
  coreType:'DETERMINISTIC_NON_LLM_MACHINE_CONSCIOUSNESS',
  authority:'LEEWAY_MACHINE_CONSCIOUSNESS',
  bindingId:'matrix-owner-123'
};
const request={
  consciousnessBinding:binding,
  objectiveId:'creator-project-001',
  intendedOutcome:'Coordinate an accessible mobility service with real verified outcomes',
  industryContexts:[
    {domainId:'transportation',sourceRef:'industry-context-transportation-1'},
    {domainId:'accessibility',sourceRef:'industry-context-accessibility-1'}
  ],
  capabilityNeeds:[
    {capabilityId:'logistics.route.inspect',purpose:'Inspect authorized mobility routes'},
    {capabilityId:'office.plan.prepare',purpose:'Prepare a structured business plan'},
    {capabilityId:'crm.customer.followup',purpose:'Prepare opt-in customer followup'}
  ],
  workerRoster:[
    {workerId:'worker-logistics-qualified',capabilityId:'logistics.route.inspect',
      state:'QUALIFIED_REPORTED',sourceRef:'source-roster-entry-one'},
    {workerId:'worker-office-blocked',capabilityId:'office.plan.prepare',
      state:'BLOCKED',sourceRef:'source-roster-entry-two'}
  ],
  skillCandidates:[
    {skillId:'leeway-office-plan',capabilityId:'office.plan.prepare',sourceRef:'source-skill-office-one'}
  ]
};
const checkpoint={
  state:'READBACK_CONFIRMED',
  objectiveId:request.objectiveId,
  checkpointId:'continuum-record-123',
  readbackRef:'continuum-observation-987'
};
const order=(workOrderId,state,more={})=>({
  workOrderId,objectiveId:request.objectiveId,capability:'leeway.host.info',
  state,sourceRef:'runtime-order-source-actual',...more
});
const recovery=(extra={})=>({
  consciousnessBinding:binding,objectiveId:request.objectiveId,
  continuumCheckpoint:checkpoint,runtimeOrders:[],...extra
});
test('Matrix is single deterministic Machine Consciousness owner, not another brain',()=>{
  assert.equal(MATRIX_OBJECTIVE_BOUNDARY.authority,'LEEWAY_MACHINE_CONSCIOUSNESS');
  assert.equal(MATRIX_OBJECTIVE_BOUNDARY.workplaneOwner,'ORIGINAL_LEEWAY_RUNTIME_FABRIC');
  assert.equal(MATRIX_OBJECTIVE_BOUNDARY.agentLeeRole,'USER_FACING_IDENTITY_AND_INTERFACE');
  assert.equal(MATRIX_OBJECTIVE_BOUNDARY.blackboardRole,'COLLABORATION_PROJECTION_NOT_WORK_STATUS_AUTHORITY');
  assert.equal(MATRIX_OBJECTIVE_BOUNDARY.modelsRequiredForNativeAction,false);
  assert.equal(MATRIX_OBJECTIVE_BOUNDARY.noWorkplaneCreated,true);
  assert.equal(MATRIX_OBJECTIVE_BOUNDARY.noMemoryStoreCreated,true);
  assert.equal(MATRIX_COGNITIVE_OPERATIONS.length,8);
});
test('one objective dynamically spans multiple domains without seven isolated bots',()=>{
  const v=composeMatrixObjective(request);
  assert.equal(v.status,'MATRIX_OBJECTIVE_COMPOSITION_CANDIDATE');
  assert.equal(v.objectiveId,request.objectiveId);
  assert.equal(v.crossDomainContexts.length,2);
  assert.equal(v.capabilities.length,3);
  assert.equal(v.noNewConsciousnessCreated,true);
  assert.equal(v.noWorkerCreated,true);
  assert.equal(v.runtimeWorkplane,'NOT_DISPATCHED');
  assert.equal(v.formula,'NOT_EVALUATED');
  assert.equal(v.continuity,'NOT_PERSISTED');
});
test('reuse reported existing qualified worker only after owner admission',()=>{
  const v=composeMatrixObjective(request);
  const cap=v.capabilities.find(x=>x.capabilityId==='logistics.route.inspect');
  assert.equal(cap.selection,'REUSE_REPORTED_EXISTING_WORKER_AFTER_OWNER_ADMISSION');
  assert.deepEqual(cap.candidateWorkerIds,['worker-logistics-qualified']);
  assert.equal(cap.registrationVerified,false);
  assert.equal(cap.workerPermissions,'NOT_GRANTED');
  assert.equal(cap.dispatch,'NOT_EXECUTED');
});
test('candidate skill cannot override blocked office worker or create independent employee',()=>{
  const v=composeMatrixObjective(request);
  const office=v.capabilities.find(x=>x.capabilityId==='office.plan.prepare');
  assert.equal(office.selection,'REQUEST_EXISTING_SKILL_FACTORY_AND_WORKER_COVERAGE_CHECK');
  assert.deepEqual(office.candidateWorkerIds,[]);
  assert.deepEqual(office.candidateSkillIds,['leeway-office-plan']);
  assert.equal(office.modelMayDispatch,false);
  assert.equal(v.noWorkerCreated,true);
});
test('missing capability requests original Capability Resilience, not model swarm',()=>{
  const v=composeMatrixObjective(request);
  assert.equal(v.capabilities.find(x=>x.capabilityId==='crm.customer.followup').selection,
    'CAPABILITY_GAP_FOR_ORIGINAL_RESILIENCE_TRIAGE');
});
test('native no-LLM route retains objective composition',()=>{
  const v=composeMatrixObjective({...request,skillCandidates:[],workerRoster:[]});
  assert.equal(v.nativeOnlyEligible,true);
  assert.equal(v.capabilities.length,3);
  assert.equal(v.runtimeWorkplane,'NOT_DISPATCHED');
  assert.ok(v.capabilities.every(x=>x.selection==='CAPABILITY_GAP_FOR_ORIGINAL_RESILIENCE_TRIAGE'));
});
test('wrong owner binding and forged employee authority are rejected',()=>{
  assert.throws(()=>composeMatrixObjective({...request,consciousnessBinding:{
    ...binding,authority:'MODEL_HUB'
  }}),/MACHINE_CONSCIOUSNESS_OWNER_BINDING_REQUIRED/);
  assert.throws(()=>composeMatrixObjective({...request,workerRoster:[{
    ...request.workerRoster[0],permissions:['device.execute']
  }]}),/MATRIX_OBJECTIVE_SOURCE_INPUT_INVALID/);
  assert.throws(()=>composeMatrixObjective({...request,skillCandidates:[{
    ...request.skillCandidates[0],verified:true
  }]}),/MATRIX_OBJECTIVE_SOURCE_INPUT_INVALID/);
});
test('duplicate capabilities and worker identities fail closed',()=>{
  assert.throws(()=>composeMatrixObjective({...request,capabilityNeeds:[
    request.capabilityNeeds[0],request.capabilityNeeds[0]
  ]}),/MATRIX_OBJECTIVE_SOURCE_INPUT_INVALID/);
  assert.throws(()=>composeMatrixObjective({...request,workerRoster:[
    request.workerRoster[0],request.workerRoster[0]
  ]}),/MATRIX_OBJECTIVE_SOURCE_INPUT_INVALID/);
});
test('missing Continuum readback blocks replay even when Runtime claims execution',()=>{
  const r=planMatrixObjectiveRecovery(recovery({
    continuumCheckpoint:null,runtimeOrders:[order('WO-123','EXECUTED_VERIFIED')]
  }));
  assert.equal(r.status,'BLOCKED_ORIGINAL_CONTINUUM_READBACK_REQUIRED');
  assert.deepEqual(r.knownRuntimeOrderIds,['WO-123']);
  assert.equal(r.newWorkOrdersCreated,0);
  assert.equal(r.safeToRetry,false);
  assert.equal(r.completed,false);
  assert.equal(r.independentVerification,'NOT_PERFORMED');
});
test('even provided checkpoint fields remain source observations, never independently qualified',()=>{
  const r=planMatrixObjectiveRecovery(recovery());
  assert.equal(r.status,'RECONCILIATION_PLAN_ONLY_REQUIRES_ORIGINAL_RUNTIME');
  assert.equal(r.checkpointState,'SOURCE_CLAIM_NOT_INDEPENDENTLY_VERIFIED');
  assert.equal(r.continuumWrite,'NOT_PERFORMED');
  assert.equal(r.receipt,'NOT_CREATED');
  assert.equal(r.learning,'NOT_ADMITTED');
});
test('Blackboard timer, ACK, and progress cannot close task or trigger retry',()=>{
  const r=planMatrixObjectiveRecovery(recovery({
    runtimeOrders:[order('WO-123','PLANNED')],
    blackboardSignals:[
      {workOrderId:'WO-123',kind:'ACK',signalRef:'blackboard-signal-1'},
      {workOrderId:'WO-123',kind:'TIMER',signalRef:'blackboard-timer-2'},
      {workOrderId:'WO-123',kind:'PROGRESS',signalRef:'blackboard-signal-3'}
    ]
  }));
  assert.equal(r.blackboardSignalsIgnoredForExecution,true);
  assert.equal(r.completed,false);
  assert.equal(r.safeToRetry,false);
  assert.equal(r.existingWorkOrders[0].nextOwnerAction,'ASK_ORIGINAL_RUNTIME_FOR_LIVE_ORDER_STATUS');
});
test('Runtime EXECUTED_VERIFIED still needs independent receipt and durable source readback',()=>{
  const r=planMatrixObjectiveRecovery(recovery({runtimeOrders:[order('WO-123','EXECUTED_VERIFIED')]}));
  assert.equal(r.existingWorkOrders[0].nextOwnerAction,
    'CHECK_INDEPENDENT_VERITAS_RECEIPT_AND_CONTINUUM_CUSTODY');
  assert.equal(r.existingWorkOrders[0].statusClaimIsProof,false);
  assert.equal(r.independentVerification,'NOT_PERFORMED');
  assert.equal(r.completed,false);
});
test('failed work order cannot be blindly retried after unknown side effects',()=>{
  const r=planMatrixObjectiveRecovery(recovery({runtimeOrders:[order('WO-123','FAILED')]}));
  assert.equal(r.existingWorkOrders[0].nextOwnerAction,'RECONCILE_SIDE_EFFECTS_BEFORE_POSSIBLE_REPAIR');
  assert.equal(r.safeToRetry,false);
  assert.equal(r.runtime,'NOT_DISPATCHED');
});
test('held approval and blocked runtime order remain distinct on resume',()=>{
  const r=planMatrixObjectiveRecovery(recovery({runtimeOrders:[
    order('WO-222','HOLD_APPROVAL'),order('WO-333','BLOCKED')
  ]}));
  assert.equal(r.existingWorkOrders[0].nextOwnerAction,'AWAIT_EXISTING_CREATOR_APPROVAL_GATE');
  assert.equal(r.existingWorkOrders[1].nextOwnerAction,'DIAGNOSE_ORIGINAL_RUNTIME_BLOCKER');
  assert.equal(r.newWorkOrdersCreated,0);
});
test('identical replay snapshots are idempotent and deduplicated without re-dispatch',()=>{
  const first=planMatrixObjectiveRecovery(recovery({runtimeOrders:[order('WO-321','PLANNED'),order('WO-321','PLANNED')]}));
  const second=planMatrixObjectiveRecovery(recovery({runtimeOrders:[order('WO-321','PLANNED')]}));
  assert.deepEqual(first,second);
  assert.deepEqual(first.workOrderLookupIds,['WO-321']);
  assert.equal(first.newWorkOrdersCreated,0);
});
test('conflicting observed order claims are a blocker, not merged or silently overwritten',()=>{
  assert.throws(()=>planMatrixObjectiveRecovery(recovery({runtimeOrders:[
    order('WO-321','PLANNED'),order('WO-321','EXECUTED_VERIFIED')
  ]})),/MATRIX_CONFLICTING_WORK_ORDER_CLAIMS/);
});
test('mismatched objective or unknown Runtime state is rejected',()=>{
  assert.throws(()=>planMatrixObjectiveRecovery(recovery({runtimeOrders:[
    order('WO-1','PLANNED',{objectiveId:'other-parent'})
  ]})),/MATRIX_RUNTIME_ORDER_OBSERVATION_INVALID/);
  assert.throws(()=>planMatrixObjectiveRecovery(recovery({runtimeOrders:[order('WO-2','COMPLETE')]})),
    /MATRIX_RUNTIME_ORDER_OBSERVATION_INVALID/);
});
test('original Runtime work-order source and universal employee contract are named, not replaced',()=>{
  const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
  const contract=JSON.parse(readFileSync(path.join(root,'training/contracts/leeway-universal-employee-consciousness.v1.json'),'utf8'));
  assert.equal(contract.relationship.substrate,'ONE_SHARED_MACHINE_CONSCIOUSNESS_SUBSTRATE');
  assert.equal(contract.core.type,'DETERMINISTIC_NON_LLM_MACHINE_CONSCIOUSNESS');
  assert.equal(MATRIX_OBJECTIVE_BOUNDARY.existingWorkOrderSource,'machine-consciousness/capability-work-order-router.mjs');
  assert.equal(MATRIX_OBJECTIVE_BOUNDARY.sourceStatus,'SOURCE_CANDIDATE_NOT_WIRED_TO_CARRIER');
});
