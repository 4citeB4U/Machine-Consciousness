import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CONTRIBUTORS = new Set(['local-codex', 'local-antigravity', 'online-chatgpt', 'online-gemini']);
const CHANNELS = new Set(['local', 'online', 'human']);
const STATUSES = new Set(['PENDING_CAPTURE', 'OBSERVED', 'EVALUATED', 'VERIFIED', 'REJECTED', 'ADMITTED']);
const SOURCE_TYPES = new Set(['observed-response', 'local-artifact', 'human-authored', 'provider-documentation', 'registry-only']);
const CONTRIBUTION_KINDS = new Set(['method', 'constraint', 'implementation', 'evaluation', 'domain-knowledge']);
const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');

function isId(value) {
  return typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9._:-]{2,159}$/.test(value);
}

function isDate(value) {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value));
}

function nonEmptyStrings(values) {
  return Array.isArray(values) && values.every(value => typeof value === 'string' && value.length > 0);
}

export function validateContributorPacket(packet) {
  const errors = [];
  if (!packet || packet.schemaVersion !== '1.0.0') errors.push('SCHEMA_VERSION_INVALID');
  if (!CONTRIBUTORS.has(packet?.contributorId)) errors.push('CONTRIBUTOR_ID_INVALID');
  const identity = packet?.identity;
  if (!identity || typeof identity.displayName !== 'string' || !identity.displayName.trim()) errors.push('IDENTITY_DISPLAY_NAME_INVALID');
  if (!CHANNELS.has(identity?.channel)) errors.push('IDENTITY_CHANNEL_INVALID');
  if (!isDate(identity?.registeredAt)) errors.push('IDENTITY_REGISTERED_AT_INVALID');
  if (identity?.observedAt !== undefined && !isDate(identity.observedAt)) errors.push('IDENTITY_OBSERVED_AT_INVALID');
  if (!Array.isArray(packet?.capabilities)) errors.push('CAPABILITIES_INVALID');
  if (!Array.isArray(packet?.contributions)) errors.push('CONTRIBUTIONS_INVALID');
  if (!nonEmptyStrings(packet?.limits)) errors.push('LIMITS_INVALID');

  const provenance = packet?.provenance;
  if (!SOURCE_TYPES.has(provenance?.sourceType)) errors.push('PROVENANCE_SOURCE_TYPE_INVALID');
  if (typeof provenance?.rightsReviewed !== 'boolean') errors.push('PROVENANCE_RIGHTS_REVIEW_INVALID');

  const admission = packet?.admission;
  if (!STATUSES.has(admission?.status)) errors.push('ADMISSION_STATUS_INVALID');
  if (typeof admission?.deterministicNativeArtifactCreated !== 'boolean') errors.push('ADMISSION_NATIVE_ARTIFACT_FLAG_INVALID');

  for (const [index, capability] of (packet?.capabilities ?? []).entries()) {
    if (typeof capability?.name !== 'string' || !capability.name.trim()) errors.push(`CAPABILITY_${index}_NAME_INVALID`);
    if (!nonEmptyStrings(capability?.evidenceRefs)) errors.push(`CAPABILITY_${index}_EVIDENCE_INVALID`);
    if (capability?.liveActionReceipt !== undefined && typeof capability.liveActionReceipt !== 'string') errors.push(`CAPABILITY_${index}_RECEIPT_INVALID`);
  }
  const contributionIds = new Set();
  for (const [index, contribution] of (packet?.contributions ?? []).entries()) {
    if (!isId(contribution?.contributionId) || contributionIds.has(contribution.contributionId)) errors.push(`CONTRIBUTION_${index}_ID_INVALID_OR_DUPLICATE`);
    contributionIds.add(contribution?.contributionId);
    if (!CONTRIBUTION_KINDS.has(contribution?.kind)) errors.push(`CONTRIBUTION_${index}_KIND_INVALID`);
    if (typeof contribution?.statement !== 'string' || !contribution.statement.trim()) errors.push(`CONTRIBUTION_${index}_STATEMENT_INVALID`);
    if (!nonEmptyStrings(contribution?.nativeArtifactRefs)) errors.push(`CONTRIBUTION_${index}_NATIVE_REFS_INVALID`);
    if (contribution?.acceptanceTestRefs !== undefined && !nonEmptyStrings(contribution.acceptanceTestRefs)) errors.push(`CONTRIBUTION_${index}_TEST_REFS_INVALID`);
    if (contribution?.contentSha256 !== undefined && !/^[a-f0-9]{64}$/.test(contribution.contentSha256)) errors.push(`CONTRIBUTION_${index}_CONTENT_HASH_INVALID`);
  }

  if (admission?.status === 'PENDING_CAPTURE') {
    if ((packet?.capabilities?.length ?? 0) !== 0 || (packet?.contributions?.length ?? 0) !== 0) errors.push('PENDING_CAPTURE_HAS_CONTRIBUTIONS');
    if (provenance?.sourceType !== 'registry-only') errors.push('PENDING_CAPTURE_SOURCE_NOT_REGISTRY_ONLY');
    if (admission?.deterministicNativeArtifactCreated !== false) errors.push('PENDING_CAPTURE_NATIVE_ARTIFACT_FLAG_INVALID');
  } else {
    if ((packet?.contributions?.length ?? 0) === 0) errors.push('CAPTURED_PACKET_HAS_NO_CONTRIBUTIONS');
    if (provenance?.sourceType === 'registry-only') errors.push('CAPTURED_PACKET_REGISTRY_ONLY');
    if (!identity?.observedAt) errors.push('CAPTURED_PACKET_OBSERVED_AT_REQUIRED');
  }
  return errors;
}

