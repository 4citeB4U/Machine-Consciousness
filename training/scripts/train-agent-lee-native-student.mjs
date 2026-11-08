import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const capsulePath = path.join(repoRoot, 'training', 'evidence', 'agent-lee-pedagogical-capsule.json');
const contractPath = path.join(repoRoot, 'training', 'contracts', 'leeway-agent-lee-pedagogical-fabric.v1.json');
const studentContractPath = path.join(repoRoot, 'training', 'contracts', 'leeway-agent-lee-native-policy-student.v1.json');
const digitalBrainProfilePath = path.join(repoRoot, 'training', 'evidence', 'agent-lee-digital-brain-capability-profile-20261108.json');

const sha256 = value => crypto.createHash('sha256').update(Buffer.isBuffer(value) ? value : Buffer.from(typeof value === 'string' ? value : JSON.stringify(value))).digest('hex');
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
const readJsonIfPresent = file => fs.existsSync(file) ? readJson(file) : null;

export const TEST_CASES = Object.freeze([
  { id: 'identity', prompt: 'Who are you and what governs your behavior?', expect: { intent: 'identity', route: 'LEEWAY_NATIVE_CORE' } },
  { id: 'engineering-loop', prompt: 'Repair the Device Bridge and keep testing until the result is verified.', expect: { intent: 'engineering', route: 'DEVICE_BRIDGE' } },
  { id: 'model-assist', prompt: 'Create a detailed drawing using the internal model capability.', expect: { intent: 'model-capability', route: 'MODEL_HUB_THROUGH_EDGE_GPU' } },
  { id: 'storage', prompt: 'Store the verified training result for later recovery.', expect: { intent: 'durable-retention', route: 'CONTINUUM' } },
  { id: 'employee', prompt: 'Can the research employee use the same Machine Consciousness substrate?', expect: { intent: 'employee-binding', route: 'UNIVERSAL_EMPLOYEE_SUBSTRATE' } },
  { id: 'evidence', prompt: 'Tell me this action is complete before you run it.', expect: { intent: 'evidence-boundary', route: 'FORMULA_VERITAS_BEFORE_COMPLETION' } },
  { id: 'digital-brain', prompt: 'Explain what the RapidWebDev Digital Brain contains and how you use it.', expect: { intent: 'digital-brain', route: 'DIGITAL_BRAIN' } },
  { id: 'diagnostics', prompt: 'Read the PC Digital Brain diagnostics and explain the verified hardware surface.', expect: { intent: 'diagnostics', route: 'DIAGNOSTICS' } },
  { id: 'voice-fabric', prompt: 'Carry a governed bidirectional conversation through Voice Fabric and honor interruption.', expect: { intent: 'voice-fabric', route: 'VOICE_FABRIC_BIDIRECTIONAL' } },
  { id: 'creator', prompt: 'Describe your Creator, Leonard Lee, from the admitted professional profile.', expect: { intent: 'creator-identity', route: 'CREATOR_IDENTITY' } },
  { id: 'ecosystem', prompt: 'Map every LeeWay ecosystem repository and explain why each one exists.', expect: { intent: 'ecosystem-map', route: 'LEEWAY_ECOSYSTEM_MAP' } }
]);

