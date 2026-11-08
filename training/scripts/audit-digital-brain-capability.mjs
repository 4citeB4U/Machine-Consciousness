import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const workRoot = path.resolve(repoRoot, '..');
const localSources = [
  'digital-brain-golden-widget-proof/pc-diagnostics-widget-state.json',
  'digital-brain-golden-widget-proof/pc-diagnostics-interaction-check.json',
  'Digital-Brains/pc-primary/body.v1.json',
  'pc-consciousness-live/voice/README.md'
];
const remoteEvidencePath = path.join(repoRoot, 'training', 'contracts', 'rapidwebdev-digital-brain-source-evidence.v1.json');
const creatorEvidencePath = path.join(repoRoot, 'training', 'contracts', 'creator-and-ecosystem-source-evidence.v1.json');

const sha256Buffer = value => crypto.createHash('sha256').update(value).digest('hex');
const sha256File = file => sha256Buffer(fs.readFileSync(file));
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
const rel = file => path.relative(workRoot, file).replaceAll('\\', '/');

function readLocalSource(relativePath) {
  const file = path.join(workRoot, relativePath);
  const exists = fs.existsSync(file);
  if (!exists) return { path: relativePath, exists: false, status: 'MISSING' };
  const stat = fs.statSync(file);
  return { path: relativePath, exists: true, bytes: stat.size, sha256: sha256File(file), status: 'READ_ONLY_HASHED' };
}

