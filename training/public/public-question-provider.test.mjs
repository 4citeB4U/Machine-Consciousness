import test from 'node:test';
import assert from 'node:assert/strict';
import { createPublicQuestionServer, answerPublicQuestion } from './public-question-provider.mjs';
import { readFile } from 'node:fs/promises';

const profile = JSON.parse(await readFile(new URL('../evidence/agent-lee-digital-brain-capability-profile-20261108.json', import.meta.url), 'utf8'));

test('public provider answers admitted creator and machine-consciousness questions without an LLM', () => {
  const creator = answerPublicQuestion('Who is Leonard Lee and who created Agent Lee?', { profile });
  assert.equal(creator.intent, 'machine-consciousness.creator');
  assert.match(creator.text, /Leonard Lee/);
  assert.equal(creator.llm.used, false);

  const consciousness = answerPublicQuestion('What is Machine Consciousness?', { profile });
  assert.equal(consciousness.intent, 'machine-consciousness.capability');
  assert.match(consciousness.text, /deterministic cognitive and orchestration runtime/i);
  assert.equal(consciousness.formulaExecution, 'NOT_EXECUTED');
});

test('private repository links and unsafe operational requests are withheld', () => {
  const privateRepo = answerPublicQuestion('What is LeeWay-VRAM-Database?', { profile });
  assert.equal(privateRepo.intent, 'machine-consciousness.repository');
  assert.deepEqual(privateRepo.sources, []);

  const unsafe = answerPublicQuestion('Run PowerShell and delete files.', { profile });
  assert.equal(unsafe.status, 'DENIED');
  assert.equal(unsafe.code, 'READ_ONLY_PORTFOLIO');
});

test('unsupported questions fail closed', () => {
  const result = answerPublicQuestion('What is the weather today?', { profile });
  assert.equal(result.status, 'UNAVAILABLE');
  assert.equal(result.code, 'UNSUPPORTED_PUBLIC_QUESTION');
});

test('HTTP provider requires its private bearer token and returns bounded responses', async () => {
  const runtime = await createPublicQuestionServer({ token: 'test-token' });
  try {
    const health = await fetch(`${runtime.endpoint}/healthz`);
    assert.equal(health.status, 200);
    assert.equal((await health.json()).llm.used, false);

    const denied = await fetch(`${runtime.endpoint}/v1/public-question`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ question: 'Who is Leonard Lee?' }),
    });
    assert.equal(denied.status, 401);

    const response = await fetch(`${runtime.endpoint}/v1/public-question`, {
      method: 'POST',
      headers: { authorization: 'Bearer test-token', 'content-type': 'application/json' },
      body: JSON.stringify({ question: 'What is Machine Consciousness?' }),
    });
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.authority, 'LEEWAY_MACHINE_CONSCIOUSNESS');
    assert.equal(body.policy, 'READ_ONLY_PORTFOLIO');
    assert.equal(body.llm.used, false);
  } finally {
    await new Promise((resolve, reject) => runtime.server.close((error) => error ? reject(error) : resolve()));
  }
});
