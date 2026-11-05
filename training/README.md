# Temporary Foundry and LeeWay Action Qualification

This directory contains the transfer boundary for developing Machine Consciousness from local model artifacts and contributor knowledge.

The model family is a temporary foundry. It may provide capability evidence, examples, evaluations, and bounded contributor packets. It is not a production dependency, is not copied into this repository, and does not replace the deterministic Machine Consciousness runtime. Local weights remain outside Git and are retained only until native LeeWay artifacts, tests, receipts, ledgers, skills, formulas, recovery evidence, and backups are independently qualified.

## Closed-loop admission

Every proposed capability follows the same loop:

`teach → route through LeeWay → execute a real low-risk action → observe → verify the receipt → record the capability → test again`

An answer-only demonstration is insufficient. A capability is not admitted merely because a model responded, a health endpoint answered, a configuration exists, or a generated file looks correct. The action must cross the real LeeWay boundary and produce inspectable evidence.

The current live acceptance pattern is the existing C3-1 harness in the federated runtime:

- Formula health and identity pre-gates must pass.
- Device Bridge / Host Commander must execute a bounded read-only action.
- The adapter must return a receipt hash and `ADAPTER_EXECUTED` evidence.
- The post-gate and Veritas decision must pass.
- The evidence must state whether an LLM was used; the C3-1 acceptance harness uses no LLM.

The repository wrapper in `scripts/live-capability-probe.mjs` delegates to that authoritative harness. It does not create a second runtime, listener, model server, or authority system.

## Federate Web boundary

`4citeB4U/Leeway-Federate-Web` is the selected web-federation transport source. Its browser runtime, signed manual pairing, and WebRTC data channel are transport capabilities; they are not a Runtime Fabric execution provider by themselves. The read-only audit in `scripts/audit-federate-web.mjs` pins the checkout and enforces the repository's own boundary: explicit attachment, no duplicated authority, and a required canonical Runtime Fabric adapter.

```powershell
node training/scripts/audit-federate-web.mjs `
  --repo "E:\LeeWay-Work\Leeway-Federate-Web" `
  --browser-receipt "E:\LeeWay-Work\Leeway-Federate-Web\test-results\peer-retest-20261105.json" `
  --out training/runs/federate-web-audit.json
```

The current browser receipt can qualify local two-context transport as `VERIFIED`, but the audit remains `LOCAL_BROWSER_TRANSPORT_VERIFIED_RUNTIME_UNVERIFIED` until two independent nodes, Runtime dispatch permission, Veritas pre/post evidence, canonical receipts, and alternate-host recovery are proven. A GitHub Pages page, a peer ID, or a browser-local connection does not close the `code.status` provider gate.

## Commands

Audit local artifacts without starting inference:

```powershell
node training/scripts/audit-local-foundry.mjs `
  --root "E:\Leeway-Ecosystem v2.1.4\leeway-model-family" `
  --root "E:\LeeWay-Work\model-hub\HuggingFace" `
  --out training/runs/foundry-audit.json
```

The audit is metadata-first. It never invokes Ollama, Transformers, a model server, or an inference endpoint. Use `--hash-weights` only when an explicit, potentially long-running hash pass is required.

Run the real low-risk LeeWay action through the existing C3-1 acceptance harness:

```powershell
$env:LEEWAY_RUNTIME_ROOT = "E:\LeeWay-Work\pc-consciousness-live\runtime"
node training/scripts/live-capability-probe.mjs
```

The wrapper requires an explicit runtime root or `LEEWAY_RUNTIME_ROOT`. It writes the receipt to the runtime's canonical receipt location unless `--receipt` is supplied.

Run repository tests:

```powershell
node --test training/tests/foundation.test.mjs
```

## Transfer states

`available`, `configured`, `running`, `executed`, `verified`, `admitted`, and `production-ready` are separate states. A foundry artifact can be available without being executable; an executed action can be unverified; a verified capability can still be rejected from production until license, provenance, portability, governance, and recovery gates pass.

The canonical Machine Consciousness runtime stays deterministic and non-LLM. Provider outputs and local weights are evidence sources until a separate LeeWay admission record promotes a native capability.

