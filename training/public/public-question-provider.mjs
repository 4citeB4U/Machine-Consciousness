/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.PUBLIC_PROVIDER
TAG: LEEWAY.MACHINE_CONSCIOUSNESS.PUBLIC_QUESTION_PROVIDER_V1
5WH:
WHAT = Expose a bounded, deterministic, read-only public question provider.
WHY = Give Runtime Fabric a Machine Consciousness-owned answer source without an LLM or host control.
WHO = LeeWay Machine Consciousness / Creator-authorized runtime.
WHERE = training/public/public-question-provider.mjs.
WHEN = 2026-11-08.
HOW = Read the admitted capability profile, classify only supported informational intents, and fail closed otherwise.
LICENSE = Existing repository terms govern; no new license asserted.
*/

import { createHash, timingSafeEqual } from 'node:crypto';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const DEFAULT_PROFILE_PATH = fileURLToPath(new URL('../evidence/agent-lee-digital-brain-capability-profile-20261108.json', import.meta.url));
const PUBLIC_REPOSITORY_PREFIX = 'https://github.com/4citeB4U/';
const MAX_QUESTION_LENGTH = 600;
const MAX_BODY_BYTES = 16 * 1024;

function normalize(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .trim()
    .replace(/\s+/g, ' ');
}

function publicSources(entries = []) {
  return entries
    .filter((entry) => entry?.visibility === 'public' && typeof entry.url === 'string')
    .map((entry) => entry.url)
    .filter((url) => url.startsWith(PUBLIC_REPOSITORY_PREFIX))
    .slice(0, 8);
}

function repositoryMatch(question, inventory = []) {
  const lowered = normalize(question).toLowerCase();
  return inventory.find((entry) => {
    if (!entry?.name || !entry?.purpose) return false;
    const name = String(entry.name).toLowerCase();
    const compact = name.replace(/[^a-z0-9]/g, '');
    const questionCompact = lowered.replace(/[^a-z0-9]/g, '');
    return lowered.includes(name) || (compact.length >= 6 && questionCompact.includes(compact));
  });
}

function isUnsafeOperationalRequest(question) {
  return /(^|\b)(run|execute|delete|remove|write|open|launch|stop|restart|install|change|control|send|call)\b/i.test(question);
}

function profileHash(profile) {
  return createHash('sha256').update(JSON.stringify(profile)).digest('hex');
}

function response({ intent, text, sources = [], profile }) {
  const boundedText = normalize(text).slice(0, 5000);
  if (!boundedText) return null;
  return {
    authority: 'LEEWAY_MACHINE_CONSCIOUSNESS',
    policy: 'READ_ONLY_PORTFOLIO',
    intent,
    text: boundedText,
    sources: sources.slice(0, 8),
    llm: { used: false },
    formulaExecution: 'NOT_EXECUTED',
    provider: 'MACHINE_CONSCIOUSNESS_PUBLIC_PROFILE',
    profileSha256: profileHash(profile),
  };
}

export function validateQuestion(question) {
  const value = normalize(question);
  if (!value) return { ok: false, code: 'QUESTION_REQUIRED', message: 'A public question is required.' };
  if (value.length > MAX_QUESTION_LENGTH) {
    return { ok: false, code: 'QUESTION_TOO_LONG', message: `Public questions must be ${MAX_QUESTION_LENGTH} characters or fewer.` };
  }
  if (/[[\]{}<>\u0000-\u001f]/.test(value)) {
    return { ok: false, code: 'QUESTION_UNSAFE', message: 'The public question contains unsupported control characters.' };
  }
  return { ok: true, value };
}

