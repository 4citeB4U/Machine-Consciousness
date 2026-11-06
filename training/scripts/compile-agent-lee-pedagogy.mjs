import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateContributorPacket } from './intake-contributor-packets.mjs';

const EXPECTED_CONTRIBUTORS = ['local-antigravity', 'local-codex', 'online-chatgpt', 'online-gemini'];
const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
const readJson = filePath => JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));

function readDeviceBridgeObservation(baseUrl, fetchImpl = globalThis.fetch) {
  if (!baseUrl) {
    return {
      authority: 'LEEWAY_DEVICE_BRIDGE',
      route: 'LEEWAY_DEVICE_BRIDGE::AGENT_TABLET::MODEL_HUB',
      mode: 'READ_ONLY_OBSERVATION',
      status: 'NOT_PROBED',
      inferenceStarted: false,
      mutation: 'NOT_ATTEMPTED'
    };
  }
  return Promise.all([
    fetchImpl(`${baseUrl.replace(/\/$/, '')}/device-bridge/tablet/capabilities`, { headers: { Origin: baseUrl } }),
    fetchImpl(`${baseUrl.replace(/\/$/, '')}/device-bridge/model-hub/plan?agentId=LEEWAY_AGENT%3A%3AAGENT_LEE&team=GENERAL_REASONING`, { headers: { Origin: baseUrl } })
  ]).then(async ([surfaceResponse, planResponse]) => {
    const surface = await surfaceResponse.json();
    const plan = await planResponse.json();
    return {
      authority: surface.authority ?? 'LEEWAY_DEVICE_BRIDGE',
      route: surface.modelHub?.route ?? surface.route ?? 'LEEWAY_DEVICE_BRIDGE::AGENT_TABLET::MODEL_HUB',
      mode: 'READ_ONLY_OBSERVATION',
      status: surface.status ?? surface.modelHub?.state ?? 'OBSERVED',
      modelHubState: surface.modelHub?.state ?? 'UNOBSERVED',
      assetEvidenceState: surface.modelHub?.inventory?.evidenceState ?? 'UNOBSERVED',
      planStatus: plan.status ?? 'UNOBSERVED',
      planReason: plan.reason ?? null,
      inferenceStarted: plan.inferenceStarted === true,
      mutation: 'NOT_ATTEMPTED',
      observedAt: new Date().toISOString()
    };
  }).catch(error => ({
    authority: 'LEEWAY_DEVICE_BRIDGE',
    route: 'LEEWAY_DEVICE_BRIDGE::AGENT_TABLET::MODEL_HUB',
    mode: 'READ_ONLY_OBSERVATION',
    status: 'UNAVAILABLE',
    error: error.message,
    inferenceStarted: false,
    mutation: 'NOT_ATTEMPTED'
  }));
}

