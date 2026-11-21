/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.SOVEREIGN_FABRIC.TEST
TAG: LEEWAY.SOVEREIGN.FABRIC.SOURCE_BOUNDARY_TEST.V2
5WH:
WHAT = Validate proposed self-contained, one-instance and independent-device architecture invariants.
WHY = Source drift must not erase durable work, claim a free GPU, bypass auth or make Model Hub a second consciousness.
WHO = LeeWay source contributors; tests are not production Veritas or device qualification.
WHERE = training/tests/sovereign-fabric-contract-v2.test.mjs.
WHEN = 2026-11-21.
HOW = Strict source contract read, positive schema checks and negative/drift controls.
LICENSE = Existing repository terms; no new license assertion.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const file=path.join(root,'contracts/leeway-self-contained-sovereign-fabric.v2.json');
const read=()=>JSON.parse(fs.readFileSync(file,'utf8'));
const doc=()=>fs.readFileSync(path.join(root,'docs/architecture/leeway-self-contained-sovereign-operating-fabric-v2.md'),'utf8');
const contract=read();

test('schema is source-review only; never self-qualifies autonomous production',()=>{
 assert.equal(contract.schema,'leeway.sovereign.operating-fabric.v2');
 assert.equal(contract.sourceQualification,'SOURCE_REVIEW_ONLY');
 for(const [key,value] of Object.entries(contract.evidenceBoundaries))
   assert.equal(typeof value,'boolean',key);
 assert.equal(contract.evidenceBoundaries.specificationIsProductionProof,false);
 assert.equal(contract.evidenceBoundaries.sourceCiIsPhysicalGpuProof,false);
 assert.equal(contract.evidenceBoundaries.veritasMustBeIndependent,true);
});
test('one logical owner instance may have multiple signed Device Bridge bodies',()=>{
 const c=contract.coreDesign;
 assert.equal(c.logicalIdentityScope,'OIDC_ISSUER_SUBJECT_TO_OPAQUE_INSTANCE');
 assert.equal(c.controlOwner,'LEEWAY_MACHINE_CONSCIOUSNESS');
 assert.equal(c.deviceBodies,'DISTINCT_SIGNED_DEVICES_SAME_LOGICAL_INSTANCE');
 assert.ok(c.maximumDesignDeviceCount>=1000);
 assert.equal(c.singleWriterFencingRequired,true);
});
test('client-device loss requires independently durable compute, not imagined physical computation',()=>{
 assert.equal(contract.deviceEnrollment.instanceSurvivesTotalDeviceLoss,true);
 assert.equal(contract.deviceEnrollment.lostDeviceIsNotMandatoryRecoveryFactor,true);
 assert.equal(contract.coreDesign.independentlyDurableComputeRequiredForZeroClientDevices,true);
 assert.equal(contract.coreDesign.physicalHardwareRequiredSomewhere,true);
 assert.match(contract.coreDesign.noExternalComputeOutcome,/BLOCKED/);
});
test('an extension is an enrollment doorway, not a device control or recovery key',()=>{
 const p=contract.deviceEnrollment;
 assert.equal(p.existingChromeExtensionCanInitiateEnrollment,true);
 assert.equal(p.chromeExtensionCannotGrantOSPrivileges,true);
 assert.equal(p.newDeviceNeedsFreshKeyAndGrant,true);
 assert.match(p.recovery,/INDEPENDENT_SURVIVABLE_AUTH/);
});
test('original Formula representation is exact; model compaction cannot invent byte equality',()=>{
 const c=contract.formula;
 assert.equal(c.everyGovernedOperationReceivesFormulaContext,true);
 assert.equal(c.exactDataTransform,'REVERSIBLE_OR_ORIGINAL');
 assert.deepEqual(c.reconstructionValidation,['EXACT_ORIGINAL_BYTE_LENGTH','EXACT_SHA256']);
 assert.match(c.modelWeightTransform,/LOSSY_TRANSFORM/);
 assert.ok(c.neverCompressAway.includes('VERITAS_EVIDENCE'));
});
test('PCIe packing never invents physical bandwidth',()=>{
 const c=contract.interconnect;
 assert.equal(c.cannotMultiplyPhysicalPcieLanes,true);
 assert.equal(c.originalItemsIndividuallyHashed,true);
 assert.match(c.optimizationTarget,/PHYSICAL_BYTE/);
 assert.ok(c.acceptance.includes('BYTE_EXACT_READBACK'));
});
test('GPU logical availability is not perpetual hardware activity or every control instruction',()=>{
 const c=contract.computation;
 assert.equal(c.physicalGpuAlwaysBusy,false);
 assert.equal(c.physicalGpuNeededForEveryAction,false);
 assert.equal(c.qualifiedPhysicalProviderRequiredForGpuClaims,true);
 assert.equal(c.noZeroLatencyGuarantee,true);
 assert.match(c.nonGpuTasks,/CPU/);
});
test('Model Hub must not make provider models independent device/tool operators',()=>{
 const h=contract.modelHub;
 assert.equal(h.directProviderModelToolExecution,false);
 assert.equal(h.desiredWarmCountMin,1);
 assert.equal(h.desiredWarmCountMax,2);
 assert.equal(h.warmResidencySubjectToRealMemory,true);
 assert.equal(h.inferenceResult,'PROPOSAL_NOT_ACTION');
 for(const k of ['OLLAMA','HUGGING_FACE','LLAMA_CPP','VLLM','TRANSFORMERS','LEEWAY_GPU_QUALIFIED'])
   assert.ok(h.providerAdapters.includes(k),k);
});
test('one original canonical content identity supports Digital Brain, Vault and Continuum projections',()=>{
 const x=contract.contentModel;
 assert.equal(x.canonicalOwner,'LEEWAY_CONTINUUM');
 assert.match(x.logicalContentId,/SHA256/);
 assert.equal(x.exactObjectReconstructionRequired,true);
 assert.match(x.contentVaultRole,/HOT_CACHE/);
 assert.match(x.honeycombRole,/EXPERIENCE_PROJECTION/);
 assert.equal(x.privacyDefault,'NO_SILENT_CROSS_DEVICE_DATA_UPLOAD');
});
test('no component owns powers belonging to a distinct trusted authority',()=>{
 const a=contract.authorities;
 for(const key of ['machineConsciousness','runtimeFabric','formula','gpu','modelHub','deviceBridge',
   'digitalBrain','contentVault','continuum','voiceFabric','visionFabric','edgeRTC','leewayLive',
   'federateWeb','extension','veritas','receiptAuthority','learningLedger','ldwmd']){
   assert.ok(a[key]?.owns,key);
   assert.ok(Array.isArray(a[key].cannotOwn)&&a[key].cannotOwn.length>0,key);
 }
 assert.ok(a.modelHub.cannotOwn.includes('DIRECT_DEVICE_EXECUTION'));
 assert.ok(a.runtimeFabric.cannotOwn.includes('VERITAS_SELF_APPROVAL'));
 assert.ok(a.continuum.cannotOwn.includes('PHYSICAL_VRAM'));
});
test('events link idempotent work, original Formula, physical evidence, original receipts and resume',()=>{
 const fields=contract.standardOperationEnvelope;
 assert.equal(new Set(fields).size,fields.length);
 for(const k of ['instanceId','operationId','idempotencyKey','formulaDecisionRef','computeBackendState',
   'veritasPreRef','veritasPostRef','canonicalReceiptRef','continuumReadbackState','resumePoint'])
   assert.ok(fields.includes(k),k);
});
test('autonomous workers have bounded lifecycle and no right to grant their own permission',()=>{
 assert.ok(contract.autonomousWork.workerModes.includes('STANDBY'));
 assert.ok(contract.autonomousWork.workerModes.includes('RUNNING'));
 assert.equal(contract.autonomousWork.originalTaskContinuesWithoutUserDevice,true);
 assert.equal(contract.autonomousWork.workforceMaySelfExpandAuthority,false);
});
test('all twelve acceptance demonstrations remain explicit, not automatically passed',()=>{
 assert.deepEqual(contract.acceptanceIds,Array.from({length:12},(_,i)=>'A'+(i+1)));
 const t=doc();
 for(const id of contract.acceptanceIds)
   assert.match(t,new RegExp('\\b'+id+'\\.'));
 assert.match(t,/not a second Runtime Fabric/i);
 assert.match(t,/no source-level architecture contract/i);
});
test('original cross-repo map remains separate, and existing source roles are referenced',()=>{
 assert.equal(contract.originalAuthorityMap,'docs/architecture/leeway-cross-repository-integration-v1.md');
 assert.ok(fs.existsSync(path.join(root,contract.originalAuthorityMap)));
 assert.ok(contract.referencedSourceRepos.includes('4citeB4U/LeeWay-Edge-GPU'));
 assert.ok(contract.referencedSourceRepos.includes('4citeB4U/Leeway-Device-Extension'));
});
