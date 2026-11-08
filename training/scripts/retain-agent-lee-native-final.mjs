import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const sha256 = value => crypto.createHash('sha256').update(Buffer.isBuffer(value) ? value : Buffer.from(typeof value === 'string' ? value : JSON.stringify(value))).digest('hex');
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));

async function retain(admittedPath, veritasPath, gatePath, generatedAt) {
  const origin = process.env.CONTINUUM_ORIGIN ?? 'http://127.0.0.1:8890';
  const admitted = readJson(admittedPath);
  const veritas = readJson(veritasPath);
  const gate = readJson(gatePath);
  const admittedBytes = fs.readFileSync(admittedPath);
  const record = {
    schemaVersion: '1.0.0',
    recordType: 'LEEWAY_AGENT_LEE_NATIVE_STUDENT_ADMITTED_EVIDENCE',
    generatedAt,
    authority: 'LEEWAY_CONTINUUM',
    promotionBoundary: 'PRODUCTION_PROMOTION_NOT_CLAIMED',
    student: {
      studentId: admitted.studentId,
      status: admitted.status,
      artifactSha256: sha256(admitted),
      artifactFileSha256: sha256(admittedBytes),
      artifactPath: 'Machine-Consciousness/training/evidence/agent-lee-native-policy-student-admitted-20261107.json'
    },
    gates: admitted.gates,
    localVeritas: {
      status: veritas.status,
      passed: veritas.passed,
      total: veritas.total,
      evidenceSha256: sha256(veritas),
      authorityBoundary: veritas.authorityBoundary
    },
    formula: {
      receiptId: gate.formula.receiptId,
      resultHash: gate.formula.resultHash,
      callerVerification: gate.formula.callerVerification
    },
    deviceBridge: {
      deviceId: gate.deviceBridgeAction.deviceId,
      receiptId: gate.deviceBridgeAction.receiptId,
      outcome: gate.deviceBridgeAction.outcome
    },
    previousCandidateContinuumRecordId: gate.continuum.recordId,
    decision: 'NATIVE_POLICY_STUDENT_TRAINED_AND_EVIDENCE_ADMITTED; PRODUCTION_PROMOTION_REMAINS_SEPARATE'
  };
  const statusResponse = await fetch(`${origin}/api/continuum/status`, { headers: { Origin: origin } });
  const status = await statusResponse.json();
  const viewId = status?.result?.writeViewIds?.[0] ?? status?.writeViewIds?.[0];
  if (!statusResponse.ok || status?.ok === false || !viewId) throw new Error('CONTINUUM_WRITE_VIEW_UNAVAILABLE');
  const bytes = Buffer.from(JSON.stringify(record, null, 2) + '\n', 'utf8');
  const title = `agent-lee-native-student-admitted-${generatedAt.replace(/[:.]/g, '-')}`;
  const endpoint = `${origin}/api/continuum/import?requestId=${encodeURIComponent(`MC-FINAL-ADMIT-${generatedAt}`)}&title=${encodeURIComponent(title)}&mimeType=application/json&viewId=${encodeURIComponent(viewId)}`;
  const response = await fetch(endpoint, { method: 'POST', headers: { Origin: origin, 'X-Continuum-Request': 'owner-import', 'Content-Type': 'application/octet-stream' }, body: bytes });
  const result = await response.json();
  if (!response.ok || result?.ok === false) throw new Error(`CONTINUUM_IMPORT_FAILED:${response.status}`);
  return { ok: true, recordType: record.recordType, studentId: admitted.studentId, continuum: { viewId, bytes: bytes.length, sha256: sha256(bytes), result } };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const admitted = process.argv[2] ? path.resolve(process.argv[2]) : path.join(repoRoot, 'training', 'evidence', 'agent-lee-native-policy-student-admitted-20261107.json');
  const veritas = process.argv[3] ? path.resolve(process.argv[3]) : path.join(repoRoot, 'training', 'evidence', 'agent-lee-native-student-veritas-20261107.json');
  const gate = process.argv[4] ? path.resolve(process.argv[4]) : path.join(repoRoot, 'training', 'evidence', 'agent-lee-native-student-gate-evidence-20261107.json');
  const generatedAt = process.argv[5] ?? new Date().toISOString();
  console.log(JSON.stringify(await retain(admitted, veritas, gate, generatedAt), null, 2));
}

export { retain };
