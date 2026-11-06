# Temporary Foundry and LeeWay Action Qualification

This directory contains the transfer boundary for developing Machine Consciousness from local model artifacts and contributor knowledge.

The model family is a temporary foundry. It may provide capability evidence, examples, evaluations, and bounded contributor packets. It is not a production dependency, is not copied into this repository, and does not replace the deterministic Machine Consciousness runtime. Local weights remain outside Git and are retained only until native LeeWay artifacts, tests, receipts, ledgers, skills, formulas, recovery evidence, and backups are independently qualified.

The canonical Model Hub source is the GitHub repository [`4citeB4U/LeeWay-Model-Hub`](https://github.com/4citeB4U/LeeWay-Model-Hub). Its runtime manifest is [`registry/leeway-model-hub-runtime-manifest.v1.json`](https://github.com/4citeB4U/LeeWay-Model-Hub/blob/main/registry/leeway-model-hub-runtime-manifest.v1.json). The runtime must pin and read back a GitHub commit before physical execution. A host may materialize admitted weights into an explicitly configured ephemeral working set for GPU execution, but no fixed drive path is a LeeWay source authority and no inference may begin from metadata alone.

The four requested intelligence lanes are registered under [`contributors/`](contributors/README.md). A lane is not counted as training merely because it is named. It must provide an observable response or artifact, a rights/provenance boundary, a deterministic native artifact, and evaluation evidence. Local Codex, local Antigravity, and online Gemini have bounded observed capsules; the separate online ChatGPT lane remains a registration placeholder until an actual response or export is supplied.

The Agent Lee pedagogical fabric is [`contracts/leeway-agent-lee-pedagogical-fabric.v1.json`](contracts/leeway-agent-lee-pedagogical-fabric.v1.json). `scripts/compile-agent-lee-pedagogy.mjs` compiles the four registered lanes into a bounded persona-and-behavior capsule and probes the LeeWay Device Bridge Agent Tablet route in read-only mode. It does not extract private provider knowledge, modify weights, start inference, or promote a student. A pending lane contributes no claims, and every observed contribution remains `CAPSULE_COMPILED_NOT_TRAINED` until rights, baseline/post-training evaluation, Formula mapping/execution, Veritas, Continuum readback, and a real low-risk LeeWay action retest are complete.

```powershell
node training/scripts/compile-agent-lee-pedagogy.mjs `
  --device-bridge-url "http://127.0.0.1:8890" `
  --out training/evidence/agent-lee-pedagogical-capsule.json
```

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
  --repo "<LEEWAY_FEDERATE_WEB_CHECKOUT>" `
  --browser-receipt "<LEEWAY_FEDERATE_WEB_CHECKOUT>/test-results/peer-retest-20261105.json" `
  --out training/runs/federate-web-audit.json
```

The current browser receipt can qualify local two-context transport as `VERIFIED`, but the audit remains `LOCAL_BROWSER_TRANSPORT_VERIFIED_RUNTIME_UNVERIFIED` until two independent nodes, Runtime dispatch permission, Veritas pre/post evidence, canonical receipts, and alternate-host recovery are proven. A GitHub Pages page, a peer ID, or a browser-local connection does not close the `code.status` provider gate.

## Commands

Audit local artifacts without starting inference:

```powershell
node training/scripts/audit-local-foundry.mjs `
  --root "<LEEWAY_MODEL_FAMILY_CHECKOUT>" `
  --root "<LEEWAY_MODEL_HUB_MATERIALIZATION>/HuggingFace" `
  --out training/runs/foundry-audit.json
```

The audit is metadata-first. It never invokes Ollama, Transformers, a model server, or an inference endpoint. Use `--hash-weights` only when an explicit, potentially long-running hash pass is required.

Run the real low-risk LeeWay action through the existing C3-1 acceptance harness:

```powershell
$env:LEEWAY_RUNTIME_ROOT = "<LEEWAY_RUNTIME_CHECKOUT>"
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

Model condensation is governed by [`leeway-model-condensation.v1.json`](contracts/leeway-model-condensation.v1.json). Formula selects and gates the condensation policy; model-specific quantization, pruning, packing, sharding, or distillation performs the actual representation change. Formula state compaction is not a claim that arbitrary neural weights can be losslessly reduced to one or ten megabytes. Lossy transforms require baseline and post-transform capability evaluations, hash readback, Veritas, and Continuum evidence before promotion.

The current Gemini training tranche also contributes a bounded Agent Lee voice policy:
continuous conversation, concurrent governed work, interruption-versus-backchannel
handling, and evidence-bound speech. Its physical voice equations live in the Formula
repository's experimental shadow layer at commit `f4b9e4c`; they are measurements only,
not a new authority or active voice controller.

## Formula advisory execution

The Formula is a federated mathematical provider, not a copied kernel. The advisory runner calls the verified canonical Formula endpoint with a pinned MC-G8 cognition window. It records the actual input/result hashes and explicitly leaves action policy, Veritas, Receipt Authority, and Learning Ledger admission untouched.

```powershell
node training/scripts/run-formula-advisory.mjs `
  --source-window "<LEEWAY_FORMULA_CHECKOUT>/experiments/machine-consciousness-v0/outputs/mc-g8/source-window.json" `
  --source-commit "1746d52"
```

This closes the Formula execution evidence gap, not the MC-G9 causal gap. The next mathematical gate remains a matched `NO_FORMULA` versus `FORMULA_ADVISORY` evaluation on held-out cases, followed only later by a separately authorized single-variable policy intervention.

## Universal employee consciousness

Every registered LeeWay employee derives a binding to one shared deterministic Machine Consciousness substrate. The employee's role, permissions, workflows, tools, body, and model routes remain role-specific; the consciousness contract, Formula/Veritas gates, twelve-stage Engineering Loop, Device Bridge action boundary, and Continuum durable-memory law are universal. This is a binding contract, not a duplicate consciousness instance per employee.

The canonical contract is [`contracts/leeway-universal-employee-consciousness.v1.json`](contracts/leeway-universal-employee-consciousness.v1.json). The runtime binding and fail-closed cycle/model/action gates are implemented in the live carrier at `<LEEWAY_RUNTIME_CHECKOUT>/machine-consciousness/employee-consciousness-runtime.mjs`.

Validate the complete registered employee book before treating coverage as qualified:

```powershell
node training/scripts/validate-universal-employee-consciousness.mjs `
  --agent-book "<LEEWAY_RUNTIME_CHECKOUT>/standards/registries/leeway-agent-book.json"
```

An employee may operate without an LLM. If its duty needs language, vision, audio, video, or another model capability, it requests that capability through the internal LeeWay Model Hub on the Device Bridge Agent Tablet only after its consciousness binding. Ollama, Hugging Face, llama.cpp, vLLM, Transformers, and the registered LeeWay Provider Fabric are adapters only: they may supply or execute an explicitly admitted model through a Hub adapter, but they do not own the runtime route or durable model state. After admission, the Hub is called directly and provider calls are not required. Provider intake requires owner approval, license/provenance review, manifest and integrity evidence, Formula/Veritas/Continuum admission, and explicit mutation. Model residency follows a paused-resident policy with bounded wake and return-to-pause; “ready” does not mean every model is physically loaded in VRAM. Model output remains a proposal until Formula admission, real execution, Veritas verification, and a Continuum receipt close the loop.

The Machine Consciousness remains the controller for model use. It selects a model team and model through Formula and Device Bridge, wakes an internal adapter only for the bounded task, verifies the result, returns the model to `PAUSED_RESIDENT`, and retains control. Model assistance is a telemetry target of 4–10% of task execution—not a claim of current physical inference—and model shifting follows `ADMIT_NEXT_MODEL → WAKE_NEXT_MODEL → VERIFY_NEXT_MODEL → PAUSE_CURRENT_MODEL → RETAIN_CONTINUUM_RECEIPT`. The live carrier exposes read-only planning routes at `/device-bridge/model-hub/plan` and `/device-bridge/model-hub/shift-plan`.

The Device Bridge Agent Tablet is also the common body for LeeWay Logistics. It can expose location, map grounding, nearby business/activity context, inventory, and dispatch to every employee, but only when authorized Device Bridge evidence is present. The deterministic core never invents a location or performs an unadmitted external lookup. Exact location is ephemeral until a governed Continuum receipt admits durable retention.

## Runtime constitution

The Machine Consciousness core is deterministic and non-LLM. Its runtime constitution is [`contracts/leeway-runtime-constitution.v1.json`](contracts/leeway-runtime-constitution.v1.json): Agent Lee identity and persona delivery are fail-closed; the LeeWay Engineering Loop is mandatory; inference may enter only through LeeWay Edge GPU; and Continuum is the only durable storage/database authority. LeeWay VRAM/LDWMD may provide an ephemeral working set for measured read/write acceleration, but its telemetry and qualified outcomes must return to Continuum and host-RAM/accounting states are never reported as physical GPU VRAM.
