import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const sha256 = value => crypto.createHash('sha256').update(Buffer.isBuffer(value) ? value : Buffer.from(typeof value === 'string' ? value : JSON.stringify(value))).digest('hex');
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));

const defaults = {
  artifact: path.join(repoRoot, 'training', 'evidence', 'agent-lee-native-policy-student-admitted-20261108.json'),
  veritas: path.join(repoRoot, 'training', 'evidence', 'agent-lee-native-student-veritas-20261108.json'),
  profile: path.join(repoRoot, 'training', 'evidence', 'agent-lee-digital-brain-capability-profile-20261108.json'),
  formula: path.join(repoRoot, 'training', 'evidence', 'formula-advisory-20261108.json'),
  voice: path.join(repoRoot, 'training', 'evidence', 'voice-fabric-training-20261108.json'),
  generatedAt: new Date().toISOString()
};

function parseArgs(argv) {
  const options = { ...defaults };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--artifact') options.artifact = path.resolve(argv[++i]);
    else if (argv[i] === '--veritas') options.veritas = path.resolve(argv[++i]);
    else if (argv[i] === '--profile') options.profile = path.resolve(argv[++i]);
    else if (argv[i] === '--formula') options.formula = path.resolve(argv[++i]);
    else if (argv[i] === '--voice') options.voice = path.resolve(argv[++i]);
    else if (argv[i] === '--generated-at') options.generatedAt = argv[++i];
  }
  return options;
}

async function continuumImport(record, generatedAt) {
  const origin = process.env.CONTINUUM_ORIGIN ?? 'http://127.0.0.1:8890';
  const statusResponse = await fetch(`${origin}/api/continuum/status`, { headers: { Origin: origin } });
  const status = await statusResponse.json();
  if (!statusResponse.ok || status?.ok === false) throw new Error(`CONTINUUM_STATUS_FAILED:${statusResponse.status}`);
  const viewId = status?.result?.writeViewIds?.[0] ?? status?.writeViewIds?.[0];
  if (!viewId) throw new Error('CONTINUUM_WRITE_VIEW_UNAVAILABLE');
  const bytes = Buffer.from(JSON.stringify(record, null, 2) + '\n', 'utf8');
  const requestId = `MC-ADMIT-20261108-${sha256(bytes).slice(0, 20)}`;
  const title = `Agent Lee native student admission ${generatedAt.replace(/[:.]/g, '-')}`;
  const endpoint = `${origin}/api/continuum/import?${new URLSearchParams({ requestId, title, mimeType: 'application/json', viewId })}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Origin: origin, 'X-Continuum-Request': 'owner-import', 'Content-Type': 'application/octet-stream' },
    body: bytes
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.ok !== true) throw new Error(`CONTINUUM_IMPORT_FAILED:${response.status}:${JSON.stringify(result)}`);
  return { requestId, viewId, bytes: bytes.length, payloadSha256: sha256(bytes), result: result.result };
}

async function main(options) {
  const artifact = readJson(options.artifact);
  const veritas = readJson(options.veritas);
  const profile = readJson(options.profile);
  const formula = readJson(options.formula);
  const voice = readJson(options.voice);
  if (veritas.status !== 'PASS' || veritas.passed !== veritas.total) throw new Error('CONTINUUM_RETENTION_REQUIRES_LOCAL_VERITAS_PASS');
  const response = voice.response?.body ?? {};
  const interrupt = voice.interrupt?.body ?? {};
  const record = {
    schemaVersion: '1.0.0',
    recordType: 'LEEWAY_AGENT_LEE_NATIVE_STUDENT_ADMISSION_CANDIDATE',
    generatedAt: options.generatedAt,
    authority: 'LEEWAY_CONTINUUM',
    student: {
      studentId: artifact.studentId,
      artifactType: artifact.artifactType,
      coreType: artifact.coreType,
      trainingMethod: artifact.trainingMethod,
      artifactFileSha256: sha256(fs.readFileSync(options.artifact)),
      artifactCanonicalSha256: sha256(artifact)
    },
    knowledgeAdmission: {
      creator: profile.creator,
      repositoryCount: profile.repositoryInventory.length,
      capabilityIds: profile.capabilities.map(capability => capability.id),
      profileCanonicalSha256: sha256(profile),
      sourceState: profile.sourceState
    },
    formulaEvidence: {
      status: formula.status,
      formulaId: formula.formula.id,
      inputHash: formula.formula.inputHash,
      resultHash: formula.formula.resultHash,
      policy: formula.policy,
      verification: formula.verification
    },
    voiceEvidence: {
      inputMode: voice.inputMode,
      responseState: response.state,
      persona: response.response?.personaDelivery ?? null,
      voiceState: response.voice?.state ?? null,
      audioHash: response.voice?.audioHash ?? null,
      responseContinuumRecordId: response.continuum?.recordId ?? null,
      interruptState: interrupt.state,
      interruptEpoch: interrupt.interruptionEpoch ?? interrupt.telemetry?.interruptionEpoch ?? null,
      interruptContinuumRecordId: interrupt.continuum?.recordId ?? null,
      claimBoundary: voice.claimBoundary
    },
    localVeritas: {
      status: veritas.status,
      passed: veritas.passed,
      total: veritas.total,
      evidenceSha256: sha256(veritas),
      authorityBoundary: veritas.authorityBoundary
    },
    admissionDecision: 'CANDIDATE_RETAINED_PENDING_PRODUCTION_PROMOTION',
    productionPromotion: 'NOT_CLAIMED',
    physicalMicrophone: 'NOT_PROVEN',
    humanHeardAudio: 'NOT_PROVEN',
    evidenceBoundary: 'Continuum retention is durable evidence of this verified candidate and governed transcript route; it is not production promotion or physical microphone/hearing proof.'
  };
  const imported = await continuumImport(record, options.generatedAt);
  artifact.admission = { ...(artifact.admission ?? {}), continuumRecordId: imported.result.recordId, continuumReceiptId: imported.result.receiptId, continuumPayloadSha256: imported.payloadSha256, durableRetention: 'VERIFIED' };
  artifact.status = 'NATIVE_POLICY_TRAINED_CREATOR_ECOSYSTEM_DIGITAL_BRAIN_AND_VOICE_ROUTE_VERIFIED_CONTINUUM_RETAINED_PENDING_PRODUCTION_PROMOTION';
  fs.writeFileSync(options.artifact, `${JSON.stringify(artifact, null, 2)}\n`);
  return { ok: true, recordType: record.recordType, admissionDecision: record.admissionDecision, continuum: imported, artifactPath: options.artifact, artifactFileSha256: sha256(fs.readFileSync(options.artifact)), productionPromotion: record.productionPromotion };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  console.log(JSON.stringify(await main(parseArgs(process.argv.slice(2))), null, 2));
}

export { main };