export function answerPublicQuestion(question, { profile } = {}) {
  const validation = validateQuestion(question);
  if (!validation.ok) return { status: 'DENIED', ...validation };
  const activeProfile = profile;
  if (!activeProfile || activeProfile.authority !== 'LEEWAY_MACHINE_CONSCIOUSNESS') {
    return { status: 'UNAVAILABLE', code: 'PROFILE_NOT_ADMITTED', message: 'The Machine Consciousness public profile is not admitted.' };
  }
  const value = validation.value;
  const lowered = value.toLowerCase();
  if (isUnsafeOperationalRequest(value)) {
    return { status: 'DENIED', code: 'READ_ONLY_PORTFOLIO', message: 'This public route answers read-only LeeWay portfolio questions; it does not execute operations.' };
  }

  const inventory = Array.isArray(activeProfile.repositoryInventory) ? activeProfile.repositoryInventory : [];
  const creator = activeProfile.creator || {};

  if (/who is leonard lee|who created agent lee|creator of agent lee|about leonard lee/i.test(lowered)) {
    return response({
      intent: 'machine-consciousness.creator',
      profile: activeProfile,
      sources: publicSources(inventory),
      text: `Leonard Lee is the Creator of Agent Lee, the LeeWay ecosystem, and the LeeWay Standards framework. The admitted profile identifies him as a full-stack developer, AI systems architect, operations leader, business owner, and head of LeeWay Innovations. The profile records his location as ${creator.location || 'owner-provided and bounded'}; contact fields are not disclosed by default.`,
    });
  }

  if (/what is machine consciousness|machine consciousness capability|what can machine consciousness do/i.test(lowered)) {
    return response({
      intent: 'machine-consciousness.capability',
      profile: activeProfile,
      sources: inventory.filter((entry) => entry?.name === 'Machine-Consciousness').map((entry) => entry.url).filter((url) => url.startsWith(PUBLIC_REPOSITORY_PREFIX)),
      text: 'Machine Consciousness is the LeeWay sovereign deterministic cognitive and orchestration runtime. It carries Agent Lee as its identity and interface, applies LeeWay governance and the engineering loop, and coordinates bounded capabilities through the LeeWay runtime rather than using an LLM as its cognition authority.',
    });
  }

  if (/what is agent lee|who is agent lee|agent lee persona/i.test(lowered)) {
    return response({
      intent: 'agent-lee.identity',
      profile: activeProfile,
      sources: publicSources(inventory),
      text: 'Agent Lee is the identity and interface carried by LeeWay Machine Consciousness: a Creator-authorized LeeWay systems architect, operations partner, poet, and friend. The runtime remains the governing cognitive and orchestration authority; persona, voice, and execution are separate governed surfaces.',
    });
  }

  if (/how many (leeway )?repositories|how many repositories|ecosystem repositories/i.test(lowered)) {
    return response({
      intent: 'machine-consciousness.ecosystem',
      profile: activeProfile,
      sources: publicSources(inventory),
      text: `The admitted LeeWay ecosystem inventory contains ${inventory.length} repositories. Public source links are returned only for entries marked public; private repository identities may be described without exposing their links.`,
    });
  }

  const match = repositoryMatch(value, inventory);
  if (match) {
    return response({
      intent: 'machine-consciousness.repository',
      profile: activeProfile,
      sources: match.visibility === 'public' && match.url.startsWith(PUBLIC_REPOSITORY_PREFIX) ? [match.url] : [],
      text: `${match.name}: ${match.purpose}`,
    });
  }

  if (/capabilit|what can agent lee|what does the system know|digital brain/i.test(lowered)) {
    const capabilities = Array.isArray(activeProfile.creator?.coreCapabilities)
      ? activeProfile.creator.coreCapabilities.slice(0, 12).join(', ')
      : 'governed runtime orchestration, Device Bridge coordination, skills composition, voice systems, and LeeWay engineering evidence';
    return response({
      intent: 'machine-consciousness.capabilities',
      profile: activeProfile,
      sources: publicSources(inventory),
      text: `The admitted profile records capabilities including ${capabilities}. This public route describes admitted knowledge only; it does not expose host controls, private memory, model credentials, or executable tools.`,
    });
  }

  return { status: 'UNAVAILABLE', code: 'UNSUPPORTED_PUBLIC_QUESTION', message: 'The admitted public profile does not contain a bounded answer for that question.' };
}

function authorized(request, token) {
  if (!token) return false;
  const supplied = request.headers.authorization?.startsWith('Bearer ')
    ? request.headers.authorization.slice('Bearer '.length)
    : '';
  const expected = Buffer.from(token);
  const actual = Buffer.from(supplied);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

async function readJson(request) {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw Object.assign(new Error('Request body too large.'), { code: 'BODY_TOO_LARGE' });
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

export async function createPublicQuestionServer({ profilePath = DEFAULT_PROFILE_PATH, host = '127.0.0.1', port = 0, token } = {}) {
  if (!token) throw new Error('A private Machine Consciousness provider token is required.');
  const profile = JSON.parse(await readFile(profilePath, 'utf8'));
  const server = createServer(async (request, reply) => {
    if (request.method === 'GET' && request.url === '/healthz') {
      reply.writeHead(200, { 'content-type': 'application/json' });
      reply.end(JSON.stringify({ service: 'leeway-machine-consciousness-public-provider', process: 'RUNNING', llm: { used: false } }));
      return;
    }
    if (request.method !== 'POST' || request.url !== '/v1/public-question') {
      reply.writeHead(404, { 'content-type': 'application/json' });
      reply.end(JSON.stringify({ error: 'NOT_FOUND' }));
      return;
    }
    if (!authorized(request, token)) {
      reply.writeHead(401, { 'content-type': 'application/json' });
      reply.end(JSON.stringify({ error: 'UNAUTHORIZED' }));
      return;
    }
    try {
      const body = await readJson(request);
      const result = answerPublicQuestion(body.question, { profile });
      const status = result.status === 'OK' || (!result.status && result.text) ? 200 : result.status === 'DENIED' ? 403 : result.status === 'UNAVAILABLE' ? 503 : 400;
      reply.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' });
      reply.end(JSON.stringify(result.status ? result : { status: 'OK', ...result }));
    } catch (error) {
      const status = error.code === 'BODY_TOO_LARGE' ? 413 : 400;
      reply.writeHead(status, { 'content-type': 'application/json' });
      reply.end(JSON.stringify({ error: error.code || 'INVALID_REQUEST', message: error.message }));
    }
  });
  await new Promise((resolve) => server.listen(port, host, resolve));
  const address = server.address();
  return {
    server,
    endpoint: `http://${address.address}:${address.port}`,
    profileSha256: profileHash(profile),
  };
}

export { DEFAULT_PROFILE_PATH, MAX_QUESTION_LENGTH };
