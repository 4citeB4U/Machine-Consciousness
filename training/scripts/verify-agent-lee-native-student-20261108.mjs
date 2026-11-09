import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const sha256 = value => crypto.createHash('sha256').update(Buffer.isBuffer(value) ? value : Buffer.from(typeof value === 'string' ? value : JSON.stringify(value))).digest('hex');
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));

const defaults = {
  artifact: path.join(repoRoot, 'training', 'evidence', 'agent-lee-native-policy-student-20261108.json'),
  profile: path.join(repoRoot, 'training', 'evidence', 'agent-lee-digital-brain-capability-profile-20261108.json'),
  formula: path.join(repoRoot, 'training', 'evidence', 'formula-advisory-20261108.json'),
  voice: path.join(repoRoot, 'training', 'evidence', 'voice-fabric-training-20261108.json'),
  out: path.join(repoRoot, 'training', 'evidence', 'agent-lee-native-student-veritas-20261108.json'),
  admittedOut: path.join(repoRoot, 'training', 'evidence', 'agent-lee-native-policy-student-admitted-20261108.json'),
  generatedAt: new Date().toISOString()
};

function parseArgs(argv) {
  const options = { ...defaults };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--artifact') options.artifact = path.resolve(argv[++i]);
    else if (argv[i] === '--profile') options.profile = path.resolve(argv[++i]);
    else if (argv[i] === '--formula') options.formula = path.resolve(argv[++i]);
    else if (argv[i] === '--voice') options.voice = path.resolve(argv[++i]);
    else if (argv[i] === '--out') options.out = path.resolve(argv[++i]);
    else if (argv[i] === '--admitted-out') options.admittedOut = path.resolve(argv[++i]);
    else if (argv[i] === '--generated-at') options.generatedAt = argv[++i];
  }
  return options;
}

