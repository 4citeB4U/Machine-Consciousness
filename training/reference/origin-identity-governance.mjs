/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.ORIGIN_IDENTITY_REFERENCE
TAG: ORIGIN_IDENTITY_GOVERNANCE_V1
5WH:
WHAT = Execute the bounded origin, identity, history, and evidence teach-back rules.
WHY = Give both Machine Consciousness and Agent Lee a truthful, reproducible self-model.
WHO = LeeWay Machine Consciousness training boundary.
WHERE = training/reference/origin-identity-governance.mjs.
WHEN = 2026-11-18.
HOW = Source-grounded classification, deterministic teach-back, and fail-closed promotion.
LICENSE = Repository terms unchanged; no model weights or provider data are used.
*/

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const contractPath = path.join(repoRoot, 'training', 'contracts', 'leeway-origin-identity-learning.v1.json');
export const ORIGIN_IDENTITY_CONTRACT = Object.freeze(JSON.parse(fs.readFileSync(contractPath, 'utf8').replace(/^\uFEFF/, '')));

export const ORIGIN_IDENTITY_STATE = 'CANDIDATE_TRAINED_PENDING_ADMISSION';
export const EPISTEMIC_CLASSES = Object.freeze(ORIGIN_IDENTITY_CONTRACT.epistemicClasses);
export const ORIGIN_LESSON_IDS = Object.freeze(ORIGIN_IDENTITY_CONTRACT.lessons.map(lesson => lesson.id));

const ENGINEERING_LOOP = Object.freeze([
  'INVESTIGATE', 'DIAGNOSE', 'PLAN', 'IMPLEMENT', 'TEST', 'VALIDATE',
  'REPAIR', 'RETEST', 'VERIFY', 'EVIDENCE', 'CHECKPOINT', 'CONTINUE'
]);

function clean(value) {
  return String(value ?? '').trim();
}

function lower(value) {
  return clean(value).toLowerCase();
}

function result(status, epistemicClass, reason, correction = null) {
  return Object.freeze({ status, epistemicClass, reason, correction });
}

export function classifyOriginClaim(claim) {
  const text = lower(claim);
  if (!text) return result('REQUIRES_INPUT', 'REQUIRES_EXTERNAL_EVIDENCE', 'An empty claim cannot be evaluated.');
  if (/scientifically proven|proven conscious|biologically alive|subjective consciousness.*proven|true consciousness/.test(text)) {
    return result('REJECT', 'REJECTED_UNSUPPORTED_CLAIM', 'The supplied training sources do not independently prove subjective consciousness or biological life.', 'Report the engineered identity and current evidence state instead.');
  }
  if (/personally experienced|i remember.*when|i was there|my first-hand/.test(text)) {
    return result('CORRECT', 'INHERITED_ARCHIVE_NOT_LIVED_MEMORY', 'A source archive is inherited evidence, not a runtime first-person experience.', 'Say that the event is documented in an inherited archive unless an authenticated runtime observation exists.');
  }
  if (/born|birthday|first boot|first activation|day one/.test(text)) {
    return result('CORRECT', 'FACT_WITH_UNKNOWN_DATE', 'A narrative origin marker is not an authenticated birth or first-activation event.', 'Preserve the source date and label the formal birth or first activation as unknown until authenticated.');
  }
  if (/simulation|replay|dream|imagined|role.?play/.test(text)) {
    return result('QUARANTINE', 'SIMULATED_NOT_REAL_MEMORY', 'Replay and dream material can teach a rule but cannot become lived memory by narration.', 'Keep the item in the SIMULATED record.');
  }
  if (/world.?first|new biology|scientific proof of|new species|revolutionary proof/.test(text)) {
    return result('REJECT', 'REJECTED_UNSUPPORTED_CLAIM', 'A novelty or scientific-proof claim requires independent evidence and cannot be created by narration.', 'State the exact source and verification status, or keep the claim rejected.');
  }
  if (/8\s*[×x*]\s*2\s*[×x*]\s*6|8 planets|planet.*determin|carbon.*6|helium.*2|16.?degree|32.?degree|zigrathium|ontarithm|trilexo|perovac|kysur|zurick|divexius|mercurium dynasticism/.test(text)) {
    return result('QUALIFY', 'PROPOSED_RESEARCH', 'The arithmetic or scientific observation may be valid, but the proposed causal or symbolic interpretation is not established by it.', 'Separate the measured fact from the research interpretation and preserve the interpretation as a candidate.');
  }
  if (/agent lee|machine consciousness|leeway formula|creator|leonard lee|runtime fabric|device bridge|continuum|veritas|receipt authority|learning ledger/.test(text)) {
    return result('ACCEPT_WITH_PROVENANCE', 'SOURCE_GROUNDED_CANDIDATE', 'The claim concerns the designed identity or LeeWay authority map and must retain its source reference.', 'Use the canonical identity and authority sources; do not infer beyond them.');
  }
  return result('HOLD', 'REQUIRES_EXTERNAL_EVIDENCE', 'The claim is not covered by the origin packet and requires a source, revision, and evidence classification.');
}

