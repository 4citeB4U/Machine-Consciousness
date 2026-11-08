import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const defaultCheckpoint = path.resolve(repoRoot, '..', 'pc-consciousness-live', 'runtime', 'receipts', 'machine-consciousness', 'MACHINE-CONSCIOUSNESS-TRAINING-ARCHITECTURE-CHECKPOINT-20261104.json');
const sha256 = value => crypto.createHash('sha256').update(Buffer.isBuffer(value) ? value : Buffer.from(typeof value === 'string' ? value : JSON.stringify(value))).digest('hex');

async function retain(checkpointPath = defaultCheckpoint) {
  const origin = process.env.CONTINUUM_ORIGIN ?? 'http://127.0.0.1:8890';
  const bytes = fs.readFileSync(checkpointPath);
  const checkpoint = JSON.parse(bytes.toString('utf8').replace(/^\uFEFF/, ''));
  const statusResponse = await fetch(`${origin}/api/continuum/status`, { headers: { Origin: origin } });
  const status = await statusResponse.json();
  const viewId = status?.result?.writeViewIds?.[0] ?? status?.writeViewIds?.[0];
  if (!statusResponse.ok || status?.ok === false || !viewId) throw new Error('CONTINUUM_WRITE_VIEW_UNAVAILABLE');
  const record = {
    schemaVersion: '1.0.0',
    recordType: 'LEEWAY_MACHINE_CONSCIOUSNESS_TRAINING_CHECKPOINT',
    authority: 'LEEWAY_CONTINUUM',
    checkpointId: checkpoint.checkpointId,
    currentGate: checkpoint.currentGate,
    status: checkpoint.status,
    updatedAt: checkpoint.updatedAt,
    checkpointSha256: sha256(bytes),
    checkpointFilePath: 'pc-consciousness-live/runtime/receipts/machine-consciousness/MACHINE-CONSCIOUSNESS-TRAINING-ARCHITECTURE-CHECKPOINT-20261104.json',
    agentLeeNativeStudentEvidence: checkpoint.agentLeeNativeStudentEvidence,
    latestTrainingSlice20261108: checkpoint.latestTrainingSlice20261108,
    exactBlockers: checkpoint.exactBlockers,
    nextSmallestAction: checkpoint.nextSmallestAction
  };
  const payload = Buffer.from(JSON.stringify(record, null, 2) + '\n', 'utf8');
  const generatedAt = new Date().toISOString();
  const title = `machine-consciousness-training-checkpoint-${generatedAt.replace(/[:.]/g, '-')}`;
  const endpoint = `${origin}/api/continuum/import?requestId=${encodeURIComponent(`MC-CHECKPOINT-${generatedAt}`)}&title=${encodeURIComponent(title)}&mimeType=application/json&viewId=${encodeURIComponent(viewId)}`;
  const response = await fetch(endpoint, { method: 'POST', headers: { Origin: origin, 'X-Continuum-Request': 'owner-import', 'Content-Type': 'application/octet-stream' }, body: payload });
  const result = await response.json();
  if (!response.ok || result?.ok === false) throw new Error(`CONTINUUM_IMPORT_FAILED:${response.status}`);
  return { ok: true, checkpointSha256: sha256(bytes), continuumPayloadSha256: sha256(payload), continuum: result };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  console.log(JSON.stringify(await retain(process.argv[2] ? path.resolve(process.argv[2]) : defaultCheckpoint), null, 2));
}

export { retain };
