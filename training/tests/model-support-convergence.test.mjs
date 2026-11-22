/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.SUPPORT_TEAM.TESTS
TAG: LEEWAY.MACHINE_CONSCIOUSNESS.SUPPORT_TEAM.CONVERGENCE_TEST.V1
5WH:
WHAT = Test source-only native Machine Consciousness intake, inter-model critique and fail-closed worker handoff.
WHY = Prove model suggestions cannot become workers, authorization, execution, Veritas or receipts.
WHO = Creator and existing Machine Consciousness source owner; GPT-6 outside support contributor.
WHERE = training/tests/model-support-convergence.test.mjs.
WHEN = 2026-11-22.
HOW = Node deterministic, no model APIs, side effects, host access or secret fixtures.
LICENSE = Existing repository terms unchanged; no new license asserted.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SUPPORT_TEAM_BOUNDARY,
  inspectSupportCycle,
  requireConsciousnessBinding,
  convergeModelSupport,
  planConsciousnessWorkerHandoff
} from '../reference/model-support-convergence.mjs';

const binding = {
  contractId:'LEEWAY_UNIVERSAL_EMPLOYEE_MACHINE_CONSCIOUSNESS_V1',
  coreType:'DETERMINISTIC_NON_LLM_MACHINE_CONSCIOUSNESS',
  authority:'LEEWAY_MACHINE_CONSCIOUSNESS',
  bindingId:'OWNER-BOUND-123'
};
const modelRoster=['qwen3-0.6b-q4km','qwen3-1.7b-q4km','qwen3.5-0.8b'];
const observations=[
  {gapId:'office-source-diagram',capabilityId:'office.infographic.generate',
    description:'Convert one approved source into an editable cited infographic',
    classification:'OBSERVED',evidenceRefs:['office-local-observation-1']},
  {gapId:'logistics-cctv',capabilityId:'logistics.route.camera',
    description:'Find verified licensed route camera coverage',
    classification:'UNVERIFIED',evidenceRefs:[]}
];
const modelReports=[
  {modelId:modelRoster[0],gapId:'office-source-diagram',kind:'PROPOSE_SKILL',
    summary:'Compose source provenance extraction with native Office renderer',
    evidenceRefs:['office-local-observation-1']},
  {modelId:modelRoster[1],gapId:'office-source-diagram',kind:'CRITIQUE',
    summary:'Verify chart values against source before publishing',
    evidenceRefs:['office-local-observation-1']},
  {modelId:modelRoster[2],gapId:'logistics-cctv',kind:'MONITOR',
    summary:'Camera stream availability not independently observed',
    evidenceRefs:[]}
];
const req={consciousnessBinding:binding,objectiveId:'creator-factory',modelRoster,observations,modelReports};

test('all three models remain advisory signals subordinate to one deterministic consciousness',()=>{
  assert.equal(SUPPORT_TEAM_BOUNDARY.authority,'LEEWAY_MACHINE_CONSCIOUSNESS');
  assert.equal(SUPPORT_TEAM_BOUNDARY.providerRole,'OPTIONAL_MODEL_HUB_EVIDENCE_AND_TEACHING_ADVISOR');
  assert.equal(SUPPORT_TEAM_BOUNDARY.modelOutputCanVerify,false);
  assert.equal(SUPPORT_TEAM_BOUNDARY.modelOutputCanCreateWorkers,false);
  assert.equal(SUPPORT_TEAM_BOUNDARY.modelOutputCanAuthorizeActuation,false);
  assert.equal(SUPPORT_TEAM_BOUNDARY.scheduler,'EXISTING_RUNTIME_WORKPLANE_NOT_STARTED');
});

test('original consciousness binding is required and never minted by the model',()=>{
  assert.equal(requireConsciousnessBinding(binding).bindingId,'OWNER-BOUND-123');
  for(const bad of [{},{...binding,authority:'MODEL_HUB'},{...binding,contractId:'MODEL_AGENT'},{...binding,bindingId:'../unsafe'},null]){
    assert.throws(()=>requireConsciousnessBinding(bad),/MACHINE_CONSCIOUSNESS_OWNER_BINDING_REQUIRED/);
  }
});

