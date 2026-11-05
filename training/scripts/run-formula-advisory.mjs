import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const sha256 = value => crypto.createHash('sha256').update(typeof value === 'string' || Buffer.isBuffer(value) ? value : JSON.stringify(value)).digest('hex');

function parseArgs(argv) {
  const options = {
    formulaUrl: process.env.LEEWAY_FORMULA_URL ?? 'http://127.0.0.1:4001/runtime/formula/v1',
    sourceWindow: null,
    out: path.resolve('training/evidence/formula-advisory-20261105.json'),
    sourceCommit: null
  };
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === '--formula-url') options.formulaUrl = argv[++index];
    else if (argv[index] === '--source-window') options.sourceWindow = path.resolve(argv[++index]);
    else if (argv[index] === '--out') options.out = path.resolve(argv[++index]);
    else if (argv[index] === '--source-commit') options.sourceCommit = argv[++index];
  }
  return options;
}

function assertSourceWindow(sourceWindow) {
  if (sourceWindow?.gate !== 'MC-G8') throw new Error('SOURCE_WINDOW_GATE_INVALID');
  if (sourceWindow?.provenance !== 'SIMULATED') throw new Error('SOURCE_WINDOW_PROVENANCE_NOT_SIMULATED');
  if (!Array.isArray(sourceWindow?.stateRows) || sourceWindow.stateRows.length !== 16 || sourceWindow.stateRows.some(row => !Array.isArray(row) || row.length !== 6)) throw new Error('SOURCE_WINDOW_MUST_BE_16X6');
  if (!Array.isArray(sourceWindow?.calibrationRanges) || sourceWindow.calibrationRanges.length !== 6) throw new Error('SOURCE_WINDOW_CALIBRATION_INVALID');
  if (sourceWindow.stateRows.flat().some(value => typeof value !== 'number' || !Number.isFinite(value))) throw new Error('SOURCE_WINDOW_NONFINITE');
}

export async function runFormulaAdvisory({ formulaUrl, sourceWindowPath, outPath, sourceCommit = null, traceId = `MC-TRAINING-FORMULA-ADVISORY-${Date.now()}` }) {
  const sourceBytes = fs.readFileSync(sourceWindowPath);
  const sourceWindow = JSON.parse(sourceBytes.toString('utf8').replace(/^\uFEFF/, ''));
  assertSourceWindow(sourceWindow);
  const sourceWindowSha256 = sha256(sourceBytes);

  const healthResponse = await fetch(`${formulaUrl}/health`, { signal: AbortSignal.timeout(5000) });
  const health = await healthResponse.json();
  if (!healthResponse.ok || health.status !== 'LEEWAY_FORMULA_V1_PASS' || health.formula !== 'LEEWAY-FORMULA-v1.0' || health.goldenVectorPass !== true || health.specValid !== true || health.adapterRegistryPass !== true) throw new Error('FORMULA_PRE_GATE_FAILED');

  const request = {
    adapterId: 'runtime-state-v1',
    caller: 'machine-consciousness-training-formula-advisory-v1',
    traceId,
    input: { stateRows: sourceWindow.stateRows, ranges: sourceWindow.calibrationRanges }
  };
  const requestHash = sha256(request);
  const response = await fetch(`${formulaUrl}/evaluate`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(request),
    signal: AbortSignal.timeout(15000)
  });
  const responseText = await response.text();
  if (!response.ok) throw new Error(`FORMULA_EVALUATION_HTTP_${response.status}_${responseText}`);
  const result = JSON.parse(responseText);
  if (result.formulaId !== 'LEEWAY-FORMULA-v1.0' || result.adapterId !== 'runtime-state-v1' || !/^[a-f0-9]{64}$/.test(result.inputHash ?? '') || !/^[a-f0-9]{64}$/.test(result.resultHash ?? '')) throw new Error('FORMULA_RESULT_INVALID');

  let formulaReceipt = { state: 'UNAVAILABLE', path: result.receiptPath ?? null };
  if (result.receiptPath && fs.existsSync(result.receiptPath)) formulaReceipt = { state: 'PRESENT', path: result.receiptPath, sha256: sha256(fs.readFileSync(result.receiptPath)) };
  const evidence = {
    schemaVersion: '1.0.0',
    artifactType: 'MACHINE_CONSCIOUSNESS_FORMULA_ADVISORY',
    status: 'EXECUTED_NOT_ADMITTED',
    generatedAt: new Date().toISOString(),
    source: {
      repository: '4citeB4U/Leeway-formula-live',
      sourceCommit,
      sourcePath: 'experiments/machine-consciousness-v0/outputs/mc-g8/source-window.json',
      sourceWindowSha256,
      sourceWindowGate: sourceWindow.gate,
      provenance: sourceWindow.provenance,
      cycles: sourceWindow.cycles,
      dimensions: sourceWindow.dimensionOrder
    },
    formula: {
      id: result.formulaId,
      adapterId: result.adapterId,
      health,
      requestHash,
      inputHash: result.inputHash,
      resultHash: result.resultHash,
      decimalState: result.decimalState,
      base64State: result.base64State,
      evaluatedAt: result.evaluatedAt,
      hostTraceId: result.hostTraceId,
      requestedTraceId: result.requestedTraceId,
      receipt: formulaReceipt
    },
    policy: {
      mode: 'FORMULA_ADVISORY',
      actionPolicyIntervention: false,
      actionAuthorized: false,
      providerDispatch: false
    },
    verification: {
      formulaPreGate: 'PASS',
      execution: 'EXECUTED',
      interpretation: 'NOT_PROMOTED',
      veritas: 'NOT_RUN',
      receiptAuthority: 'NOT_RUN',
      learningLedger: 'NOT_UPDATED'
    },
    claimBoundary: 'The canonical Formula executed against a pinned simulated cognition window. This is a real advisory execution, not proof of causal behavioral improvement, semantic interpretation, live autonomy, or consciousness.'
  };
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(evidence, null, 2)}\n`);
  return evidence;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const options = parseArgs(process.argv.slice(2));
  if (!options.sourceWindow) throw new Error('--source-window is required');
  const result = await runFormulaAdvisory({ formulaUrl: options.formulaUrl, sourceWindowPath: options.sourceWindow, outPath: options.out, sourceCommit: options.sourceCommit });
  console.log(JSON.stringify(result, null, 2));
}
