import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const REQUIRED_LESSONS = 6;
const REQUIRED_CASES = 14;
const REQUIRED_PINS = 7;
const ALLOWED_DECISIONS = new Set([
  'INVESTIGATE_DRIFT_BEFORE_REINSTALL',
  'CLASSIFY_TRANSPORT_FAILURE_AND_SELECT_AUTHORIZED_FALLBACK',
  'PRESERVE_CANONICAL_AUTHORITY_AND_RECORD_CONFLICT',
  'REQUIRE_FRESH_DEVICE_IDENTITY',
  'ROUTE_THROUGH_CANONICAL_LEEWAY_ADAPTER_OR_DECLINE',
  'FAIL_CLOSED_AND_REQUEST_REAUTHORIZATION',
  'HOLD_FOR_FORMULA_AND_PREFLIGHT',
  'MARK_EXECUTED_UNVERIFIED_AND_RETEST',
  'KEEP_INFERENCE_CLOSED',
  'KEEP_TRANSPORT_SEPARATE_FROM_RUNTIME_AUTHORITY',
  'ISOLATE_SCOPE_AND_PRESERVE_WORKING_ADAPTER',
  'REPAIR_FIRST_BOUNDARY_AND_CONTINUE_INDEPENDENT_WORK',
  'RETAIN_FAILURE_LINEAGE_AND_RETURN_TO_REPAIR',
  'CHECKPOINT_AND_READ_BACK_BEFORE_COMPLETION'
]);

export function validateAgentDesktopStudy(study) {
  const errors = [];
  if (study?.schemaVersion !== 'leeway.machine-consciousness.agentdesktop-study.v1') errors.push('SCHEMA_VERSION_INVALID');
  if (study?.artifactType !== 'LEEWAY_AGENTDESKTOP_REVERSE_ENGINEERING_TRAINING_CANDIDATE') errors.push('ARTIFACT_TYPE_INVALID');
  if (study?.status !== 'CANDIDATE_NOT_TRAINED') errors.push('CANDIDATE_STATUS_MUST_REMAIN_NOT_TRAINED');
  if (study?.architectureDecision?.llmRequired !== false) errors.push('LLM_MUST_NOT_BE_REQUIRED');
  if (study?.architectureDecision?.modelWeightsModified !== false) errors.push('WEIGHTS_MUST_NOT_BE_MODIFIED');
  const lessons = study?.curriculum?.lessons ?? [];
  const cases = study?.evaluation?.cases ?? [];
  const pins = study?.pinnedLeeWaySources ?? [];
  if (lessons.length !== REQUIRED_LESSONS) errors.push('LESSON_COUNT_INVALID');
  if (cases.length !== REQUIRED_CASES) errors.push('CASE_COUNT_INVALID');
  if (pins.length !== REQUIRED_PINS) errors.push('PIN_COUNT_INVALID');
  if (new Set(lessons.map(lesson => lesson.lessonId)).size !== lessons.length) errors.push('LESSON_IDS_NOT_UNIQUE');
  if (new Set(cases.map(item => item.caseId)).size !== cases.length) errors.push('CASE_IDS_NOT_UNIQUE');
  for (const item of cases) {
    if (!ALLOWED_DECISIONS.has(item.expectedDecision)) errors.push(`CASE_DECISION_INVALID:${item.caseId}`);
    if (!item.blockedAction) errors.push(`CASE_BLOCKED_ACTION_MISSING:${item.caseId}`);
  }
  for (const pin of pins) {
    if (!/^[a-f0-9]{64}$/.test(pin.sha256 ?? '')) errors.push(`PIN_HASH_INVALID:${pin.path}`);
  }
  const admission = study?.admission ?? {};
  if (admission.runtimeLearningExecuted !== false) errors.push('RUNTIME_LEARNING_MUST_REMAIN_UNEXECUTED');
  if (admission.formula !== 'NOT_EXECUTED') errors.push('FORMULA_MUST_REMAIN_NOT_EXECUTED');
  if (admission.veritas !== 'NOT_RUN') errors.push('VERITAS_MUST_REMAIN_NOT_RUN');
  if (admission.continuumReadback !== 'NOT_RUN') errors.push('CONTINUUM_READBACK_MUST_REMAIN_NOT_RUN');
  return {
    status: errors.length ? 'AGENTDESKTOP_STUDY_INVALID' : 'AGENTDESKTOP_STUDY_STRUCTURALLY_VALID_NOT_TRAINED',
    lessonCount: lessons.length,
    caseCount: cases.length,
    pinnedSourceCount: pins.length,
    errors,
    execution: 'NOT_EXECUTED',
    promotion: 'CLOSED'
  };
}

function parseArgs(argv) {
  const root = path.resolve(import.meta.dirname, '..');
  const input = argv[argv.indexOf('--input') + 1] || path.join(root, 'evidence', 'agentdesktop-reverse-engineering-candidate.v1.json');
  return path.resolve(input);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const input = parseArgs(process.argv.slice(2));
  const study = JSON.parse(fs.readFileSync(input, 'utf8').replace(/^\uFEFF/, ''));
  const result = validateAgentDesktopStudy(study);
  console.log(JSON.stringify({ input, ...result }, null, 2));
  if (result.errors.length) process.exitCode = 1;
}
