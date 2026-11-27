# Four-lane contributor intake

This directory is the intake boundary for the four requested contributors:

| Lane | What can be captured here | Current state |
| --- | --- | --- |
| `local-codex` | Observed engineering methods, implementation evidence, tests, and bounded capability packets produced in the local Codex lane | `OBSERVED` for the artifacts listed in its packet |
| `local-antigravity` | Prior local Antigravity-attributed receipts and registries, reduced to a bounded architecture-review capsule | `OBSERVED` (independent re-execution pending) |
| `online-chatgpt` | A response or export supplied by the separate online ChatGPT session | `PENDING_CAPTURE` |
| `online-gemini` | Two user-supplied Gemini conversation exports, reduced to a bounded deterministic-first/device-sequencing capsule | `OBSERVED` (rights/evaluation pending) |

The four lanes are contributors, not constitutional authorities. A packet records an
observable response, artifact, method, constraint, or evaluation. It does **not** claim
access to a provider's private weights, hidden training corpus, chain of thought, or
internal runtime. Those cannot be extracted through this repository.

## Admission path

```text
source response/export
  -> packet with provenance and rights boundary
  -> deterministic native artifact
  -> focused tests and matched evaluation
  -> real LeeWay execution when the capability is operational
  -> Veritas pre/post evidence and receipt
  -> eligible Learning Ledger admission
```

`PENDING_CAPTURE` is a valid and intentional state. It means the lane is registered,
not that the contributor has taught the system. `OBSERVED` means material was captured;
it is still not learned. Only a separately authorized `ADMITTED` packet may influence
the native capability registry, and this repository does not grant that status by
itself.

Run the intake audit:

```powershell
node training/scripts/intake-contributor-packets.mjs `
  --dir training/contributors `
  --out training/evidence/contributor-registry.json
```

The audit is fail-closed and does not run models, start Ollama, load Hugging Face
weights, or write a Learning Ledger entry.

<!-- LEEWAY UNIVERSAL FORMULA GOVERNANCE BEGIN -->

# LeeWay Universal Formula Governance

Authority: Creator and LeeWay Standards.
Formula identity: LEEWAY-FORMULA-v1.0.

The canonical LeeWay Formula is mandatory throughout
the entire LeeWay ecosystem.

Every current and future application, capability,
agent, worker, employee, model, provider, adapter,
automation and integration inherits this requirement.

All applicable interactions, responses, decisions,
actions, revisions, executions, computations, model
inferences, resource allocations, information transfers,
memory operations, storage operations and deployments
must consume the canonical Formula through their
authorized and qualified domain contracts.

Formula availability, documentation, configuration,
health and historical results do not constitute actual
Formula consumption for a new operation.

Recover relevant authorized memory before substantive
work. Preserve identity, provenance, Formula integrity,
authorization, original receipts and verified learning.

Never invent observations, adapter mappings, mathematical
results, execution evidence or independent verification.

No application may bypass applicable Formula governance
by dispatching directly to a provider.

Every new application and capability must demonstrate
applicable Formula consumption before production admission.

Preserve the existing authority hierarchy:

Creator > Standards > Root of Trust > Runtime Fabric >
Agent Lee > Harness > Formula > skills/models/tools >
execution > Veritas > Receipt Authority > Learning Ledger.

Execute the complete engineering loop:

INVESTIGATE > DIAGNOSE > PLAN > IMPLEMENT > TEST >
VALIDATE > REPAIR > RETEST > VERIFY > EVIDENCE >
CHECKPOINT > CONTINUE.

Documentation compliance does not establish executable
enforcement or production admission.

<!-- LEEWAY UNIVERSAL FORMULA GOVERNANCE END -->