test('three-hour inspection calculation does not register a scheduler',()=>{
  const due=inspectSupportCycle({
    nowIso:'2026-11-22T12:00:00Z',lastInspectionIso:'2026-11-22T09:00:00Z',enabled:true
  });
  assert.equal(due.status,'DUE_FOR_ORIGINAL_RUNTIME_WORKPLANE');
  assert.equal(due.schedulerStarted,false);
  assert.equal(due.dispatch,'NOT_EXECUTED');
  const notDue=inspectSupportCycle({
    nowIso:'2026-11-22T11:59:59Z',lastInspectionIso:'2026-11-22T09:00:00Z',enabled:true
  });
  assert.equal(notDue.status,'NOT_DUE');
});

test('disabled inspection and invalid time cannot be silently activated',()=>{
  assert.equal(inspectSupportCycle({nowIso:'2026-11-22T12:00:00Z'}).status,'DISABLED_BY_ORIGINAL_RUNTIME');
  assert.equal(inspectSupportCycle({nowIso:'invalid',enabled:true}).status,'BLOCKED');
  assert.equal(inspectSupportCycle({nowIso:'2026-11-22T12:00:00Z',
    lastInspectionIso:'2026-11-22T13:00:00Z',enabled:true}).status,'BLOCKED');
});

test('models may combine advice and critique but cannot certify work or issue receipts',()=>{
  const r=convergeModelSupport(req);
  assert.equal(r.status,'MACHINE_CONSCIOUSNESS_REVIEW_CANDIDATE');
  assert.equal(r.authority,'LEEWAY_MACHINE_CONSCIOUSNESS');
  assert.equal(r.modelMayDispatch,false);
  assert.equal(r.modelMayCreateWorker,false);
  assert.equal(r.modelAgreementIsNotVerification,true);
  assert.equal(r.receipt,'NOT_CREATED');
  assert.deepEqual(r.candidates[0].advisoryModels,modelRoster.slice(0,2));
  assert.equal(r.candidates[0].candidateState,'CANDIDATE_FOR_SKILL_FACTORY_TRIAGE');
  assert.equal(r.candidates[0].evidenceGrade,'NOT_INDEPENDENTLY_VERIFIED');
  assert.equal(r.candidates[1].candidateState,'BLOCKED_NEEDS_OWNER_EVIDENCE');
  for(const x of r.candidates[0].reports){
    assert.equal(x.provenance,'UNTRUSTED_MODEL_CANDIDATE_NOT_INDEPENDENT_VERITAS');
  }
});

test('existing worker is reused first instead of generating another worker authority',()=>{
  const r=convergeModelSupport({...req,existingWorkers:[{workerId:'existing-office-worker',capabilityId:'office.infographic.generate'}]});
  assert.equal(r.candidates[0].candidateState,'REUSE_EXISTING_WORKER_FIRST');
  const plan=planConsciousnessWorkerHandoff({
    review:r,gapId:'office-source-diagram',
    acceptanceCriteria:'Real source yields correct editable infographic and measured poststate',
    sourceVersion:'source-sha-123'
  });
  assert.equal(plan.triageOwner,'EXISTING_WORKER_VIA_LEEWAY_PARALLEL_WORKPLANE');
  assert.deepEqual(plan.selectedExistingWorkerIds,['existing-office-worker']);
  assert.equal(plan.workerCreated,false);
  assert.equal(plan.workerDispatched,false);
  assert.equal(plan.skillAndWorkerPermissions,'NOT_GRANTED');
});

test('missing worker results in Skill Factory triage, never automatic employee creation',()=>{
  const r=convergeModelSupport(req);
  const plan=planConsciousnessWorkerHandoff({
    review:r,gapId:'office-source-diagram',
    acceptanceCriteria:'Controlled low-risk replay with independent Veritas PRE and POST',
    sourceVersion:'source-sha-123'
  });
  assert.equal(plan.status,'WORKER_HANDOFF_PROPOSED_NOT_DISPATCHED');
  assert.equal(plan.workId,'creator-factory:office-source-diagram');
  assert.equal(plan.parentObjectiveId,'creator-factory');
  assert.equal(plan.triageOwner,'LEEWAY_SKILL_FACTORY');
  assert.equal(plan.statusForWorkplane,'PROPOSED');
  assert.equal(plan.authorityScope,'NO_GRANTED_EXECUTION_SCOPE');
  assert.equal(plan.mutationScope,'NONE');
  assert.deepEqual(plan.focalExecutionSet,[]);
  assert.equal(plan.veritas,'NOT_VERIFIED');
  assert.equal(plan.receipt,'NOT_CREATED');
});

