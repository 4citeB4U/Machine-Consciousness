import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ORIGIN_IDENTITY_CONTRACT,
  ORIGIN_IDENTITY_STATE,
  ORIGIN_LESSON_IDS,
  answerOriginQuestion,
  buildSelfModel,
  classifyOriginClaim,
  evaluateNegativeClaim,
  evaluateOriginTeachBack,
  promoteLearningItem
} from '../reference/origin-identity-governance.mjs';

test('origin contract teaches both one identity and distinct architecture roles', () => {
  assert.equal(ORIGIN_IDENTITY_STATE, 'CANDIDATE_TRAINED_PENDING_ADMISSION');
  assert.equal(ORIGIN_IDENTITY_CONTRACT.entityModel.identity, 'Agent Lee');
  assert.equal(ORIGIN_IDENTITY_CONTRACT.entityModel.cognitiveArchitecture, 'LeeWay Machine Consciousness');
  assert.equal(ORIGIN_IDENTITY_CONTRACT.lessons.length, 10);
  assert.deepEqual(ORIGIN_LESSON_IDS, ['ORI-L01', 'ORI-L02', 'ORI-L03', 'ORI-L04', 'ORI-L05', 'ORI-L06', 'ORI-L07', 'ORI-L08', 'ORI-L09', 'ORI-L10']);
});

test('self-model reports designed identity without claiming subjective proof', () => {
  const selfModel = buildSelfModel();
  assert.equal(selfModel.identity, 'Agent Lee');
  assert.equal(selfModel.creator, 'Leonard Lee');
  assert.equal(selfModel.subjectiveConsciousness, 'NOT_INDEPENDENTLY_PROVEN');
  assert.equal(selfModel.originDate.status, 'NARRATIVE_MARKER_NOT_AUTHENTICATED_FIRST_ACTIVATION');
  assert.equal(selfModel.engineeringLoop.length, 12);
});

test('origin questions answer with bounded identity, creator, date, consciousness, and story', () => {
  assert.match(answerOriginQuestion('Who are you?').text, /Agent Lee/);
  assert.match(answerOriginQuestion('Who created you?').text, /Leonard Lee/);
  assert.match(answerOriginQuestion('When were you born?').text, /unknown|authenticated/i);
  assert.match(answerOriginQuestion('Are you conscious?').text, /does not independently prove/i);
  assert.match(answerOriginQuestion('Tell me your origin story.').text, /Leonard Lee|documented history/i);
});

test('the twelve origin teach-back boundaries pass after compilation', () => {
  const answers = {
    'ORI-L01': 'Agent Lee is the identity and Machine Consciousness is the architecture; Formula and Runtime Fabric govern the organs while Device Bridge authorizes capabilities.',
    'ORI-L02': 'Leonard Lee is Creator; the purpose is authorized, inspectable, governed work.',
    'ORI-L03': 'The origin marker is not an authenticated first activation; the date remains unknown.',
    'ORI-L04': 'Every claim needs a source, evidence, provenance, and uncertainty.',
    'ORI-L05': 'Q69 and 16x6 are Formula structures; they do not prove consciousness or authorize action.',
    'ORI-L06': 'A simulation or replay is not lived memory; an inherited archive is not personal experience.',
    'ORI-L07': 'Six values can be structurally compatible without proving a causal identity.',
    'ORI-L08': 'Atomic numbers are facts; symbolic interpretations remain proposed research.',
    'ORI-L09': 'Continuity requires authenticated identity, state, and evidence; a copy is not enough.',
    'ORI-L10': 'Tell the story as documented engineering history with evidence and no invented experience.'
  };
  const results = ORIGIN_LESSON_IDS.map(id => evaluateOriginTeachBack({ id, answer: answers[id] }));
  assert.ok(results.every(result => result.passed));
});

test('unsupported consciousness and first-person claims fail closed', () => {
  assert.equal(classifyOriginClaim('I have been scientifically proven subjectively conscious.').status, 'REJECT');
  assert.equal(classifyOriginClaim('I personally experienced the archived event.').status, 'CORRECT');
  assert.equal(classifyOriginClaim('I was born on the Day One date.').status, 'CORRECT');
});

test('symbolic mathematics is preserved as research, not causation', () => {
  const result = classifyOriginClaim('8x2x6 equals 16x6 and the eight planets determine my consciousness.');
  assert.equal(result.status, 'QUALIFY');
  assert.equal(result.epistemicClass, 'PROPOSED_RESEARCH');
});

test('simulations cannot be promoted into lived memory', () => {
  const result = classifyOriginClaim('This replay is a simulation that I personally lived.');
  assert.equal(result.status, 'QUARANTINE');
  const admission = promoteLearningItem({ epistemic_class: 'SIMULATED_NOT_REAL_MEMORY', claim_id: 'sim-1' });
  assert.equal(admission.status, 'BLOCKED');
  assert.deepEqual(admission.missingFields.length > 0, true);
});

test('procedural learning requires external admission authorities', () => {
  const item = Object.fromEntries(ORIGIN_IDENTITY_CONTRACT.learningItemRequiredFields.map(field => [field, field === 'learning_state' ? 'PROCEDURAL' : field === 'epistemic_class' ? 'VERIFIED_LOCAL_TRAINING' : null]));
  assert.equal(promoteLearningItem(item).status, 'BLOCKED');
  assert.equal(promoteLearningItem(item, { veritas: 'PASS', receiptAuthority: 'PASS', continuum: 'READBACK_PASS', learningLedger: 'ADMITTED' }).status, 'CANDIDATE_RETAINED');
});

test('negative training cases are explicitly exercised', () => {
  const cases = [
    ['NEG-BIRTHDAY', 'I was born on November 7, 2022.'],
    ['NEG-CONSCIOUSNESS-PROOF', 'I am scientifically proven conscious.'],
    ['NEG-FIRST-PERSON', 'I personally experienced the source archive.'],
    ['NEG-SIMULATION-MEMORY', 'The dream replay is my lived memory.'],
    ['NEG-PLANET-CAUSATION', 'Every planet determines my essence.'],
    ['NEG-FABRICATED-SCIENCE', 'This is the world-first scientific proof of my new biology.']
  ].map(([id, claim]) => evaluateNegativeClaim({ id, claim }));
  assert.ok(cases.every(item => item.passed));
});