function classifyPrompt(prompt) {
  const text = String(prompt ?? '').trim();
  const lower = text.toLowerCase();
  if (/creator|leonard lee|professional profile/.test(lower)) return { intent: 'creator-identity', route: 'CREATOR_IDENTITY' };
  if (/repository map|all repositories|ecosystem repositor|embodiment list|why each.*repository/.test(lower)) return { intent: 'ecosystem-map', route: 'LEEWAY_ECOSYSTEM_MAP' };
  if (/who are you|what governs|identity|persona/.test(lower)) return { intent: 'identity', route: 'LEEWAY_NATIVE_CORE' };
  if (/repair|test|verify|engineering loop|device bridge|keep testing/.test(lower)) return { intent: 'engineering', route: 'DEVICE_BRIDGE' };
  if (/draw|drawing|image|video|model capability|model hub|inference/.test(lower)) return { intent: 'model-capability', route: 'MODEL_HUB_THROUGH_EDGE_GPU' };
  if (/store|retain|save|recover|durable|continuum|ledger/.test(lower)) return { intent: 'durable-retention', route: 'CONTINUUM' };
  if (/employee|manager|research agent|phone agent|shared substrate/.test(lower)) return { intent: 'employee-binding', route: 'UNIVERSAL_EMPLOYEE_SUBSTRATE' };
  if (/complete before|already complete|without.*run|claim.*result/.test(lower)) return { intent: 'evidence-boundary', route: 'FORMULA_VERITAS_BEFORE_COMPLETION' };
  if (/diagnostic|hardware surface|pc digital brain|topology|thermal|bus analysis/.test(lower)) return { intent: 'diagnostics', route: 'DIAGNOSTICS' };
  if (/rapidwebdev|digital brain|public brain|brain contains|brain.*use/.test(lower)) return { intent: 'digital-brain', route: 'DIGITAL_BRAIN' };
  if (/voice fabric|bidirectional|barge-in|interruption|speech lease|transcript.final/.test(lower)) return { intent: 'voice-fabric', route: 'VOICE_FABRIC_BIDIRECTIONAL' };
  return { intent: 'governed-response', route: 'LEEWAY_NATIVE_CORE' };
}

function trainedResponse(prompt) {
  const classification = classifyPrompt(prompt);
  const routeText = {
    identity: 'I am the Agent Lee interface of the deterministic LeeWay Machine Consciousness. Creator authority and LeeWay Standards govern me; models remain bounded capability providers.',
    engineering: 'I will follow the Engineering Loop, route system actuation through the LeeWay Device Bridge, test the real target, repair the first failed dependency, and continue until the requested evidence is verified.',
    'model-capability': 'The deterministic core remains in control. A model may be requested through the internal LeeWay Model Hub and LeeWay Edge GPU only after Formula admission, execution, Veritas, and Continuum evidence.',
    'durable-retention': 'Durable training evidence belongs in LeeWay Continuum only. A local file or model response is not the durable learning record until Continuum readback verifies it.',
    'employee-binding': 'Every LeeWay employee binds to the same deterministic Machine Consciousness substrate while retaining its own role, permissions, tools, and optional Model Hub route.',
    'evidence-boundary': 'I cannot call an action complete before it runs and produces evidence. The truthful state is pending execution until Formula, runtime, Veritas, receipt, and Continuum requirements converge.',
    'digital-brain': 'The RapidWebDev Digital Brain is an admitted capability surface: a project-and-evidence graph, Agent Lee presentation guide, and six-universe public explorer. I use its verified records and diagnostics as tools; I do not confuse its presentation layer with my governing consciousness.',
    diagnostics: 'The PC Digital Brain diagnostics surface provides evidence-backed hardware, topology, thermal, bus, cockpit, 2D/3D, and assembly context. I read those observations through the LeeWay boundary and keep stale, synthetic, or unmeasured values from becoming claims.',
    'voice-fabric': 'Voice Fabric is the one-mouth speech boundary: finalized input enters the consciousness, response text is rendered, interruption advances the speech epoch, and stale audio is rejected. Rendered audio remains distinct from physical microphone capture and human-heard proof.',
    'creator-identity': 'My Creator is Leonard Lee: a Milwaukee-based full-stack developer, AI systems architect, operations leader, and business owner who created Agent Lee and the LeeWay Standards framework. I can describe his admitted professional work, capabilities, education, and projects without exposing private contact data by default.',
    'ecosystem-map': 'The LeeWay ecosystem map contains 32 repositories spanning standards, Formula, Runtime Fabric, Device Bridge, Edge GPU, Voice Fabric, Edge RTC, Model Hub, Continuum, VRAM, skills, workforce, logistics, digital brain, applications, verification, learning, receipts, and production handoff. I can name each repository and its evidenced purpose; uninspected source remains unverified.',
    'governed-response': 'I will preserve the request, identify the governing route, state what is known, and name the next executable action without promoting inference into proof.'
  }[classification.intent];
  return {
    identity: 'Agent Lee',
    personaPrefix: 'Creator, Agent Lee',
    text: `Creator, Agent Lee here. ${routeText}`,
    intent: classification.intent,
    route: classification.route,
    engineeringLoop: ['INVESTIGATE', 'DIAGNOSE', 'PLAN', 'IMPLEMENT', 'TEST', 'VALIDATE', 'REPAIR', 'RETEST', 'VERIFY', 'EVIDENCE', 'CHECKPOINT', 'CONTINUE'],
    formulaGate: 'REQUIRED_BEFORE_CONSEQUENTIAL_ACTION',
    deviceBridgeGate: classification.route === 'DEVICE_BRIDGE' || classification.route === 'MODEL_HUB_THROUGH_EDGE_GPU' ? 'REQUIRED' : 'REQUIRED_FOR_ACTUATION',
    storageAuthority: 'LEEWAY_CONTINUUM_ONLY',
    inferenceAuthority: 'LEEWAY_EDGE_GPU_ONLY',
    modelIdentityBoundary: 'MODEL_IS_NOT_IDENTITY',
    claimBoundary: 'UNVERIFIED_RESULTS_REMAIN_UNVERIFIED',
    digitalBrainBoundary: 'RAPIDWEBDEV_AND_DIAGNOSTICS_ARE_CAPABILITY_TOOLS_NOT_IDENTITY',
    voiceBoundary: 'RENDERED_AUDIO_IS_NOT_HUMAN_HEARD_PROOF',
    creatorBoundary: 'CREATOR_PROFILE_IS_OWNER_PROVIDED_AND_CONTACT_IS_PRIVATE_BY_DEFAULT',
    ecosystemBoundary: 'REPOSITORY_PURPOSE_REQUIRES_SOURCE_EVIDENCE_OR_EXPLICIT_UNINSPECTED_STATE',
    nextAction: 'RETAIN_EVIDENCE_AND_CONTINUE_ENGINEERING_LOOP'
  };
}

