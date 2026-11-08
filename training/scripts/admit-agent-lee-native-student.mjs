import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const sha256 = value => crypto.createHash('sha256').update(Buffer.isBuffer(value) ? value : Buffer.from(typeof value === 'string' ? value : JSON.stringify(value))).digest('hex');
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));

function parseArgs(argv) {
  const options = {
    artifact: path.join(repoRoot, 'training', 'evidence', 'agent-lee-native-policy-student-20261107.json'),
    formula: path.join(repoRoot, 'training', 'evidence', 'agent-lee-native-student-gate-evidence-20261107.json'),
    generatedAt: new Date().toISOString()
  };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--artifact') options.artifact = path.resolve(argv[++i]);
    else if (argv[i] === '--formula') options.formula = path.resolve(argv[++i]);
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
  const title = `agent-lee-native-student-admission-${generatedAt.replace(/[:.]/g, '-')}`;
  const endpoint = `${origin}/api/continuum/import?requestId=${encodeURIComponent(`MC-ADMIT-${generatedAt}`)}&title=${encodeURIComponent(title)}&mimeType=application/json&viewId=${encodeURIComponent(viewId)}`;
  const importResponse = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Origin: origin,
      'X-Continuum-Request': 'owner-import',
      'Content-Type': 'application/octet-stream'
    },
    body: bytes
  });
  const result = await importResponse.json();
  if (!importResponse.ok || result?.ok === false) throw new Error(`CONTINUUM_IMPORT_FAILED:${importResponse.status}`);
  return { viewId, bytes: bytes.length, sha256: sha256(bytes), result };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const options = parseArgs(process.argv.slice(2));
  const artifact = readJson(options.artifact);
  const gateEvidence = readJson(options.formula);
  const admissionRecord = {
    schemaVersion: '1.0.0',
    recordType: 'LEEWAY_AGENT_LEE_NATIVE_STUDENT_ADMISSION_CANDIDATE',
    generatedAt: options.generatedAt,
    authority: 'LEEWAY_CONTINUUM',
    student: {
      studentId: artifact.studentId,
      artifactType: artifact.artifactType,
      coreType: artifact.coreType,
      trainingMethod: artifact.trainingMethod,
      artifactSha256: sha256(artifact),
      artifactFileSha256: sha256(fs.readFileSync(options.artifact))
    },
    evaluations: {
      baseline: artifact.evaluations.baseline,
      postTraining: artifact.evaluations.postTraining
    },
    formulaEvidence: gateEvidence.formula,
    formulaWindow: gateEvidence.formulaWindow,
    deviceBridgeEvidence: gateEvidence.deviceBridgeAction,
    deviceBridgeTrainingRun: gateEvidence.deviceBridgeTrainingRun,
    veritasPreconditions: gateEvidence.veritasPreconditions,
    admissionDecision: 'CANDIDATE_RETAINED_PENDING_INDEPENDENT_VERITAS_AND_FINAL_PROMOTION',
    evidenceBoundary: 'Continuum retention is durable evidence; it is not by itself final production promotion.'
  };
  const imported = await continuumImport(admissionRecord, options.generatedAt);
  console.log(JSON.stringify({
    ok: true,
    recordType: admissionRecord.recordType,
    studentId: artifact.studentId,
    admissionDecision: admissionRecord.admissionDecision,
    continuum: imported
  }, null, 2));
}