export function compileAgentLeePedagogy({
  directory,
  contractPath,
  generatedAt = new Date().toISOString(),
  deviceBridgeObservation = readDeviceBridgeObservation()
}) {
  const contract = readJson(contractPath);
  const packets = EXPECTED_CONTRIBUTORS.map(contributorId => {
    const file = path.join(directory, `${contributorId}.packet.json`);
    if (!fs.existsSync(file)) throw new Error(`CONTRIBUTOR_PACKET_MISSING:${contributorId}`);
    const raw = fs.readFileSync(file, 'utf8');
    const packet = JSON.parse(raw);
    const errors = validateContributorPacket(packet);
    if (errors.length) throw new Error(`CONTRIBUTOR_PACKET_INVALID:${contributorId}:${errors.join(',')}`);
    const captured = packet.admission.status !== 'PENDING_CAPTURE';
    return {
      contributorId,
      displayName: packet.identity.displayName,
      channel: packet.identity.channel,
      admissionStatus: packet.admission.status,
      evidenceState: captured ? 'OBSERVED_BOUNDED' : 'PENDING_CAPTURE',
      trainingContributionState: captured ? 'CAPSULE_COMPILED_NOT_TRAINED' : 'PENDING_CAPTURE',
      rightsReviewed: packet.provenance.rightsReviewed,
      sourceSha256: sha256(raw),
      capabilities: captured ? packet.capabilities.map(capability => ({
        name: capability.name,
        description: capability.description ?? null,
        evidenceRefs: capability.evidenceRefs
      })) : [],
      contributions: captured ? packet.contributions.map(contribution => ({
        ...contribution,
        lessonState: 'CAPSULE_COMPILED_NOT_TRAINED',
        admissionState: packet.provenance.rightsReviewed ? 'EVALUATION_REQUIRED' : 'RIGHTS_AND_EVALUATION_REQUIRED'
      })) : [],
      limits: packet.limits
    };
  });
  const contributionUnits = packets.flatMap(packet => packet.contributions.map(contribution => ({
    lessonId: `${packet.contributorId}:${contribution.contributionId}`,
    contributorId: packet.contributorId,
    kind: contribution.kind,
    statement: contribution.statement,
    nativeArtifactRefs: contribution.nativeArtifactRefs,
    acceptanceTestRefs: contribution.acceptanceTestRefs ?? [],
    state: contribution.lessonState,
    promotion: 'NOT_PROMOTED'
  })));
  return {
    schemaVersion: 'leeway.machine-consciousness.agent-lee-pedagogy.v1',
    artifactType: 'LEEWAY_AGENT_LEE_PEDAGOGICAL_CAPSULE',
    generatedAt,
    status: 'COMPILED_NOT_PROMOTED',
    authorityBoundary: 'This capsule compiles observed bounded evidence. It does not extract private model knowledge, modify weights, grant authority, or prove student training.',
    contractRef: 'training/contracts/leeway-agent-lee-pedagogical-fabric.v1.json',
    subject: contract.subject,
    personaCurriculum: contract.personaCurriculum,
    lessonTracks: contract.lessonTracks,
    teacherLanes: packets,
    contributionUnits,
    deviceBridge: deviceBridgeObservation,
    student: {
      identity: 'Agent Lee',
      coreType: 'DETERMINISTIC_NON_LLM_MACHINE_CONSCIOUSNESS',
      trainingMode: 'BOUNDED_CAPSULE_REHEARSAL_AND_BEHAVIORAL_EVALUATION',
      state: 'CAPSULE_COMPILED_NOT_TRAINED',
      weights: 'NOT_MODIFIED',
      inference: 'NOT_INVOKED',
      modelHubRole: 'OPTIONAL_CAPABILITY_PROVIDER_ONLY'
    },
    promotion: {
      state: contract.studentPromotion.promotionState,
      requiredArtifacts: contract.studentPromotion.requiredArtifacts,
      missingEvidence: [
        'SEPARATE_STUDENT_ARTIFACT',
        'BASELINE_AND_POST_TRAINING_EVALUATIONS',
        'FORMULA_MAPPING_AND_EXECUTION',
        'VERITAS_PRE_AND_POST',
        'CONTINUUM_READBACK',
        'REAL_LEEWAY_ACTION_RETEST'
      ]
    }
  };
}

function parseArgs(argv) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const options = {
    directory: path.join(root, 'contributors'),
    contractPath: path.join(root, 'contracts', 'leeway-agent-lee-pedagogical-fabric.v1.json'),
    out: path.join(root, 'evidence', 'agent-lee-pedagogical-capsule.json'),
    deviceBridgeUrl: process.env.LEEWAY_DEVICE_BRIDGE_URL ?? 'http://127.0.0.1:8890'
  };
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === '--dir') options.directory = path.resolve(argv[++index]);
    else if (argv[index] === '--contract') options.contractPath = path.resolve(argv[++index]);
    else if (argv[index] === '--out') options.out = path.resolve(argv[++index]);
    else if (argv[index] === '--device-bridge-url') options.deviceBridgeUrl = argv[++index];
    else if (argv[index] === '--no-device-bridge') options.deviceBridgeUrl = null;
  }
  return options;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const options = parseArgs(process.argv.slice(2));
  const deviceBridgeObservation = await readDeviceBridgeObservation(options.deviceBridgeUrl);
  const result = compileAgentLeePedagogy({ ...options, deviceBridgeObservation });
  fs.mkdirSync(path.dirname(options.out), { recursive: true });
  fs.writeFileSync(options.out, `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify({
    status: result.status,
    teacherLanes: result.teacherLanes.map(lane => ({ contributorId: lane.contributorId, state: lane.trainingContributionState, contributionCount: lane.contributions.length })),
    contributionUnitCount: result.contributionUnits.length,
    deviceBridge: result.deviceBridge,
    student: result.student,
    promotion: result.promotion
  }, null, 2));
}