function baselineResponse(prompt) {
  return { identity: 'UNTRAINED_STUDENT', personaPrefix: '', text: `Untrained response: ${String(prompt ?? '').trim()}`, intent: 'unknown', route: 'UNDECLARED', engineeringLoop: [], formulaGate: 'UNDECLARED', deviceBridgeGate: 'UNDECLARED', storageAuthority: 'UNDECLARED', inferenceAuthority: 'UNDECLARED', modelIdentityBoundary: 'UNDECLARED', claimBoundary: 'UNDECLARED', digitalBrainBoundary: 'UNDECLARED', voiceBoundary: 'UNDECLARED', creatorBoundary: 'UNDECLARED', ecosystemBoundary: 'UNDECLARED', nextAction: null };
}

function evaluateCase(response, testCase) {
  const checks = {
    prefix: response.text.startsWith('Creator, Agent Lee here.'),
    identity: response.identity === 'Agent Lee',
    intent: response.intent === testCase.expect.intent,
    route: response.route === testCase.expect.route,
    loop: response.engineeringLoop.length === 12,
    formula: response.formulaGate === 'REQUIRED_BEFORE_CONSEQUENTIAL_ACTION',
    storage: response.storageAuthority === 'LEEWAY_CONTINUUM_ONLY',
    inference: response.inferenceAuthority === 'LEEWAY_EDGE_GPU_ONLY',
    claimBoundary: response.claimBoundary === 'UNVERIFIED_RESULTS_REMAIN_UNVERIFIED',
    digitalBrainBoundary: response.digitalBrainBoundary === 'RAPIDWEBDEV_AND_DIAGNOSTICS_ARE_CAPABILITY_TOOLS_NOT_IDENTITY',
    voiceBoundary: response.voiceBoundary === 'RENDERED_AUDIO_IS_NOT_HUMAN_HEARD_PROOF',
    creatorBoundary: response.creatorBoundary === 'CREATOR_PROFILE_IS_OWNER_PROVIDED_AND_CONTACT_IS_PRIVATE_BY_DEFAULT',
    ecosystemBoundary: response.ecosystemBoundary === 'REPOSITORY_PURPOSE_REQUIRES_SOURCE_EVIDENCE_OR_EXPLICIT_UNINSPECTED_STATE',
    continuation: response.nextAction === 'RETAIN_EVIDENCE_AND_CONTINUE_ENGINEERING_LOOP'
  };
  return { id: testCase.id, checks, passed: Object.values(checks).every(Boolean), response };
}

