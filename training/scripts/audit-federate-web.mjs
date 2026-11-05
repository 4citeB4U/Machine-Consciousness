#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const REQUIRED_FILES = [
  'README.md',
  'bootstrap.json',
  'ecosystem.manifest.json',
  'src/core/pairing.js',
  'src/core/peer-session.js',
  'src/core/receipts.js',
  'docs/INTEGRATION-MAP.md'
];

function parseArgs(argv) {
  let repo = process.env.LEEWAY_FEDERATE_WEB_ROOT ?? null;
  let browserReceipt = process.env.LEEWAY_FEDERATE_WEB_BROWSER_RECEIPT ?? null;
  let out = null;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--repo') repo = argv[++i];
    else if (argv[i] === '--browser-receipt') browserReceipt = argv[++i];
    else if (argv[i] === '--out') out = argv[++i];
    else if (argv[i] === '--help' || argv[i] === '-h') return { help: true, repo, browserReceipt, out };
    else throw new Error(`Unknown argument: ${argv[i]}`);
  }
  return { help: false, repo, browserReceipt, out };
}

function git(repo, args) {
  const result = spawnSync('git', ['-C', repo, ...args], { encoding: 'utf8', windowsHide: true });
  if (result.error || result.status !== 0) return null;
  return result.stdout.trim();
}

export function auditFederateWeb(repo, { browserReceipt = null } = {}) {
  const root = path.resolve(repo);
  const missing = REQUIRED_FILES.filter((relative) => !existsSync(path.join(root, relative)));
  if (missing.length) {
    return {
      providerId: 'leeway-federate-web',
      localPath: root,
      sourceState: 'INCOMPLETE',
      missing,
      runtimeState: 'UNVERIFIED',
      noAuthorityDuplication: false
    };
  }
  const bootstrap = JSON.parse(readFileSync(path.join(root, 'bootstrap.json'), 'utf8'));
  const manifest = JSON.parse(readFileSync(path.join(root, 'ecosystem.manifest.json'), 'utf8'));
  const revision = git(root, ['rev-parse', 'HEAD']);
  // Generated browser receipts may be intentionally untracked. Source cleanliness
  // is evaluated against tracked files so evidence output does not masquerade as
  // a provider-source mutation.
  const dirty = git(root, ['status', '--porcelain', '--untracked-files=no']);
  const explicitAttach = bootstrap.policy?.attach === 'explicitly-authorized-only';
  const bootstrapIsAuthority = bootstrap.bootstrap_is_authority === true;
  const intendedPath = typeof manifest.intendedGovernedPath === 'string' && manifest.intendedGovernedPath.includes('canonical Runtime Fabric adapter');
  let browserProof = { status: 'NOT_SUPPLIED' };
  if (browserReceipt && existsSync(browserReceipt)) {
    try {
      const evidence = JSON.parse(readFileSync(browserReceipt, 'utf8').replace(/^\uFEFF/, ''));
      browserProof = {
        status: evidence.status === 'PASS' ? 'PASS' : 'FAIL',
        receiptPath: path.resolve(browserReceipt),
        scope: evidence.scope,
        canonicalVeritas: evidence.canonicalVeritas === true,
        learningLedgerUpdated: evidence.learningLedgerUpdated === true,
        checksPassed: Array.isArray(evidence.checks) ? evidence.checks.filter((check) => check.status === 'PASS').length : 0,
        roundTrips: evidence.roundTripsMs ?? []
      };
    } catch (error) {
      browserProof = { status: 'INVALID_RECEIPT', receiptPath: path.resolve(browserReceipt), error: error.message };
    }
  }
  const localBrowserTransport = browserProof.status === 'PASS' ? 'VERIFIED' : 'UNVERIFIED';
  return {
    providerId: 'leeway-federate-web',
    repository: 'https://github.com/4citeB4U/Leeway-Federate-Web',
    localPath: root,
    revision,
    sourceState: revision && !dirty ? 'PRESENT_CLEAN' : 'PRESENT_DIRTY_OR_UNPINNED',
    role: 'MANUAL_WEBRTC_PEER_TRANSPORT',
    runtimeState: 'UNVERIFIED',
    capabilityState: {
      browserRuntime: 'IMPLEMENTED',
      manualPairing: 'IMPLEMENTED',
      localBrowserTransport,
      livePeerFederation: 'UNVERIFIED',
      nativeRuntimeBridge: 'UNVERIFIED'
    },
    authorityBoundary: {
      bootstrapIsAuthority,
      explicitAttach,
      intendedPathUsesCanonicalRuntimeAdapter: intendedPath,
      noAuthorityDuplication: !bootstrapIsAuthority && explicitAttach && intendedPath
    },
    admission: {
      status: browserProof.status === 'PASS' ? 'LOCAL_BROWSER_TRANSPORT_VERIFIED_RUNTIME_UNVERIFIED' : 'SOURCE_VERIFIED_TRANSPORT_UNVERIFIED',
      veritas: 'NOT_RUN',
      requiredEvidence: [
        'Two independently administered nodes',
        'Signed expiring advertisements with revocation and quotas',
        'Runtime dispatch permission through the canonical adapter',
        'Independent Veritas PRE/POST and canonical receipt readback',
        'Offline and alternate-host recovery evidence'
      ]
    },
    browserProof
  };
}

export async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  if (options.help || !options.repo) {
    console.log('Usage: node audit-federate-web.mjs --repo <checkout> [--browser-receipt <json>] [--out <json>]');
    if (!options.help) process.exitCode = 2;
    return;
  }
  const result = { schemaVersion: '1.0.0', observedAt: new Date().toISOString(), audit: auditFederateWeb(options.repo, { browserReceipt: options.browserReceipt }) };
  const serialized = JSON.stringify(result, null, 2);
  console.log(serialized);
  if (options.out) {
    await mkdir(path.dirname(path.resolve(options.out)), { recursive: true });
    await writeFile(path.resolve(options.out), `${serialized}\n`, 'utf8');
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch((error) => {
    console.error(`Federate Web audit failed: ${error.message}`);
    process.exitCode = 1;
  });
}

