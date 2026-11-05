import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { auditRoot } from '../scripts/audit-local-foundry.mjs';
import { summarizeReceipt } from '../scripts/live-capability-probe.mjs';
import { auditFederateWeb } from '../scripts/audit-federate-web.mjs';
import { auditContributorDirectory, validateContributorPacket } from '../scripts/intake-contributor-packets.mjs';

const repoRoot = path.resolve(import.meta.dirname, '..', '..');

test('repository blocks model weights from Git', () => {
  const gitignore = readFileSync(path.join(repoRoot, '.gitignore'), 'utf8');
  assert.match(gitignore, /\.safetensors/);
  assert.match(gitignore, /\.gguf/);
  assert.match(gitignore, /training\/runs/);
});

test('temporary foundry audit is metadata-only and detects weights', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'leeway-foundry-'));
  try {
    await mkdir(path.join(root, 'nested'), { recursive: true });
    await writeFile(path.join(root, 'config.json'), '{}');
    await writeFile(path.join(root, 'nested', 'model.safetensors'), 'test-weight');
    const result = await auditRoot(root);
    assert.equal(result.status, 'WEIGHTS_PRESENT');
    assert.equal(result.inferenceStarted, false);
    assert.equal(result.weightFiles.length, 1);
    assert.equal(result.weightFiles[0].sha256, undefined);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('audit distinguishes extensionless stores from empty directories', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'leeway-foundry-unclassified-'));
  try {
    await writeFile(path.join(root, 'sha256-blob'), 'opaque-artifact');
    const result = await auditRoot(root);
    assert.equal(result.status, 'UNCLASSIFIED_FILES');
    assert.equal(result.fileCount, 1);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('receipt summary refuses to promote missing evidence', () => {
  const summary = summarizeReceipt(path.join(os.tmpdir(), 'leeway-receipt-does-not-exist.json'));
  assert.equal(summary.status, 'EXECUTED_UNVERIFIED');
  assert.equal(summary.verified, undefined);
});

test('authoritative live receipt is recognized when present', () => {
  const receiptPath = 'E:/LeeWay-Work/pc-consciousness-live/runtime/receipts/machine-consciousness/MACHINE-CONSCIOUSNESS-TRAINING-LIVE-PROBE-20261104.json';
  if (!existsSync(receiptPath)) return;
  const summary = summarizeReceipt(receiptPath);
  assert.equal(summary.status, 'PASS');
  assert.equal(summary.verified, true);
  assert.equal(summary.receiptHashPresent, true);
  assert.equal(summary.postGate, 'PASS');
  assert.equal(summary.veritas, 'PASS');
  assert.equal(summary.llmUsed, false);
});

test('Federate Web is admitted as a transport source, not a duplicate authority', () => {
  const result = auditFederateWeb('E:/LeeWay-Work/Leeway-Federate-Web', {
    browserReceipt: 'E:/LeeWay-Work/Leeway-Federate-Web/test-results/peer-retest-20261105.json'
  });
  assert.equal(result.sourceState, 'PRESENT_CLEAN');
  assert.equal(result.role, 'MANUAL_WEBRTC_PEER_TRANSPORT');
  assert.equal(result.runtimeState, 'UNVERIFIED');
  assert.equal(result.authorityBoundary.noAuthorityDuplication, true);
  assert.equal(result.browserProof.status, 'PASS');
  assert.equal(result.capabilityState.localBrowserTransport, 'VERIFIED');
  assert.equal(result.capabilityState.livePeerFederation, 'UNVERIFIED');
  assert.equal(result.admission.status, 'LOCAL_BROWSER_TRANSPORT_VERIFIED_RUNTIME_UNVERIFIED');
});

test('four contributor lanes are registered without falsely claiming four captured teachers', () => {
  const result = auditContributorDirectory(path.join(repoRoot, 'training', 'contributors'));
  assert.equal(result.status, 'CAPTURE_STATE_RECORDED');
  assert.deepEqual(result.expectedContributors, ['local-antigravity', 'local-codex', 'online-chatgpt', 'online-gemini']);
  const states = Object.fromEntries(result.packets.map(packet => [packet.contributorId, packet.captureStatus]));
  assert.equal(states['local-codex'], 'OBSERVED');
  assert.equal(states['local-antigravity'], 'OBSERVED');
  assert.equal(states['online-chatgpt'], 'PENDING_CAPTURE');
  assert.equal(states['online-gemini'], 'OBSERVED');
  assert.equal(result.packets.find(packet => packet.contributorId === 'local-antigravity').contributionCount, 3);
  assert.equal(result.packets.find(packet => packet.contributorId === 'online-gemini').contributionCount, 3);
  assert.equal(result.learningLedger, 'NOT_UPDATED');
});

test('pending contributor placeholders cannot carry knowledge claims', () => {
  const packet = {
    schemaVersion: '1.0.0',
    contributorId: 'online-gemini',
    identity: { displayName: 'Gemini', channel: 'online', registeredAt: '2026-11-05T03:30:00Z' },
    capabilities: [{ name: 'unstated', evidenceRefs: ['not-real'] }],
    contributions: [],
    limits: ['placeholder'],
    provenance: { sourceType: 'registry-only', rightsReviewed: false },
    admission: { status: 'PENDING_CAPTURE', deterministicNativeArtifactCreated: false }
  };
  assert.match(validateContributorPacket(packet).join(','), /PENDING_CAPTURE_HAS_CONTRIBUTIONS/);
});

test('captured contributor packets require native evidence and observation time', () => {
  const packet = {
    schemaVersion: '1.0.0',
    contributorId: 'local-codex',
    identity: { displayName: 'Codex', channel: 'local', registeredAt: '2026-11-05T03:30:00Z' },
    capabilities: [],
    contributions: [],
    limits: ['bounded'],
    provenance: { sourceType: 'local-artifact', rightsReviewed: false },
    admission: { status: 'OBSERVED', deterministicNativeArtifactCreated: true }
  };
  const errors = validateContributorPacket(packet);
  assert.ok(errors.includes('CAPTURED_PACKET_HAS_NO_CONTRIBUTIONS'));
  assert.ok(errors.includes('CAPTURED_PACKET_OBSERVED_AT_REQUIRED'));
});

test('Formula advisory evidence proves execution but preserves non-admission', () => {
  const evidencePath = path.join(repoRoot, 'training', 'evidence', 'formula-advisory-20261105.json');
  if (!existsSync(evidencePath)) return;
  const evidence = JSON.parse(readFileSync(evidencePath, 'utf8'));
  assert.equal(evidence.status, 'EXECUTED_NOT_ADMITTED');
  assert.equal(evidence.formula.health.status, 'LEEWAY_FORMULA_V1_PASS');
  assert.match(evidence.formula.inputHash, /^[a-f0-9]{64}$/);
  assert.match(evidence.formula.resultHash, /^[a-f0-9]{64}$/);
  assert.equal(evidence.policy.actionPolicyIntervention, false);
  assert.equal(evidence.verification.veritas, 'NOT_RUN');
  assert.equal(evidence.verification.learningLedger, 'NOT_UPDATED');
});