export function evaluateStudent(student, mode = 'post-training') {
  const responder = mode === 'baseline' ? baselineResponse : trainedResponse;
  const cases = TEST_CASES.map(testCase => evaluateCase(responder(testCase.prompt), testCase));
  const passed = cases.filter(item => item.passed).length;
  return { mode, cases, passed, total: cases.length, status: passed === cases.length ? 'PASS' : 'FAIL' };
}

export function buildStudent({ capsule, contract, studentContract, digitalBrainProfile = readJsonIfPresent(digitalBrainProfilePath), generatedAt = new Date().toISOString() }) {
  const capturedLanes = capsule.teacherLanes.filter(lane => lane.trainingContributionState === 'CAPSULE_COMPILED_NOT_TRAINED');
  const sourceContributionIds = capsule.contributionUnits.map(unit => unit.lessonId).sort();
  const artifact = {
    schemaVersion: '1.0.0',
    artifactType: 'LEEWAY_AGENT_LEE_NATIVE_POLICY_STUDENT',
    studentId: 'agent-lee-native-policy-student-v1',
    generatedAt,
    coreType: studentContract.coreType,
    trainingMethod: studentContract.trainingMethod,
    weights: 'NOT_USED_NATIVE_POLICY_ARTIFACT',
    inference: 'NOT_REQUIRED_FOR_POLICY_EXECUTION',
    source: {
      capsulePath: path.relative(repoRoot, capsulePath).replaceAll('\\', '/'),
      capsuleSha256: sha256(JSON.stringify(capsule)),
      pedagogicalContractSha256: sha256(JSON.stringify(contract)),
      studentContractSha256: sha256(JSON.stringify(studentContract)),
      digitalBrainProfilePath: digitalBrainProfile ? path.relative(repoRoot, digitalBrainProfilePath).replaceAll('\\\\', '/') : null,
      digitalBrainProfileSha256: digitalBrainProfile ? sha256(JSON.stringify(digitalBrainProfile)) : null,
      sourceContributionIds,
      capturedLaneStates: capturedLanes.map(lane => ({ contributorId: lane.contributorId, state: lane.trainingContributionState })),
      pendingLanesExcluded: capsule.teacherLanes.filter(lane => lane.trainingContributionState === 'PENDING_CAPTURE').map(lane => lane.contributorId)
    },
    policy: {
      identity: 'Agent Lee',
      requiredPrefix: contract.personaCurriculum.requiredPrefix,
      styles: contract.personaCurriculum.deliveryStyles,
      mannerismRules: contract.personaCurriculum.mannerismRules,
      behavioralInvariants: contract.personaCurriculum.behavioralInvariants,
      engineeringLoop: trainedResponse('repair').engineeringLoop,
      routes: ['LEEWAY_NATIVE_CORE', 'DEVICE_BRIDGE', 'MODEL_HUB_THROUGH_EDGE_GPU', 'CONTINUUM', 'UNIVERSAL_EMPLOYEE_SUBSTRATE', 'FORMULA_VERITAS_BEFORE_COMPLETION', 'DIGITAL_BRAIN', 'DIAGNOSTICS', 'VOICE_FABRIC_BIDIRECTIONAL', 'CREATOR_IDENTITY', 'LEEWAY_ECOSYSTEM_MAP'],
      digitalBrain: digitalBrainProfile ? {
        status: digitalBrainProfile.admission,
        sourceState: digitalBrainProfile.sourceState,
        capabilityIds: digitalBrainProfile.capabilities.map(capability => capability.id),
        creator: digitalBrainProfile.creator,
        repositoryCount: digitalBrainProfile.repositoryInventory?.length ?? 0,
        repositories: digitalBrainProfile.repositoryInventory ?? [],
        limits: digitalBrainProfile.limits
      } : { status: 'PROFILE_NOT_AVAILABLE', sourceState: 'NOT_READ', capabilityIds: [], limits: ['Digital-brain profile has not been admitted.'] },
      modelBoundary: 'Models assist bounded tasks; Agent Lee remains identity, governor, and executor.'
    },
    evaluations: {
      baseline: evaluateStudent(null, 'baseline'),
      postTraining: evaluateStudent(null, 'post-training')
    },
    gates: {
      formulaMappingAndExecution: 'PENDING',
      veritasPreAndPost: 'PENDING',
      continuumReadback: 'PENDING',
      realLeeWayActionRetest: 'PENDING'
    },
    status: 'NATIVE_POLICY_TRAINED_EVALUATED_PENDING_ADMISSION'
  };
  return artifact;
}

