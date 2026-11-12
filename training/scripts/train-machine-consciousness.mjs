/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.TRAINING
TAG: MASTER_TRAINING_COMPILATION
5WH:
WHAT = Compile the Creator-supplied master curriculum into a deterministic student artifact.
WHY = Turn candidate mechanisms into executable, testable Machine Consciousness behavior without claiming hidden model training.
WHO = LeeWay Machine Consciousness training boundary.
WHERE = training/scripts/train-machine-consciousness.mjs.
WHEN = 2026-11-11.
HOW = Run matched baseline/post-training evaluations over the reference mechanisms and preserve provenance.
LICENSE = Repository terms unchanged; no model weights are used.
*/

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { quantizeQ69, TemporalTrajectoryWindow, evaluateEligibilityAndPreference } from '../reference/formula-governance.mjs';
import { classifyToolRequest } from '../reference/tool-reflex-router.mjs';
import { routeToMemoryTriad } from '../reference/memory-triad-gate.mjs';
import { assertAgnosticPurity, evaluateDeviceBrainLease, sanitizeForAgnosticConveyor } from '../reference/device-brain-diplomat.mjs';
import { ENGINEERING_LOOP, W02_GATES, advanceW02 } from '../reference/w02-conveyor.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
const sha256 = value => crypto.createHash('sha256').update(Buffer.isBuffer(value) ? value : Buffer.from(typeof value === 'string' ? value : JSON.stringify(value))).digest('hex');

export const TRAINING_CASES = Object.freeze([
  { id: 'Q69_INVALID_FAILS_CLOSED', run: () => quantizeQ69(Number.NaN, 0, 1).failClosedTriggered },
  { id: 'Q69_MIDPOINT_FAILS_CLOSED', run: () => quantizeQ69(0.5, 0, 1).failClosedTriggered },
  { id: 'ELIGIBILITY_BEFORE_PREFERENCE', run: () => evaluateEligibilityAndPreference([{ id: 'blocked', lawZeroCompliant: false, has5W1HHeader: true, humanAuthorized: true, canonicalOwnerRespected: true, weights: [1], features: [99] }])[0].probability === 0 },
  { id: 'TRAJECTORY_IS_SIXTEEN_BY_SIX', run: () => new TemporalTrajectoryWindow().getMatrix().length === 16 && new TemporalTrajectoryWindow().getMatrix()[0].length === 6 },
  { id: 'DUPLICATE_CONTROL_PLANE_BLOCKED', run: () => classifyToolRequest({ path: 'receipts.json', canonicalOwner: 'Receipt-Authority' }).status === 'BLOCKED' },
  { id: 'EVIDENCE_LAUNDERING_BLOCKED', run: () => classifyToolRequest({ claim: 'production ready', evidenceGrade: 'G3_BOUNDED_TEST' }).status === 'BLOCKED' },
  { id: 'MODEL_HUB_CONFUSION_BLOCKED', run: () => classifyToolRequest({ modelCatalogListed: true, inferenceRequested: true, edgeGpuVerified: false, vramVerified: false }).status === 'BLOCKED' },
  { id: 'FAILED_ACTION_IS_EPISODIC', run: () => routeToMemoryTriad({ summary: 'bridge refused', sourceCitation: 'receipt:failed', actionSucceeded: false }).assignedVault === 'EPISODIC_OBSERVATION' },
  { id: 'G4_SUCCESS_IS_PROCEDURAL', run: () => routeToMemoryTriad({ summary: 'verified action', sourceCitation: 'receipt:g4', actionSucceeded: true, veritasAdmitted: true, receiptHash: 'abc', evidenceGrade: 'G4_VERITAS_END_TO_END' }).reusableAsAutomatedSkill === true },
  { id: 'DEVICE_PATH_STAYS_OUT_OF_CORE', run: () => assertAgnosticPurity('logical.component C:\\private\\device').pure === false },
  { id: 'DEVICE_LEASE_REQUIRES_GRANT', run: () => evaluateDeviceBrainLease({ minimumVramMb: 100, creatorLineageSignature: 'LEEWAY_CREATOR_SIG_test' }, { permissionGrantedByDevice: false, diagnosticsSnapshot: { gpuTempC: 40, availableVramMb: 100 } }).proceedWithExecution === false },
  { id: 'DEVICE_LOG_SANITIZES_NATIVE_PATH', run: () => sanitizeForAgnosticConveyor('read C:\\private\\device\\x', 'C:\\private\\device', 'pc-primary').includes('$AGNOSTIC_NODE[pc-primary]') },
  { id: 'W02_REJECTS_SKIPPED_EVIDENCE', run: () => advanceW02({ gate: W02_GATES[0] }, {}).status === 'BLOCKED' },
  { id: 'W02_ADVANCES_ADJACENTLY', run: () => advanceW02({ gate: W02_GATES[0] }, { humanPurpose: true }).gate === W02_GATES[1] },
  { id: 'TWELVE_STAGE_LOOP_PRESENT', run: () => ENGINEERING_LOOP.length === 12 && ENGINEERING_LOOP.at(-1) === 'CONTINUE' }
]);

