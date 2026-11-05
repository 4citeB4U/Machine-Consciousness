#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

function parseArgs(argv) {
  const options = {
    runtimeRoot: process.env.LEEWAY_RUNTIME_ROOT,
    hostUrl: process.env.LEEWAY_HOST_URL ?? 'http://127.0.0.1:8891',
    receipt: process.env.LEEWAY_PROBE_RECEIPT
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--runtime-root') options.runtimeRoot = argv[++i];
    else if (arg === '--host-url') options.hostUrl = argv[++i];
    else if (arg === '--receipt') options.receipt = argv[++i];
    else if (arg === '--help' || arg === '-h') return { help: true, ...options };
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return { help: false, ...options };
}

export function summarizeReceipt(receiptPath) {
  if (!existsSync(receiptPath)) return { status: 'EXECUTED_UNVERIFIED', receiptPath, reason: 'Receipt was not persisted.' };
  const envelope = JSON.parse(readFileSync(receiptPath, 'utf8').replace(/^\uFEFF/, ''));
  const receipt = envelope.receipt ?? envelope;
  return {
    status: receipt.status ?? 'EXECUTED_UNVERIFIED',
    receiptPath,
    receiptId: receipt.receiptId,
    provider: receipt.execution?.provider,
    verified: receipt.execution?.verified === 'ADAPTER_EXECUTED',
    receiptHashPresent: Boolean(receipt.execution?.receiptHash),
    postGate: receipt.postGate?.decision,
    veritas: receipt.veritas?.approved === true ? 'PASS' : 'PENDING',
    llmUsed: receipt.llm?.used === true
  };
}

export function runProbe(options) {
  if (!options.runtimeRoot) throw new Error('Provide --runtime-root or LEEWAY_RUNTIME_ROOT.');
  const runtimeRoot = path.resolve(options.runtimeRoot);
  const harness = path.join(runtimeRoot, 'machine-consciousness', 'Invoke-C3-1-ConsciousActionAcceptance.ps1');
  if (!existsSync(harness)) throw new Error(`Authoritative C3-1 harness not found: ${harness}`);
  const receipt = options.receipt ?? path.join(runtimeRoot, 'receipts', 'machine-consciousness', 'MACHINE-CONSCIOUSNESS-TRAINING-LIVE-PROBE.json');
  const args = [
    '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', harness,
    '-RuntimeRoot', runtimeRoot,
    '-HostUrl', options.hostUrl,
    '-ReceiptPath', path.resolve(receipt)
  ];
  const child = spawnSync('powershell.exe', args, { encoding: 'utf8', windowsHide: true, maxBuffer: 1024 * 1024 });
  const summary = summarizeReceipt(path.resolve(receipt));
  summary.processExitCode = child.status;
  if (child.error) summary.processError = child.error.message;
  if (child.status !== 0 && summary.status === 'PASS') summary.status = 'EXECUTED_UNVERIFIED';
  return summary;
}

export function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  if (options.help) {
    console.log('Usage: node live-capability-probe.mjs --runtime-root <runtime> [--host-url <url>] [--receipt <path>]');
    return 0;
  }
  const summary = runProbe(options);
  console.log(JSON.stringify(summary, null, 2));
  return summary.status === 'PASS' && summary.verified && summary.receiptHashPresent && summary.postGate === 'PASS' && summary.veritas === 'PASS' ? 0 : 1;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  try {
    process.exitCode = main();
  } catch (error) {
    console.error(`Live capability probe failed: ${error.message}`);
    process.exitCode = 1;
  }
}