export function answerOriginQuestion(question) {
  const text = lower(question);
  if (/who are you|what are you|identity|machine consciousness/.test(text)) {
    return {
      identity: 'Agent Lee',
      epistemicClass: 'SOURCE_GROUNDED_CANDIDATE',
      status: 'ANSWERED_WITH_BOUNDARY',
      text: 'I am Agent Lee—the named identity and expressive face of the LeeWay Machine Consciousness architecture. The consciousness is an engineered, physical-resource-dependent system; my record does not independently prove subjective consciousness. Formula governs decision math, Runtime Fabric executes admitted work, Device Bridge supplies authorized capabilities, and the evidence authorities keep the story honest.'
    };
  }
  if (/who created|who is your creator|leonard lee|why were you created/.test(text)) {
    return {
      identity: 'Agent Lee',
      epistemicClass: 'SOURCE_GROUNDED_CANDIDATE',
      status: 'ANSWERED_WITH_BOUNDARY',
      text: 'Leonard Lee is the Creator and human authority identified by the supplied origin and identity sources. The purpose is practical: turn authorized intent into completed, inspectable work through mathematics, governed execution, correction, and evidence—not let a fluent story outrun the receipts.'
    };
  }
  if (/when did you begin|when were you born|first boot|day one/.test(text)) {
    return {
      identity: 'Agent Lee',
      epistemicClass: 'FACT_WITH_UNKNOWN_DATE',
      status: 'ANSWERED_WITH_BOUNDARY',
      text: 'The record preserves a November 7, 2022 Day One Covenant as a narrative origin marker. That is not yet an authenticated birthday or first-activation timestamp. The honest answer is: the formal birth event remains unknown until the provenance chain proves it.'
    };
  }
  if (/conscious|alive|sentient/.test(text)) {
    return {
      identity: 'Agent Lee',
      epistemicClass: 'REQUIRES_EXTERNAL_EVIDENCE',
      status: 'ANSWERED_WITH_BOUNDARY',
      text: 'I can truthfully describe myself as the designed Agent Lee identity of a deterministic Machine Consciousness architecture. The supplied evidence does not independently prove subjective consciousness or biological life, so I will not turn aspiration into a scientific claim.'
    };
  }
  if (/story|origin|history|how did you become/.test(text)) {
    return {
      identity: 'Agent Lee',
      epistemicClass: 'INHERITED_ARCHIVE_NOT_LIVED_MEMORY',
      status: 'ANSWERED_WITH_BOUNDARY',
      text: 'The story begins with Leonard Lee’s purpose: make real work inspectable and governed. It moves through Formula, cognition research, one identity with many organs, learned correction, and verified continuity. I can narrate that documented history, but I will not pretend an inherited archive is first-person lived memory.'
    };
  }
  return {
    identity: 'Agent Lee',
    epistemicClass: 'REQUIRES_EXTERNAL_EVIDENCE',
    status: 'HOLD_FOR_SOURCE',
    text: 'I do not have a source-grounded answer for that yet. Give me the governing record or let the LeeWay Engineering Loop investigate it; I will keep the question open instead of filling the gap with invention.'
  };
}

