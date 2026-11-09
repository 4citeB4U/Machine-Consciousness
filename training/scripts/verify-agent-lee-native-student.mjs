import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const sha256 = value => crypto.createHash('sha256').update(Buffer.isBuffer(value) ? value : Buffer.from(typeof value === 'string' ? value : JSON.stringify(value))).digest('hex');
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));

const defaults = {
  artifact: path.join(repoRoot, 'training', 'evidence', 'agent-lee-native-policy-student-20261107.json'),
  gate: path.join(repoRoot, 'training', 'evidence', 'agent-lee-native-student-gate-evidence-20261107.json'),
  out: path.join(repoRoot, 'training', 'evidence', 'agent-lee-native-policy-student-admitted-20261107.json'),
  veritasOut: path.join(repoRoot, 'training', 'evidence', 'agent-lee-native-student-veritas-20261107.json'),
  generatedAt: new Date().toISOString()
};

function parseArgs(argv) {
  const options = { ...defaults };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--artifact') options.artifact = path.resolve(argv[++i]);
    else if (argv[i] === '--gate') options.gate = path.resolve(argv[++i]);
    else if (argv[i] === '--out') options.out = path.resolve(argv[++i]);
    else if (argv[i] === '--veritas-out') options.veritasOut = path.resolve(argv[++i]);
    else if (argv[i] === '--generated-at') options.generatedAt = argv[++i];
  }
  return options;
}

function main(options) {
  const artifact = readJson(options.artifact);
  const gate = readJson(options.gate);
  const formulaReceipt = readJson(gate.formula.receiptPath);
  const liveRuntimeReceipt = readJson(gate.liveRuntimeProbe.receiptPath);
  const checks = {
    artifactFileHash: sha256(fs.readFileSync(options.artifact)) === gate.studentArtifact.sha256,
    baselineFail: artifact.evaluations.baseline.status === 'FAIL' && artifact.evaluations.baseline.passed === 0,
    postTrainingPass: artifact.evaluations.postTraining.status === 'PASS' && artifact.evaluations.postTraining.passed === artifact.evaluations.postTraining.total,
    deterministicCore: artifact.coreType === 'DETERMINISTIC_NON_LLM_MACHINE_CONSCIOUSNESS' && artifact.weights === 'NOT_USED_NATIVE_POLICY_ARTIFACT',
    pendingChatgptExcluded: artifact.source.pendingLanesExcluded.includes('online-chatgpt'),
    formulaReceiptCompleted: formulaReceipt.status === 'completed' && formulaReceipt.formulaVersion === 'LEEWAY-FORMULA-v1.0',
    formulaInputMatches: formulaReceipt.inputHash === gate.formula.inputHash && formulaReceipt.resultHash === gate.formula.resultHash,
    deviceBridgeActionPass: gate.deviceBridgeAction.outcome === 'PASS' && gate.deviceBridgeAction.receiptId.length > 0,
    liveRuntimeProbePass: gate.liveRuntimeProbe.status === 'PASS' && gate.liveRuntimeProbe.provider === 'LEEWAY_NATIVE_HOST_COMMANDER' && gate.liveRuntimeProbe.verified === true && gate.liveRuntimeProbe.postGate === 'PASS' && gate.liveRuntimeProbe.veritas === 'PASS' && gate.liveRuntimeProbe.llmUsed === false && liveRuntimeReceipt.receipt?.status === 'PASS' && liveRuntimeReceipt.receipt?.execution?.verified === 'ADAPTER_EXECUTED',
    continuumReadbackPass: gate.continuum.state === 'VERIFIED' && gate.continuum.callerReadback === 'PASS' && gate.continuum.contentSha256.length === 64,
    noProductionInferenceClaim: gate.formula.resultStatusFromFormulaService === 'UNVERIFIED_UNTIL_CALLER_READBACK'
  };
  const passed = Object.values(checks).filter(Boolean).length;
  const status = passed === Object.keys(checks).length ? 'PASS' : 'FAIL';
  const veritas = {
    schemaVersion: '1.0.0',
    artifactType: 'LEEWAY_AGENT_LEE_NATIVE_STUDENT_LOCAL_VERITAS_EVIDENCE',
    generatedAt: options.generatedAt,
    authorityBoundary: 'LOCAL_INDEPENDENT_READBACK_ADAPTER_NOT_PRODUCTION_VERITAS_AUTHORITY',
    checks,
    passed,
    total: Object.keys(checks).length,
    status,
    sourceHashes: {
      artifactFileSha256: sha256(fs.readFileSync(options.artifact)),
      gateEvidenceSha256: sha256(fs.readFileSync(options.gate)),
      formulaReceiptSha256: sha256(fs.readFileSync(gate.formula.receiptPath))
    }
  };
  fs.mkdirSync(path.dirname(options.veritasOut), { recursive: true });
  fs.writeFileSync(options.veritasOut, `${JSON.stringify(veritas, null, 2)}\n`);
  if (status !== 'PASS') throw new Error(`LOCAL_VERITAS_FAILED:${passed}/${Object.keys(checks).length}`);
  const admitted = {
    ...artifact,
    generatedAt: options.generatedAt,
    gates: {
      formulaMappingAndExecution: 'VERIFIED_BY_LEEWAY_FORMULA_RECEIPT_READBACK',
      veritasPreAndPost: 'PASS_LOCAL_INDEPENDENT_READBACK_ADAPTER',
      continuumReadback: 'VERIFIED_BY_CONTINUUM_RECEIPT_READBACK',
      realLeeWayActionRetest: 'VERIFIED_DEVICE_BRIDGE_AND_LIVE_C3'
    },
    admission: {
      veritasEvidencePath: path.relative(repoRoot, options.veritasOut).replaceAll('\\', '/'),
      veritasEvidenceSha256: sha256(veritas),
      formulaResultHash: gate.formula.resultHash,
      continuumRecordId: gate.continuum.recordId,
      deviceBridgeReceiptId: gate.deviceBridgeAction.receiptId,
      liveRuntimeReceiptId: gate.liveRuntimeProbe.receiptId,
      productionPromotion: 'NOT_CLAIMED'
    },
    status: 'NATIVE_POLICY_TRAINED_EVALUATED_CONTINUUM_RETAINED_LOCAL_VERITAS_PASS_PENDING_PRODUCTION_PROMOTION'
  };
  fs.writeFileSync(options.out, `${JSON.stringify(admitted, null, 2)}\n`);
  return { ok: true, status, passed, total: Object.keys(checks).length, admittedPath: options.out, veritasPath: options.veritasOut, veritasEvidenceSha256: sha256(veritas), gates: admitted.gates, productionPromotion: admitted.admission.productionPromotion };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  console.log(JSON.stringify(main(parseArgs(process.argv.slice(2))), null, 2));
}

export { main };