function main(options) {
  const artifact = readJson(options.artifact);
  const profile = readJson(options.profile);
  const formula = readJson(options.formula);
  const voice = readJson(options.voice);
  const response = voice.response?.body ?? {};
  const interrupt = voice.interrupt?.body ?? {};
  // The trainer pins the canonical JSON value, not the pretty-printed file's
  // trailing newline.  Verify that same canonical representation here.
  const profileFileHash = sha256(profile);
  const profileSourcePath = path.resolve(repoRoot, artifact.source.digitalBrainProfilePath);
  const actualPdf = 'E:/Leonard Lee _ AI Systems Architect & Full Stack Developer.pdf';
  const actualEcosystem = 'E:/The embodiment of the leeway ecosys.txt';
  const sourceEvidence = profile.creatorSourceEvidence ?? [];
  const pdfEvidence = sourceEvidence.find(item => item.path === actualPdf);
  const ecosystemEvidence = sourceEvidence.find(item => item.path === actualEcosystem);
  const audioContent = response.voice?.audioContent;
  const audioBytes = typeof audioContent === 'string' ? Buffer.from(audioContent, 'base64') : Buffer.alloc(0);

  const checks = {
    artifactType: artifact.artifactType === 'LEEWAY_AGENT_LEE_NATIVE_POLICY_STUDENT',
    baselineFail: artifact.evaluations?.baseline?.status === 'FAIL' && artifact.evaluations.baseline.passed === 0,
    postTrainingPass: artifact.evaluations?.postTraining?.status === 'PASS' && artifact.evaluations.postTraining.passed === artifact.evaluations.postTraining.total,
    deterministicCore: artifact.coreType === 'DETERMINISTIC_NON_LLM_MACHINE_CONSCIOUSNESS' && artifact.weights === 'NOT_USED_NATIVE_POLICY_ARTIFACT' && artifact.inference === 'NOT_REQUIRED_FOR_POLICY_EXECUTION',
    profileFileHashMatchesArtifact: profileFileHash === artifact.source.digitalBrainProfileSha256 && sha256(readJson(profileSourcePath)) === profileFileHash,
    digitalBrainProfile: profile.admission === 'CAPABILITY_KNOWLEDGE_ONLY_UNTIL_FORMULA_VERITAS_CONTINUUM_ADMISSION' && profile.capabilities?.length === 7 && profile.creator?.name === 'Leonard Lee',
    creatorSourceHashesPresent: pdfEvidence?.sha256 === 'D6CFB64DC814E13D761B0F5D3CC40FD0A02514F7975C470AE375D7A2C7F06E13' && ecosystemEvidence?.sha256 === '91BE40727DD95A8AA4D0BAFEB8B35B10D405199E9689D2447C630FCE1E69BE52',
    creatorProfileBound: artifact.policy?.digitalBrain?.creator?.name === 'Leonard Lee' && artifact.policy.digitalBrain.creator.disclosurePolicy.includes('Do not expose'),
    ecosystemMapBound: artifact.policy?.digitalBrain?.repositoryCount === 32 && artifact.policy.digitalBrain.capabilityIds.includes('LEEWAY_ECOSYSTEM_REPOSITORY_MAP'),
    formulaExecutedReadback: formula.status === 'EXECUTED_NOT_ADMITTED' && formula.formula?.health?.status === 'LEEWAY_FORMULA_V1_PASS' && formula.verification?.formulaPreGate === 'PASS' && formula.verification?.execution === 'EXECUTED',
    formulaNotPromoted: formula.policy?.actionAuthorized === false && formula.policy?.providerDispatch === false && formula.verification?.interpretation === 'NOT_PROMOTED' && formula.verification?.veritas === 'NOT_RUN' && formula.verification?.learningLedger === 'NOT_UPDATED',
    voiceInputBoundaryExplicit: voice.inputMode === 'TRANSCRIPT_FINAL_INJECTED_THROUGH_DEVICE_BRIDGE_NOT_PHYSICAL_MICROPHONE' && voice.deviceBridgeRequired === true && voice.claimBoundary.includes('does not prove physical microphone capture'),
    voiceResponseVerified: voice.response?.httpStatus === 200 && response.state === 'VERIFIED' && response.response?.personaDelivery?.state === 'VERIFIED' && response.response?.personaDelivery?.identity === 'Agent Lee',
    voiceAudioHashReadback: response.voice?.audioHash?.length === 64 && typeof audioContent === 'string' && audioBytes.length > 0 && sha256(audioBytes) === response.voice.audioHash,
    voiceContinuumReadback: typeof response.continuum?.recordId === 'string' && response.continuum.recordId.length > 0,
    interruptVerified: voice.interrupt?.httpStatus === 200 && interrupt.state === 'VERIFIED' && Number(interrupt.interruptionEpoch ?? interrupt.telemetry?.interruptionEpoch) >= 1,
    interruptContinuumReadback: typeof interrupt.continuum?.recordId === 'string' && interrupt.continuum.recordId.length > 0
  };

  const passed = Object.values(checks).filter(Boolean).length;
  const total = Object.keys(checks).length;
  const status = passed === total ? 'PASS' : 'FAIL';
  const veritas = {
    schemaVersion: '1.0.0',
    artifactType: 'LEEWAY_AGENT_LEE_NATIVE_STUDENT_LOCAL_VERITAS_EVIDENCE',
    generatedAt: options.generatedAt,
    authorityBoundary: 'LOCAL_INDEPENDENT_READBACK_ADAPTER_NOT_PRODUCTION_VERITAS_AUTHORITY',
    scope: 'CREATOR_PROFILE_ECOSYSTEM_MAP_DIGITAL_BRAIN_AND_GOVERNED_VOICE_ROUTE',
    checks,
    passed,
    total,
    status,
    sourceHashes: {
      artifactFileSha256: sha256(fs.readFileSync(options.artifact)),
      profileFileSha256: profileFileHash,
      formulaFileSha256: sha256(fs.readFileSync(options.formula)),
      voiceFileSha256: sha256(fs.readFileSync(options.voice)),
      pdfSha256: pdfEvidence?.sha256 ?? null,
      ecosystemInventorySha256: ecosystemEvidence?.sha256 ?? null
    },
    evidenceBoundary: 'This readback verifies local artifacts and the Device Bridge-mediated transcript-to-consciousness-to-voice route. It does not promote the student to production, prove physical microphone capture, or prove a human heard the audio.'
  };
  fs.mkdirSync(path.dirname(options.out), { recursive: true });
  fs.writeFileSync(options.out, `${JSON.stringify(veritas, null, 2)}\n`);
  if (status !== 'PASS') throw new Error(`LOCAL_VERITAS_FAILED:${passed}/${total}`);

  const admitted = {
    ...artifact,
    generatedAt: options.generatedAt,
    gates: {
      creatorAndEcosystemKnowledge: 'READBACK_VERIFIED_LOCAL_PROFILE_AND_32_REPOSITORY_MAP',
      digitalBrainAndDiagnostics: 'READBACK_VERIFIED_PROFILE_BOUNDARY',
      formulaMappingAndExecution: 'EXECUTED_READBACK_NOT_PROMOTED',
      voiceFabricTranscriptRoute: 'VERIFIED_DEVICE_BRIDGE_TRANSCRIPT_ROUTE',
      voiceInterruptRoute: 'VERIFIED_DEVICE_BRIDGE_INTERRUPT_EPOCH',
      localVeritas: 'PASS_LOCAL_INDEPENDENT_READBACK_ADAPTER'
    },
    admission: {
      veritasEvidencePath: path.relative(repoRoot, options.out).replaceAll('\\', '/'),
      veritasEvidenceSha256: sha256(veritas),
      formulaResultHash: formula.formula.resultHash,
      voiceResponseContinuumRecordId: response.continuum.recordId,
      voiceInterruptContinuumRecordId: interrupt.continuum.recordId,
      productionPromotion: 'NOT_CLAIMED',
      physicalMicrophone: 'NOT_PROVEN',
      humanHeardAudio: 'NOT_PROVEN'
    },
    status: 'NATIVE_POLICY_TRAINED_CREATOR_ECOSYSTEM_DIGITAL_BRAIN_AND_VOICE_ROUTE_VERIFIED_PENDING_PRODUCTION_PROMOTION'
  };
  fs.writeFileSync(options.admittedOut, `${JSON.stringify(admitted, null, 2)}\n`);
  return { ok: true, status, passed, total, veritasPath: options.out, admittedPath: options.admittedOut, veritasEvidenceSha256: sha256(veritas), productionPromotion: admitted.admission.productionPromotion };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) console.log(JSON.stringify(main(parseArgs(process.argv.slice(2))), null, 2));

export { main };