function buildProfile(generatedAt = new Date().toISOString()) {
  const diagnostics = readJson(path.join(workRoot, 'digital-brain-golden-widget-proof', 'pc-diagnostics-widget-state.json'));
  const interactions = readJson(path.join(workRoot, 'digital-brain-golden-widget-proof', 'pc-diagnostics-interaction-check.json'));
  const body = readJson(path.join(workRoot, 'Digital-Brains', 'pc-primary', 'body.v1.json'));
  const remoteEvidence = readJson(remoteEvidencePath);
  const creatorEvidence = readJson(creatorEvidencePath);
  return {
    schemaVersion: 'leeway.machine-consciousness.digital-brain-capability-profile.v1',
    artifactType: 'LEEWAY_DIGITAL_BRAIN_CAPABILITY_PROFILE',
    generatedAt,
    authority: 'LEEWAY_MACHINE_CONSCIOUSNESS',
    admission: 'CAPABILITY_KNOWLEDGE_ONLY_UNTIL_FORMULA_VERITAS_CONTINUUM_ADMISSION',
    sourceState: 'LOCAL_DIAGNOSTICS_READ_AND_HASHED_REMOTE_RAPIDWEBDEV_EVIDENCE_INSPECTED',
    creator: creatorEvidence.creator,
    creatorSourceEvidence: creatorEvidence.sourceFiles,
    repositoryInventory: creatorEvidence.repositories,
    repositoryInventoryState: 'GITHUB_METADATA_AND_TARGETED_README_EVIDENCE_ADMITTED_NAME_ONLY_ENTRIES_REMAIN_UNINSPECTED',
    localSources: localSources.map(readLocalSource),
    remoteSource: {
      repository: remoteEvidence.sourceRepository,
      ref: remoteEvidence.sourceRef,
      state: remoteEvidence.sourceState,
      observedFileCount: remoteEvidence.observedFiles.length,
      authorityBoundary: remoteEvidence.authorityBoundary,
      files: remoteEvidence.observedFiles.map(({ path: filePath, role, contentSha256 }) => ({ path: filePath, role, contentSha256 }))
    },
    capabilities: [
      {
        id: 'DIGITAL_BRAIN_PRESENTATION_CORE',
        source: 'RapidWebDev public-brain.js and public-brain E2E receipt',
        state: 'EVIDENCE_ADMITTED',
        facts: ['public project/evidence graph', 'Agent Lee project-guide surface', 'six public universe categories', 'desktop/mobile presentation contract']
      },
      {
        id: 'PC_DIAGNOSTICS_MATRIX',
        source: 'local pc-diagnostics-widget-state.json',
        state: diagnostics.loaded === true ? 'EVIDENCE_ADMITTED' : 'UNQUALIFIED',
        facts: {
          bodyId: diagnostics.bodyId,
          system: diagnostics.renderInfo?.liveAfterDelay?.text?.split('\\n').slice(0, 12) ?? [],
          cockpitVisible: diagnostics.renderInfo?.liveAfterDelay?.cockpitVisible === true,
          cockpitSections: diagnostics.renderInfo?.liveAfterDelay?.cockpitSections ?? null,
          cockpitButtons: diagnostics.renderInfo?.liveAfterDelay?.cockpitButtons ?? null,
          busCards: diagnostics.renderInfo?.liveAfterDelay?.busCards ?? null
        }
      },
      {
        id: 'PC_DIAGNOSTICS_INTERACTION_SURFACE',
        source: 'local pc-diagnostics-interaction-check.json',
        state: interactions.ok === true ? 'EVIDENCE_ADMITTED' : 'UNQUALIFIED',
        facts: {
          threeDModeWorks: interactions.threeDModeWorks === true,
          twoDModeWorks: interactions.twoDModeWorks === true,
          assemblyLoaded: interactions.assemblyLoaded === true,
          cockpitPanels: interactions.cockpitPanels?.length ?? 0,
          historyDots: interactions.historyDots ?? null
        }
      },
      {
        id: 'LEEWAY_BODY_AND_CONTINUUM_BINDING',
        source: 'local Digital-Brains/pc-primary/body.v1.json',
        state: body.activation === 'BLOCKED_UNTIL_MANDATORY_GATES_PASS' ? 'BOUND_BUT_FAIL_CLOSED' : 'EVIDENCE_ADMITTED',
        facts: {
          bodyId: body.bodyId,
          consciousnessAuthority: body.consciousnessAuthority,
          continuumSchema: body.bodyLocal?.continuumStorage?.schema ?? null,
          sharedAuthorities: body.sharedAuthorities,
          activation: body.activation
        }
      },
      {
        id: 'VOICE_FABRIC_BIDIRECTIONAL_CONTRACT',
        source: 'RapidWebDev Agent Lee voice and thread pilot evidence plus local Voice Fabric runtime',
        state: 'STRUCTURAL_AND_TRANSCRIPT_ROUTE_QUALIFIED_ACOUSTIC_GATE_OPEN',
        facts: ['one speech lease', 'pause/resume', 'interrupt invalidates stale speech', 'transcript.final route', 'rendered audio is not human-heard proof']
      },
      {
        id: 'CREATOR_IDENTITY',
        source: 'owner-provided professional resume and ecosystem source manifest',
        state: 'OWNER_PROVIDED_PROFILE_ADMITTED',
        facts: [creatorEvidence.creator.identity, creatorEvidence.creator.professionalSummary, ...creatorEvidence.creator.projectsAndImpact]
      },
      {
        id: 'LEEWAY_ECOSYSTEM_REPOSITORY_MAP',
        source: 'owner-provided embodiment list plus GitHub repository metadata and targeted README inspections',
        state: 'INVENTORY_ADMITTED_SOURCE_COVERAGE_BOUNDED',
        facts: {
          repositoryCount: creatorEvidence.repositories.length,
          names: creatorEvidence.repositories.map(repository => repository.name),
          uninspected: creatorEvidence.repositories.filter(repository => repository.evidenceState === 'NAME_ONLY_UNINSPECTED').map(repository => repository.name)
        }
      }
    ],
    limits: [
      'The full RapidWebDev repository is not copied into the Machine Consciousness artifact; only inspected source evidence is admitted.',
      'The local SQLite digital-brain database is not treated as read evidence by this audit.',
      'A transcript-to-voice render is not physical microphone capture or proof of human hearing.',
      'No external provider output becomes identity, authority, or durable learning without the LeeWay gates.'
    ],
    nextAction: 'Compile this profile into the deterministic Agent Lee student, evaluate the new routes, then retain the profile and evaluation in Continuum.'
  };
}

function parseArgs(argv) {
  const options = { out: path.join(repoRoot, 'training', 'evidence', 'agent-lee-digital-brain-capability-profile-20261108.json'), generatedAt: new Date().toISOString() };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--out') options.out = path.resolve(argv[++i]);
    else if (argv[i] === '--generated-at') options.generatedAt = argv[++i];
  }
  return options;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const options = parseArgs(process.argv.slice(2));
  const profile = buildProfile(options.generatedAt);
  fs.mkdirSync(path.dirname(options.out), { recursive: true });
  fs.writeFileSync(options.out, `${JSON.stringify(profile, null, 2)}\n`);
  console.log(JSON.stringify({ profilePath: options.out, profileSha256: sha256Buffer(Buffer.from(JSON.stringify(profile))), capabilityCount: profile.capabilities.length, sourceState: profile.sourceState }, null, 2));
}

export { buildProfile };