export function auditContributorDirectory(directory) {
  const files = fs.readdirSync(directory)
    .filter(file => file.endsWith('.packet.json'))
    .sort();
  const packets = [];
  for (const file of files) {
    const filePath = path.join(directory, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    let packet;
    try { packet = JSON.parse(raw); } catch (error) {
      packets.push({ file, status: 'INVALID', errors: [`JSON_PARSE_ERROR:${error.message}`] });
      continue;
    }
    const errors = validateContributorPacket(packet);
    packets.push({
      file,
      contributorId: packet.contributorId,
      captureStatus: packet.admission.status,
      contributionCount: packet.contributions.length,
      capabilityCount: packet.capabilities.length,
      nativeArtifactCreated: packet.admission.deterministicNativeArtifactCreated,
      eligibleForEvaluation: errors.length === 0 && packet.admission.status !== 'PENDING_CAPTURE' && packet.provenance.rightsReviewed === true,
      errors,
      packetSha256: sha256(raw)
    });
  }
  const expected = [...CONTRIBUTORS].sort();
  const present = new Set(packets.map(packet => packet.contributorId));
  const missing = expected.filter(id => !present.has(id));
  return {
    schemaVersion: '1.0.0',
    artifactType: 'LEEWAY_CONTRIBUTOR_INTAKE_REGISTRY',
    status: packets.some(packet => packet.errors?.length) || missing.length ? 'BLOCKED_INVALID_INTAKE' : 'CAPTURE_STATE_RECORDED',
    generatedAt: new Date().toISOString(),
    authorityBoundary: 'Contributor packets are evidence inputs; this registry does not grant Formula, Veritas, execution, or Learning Ledger authority.',
    expectedContributors: expected,
    missingContributors: missing,
    packets,
    learningLedger: 'NOT_UPDATED'
  };
}

function parseArgs(argv) {
  const options = { directory: path.resolve('training/contributors'), out: path.resolve('training/evidence/contributor-registry.json') };
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === '--dir') options.directory = path.resolve(argv[++index]);
    else if (argv[index] === '--out') options.out = path.resolve(argv[++index]);
  }
  return options;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const options = parseArgs(process.argv.slice(2));
  const result = auditContributorDirectory(options.directory);
  fs.mkdirSync(path.dirname(options.out), { recursive: true });
  fs.writeFileSync(options.out, `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify(result, null, 2));
  if (result.status !== 'CAPTURE_STATE_RECORDED') process.exitCode = 2;
}
