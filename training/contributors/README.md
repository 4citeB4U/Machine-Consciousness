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
