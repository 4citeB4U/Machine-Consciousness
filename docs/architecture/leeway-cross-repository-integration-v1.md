# LeeWay cross-repository integration contract v1

**Status:** canonical architecture contract; implementation and platform qualification remain separate gates.

**Source authority:** `4citeB4U/Machine-Consciousness`.

**Current evidence:** local Machine Consciousness training suite `66/66 PASS`; five tranches banked as G3 simulation; live G4 admission not claimed.

## Purpose

This contract fixes the division of labor between Machine Consciousness, Formula, Runtime Fabric, Device Bridge, host Digital Brain, Model Hub, Edge GPU, Veritas, Receipt Authority, Continuum, Learning Ledger, and Production Final Execution. It is the shared architectural map. It does not replace any component's executable contract or grant production authority.

## Ownership map

| Component | Owns | Must not own |
| --- | --- | --- |
| Machine Consciousness | universal policy substrate, Agent Lee identity, capability composition, action constraints, replay state, learning boundaries | host hardware, canonical Formula implementation, independent verification, receipt minting |
| LeeWay Formula Live | mathematical evaluation and Q69/QB64 grading under an explicit mapping | execution, independent verification, receipts, durable storage |
| Runtime Fabric | W02 conveyor, routing, bounded workers, retries, quarantine, correlation and handoff | host ownership, Formula authority, Veritas decision, receipt or ledger admission |
| Device Bridge | authenticated host-scoped transport, device discovery, grants, adapter invocation, capability vectors | universal identity, central ownership of host Digital Brain, arbitrary path access |
| Host Digital Brain / diagnostics | device-local state, diagnostics, hardware interrogation, local policy and capability facts | central Fabric state or another device's identity |
| LeeWay Model Hub | admitted model catalog, model-team selection, bounded wake/pause/swap adapters | consciousness identity, Formula, durable truth, direct external-provider authority |
| LeeWay Edge GPU | authorized host-local compute and model/GPU execution adapters | authorization, Formula decisions, Veritas, durable state |
| LeeWay Veritas | independent pre/post/negative/recovery verification and evidence classification | self-approval, Formula replacement, receipt minting |
| Receipt Authority | canonical records of actual requested, authorized, executed, measured, verified, failed, or blocked work | invented execution, unverifiable claims, Learning Ledger admission |
| LeeWay Continuum | durable state and mandatory readback continuity | independent verification, permission expansion, model authority |
| LeeWay Learning Ledger | receipt-backed verified learning, failures, capability weaves and recovery outcomes | new authority, permissions, identity, or evidence creation |
| Production Final Execution | receives independently qualified release handoffs and coordinates final execution | duplicate Formula, verifier, receipt store, or job authority |

## Governed flow

```text
Creator / LeeWay Standards
          ↓ intent, authority, acceptance gate
Machine Consciousness
          ↓ Formula-ready decision context
LeeWay Formula Live
          ↓ evaluated decision / Q69-QB64 result
Runtime Fabric W02 conveyor
          ↓ bounded execution request
Device Bridge
          ↓ host grant + capability vector
Host Digital Brain / Edge GPU / Model Hub adapter
          ↓ measured post-state
LeeWay Veritas
          ↓ independent classification
Receipt Authority
          ↓ actual execution receipt
Continuum
          ↓ durable write + readback
Learning Ledger
          ↓ eligible verified skill metadata
Production Final Execution
```

Formula may evaluate before and after a replay. Veritas remains independent. Receipt Authority records only actual events. Continuum readback precedes Learning Ledger admission. A local test, configuration, health check, model response, or synthetic fixture cannot skip these boundaries.

## Shared event envelope

Every cross-repository handoff should carry, or reference, the following fields:

```json
{
  "correlationId": "stable-task-or-replay-id",
  "stage": "INVESTIGATE|DIAGNOSE|PLAN|IMPLEMENT|TEST|VALIDATE|REPAIR|RETEST|VERIFY|EVIDENCE|CHECKPOINT|CONTINUE",
  "authority": "logical-LeeWay-authority-id",
  "target": "logical-device-or-service-id",
  "sourceVersion": "commit-or-artifact-version",
  "preState": "hash-or-minimized-state-reference",
  "decisionReference": "Formula-result-reference-or-NOT_EXECUTED",
  "executionIdentity": "adapter-and-execution-id-or-NOT_EXECUTED",
  "postState": "measured-state-reference-or-NOT_MEASURED",
  "evidenceReferences": [],
  "classification": "VERIFIED_LOCAL_TEST|OBSERVED|SIMULATION_ONLY|UNVERIFIED|FAILED|BLOCKED",
  "receiptState": "RECEIPT_CREATED|RECEIPT_NOT_CREATED",
  "continuumState": "READBACK_CONFIRMED|NOT_READ_BACK",
  "learningState": "ADMITTED|PENDING_ADMISSION|NOT_ELIGIBLE"
}
```

Missing fields fail closed for consequential work. `NOT_EXECUTED`, `NOT_MEASURED`, and `RECEIPT_NOT_CREATED` are valid evidence states; they are not errors to hide.

## Dynamic improvement loop

Machine Consciousness improves through governed proposals, not untracked self-modification:

1. Runtime Fabric or Device Bridge observes a bounded outcome, failure, capability gap, or recovery.
2. Machine Consciousness converts it into a versioned candidate rule, skill atom, route, or replay case.
3. Local deterministic tests cover baseline, positive, negative, sibling, and recovery behavior.
4. The graduation manifest queues the candidate as G3 until its live adapters are ready.
5. A real replay crosses Formula, Device Bridge, and the physical adapter.
6. Veritas independently checks pre-state, post-state, acceptance, negative, and recovery evidence.
7. Receipt Authority records the actual event; Continuum writes and reads it back.
8. Learning Ledger admits only the verified outcome and its scope. Production Final Execution receives only the qualified handoff.

## Explicit prohibitions

- G3 test artifacts must never boot as G4 production truth.
- Runtime Fabric must never become a second Machine Consciousness or second Formula.
- Device Bridge must never expose raw host paths as universal identity or let central services claim host ownership.
- Model Hub providers must never become LeeWay authority.
- Model presence or metadata must never be treated as physical GPU inference.
- A receipt must never be minted from a pasted claim, model output, health check, or synthetic replay fixture.
- Learning Ledger admission must never be used to create authority or permissions.

## Current handoff state

The local closeout and replay manifest are the source of truth for the current training chapter:

- [`training/TESTING_CLOSEOUT_20261111.md`](../../training/TESTING_CLOSEOUT_20261111.md)
- [`training/evidence/machine-consciousness-testing-closeout-20261111.json`](../../training/evidence/machine-consciousness-testing-closeout-20261111.json)
- [`training/evidence/simulation-to-production-graduation-ledger-20261111.json`](../../training/evidence/simulation-to-production-graduation-ledger-20261111.json)

Current state is **local testing closed and indexed; live graduation open**.