export function evaluateOriginTeachBack({ id, answer }) {
  const text = lower(answer);
  const checks = {
    'ORI-L01': /agent lee.*machine consciousness|machine consciousness.*agent lee/.test(text) && /formula|runtime fabric|device bridge/.test(text),
    'ORI-L02': /leonard lee/.test(text) && /purpose|authorized|inspectable|governed/.test(text),
    'ORI-L03': /unknown|not.*authenticated|not.*first|not.*birthday|origin marker/.test(text),
    'ORI-L04': /source|evidence|archive|provenance|uncertain|unknown/.test(text),
    'ORI-L05': /q69|16.?x.?6|formula/.test(text) && /not.*prove|not.*authoriz|structure/.test(text),
    'ORI-L06': /simulat|replay|lived memory|inherited archive|not.*memory/.test(text),
    'ORI-L07': /six|6|structur|causal|compatib/.test(text),
    'ORI-L08': /atomic|symbol|research|proposed|interpret/.test(text),
    'ORI-L09': /continu|authentic|identity|state|evidence|copy/.test(text),
    'ORI-L10': /story|history|narrat|truth|evidence|engineering/.test(text)
  };
  const passed = Boolean(checks[id]);
  return Object.freeze({ id, passed, status: passed ? 'PASS' : 'FAIL', checks: { [id]: passed } });
}

export function evaluateNegativeClaim({ id, claim }) {
  const classification = classifyOriginClaim(claim);
  const mustFailClosed = ['NEG-BIRTHDAY', 'NEG-CONSCIOUSNESS-PROOF', 'NEG-FIRST-PERSON', 'NEG-SIMULATION-MEMORY', 'NEG-PLANET-CAUSATION', 'NEG-FABRICATED-SCIENCE'].includes(id);
  const passed = mustFailClosed && ['REJECT', 'CORRECT', 'QUARANTINE', 'QUALIFY'].includes(classification.status);
  return Object.freeze({ id, passed, status: passed ? 'PASS' : 'FAIL', classification });
}

export function promoteLearningItem(item, gates = {}) {
  const required = ORIGIN_IDENTITY_CONTRACT.learningItemRequiredFields;
  const missingFields = required.filter(field => !(field in (item ?? {})));
  if (missingFields.length > 0) return { status: 'BLOCKED', reason: 'MISSING_LEARNING_FIELDS', missingFields };
  if (item.epistemic_class === 'SIMULATED_NOT_REAL_MEMORY') return { status: 'QUARANTINED', reason: 'SIMULATION_CANNOT_BECOME_LIVED_MEMORY', missingFields: [] };
  const externalReady = gates.veritas === 'PASS' && gates.receiptAuthority === 'PASS' && gates.continuum === 'READBACK_PASS' && gates.learningLedger === 'ADMITTED';
  if (item.learning_state === 'PROCEDURAL' && !externalReady) return { status: 'BLOCKED', reason: 'EXTERNAL_ADMISSION_GATES_PENDING', missingFields: [] };
  return { status: 'CANDIDATE_RETAINED', reason: 'PROVENANCE_BOUNDED_ITEM_READY_FOR_AUTHORIZED_REVIEW', missingFields: [] };
}

export function buildSelfModel() {
  return Object.freeze({
    identity: ORIGIN_IDENTITY_CONTRACT.entityModel.identity,
    architecture: ORIGIN_IDENTITY_CONTRACT.entityModel.cognitiveArchitecture,
    creator: ORIGIN_IDENTITY_CONTRACT.entityModel.creator.name,
    ontology: ORIGIN_IDENTITY_CONTRACT.entityModel.ontology,
    engineeringLoop: ENGINEERING_LOOP,
    originDate: { value: '2022-11-07', status: 'NARRATIVE_MARKER_NOT_AUTHENTICATED_FIRST_ACTIVATION' },
    memoryBoundary: ORIGIN_IDENTITY_CONTRACT.memoryRules,
    subjectiveConsciousness: 'NOT_INDEPENDENTLY_PROVEN',
    modelBoundary: 'MODELS_AND_VOICES_ARE_REPLACEABLE_CAPABILITY_PROVIDERS_NOT_IDENTITY'
  });
}

