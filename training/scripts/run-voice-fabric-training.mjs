import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const sha256 = value => crypto.createHash('sha256').update(Buffer.isBuffer(value) ? value : Buffer.from(typeof value === 'string' ? value : JSON.stringify(value))).digest('hex');

function parseArgs(argv) {
  const options = {
    endpoint: 'http://127.0.0.1:8890/voice/input',
    out: path.join(repoRoot, 'training', 'evidence', 'voice-fabric-training-20261108.json'),
    segmentId: 'voice-training-20261108-creator-ecosystem-001'
  };
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === '--endpoint') options.endpoint = argv[++index];
    else if (argv[index] === '--out') options.out = path.resolve(argv[++index]);
    else if (argv[index] === '--segment-id') options.segmentId = argv[++index];
  }
  return options;
}

async function post(endpoint, event) {
  const response = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(event), signal: AbortSignal.timeout(60000) });
  const responseText = await response.text();
  let body;
  try { body = JSON.parse(responseText); } catch { body = { raw: responseText }; }
  if (!response.ok) throw new Error(`VOICE_INPUT_HTTP_${response.status}:${JSON.stringify(body)}`);
  return { httpStatus: response.status, body };
}

async function main(options) {
  const base = {
    ownerDeviceId: 'pc-primary',
    source: 'OWNER_DEVICE_MIC',
    transcriptSource: 'OWNER_DECLARED_PROMPT',
    inferenceAuthority: 'LEEWAY_EDGE_GPU_ONLY',
    storageAuthority: 'LEEWAY_CONTINUUM_ONLY'
  };
  const transcript = {
    ...base,
    type: 'transcript.final',
    segmentId: options.segmentId,
    requestId: options.segmentId,
    transcriptSource: 'OWNER_DECLARED_PROMPT',
    transcript: 'Creator, describe Leonard Lee and explain how the RapidWebDev Digital Brain and diagnostics are tools of the LeeWay Machine Consciousness.'
  };
  const response = await post(options.endpoint, transcript);
  const interrupt = await post(options.endpoint, {
    ...base,
    type: 'speech.interrupt',
    segmentId: options.segmentId,
    // Continuum admission is idempotent per requestId.  The interruption is a
    // distinct governed event and must not collide with the transcript's
    // response-telemetry retention request.
    requestId: `${options.segmentId}-interrupt`,
    reason: 'owner-interruption-training'
  });
  const evidence = {
    schemaVersion: '1.0.0',
    artifactType: 'MACHINE_CONSCIOUSNESS_VOICE_FABRIC_TRAINING_EVIDENCE',
    generatedAt: new Date().toISOString(),
    endpoint: options.endpoint,
    inputMode: 'TRANSCRIPT_FINAL_INJECTED_THROUGH_DEVICE_BRIDGE_NOT_PHYSICAL_MICROPHONE',
    transcript: { ...transcript, transcriptSha256: sha256(transcript.transcript) },
    response,
    interrupt,
    claimBoundary: 'This proves the governed transcript-to-consciousness-to-voice and interrupt route. It does not prove physical microphone capture or human hearing.',
    deviceBridgeRequired: true,
    storageAuthority: 'LEEWAY_CONTINUUM_ONLY'
  };
  fs.mkdirSync(path.dirname(options.out), { recursive: true });
  fs.writeFileSync(options.out, `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(JSON.stringify({ out: options.out, responseState: response.body?.state ?? null, responseStatus: response.body?.telemetry?.status ?? null, interruptState: interrupt.body?.state ?? null, continuumRecordId: response.body?.continuum?.recordId ?? null, audioHash: response.body?.audioHash ?? null }, null, 2));
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) await main(parseArgs(process.argv.slice(2)));