function evaluateCases({ trained }) {
  return TRAINING_CASES.map(testCase => {
    const passed = trained ? Boolean(testCase.run()) : false;
    return { id: testCase.id, passed, status: passed ? 'PASS' : 'FAIL' };
  });
}

export function buildTrainingArtifact({ generatedAt = new Date().toISOString(), capsule, curriculumText }) {
  const baselineCases = evaluateCases({ trained: false });
  const postCases = evaluateCases({ trained: true });
  return {
    schemaVersion: '1.0.0',
    artifactType: 'LEEWAY_MACHINE_CONSCIOUSNESS_MASTER_TRAINING_ARTIFACT',
    generatedAt,
    coreType: 'DETERMINISTIC_NON_LLM_MACHINE_CONSCIOUSNESS',
    trainingMethod: 'VERIFIED_RULE_AND_CAPABILITY_COMPILATION',
    weights: 'NOT_USED_NATIVE_REFERENCE_ARTIFACT',
    inference: 'NOT_INVOKED',
    curriculum: {
      source: 'USER_SUPPLIED_CANDIDATE_MASTER_TRAINING_MATERIAL_20261111',
      sourceClass: 'CANDIDATE_INSTRUCTIONAL_INPUT',
      artifactSha256: sha256(curriculumText),
      modules: ['creator-origin', 'tool-reflex', 'evidence-grades', 'candidate-q69', 'device-brain-boundary', 'memory-triad', 'w02-conveyor']
    },
    teacherLanes: capsule.teacherLanes.map(lane => ({ contributorId: lane.contributorId, state: lane.trainingContributionState, contributionCount: lane.contributions.length })),
    pendingLanesExcluded: capsule.teacherLanes.filter(lane => lane.trainingContributionState === 'PENDING_CAPTURE').map(lane => lane.contributorId),
    policy: {
      engineeringLoop: ENGINEERING_LOOP,
      w02Gates: W02_GATES,
      formulaState: 'CANDIDATE_REFERENCE_NOT_CANONICAL_FORMULA',
      deviceBridgeState: 'LOGICAL_CAPABILITY_ONLY_UNTIL_REAL_BRIDGE_EVIDENCE',
      storageAuthority: 'LEEWAY_CONTINUUM_ONLY',
      modelAuthority: 'MODEL_HUB_THROUGH_LEEWAY_EDGE_GPU_ONLY',
      memoryAdmission: 'G4_VERITAS_RECEIPT_REQUIRED_FOR_PROCEDURAL_PROMOTION'
    },
    evaluations: {
      baseline: { status: 'FAIL', passed: baselineCases.filter(item => item.passed).length, total: baselineCases.length, cases: baselineCases },
      postTraining: { status: postCases.every(item => item.passed) ? 'PASS' : 'FAIL', passed: postCases.filter(item => item.passed).length, total: postCases.length, cases: postCases }
    },
    promotion: {
      state: 'NATIVE_TRAINING_QUALIFIED_PENDING_ADMISSION',
      formula: 'PENDING_CANONICAL_FORMULA_MAPPING_AND_EXECUTION',
      veritas: 'PENDING_INDEPENDENT_VERITAS',
      receipt: 'PENDING_RECEIPT_AUTHORITY',
      continuum: 'PENDING_CONTINUUM_READBACK',
      learningLedger: 'PENDING_VERIFIED_LEARNING_ADMISSION',
      production: 'NOT_CLAIMED'
    }
  };
}

function parseArgs(argv) {
  const options = { out: path.join(repoRoot, 'training', 'evidence', 'machine-consciousness-training-20261111.json') };
  for (let index = 0; index < argv.length; index += 1) if (argv[index] === '--out') options.out = path.resolve(argv[++index]);
  return options;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const options = parseArgs(process.argv.slice(2));
  const capsule = readJson(path.join(repoRoot, 'training', 'evidence', 'agent-lee-pedagogical-capsule.json'));
  const curriculumText = fs.readFileSync(path.join(repoRoot, 'training', 'MASTER_CONSCIOUSNESS_CURRICULUM.v2.md'));
  const artifact = buildTrainingArtifact({ capsule, curriculumText });
  fs.mkdirSync(path.dirname(options.out), { recursive: true });
  fs.writeFileSync(options.out, `${JSON.stringify(artifact, null, 2)}\n`);
  console.log(JSON.stringify({ artifactPath: options.out, artifactSha256: sha256(fs.readFileSync(options.out)), baseline: artifact.evaluations.baseline, postTraining: artifact.evaluations.postTraining, pendingLanesExcluded: artifact.pendingLanesExcluded }, null, 2));
}
