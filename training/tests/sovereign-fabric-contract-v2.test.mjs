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
 assert.equal(c.cpuExecutionRequired,true);
 assert.equal(c.physicalGpuNeededForEveryAction,false);
 assert.equal(c.physicalClientGpuProviderAllowed,false);
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

test('GPU is the persistent operating world, not a physical GPU used for every action',()=>{
 const g=contract.gpuOperatingWorld;
 assert.equal(g.role,'PERSISTENT_FORMULA_DEVELOPED_SOFTWARE_GPU_OPERATING_WORLD');
 assert.equal(g.permanentLogicalInstance,true);
 assert.equal(g.isOnlyPhysicalAccelerator,false);
 assert.equal(g.physicalGpuSiliconRequiredForEveryOperation,false);
 assert.equal(g.allTasksWithinWorld,true);
 assert.equal(g.canonicalExistingComputeServiceId,'leeway.gpu.service');
 for(const k of ['noDuplicateRuntimeFabric','noDuplicateMachineConsciousness','noDuplicateFormula','noDuplicateContinuum','noDuplicateVeritas'])
   assert.equal(g[k],true,k);
});
test('no full ecosystem download; browser-only access never grants native device capabilities',()=>{
 const d=contract.deviceEnrollment,g=contract.gpuOperatingWorld;
 assert.equal(d.fullEcosystemDownloadRequired,false);
 assert.equal(g.clientRequiresWholeWorldInstalled,false);
 assert.equal(d.browserOnlyRemoteWorkspaceSupported,true);
 assert.equal(d.browserOnlyNativeDevicePrivileges,false);
 assert.equal(d.nativeAdapterOptionalForPhysicalAccess,true);
 assert.equal(d.nativeDeviceAccessNeedsFreshPassport,true);
 assert.equal(d.browserViewNeedsNativeDevicePassport,false);
 assert.equal(d.clientOSPreserved,true);
 assert.deepEqual(g.deviceDataAccessPlane,['DIGITAL_BRAIN','CONTINUUM','DIAGNOSTICS','CONTENT_VAULT']);
 assert.equal(g.nativeOperationsStillRequireHostOsPermission,true);
});
test('one named employee can have many views but only one live authoritative execution lease',()=>{
 const a=contract.autonomousWork,g=contract.gpuOperatingWorld.handoff;
 assert.equal(contract.coreDesign.oneAuthoritativeAgentLeePerOwnerScope,true);
 assert.equal(contract.coreDesign.oneActiveExecutionLocationPerNamedWorker,true);
 assert.equal(a.namedWorkerSingleActiveAuthorityLease,true);
 assert.equal(a.multipleReadOnlyViewsAllowed,true);
 assert.equal(g.concurrentActiveLocationsAllowed,false);
 assert.equal(g.agentId,'UNCHANGED');
 assert.match(g.source,/RELEASE_OR_FENCE/);
 assert.match(g.destination,/ACQUIRE_EXCLUSIVE_LEASE/);
 assert.equal(a.transferLatencyZeroGuaranteed,false);
});
test('student and enterprise share one ecosystem with separately authorized organization scopes',()=>{
 assert.equal(contract.coreDesign.enterpriseAndStudentSameCoreDifferentAuthorizedScopes,true);
 assert.equal(contract.autonomousWork.organizationScopedDataGrantsRequired,true);
 assert.equal(contract.coreDesign.humanPresentForEveryStep,false);
 assert.equal(contract.coreDesign.newPermissionWithoutOwnerAuthority,false);
});
test('Virtual Tablet previews output in the remote sandbox, exporting to a device is optional',()=>{
 const d=contract.deviceEnrollment;
 assert.equal(d.virtualTabletIsRemoteSandbox,true);
 assert.equal(d.productPreviewRequiresDeviceStorage,false);
 assert.equal(d.deviceExportRequiresExplicitApproval,true);
 assert.equal(contract.contentModel.canonicalOwner,'LEEWAY_CONTINUUM');
});
test('device loss keeps core remotely available only with independent physical infrastructure',()=>{
 const g=contract.gpuOperatingWorld,c=contract.coreDesign;
 assert.equal(g.hostedCoreIndependentOfUserDevicesRequired,true);
 assert.equal(c.physicalHardwareRequiredSomewhere,true);
 assert.match(c.noUserDeviceState,/CONTINUE_ON_INDEPENDENT_RUNTIME_OR_QUEUED_RECOVERY/);
 assert.equal(contract.evidenceBoundaries.noFullDownloadIsCurrentLiveFact,false);
 assert.equal(contract.evidenceBoundaries.singleLeaseCrossLocationIsCurrentLiveFact,false);
});
test('eight GPU operating world acceptance gates are specified and not production-certified',()=>{
 const t=doc(),g=contract.gpuOperatingWorld;
 assert.deepEqual(g.operatingWorldAcceptance,Array.from({length:8},(_,i)=>'G-O'+(i+1)));
 for(const gate of g.operatingWorldAcceptance)assert.ok(t.includes(gate+':'),gate);
 assert.match(t,/at most one current authoritative active execution location\/lease/i);
 assert.match(t,/no device must download the complete LeeWay GPU/i);
});

test('physical host GPU is not a Leeway provider, optional accelerator, or fallback',()=>{
 const g=contract.gpuOperatingWorld,c=contract.computation,t=doc();
 assert.equal(g.usesClientPhysicalGraphicsGpu,false);
 assert.equal(g.physicalGraphicsGpuAvailableAsFallback,false);
 assert.equal(g.physicalGraphicsGpuOptionalAcceleration,false);
 assert.equal(g.physicalGraphicsGpuPlacementAllowed,false);
 assert.equal(c.physicalGraphicsGpuUsedForLeewayComputation,false);
 assert.equal(c.physicalGraphicsGpuFallbackAllowed,false);
 assert.equal(c.physicalGraphicsGpuOptionalAccelerationAllowed,false);
 assert.equal(c.hostGraphicsGpuDiscoveryDoesNotEnrollProvider,true);
 assert.equal(c.backendSupport,'APPROVED_SOFTWARE_GPU_ON_HOST_CPU_RAM_ONLY');
 assert.match(t,/not LeeWay providers, fallbacks, optional accelerators or placement targets/);
});
test('Formula GPU mathematical workload uses CPU and RAM; client GPU is irrelevant',()=>{
 const c=contract.computation,g=contract.gpuOperatingWorld;
 assert.equal(c.cpuExecutionRequired,true);
 assert.equal(c.ramExecutionRequired,true);
 assert.equal(g.canonicalExecutionSubstrate,'LEEWAY_HOST_CPU_AND_RAM');
 assert.equal(g.softwareCpuExecutionEvidenceRequired,true);
 assert.equal(c.missingSoftwareModelCodecPolicy,'NOT_AVAILABLE_NO_PHYSICAL_GPU_FALLBACK');
 assert.equal(contract.evidenceBoundaries.cpuSoftwareGpuProductionEndToEndVerified,false);
});
test('21 GPU components reflect Creator specification, not a fabricated source inventory',()=>{
 const c=contract.computation,g=contract.gpuOperatingWorld;
 assert.equal(c.creatorSpecifiedLogicalGpuComponents,21);
 assert.equal(c.gpuComponentEnumerationState,'NOT_SOURCE_ENUMERATED');
 assert.equal(g.creatorSpecifiedLogicalGpuComponents,21);
 assert.equal(g.gpuComponentInventoryStatus,'CREATOR_SPECIFIED_SOURCE_INVENTORY_PENDING');
 assert.equal(contract.evidenceBoundaries.creators21GpuComponentsAreSourceVerified,false);
});