test('cannot dispatch a gap when its observation has no source evidence',()=>{
  const r=convergeModelSupport(req);
  const p=planConsciousnessWorkerHandoff({review:r,gapId:'logistics-cctv',
    acceptanceCriteria:'Verified feed coverage',sourceVersion:'source-sha-123'});
  assert.equal(p.status,'BLOCKED');
  assert.equal(p.workerCreated,false);
});

test('models cannot insert authority grants, self-Veritas or receipts in support reports',()=>{
  for(const injected of [{authority:'LEEWAY_MACHINE_CONSCIOUSNESS'},{verified:true},
    {receiptId:'made-up'},{execute:true},{grants:['device.execute']}]) {
    const bad={...req,modelReports:[{...modelReports[0],...injected}]};
    assert.throws(()=>convergeModelSupport(bad),/MODEL_SUPPORT_UNTRUSTED_REPORT_OR_AUTHORITY_CLAIM/);
  }
});

test('unknown models, wrong gaps and invalid evidence references fail closed',()=>{
  assert.throws(()=>convergeModelSupport({...req,modelReports:[{...modelReports[0],modelId:'unregistered-model'}]}),
    /MODEL_SUPPORT_UNTRUSTED_REPORT_OR_AUTHORITY_CLAIM/);
  assert.throws(()=>convergeModelSupport({...req,modelReports:[{...modelReports[0],gapId:'invented-gap'}]}),
    /MODEL_SUPPORT_UNTRUSTED_REPORT_OR_AUTHORITY_CLAIM/);
  assert.throws(()=>convergeModelSupport({...req,observations:[{...observations[0],evidenceRefs:['../bad']}]}),
    /MACHINE_CONSCIOUSNESS_OBSERVATION_INPUT_INVALID/);
});

test('duplicate identity, oversize inputs or invalid worker registry are rejected',()=>{
  assert.throws(()=>convergeModelSupport({...req,modelRoster:[...modelRoster,modelRoster[0]]}),
    /MACHINE_CONSCIOUSNESS_OBSERVATION_INPUT_INVALID/);
  assert.throws(()=>convergeModelSupport({...req,modelReports:new Array(61).fill(modelReports[0])}),
    /MACHINE_CONSCIOUSNESS_OBSERVATION_INPUT_INVALID/);
  assert.throws(()=>convergeModelSupport({...req,existingWorkers:[{workerId:'bad/worker',capabilityId:'abc'}]}),
    /MACHINE_CONSCIOUSNESS_OBSERVATION_INPUT_INVALID/);
});

test('an LLM-free observation is still useful to Machine Consciousness',()=>{
  const r=convergeModelSupport({...req,modelReports:[]});
  assert.equal(r.candidates[0].candidateState,'OBSERVATION_ONLY');
  assert.deepEqual(r.candidates[0].advisoryModels,[]);
  assert.equal(planConsciousnessWorkerHandoff({review:r,gapId:'office-source-diagram',
    acceptanceCriteria:'Check source',sourceVersion:'sha-1'}).status,'BLOCKED');
});

test('worker handoff rejects a model-created or forged authority envelope',()=>{
  const r=convergeModelSupport(req);
  const forged={...r,authority:'MODEL_HUB'};
  assert.equal(planConsciousnessWorkerHandoff({review:forged,gapId:'office-source-diagram',
    acceptanceCriteria:'Do it',sourceVersion:'sha-1'}).status,'BLOCKED');
  assert.equal(planConsciousnessWorkerHandoff({review:r,gapId:'office-source-diagram',
    acceptanceCriteria:'Do it',sourceVersion:'../bad'}).status,'BLOCKED');
});

test('candidate results do not satisfy independent Veritas or deliver production execution',()=>{
  const r=convergeModelSupport(req);
  const plan=planConsciousnessWorkerHandoff({review:r,gapId:'office-source-diagram',
    acceptanceCriteria:'Actual authorized action',sourceVersion:'pinned-main-sha'});
  assert.equal(plan.runtime,'NOT_DISPATCHED');
  assert.equal(plan.formula,'NOT_EXECUTED');
  assert.equal(plan.workerDispatched,false);
  assert.ok(plan.dependencies.includes('AUTHORIZED_DEVICE_BRIDGE'));
  assert.equal(plan.evidenceDestination,'EXISTING_RECEIPT_AUTHORITY_AFTER_REAL_EXECUTION');
});