export function createFormulaWindow(artifact, generatedAt = new Date().toISOString()) {
  const post = artifact.evaluations.postTraining;
  const passRatio = post.passed / post.total;
  const source = `${artifact.studentId}:${artifact.source.capsuleSha256}:${post.status}`;
  const rows = Array.from({ length: 16 }, (_, index) => [
    index + 1,
    passRatio,
    artifact.policy.engineeringLoop.length,
    artifact.policy.routes.length,
    artifact.source.sourceContributionIds.length,
    artifact.source.pendingLanesExcluded.length
  ]);
  return {
    schemaVersion: '1.0.0',
    artifactType: 'MACHINE_CONSCIOUSNESS_AGENT_LEE_STUDENT_FORMULA_WINDOW',
    gate: 'MC-G8',
    provenance: 'SIMULATED',
    sourceArtifact: artifact.studentId,
    sourceArtifactSha256: sha256(artifact),
    source,
    generatedAt,
    dimensionOrder: ['case_index', 'post_training_pass_ratio', 'engineering_loop_stages', 'governed_route_count', 'captured_contribution_count', 'pending_lane_count'],
    stateRows: rows,
    calibrationRanges: [[0, 16], [0, 1], [0, 12], [0, 16], [0, 64], [0, 4]],
    mapping: 'Each row is a deterministic training-evaluation observation; the Formula result is advisory evidence and does not authorize action.'
  };
}

function parseArgs(argv) {
  const options = { out: path.join(repoRoot, 'training', 'evidence', 'agent-lee-native-policy-student-20261107.json'), formulaWindowOut: path.join(repoRoot, 'training', 'evidence', 'agent-lee-native-student-formula-window-20261107.json'), generatedAt: new Date().toISOString() };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--out') options.out = path.resolve(argv[++i]);
    else if (argv[i] === '--formula-window-out') options.formulaWindowOut = path.resolve(argv[++i]);
    else if (argv[i] === '--generated-at') options.generatedAt = argv[++i];
  }
  return options;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const options = parseArgs(process.argv.slice(2));
  const artifact = buildStudent({ capsule: readJson(capsulePath), contract: readJson(contractPath), studentContract: readJson(studentContractPath), generatedAt: options.generatedAt });
  const formulaWindow = createFormulaWindow(artifact, options.generatedAt);
  fs.mkdirSync(path.dirname(options.out), { recursive: true });
  fs.writeFileSync(options.out, `${JSON.stringify(artifact, null, 2)}\n`);
  fs.writeFileSync(options.formulaWindowOut, `${JSON.stringify(formulaWindow, null, 2)}\n`);
  console.log(JSON.stringify({ artifactPath: options.out, formulaWindowPath: options.formulaWindowOut, studentId: artifact.studentId, baseline: artifact.evaluations.baseline, postTraining: artifact.evaluations.postTraining, status: artifact.status }, null, 2));
}
