<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.SOVEREIGN_OPERATING_FABRIC
TAG: LEEWAY.ARCHITECTURE.SELF_CONTAINED_SOVEREIGN_OPERATING_FABRIC.V2
5WH:
WHAT = Define the one-instance, device-independent operating environment and detailed component contracts.
WHY = An end-to-end work pipeline alone does not explain continuous operation, full-device-loss survival, model/compute residency, media access or reversible data movement.
WHO = Creator/Human Authority and canonical LeeWay component owners; outside contributor drafts source, not Agent Lee.
WHERE = docs/architecture/leeway-self-contained-sovereign-operating-fabric-v2.md.
WHEN = 2026-11-21.
HOW = Define immutable authority boundaries, durable identity and work, replaceable host resources,
      data/compute/transport paths, exact-reconstruction gates, device enrollment, failure recovery and tests.
LICENSE = Existing repository terms; no new license asserted.
AUTHORITY = REVIEW CANDIDATE ONLY; not a production admission, new control plane, new Formula or synthetic verification.
-->

# LeeWay self-contained sovereign operating fabric — architecture contract v2

**Status:** Creator-proposed architectural requirement translated to source-review candidate.
**Supersedes:** No existing approved authority. Complements [cross-repository v1](leeway-cross-repository-integration-v1.md), which remains the original role/receipt ownership map.
**Owning context:** Existing LeeWay Machine Consciousness, Runtime Fabric and C3/Device Bridge qualification mission. This is not a second Runtime Fabric, GPU, verifier, storage authority or instance factory.

## 1. Defining the system

LeeWay is one owner-scoped, durable digital operating environment. Agent Lee presents the coherent agent identity. The deterministic Machine Consciousness runtime owns task selection, contextual self-model, work coordination, failure recovery and capability invocation. Language models are bounded interchangeable reasoning/inference limbs: they cannot directly read arbitrary files, issue credentials, invoke host tools or approve results. They propose outputs to the original Machine Consciousness and its Runtime Fabric governance.

The **logical LeeWay instance** is not a phone app, browser extension, workstation process, checkpoint file or one model's GPU address. Devices are enrollment-controlled terminals and physical execution providers for that instance.

A user device may be lost, destroyed, disconnected or replaced while a previously authorized remote task continues on a separately available LeeWay compute/storage home. If no qualifying independent compute or durable storage exists anywhere, fully device-free active computing is physically impossible. Represent that state as BLOCKED/QUEUED_RECOVERY, never claim a completed job.

**Operational independence** means after valid initial authorization the system can autonomously run bounded tasks, health checks, worker rotations, retries, storage verification and scheduled maintenance. New destructive, regulated, sensitive or permission-expanding operations still require their appropriate authority. Human absence is not authorization.

## 2. One logical instance, many projections

- A LeeWay instance has a stable opaque instanceId, an owner scope derived from a verified identity provider issuer and subject, and one durable canonical work/event history.
- There may be 1 or 1,000 Device Bridge installations, browser surfaces, or compute agents. They are distinct enrolled **device bodies** under one logical instance, not a thousand independently authoritative Agent Lees.
- Every installation has its own signed device passport, short-lived session credentials, deviceKeyId, capability grant, lease/revocation state, local diagnostics and OS-specific adapter.
- Machines may carry encrypted caches of the same content IDs. None may mint the instance identity, overwrite shared history or expand rights by syncing.
- The Runtime workplane serializes authoritative work transitions with operationId, checkpoint version, monotonically fenced leadership epoch and idempotency key. Multiple active agents take separately leased work; there is no split-brain task owner.
- The user may ask through a phone; work continues after that phone disappears if its authority was already durably admitted and independent compute is available.
- Application windows, widget, tablet, web site, extension and mobile app are projections of the same authoritative session state. They do not independently replay or duplicate operations.

## 3. Always-on core versus opportunistic edge

### Always-on logical core (must survive client loss)

1. Machine Consciousness identity and policy state; Agent Lee conversational/task identity.
2. Runtime Fabric authoritative workplane, lease renewal, scheduled worker supervision, retries, incident and quarantine control.
3. Continuum durable checkpoints, owner-scoped encrypted object lineage, experience graph and reconstruction metadata.
4. Model Hub catalog, accepted model routes and residency policy, with at least one verified viable inference path for model-dependent work.
5. LeeWay GPU **logical compute service** with workload admission, accelerator scheduler and provider health, deployed on replaceable computing infrastructure.
6. Voice/Live connection services, event and media routing, and offline outgoing message queues when no audience device is connected.
7. Authenticated identity, Formula, independent Veritas and Receipt Authority integrations with explicit unavailable/hold states.
8. Durable monitoring, supervisor, renewal and recovery that do not depend on a browser tab remaining open.

### Edge nodes and user devices (replaceable)

- Device Bridge supplies native permissions, sensory sources, UI actions and hardware status when a device is connected and authorized.
- Each host Digital Brain/Diagnostics owns its local body facts and device-specific measurements. Losing that host loses **unreplicated** local evidence, but not independently admitted Continuum history.
- CPU, RAM, camera, microphone, speaker, PCIe link, physical GPU and native model runtime belong to their respective host. They cannot be operated while that host is actually absent or powered down.
- Federate Web may import explicitly authorized remote resource offers; it is not a hidden peer-to-peer claim over all networks.

**Always-on means the service identity/supervisor has uninterrupted *desired availability*, failover and observable SLOs. It does not require any single GPU chip at full utilization, prohibit standby or bypass host power/sleep. Continuous 24/7 accelerator capacity requires real powered infrastructure and a measured resource budget.**

## 4. Division of labor — no authority duplication

| Component | Owns | Receives | Produces / boundary |
| --- | --- | --- | --- |
| LeeWay Standards / Identity | Canonical governance, issuer/subject scope, Root of Trust | Authenticated owner and policy | Approved scopes, exact permissions; not inference |
| Machine Consciousness | Unified Agent Lee state, priorities, capability planning, task intent | User goal, sensor summaries, work events | Governed task proposals; not a second Formula or receipt issuer |
| Runtime Fabric | Persistent workplane, workers, queue semantics, retries, leases, scheduling | Admitted proposals and grants | Exact operation envelopes and execution coordination; not self-certified Veritas |
| Formula | Canonical evaluation + math mappings and representation/codec policy | Measured window, typed data, workload and authority context | Task-bound decision and specific reversible representation proof when applicable |
| Model Hub | Model identity, provider adapter, weight lifecycle, resident model set | Inference request authorized by Machine Consciousness + Runtime | Bounded model proposal; no tool authority |
| LeeWay GPU | Compute admission and logical accelerator API, host backend dispatch | Authorized workload, model/codec instructions, memory lease | Measured physical or CPU fallback execution result, not governance |
| LDWMD | Actual working-set/VRAM lease and physical buffer accounting | Workload resource requirements | Allocation and release evidence; not durable Continuum |
| PCIe/Interconnect adapter | Approved host↔device transfer representation, packing, locality and scheduling | Exact typed buffers and transfer limits | Integrity-checked physical transfer/readback; no invented lanes |
| Digital Brain | Source documents, private record catalog, local body knowledge and diagnostics | Approved host files and Continuum authorized object IDs | Owner-scope file views/index and measured host status |
| Content Vault (hot carrier role) | Authorized quick-access projections and asset cache/index | Content IDs from canonical store | Thumbnails, PDFs, videos, images and recent content with expiry/integrity; not new persistence authority |
| Continuum | Canonical owner-scoped state, file/object manifests, experience relationships, checkpoints, replica and recovery policy | Actual objects, receipts, owner permissions | Encrypted durable readback, experience/honeycomb views and cross-device recovery |
| Device Bridge | Native hardware boundary, permissions, signed device identity and platform adapters | Authorized bounded action from Runtime | Hardware reads/actions and controller observations; not Agent Lee's mind |
| Universal Extension / Web bootstrap | Installer discovery and user-initiated enrollment/recovery interface | Account authentication, signed native package and device enrollment | Safe bridge to approved native host; no browser-side privileged executor |
| Edge RTC | Audio/video real-time session transport, media framing, connectivity | Approved microphone/camera/media sources and streams | Authenticated low-latency sessions; not Voice policy or independent verifier |
| LeeWay Live | Connected conversation and multimodal presence, installer/bootstrap UI | Voice, video, task/session projections | Streaming experience and offline reconnect; not a second runtime |
| Voice Fabric | One speaking lane, ASR/TTS routing, persona/voice identity, interruption | Agent Lee approved text/voice events and audio inputs | Audio output with playback receipts; no competing decision authority |
| Vision Fabric | Approved camera/screen observability, frame transforms and multimodal perception | Device-scoped capture + consent | Bounded descriptions and evidence, not unapproved surveillance or direct host control |
| Federate Web | Domain federation and signed resource offers | Approved peers and policies | Capability discovery and routes; not unrestricted mesh or new authority |
| Veritas | Independent PRE/POST scope, truth and provenance verification | Original Formula/owner/physical evidence | Independently signed decisions; not model self-approval |
| Receipt Authority | Actual append-only evidence custody and readback | Original correlated outcomes | Hash-linked canonical records and learning obligations |
| Learning Ledger | Receipt-admitted skill/experience outcomes | Veritas-qualified result and receipt | Qualified learning metadata; no new grants |

## 5. Golden Formula runs through the system without destroying evidence

The Creator's requirement that every LeeWay movement pass through Formula should be implemented as a **universal representation and policy envelope**:
- Every governed action or data transfer has an immutable original type, size, content digest, owner scope, provenance, reconstruction policy, Formula version and execution correlation.
- For suitable data, Formula can select exact chunking, content addressing, deduplication, delta encoding, serialization and lossless compression. The decoder must reconstruct the byte-identical original; otherwise the exact-codec route is rejected.
- When information is incompressible, store/transmit the original representation plus metadata rather than invent a gain.
- For machine learning weights, quantization, pruning, sparsity or distillation are separately identified **lossy model transformations**, requiring original-model baseline, target quality metrics, latency, memory and task regressions before admission. They are not equivalent to exact reversible compression.
- Semantic context condensation for agents is a summarized projection with links to original evidence, not byte-for-byte reconstruction.
- Formula makes resource/budget/transform decisions; cryptographic authorization and original Veritas/Receipt evidence remain intact and separately verifiable.

Candidate exact-content invariant: originalSha256 = SHA256(decode(encode(original))) and originalByteLength = decodedByteLength.
Candidate measurable benefit: useful-work-per-transferred-physical-byte, verified rebuild ratio, end-to-end latency, energy, reconstruction throughput and quality loss by transform class.

**Never compress away required audit data, model source provenance, owner consent, private-key protections or independently verified findings.**

## 6. One logical LeeWay GPU; real backend qualification

LeeWay GPU is the persistent logical compute provider that Machine Consciousness employs for eligible inferences, encoding, vision, audio, content transforms and useful matrix operations. A single service identity can survive individual physical accelerator replacement. Its control plane maintains model load state, scheduling, work budgets, thermal measurements, backpressure and device memory leases.

The physical backend is selected from actually qualified host adapters (for example D3D12 on Windows, Vulkan on supported Android/Linux, CUDA where explicitly implemented, Metal on eligible Apple environments, or authorized CPU-only fallback when the workload contract permits it). A web page, GPU repository, physical NVIDIA discovery, VRAM estimate or service name is not an executable GPU proof.

**Per-workload processing:**
1. Machine Consciousness proposes the work; Runtime binds owner, task, input digest, target and budget.
2. Formula evaluates the current request and representation.
3. GPU resource scheduler selects the physically available backend and obtains a real LDWMD allocation/lease, not a self-claimed one.
4. Model Hub provides a pinned admissible model and tokenizer/adapters when the job actually uses an LLM.
5. GPU/CPU device execution produces measured counters, output digest and physical readback.
6. Veritas checks authority, measured evidence and required result properties.
7. Receipt Authority appends actual events; Continuum persists referenced artifacts and checkpoints.

**Every task participates in the same GPU/compute-resource *accounting and eligibility fabric*.** Not every operation can or should execute on GPU silicon: identity checks, host wake, disk durability, network I/O and many small control operations need CPU/network/storage resources. If the GPU is unavailable, report degraded or queued state; an authorized CPU fallback remains an explicitly measured fallback, not GPU execution.

## 7. PCIe packing — the 'one truck carries many' requirement

Translate the Creator's truck metaphor into a testable **bounded transfer capsule**, not additional PCIe hardware width.

- Input: several typed, exact source blocks (the 'slices'), each with separate digest, length and authorization.
- Packing: choose chunk boundaries, dictionary/delta or other exact codec, alignment, descriptor table and allowed maximum transfer size; batch multiple transfers into one submitted memory buffer where beneficial.
- Capsule: one valid DMA submission or defined transfer object. It carries many logically distinguishable items, but has finite byte length and link-bandwidth cost.
- Native dispatch: select pinned/page-locked memory, direct paths or zero-copy only when backend and safety allow; use asynchronous copies, prefetch, buffers and fewer synchronization barriers where measured.
- Unpacking: GPU/receiver reconstructs or maps each item with bounds checking and byte-exact verification, then uses it through the authorized process.
- Continuum: records references, dimensions, source digests and reconstruction lineage; it does not become physical system memory.

Number of logical items per capsule is limited by actual encoded bytes, descriptor overhead, buffer size, DMA constraints, decoding cost, memory pressure and correctness—not an arbitrary promise of 4×, 8× or 1000× physical link width.

A physical PCIe x8 interface remains x8. The possible improvement is **more useful operations per physical byte, fewer transfers and less synchronization**. Compare same workload on same physical hardware before and after.

## 8. Digital Brain, Content Vault and Continuum are one content experience, not three competing writers

The Creator's 'same files' requirement should mean **one logical content identity**, with multiple governed views rather than uncoordinated copies.

- **Digital Brain:** The owner's accessible knowledge/file inventory, device-specific record catalog, local diagnostics and provenance. It can present a file without being the durable home of all bytes. A host's actual local diagnostic evidence remains attached to that device identity.
- **Content Vault / hot carrier:** Fast authorized access to recent images, thumbnails, previews, video chunks, PDFs, transcripts, file chunks, embeddings and important work artifacts. Its hot cache and index are **replaceable projections** with TTL, encryption and integrity checks. Cache miss falls back to the canonical Continuum object provider.
- **Continuum:** The canonical durable record of permitted objects and their content hashes, temporal events, experience/group relationships, task checkpoints, device scope, recovery versions and sync eligibility. The honeycomb is an **experience/index projection** over those records, not a second file-authority store.

Example: one original photograph has a canonical object/content ID. Digital Brain can list it; Content Vault may cache its thumbnail or recent bytes; Continuum may associate it with a trip experience and a project, while retaining the original exact reconstruction reference. Different views do not create independent file truths.

Portable owner content and device-local diagnostics are different: only metadata or files explicitly approved for replication leave their original device. Unapproved private host state is not silently uploaded.

## 9. Model Hub — interchangeable limbs, no direct authority

- Discover candidates through qualified provider adapters: Hugging Face, Ollama, llama.cpp, vLLM, Transformers and compatible sources, after license/integrity checks.
- Catalog metadata is not the same as downloaded weights; downloaded weights are not the same as residency; residency is not proof of successful inference.
- Stage weight artifacts in the approved canonical store or verified ephemeral working set, preserving original revisions, tokenizer, license, hashes and quantization recipe.
- Prefer one or two model runtimes warm or paused-resident **when measured accelerator RAM permits**, while keeping a wider cold catalog. Swap/unload/reload without deleting approved source artifacts or losing canonical task state.
- Machine Consciousness/Runtime alone choose the model and tools for a task. The model's output cannot issue an OS command, create credentials, authorize a GPU lease, self-grade or append a production receipt.
- Where no model is available, deterministic Machine Consciousness functions may still work; model-dependent work is honestly queued or blocked.

Model Hub is not Agent Lee's identity. The models become capabilities Agent Lee can employ under one persistent identity.

## 10. Voice, Vision, Live, RTC and Federate Web

**Voice Fabric** owns speech recognition/synthesis adapter routing, audio stream segmentation, interruption, the 'one mouth' rule, speaker playback order and voice identity. Voice generation may use qualified GPU inference but is not dependent on a specific speech model. A speech lane can pause while the underlying task continues.

**Vision** uses user/device-authorized camera, screen or stored visual sources through Device Bridge. Frame sampling, encoding, multimodal inference, redaction and evidence can use GPU when available. Losing the only camera terminates *live physical observation*, but does not stop work that only needs previously retained authorized data. No source may imply omnipresent vision without actual sensors.

**Edge RTC** provides live low-latency audio/video paths and transport telemetry. **LeeWay Live** supplies the user-facing continuous presence and reconnection experience, not an independent identity or compute authority. **Federate Web** imports scoped resource offers and routes across separate security domains. None is a surrogate for durable task storage, authorization or GPU silicon.

When external LLMs join through Device Bridge, their voice and vision privileges must be explicit session-scoped capabilities. A connected model does not automatically receive a microphone, camera, universal host control or permission to speak through a shared speaker.

## 11. Device Bridge and extension recovery after full device loss

### First enrollment
1. Install the signed native Device Bridge from the approved LeeWay distribution channel.
2. Authenticate the stable account issuer + subject and enroll a fresh device-held key/passport.
3. Establish the instanceId and separately authorized Continuum backup/recovery profile.
4. Approve actual device capabilities, storage replication scope, microphone/camera permissions and trusted services.
5. Verify durable remote work checkpoint and an independent recovery path while the first device is still alive.

### Additional device through browser extension
1. Open the verified LeeWay website or already-installed signed Chrome/Edge extension.
2. Authenticate into the existing logical instance, then download the signed device-specific Bridge package when needed.
3. The new device proves a **new** key, receives only its own scope/grants, and is joined under the same instanceId.
4. Runtime and Continuum negotiate owner-approved replicas and sync history using immutable content hashes and accepted revision/epoch.
5. Tablet, widget and extension display the same authoritative task/session state; no duplicated independent Agent Lee control plane.

### When the only phone is destroyed
1. The independent Runtime keeps the already authorized task running; its durable job lease/checkpoint and canonical encrypted work assets are not held exclusively on the phone.
2. A host-unavailable physical operation is queued/blocked; an eligible digital operation can continue on the independent compute home.
3. A replacement device authenticates through an independently survivable owner recovery path. Recovery cannot require possession of the destroyed phone or trust an extension alone.
4. Keys are restored/rotated under approved recovery policy; the lost device passport is revoked.
5. The new device reconnects to the same canonical instance and receives permitted Digital Brain content, Content Vault hot projections, Continuum experiences and checkpoint history.
6. Any previous action requiring physical access or fresh consent is reauthorized; completed durable work remains completed with provenance and no duplicate side effect.

A browser extension is a convenient **enrollment and recovery entry**, not the only recovery secret or a privileged host bypass. New device trust is earned, not copied.

## 12. Background workforce and autonomous maintenance

Machine Consciousness retains the original mission, active work ledger and decision history. Workers may be RUNNING, LEASED, PAUSED_RESIDENT, STANDBY, HIBERNATED or FAILED. A persistent supervisor keeps enough workers active to meet durability, security and service-level goals without requiring every model/device CPU to run all the time.

Leases, checkpoints and fencing prevent two resumed workers from independently committing the same side effect. Workers can wake on an authorized event, retry a failed bounded task, rotate hosts, verify backups, perform retention and health checks, and propose repair. No worker may expand its own scope, approve its own independent Veritas judgment or hide failures.

## 13. Standard cross-component handoff fields

Every governed message must carry or resolve:
- instanceId, ownerScope, operationId, causalityId, stage and idempotencyKey;
- responsible authority, caller role, requested capability, exact device/workload target and approved limits;
- original content/media digest, typed format, declared codec, exact-vs-lossy policy and reconstruction/quality profile;
- resource assignment and compute backend state, GPU/CPU/VRAM/PCIe budget and physical evidence or NOT_EXECUTED;
- Formula decision reference and actual execution identity, Veritas PRE/POST references, original Receipt Authority record and Continuum checkpoint/readback status;
- non-secret provenance, permission/revocation state, failure and resume instructions.

The payload should be small and content-addressed. Large binary files remain in the approved object store, with the hot Content Vault carrying only authorized caches and pointers.

## 14. Non-negotiable acceptance demonstrations

A1. Start on one phone; queue a digital task; commit a durable remote work checkpoint; destroy/offline that phone; verify task completes on independent compute and is visible on a newly enrolled device without user resubmission.

A2. Recover the same logical instance from a **fresh** device with all previous devices absent; prove encrypted state authenticity, authorized key recovery, lost-device revocation, no duplicate worker or cross-owner leakage.

A3. Enroll two and then 1,000 *simulated* Device Bridge bodies under one instance; verify single authoritative work history, per-device keys/grants, fencing and revocation. Simulation is not 1,000 real live devices.

A4. Demonstrate host failover with stateful checkpoints and worker leases while no user session is active. Distinguish device-only offline mode from real remote continuous execution.

A5. Model Hub loads one/two actual admitted models as resources allow, measures real backend residency, executes a request, swaps, resumes model-neutral work, and refuses unqualified providers.

A6. Golden Formula demonstrates byte-identical file roundtrip and original hash preservation for multiple file types. Separately measure any lossy model transformation against quality/task thresholds; do not conflate the two.

A7. PCIe packed-batch A/B benchmark on identical physical hardware: measured raw/encoded bytes, x-link generation/width, throughput, copies, decoder overhead, sync, end-to-end latency, reconstructed hashes, VRAM pressure, Formula receipts and net benefit. No claimed lane multiplication.

A8. Qualified LeeWay GPU service handles actual eligible voice, visual and model workloads; records independent physical execution and LDWMD leases. Ineligible control work runs via correct non-GPU provider without fabricating GPU use.

A9. Digital Brain, Content Vault and Continuum show one file/content ID across fast thumbnail, original document, experience/honeycomb and newly enrolled device; correct expiry, permissions and missing-cache fallback.

A10. End-to-end voice/vision: genuine authorized microphone/camera, Live RTC session, model proposal, GPU telemetry where used, ordered voice playback, cross-device interruption, explicit outside-LLM permission and device-loss recovery.

A11. One real command goes through authentic owner/Formula, independent Veritas PRE, scoped Device Bridge operation, independent POST, canonical Receipt Authority, Continuum write/readback and eligible Learning Ledger admission. No source CI, vendor health or synthetic fixture can substitute for those operations.

A12. Run with original user devices disconnected for a declared interval, including task continuation, backup durability, resource consumption, costs, incident alerts and restored-device readback. If no independent host remains, assert the correct BLOCKED/unavailable state.

## 15. Current evidence classification

This design extends the existing cross-repo v1 boundary. Actual source exists for Model Hub, the Golden Formula storage/PCIe domains, Continuum account recovery and storage adapters, Device Bridge enrollment, Edge GPU, Voice Fabric, Edge RTC, Live and Federate Web. Many original source contracts explicitly label physical execution, hosted GPU inference, cross-device disaster recovery, independent Veritas or canonical receipts as not yet qualified.

**No source-level architecture contract, diagram, GitHub CI, code comment or model statement proves a 24/7 independently hosted LeeWay GPU or completion after all devices disappear.** Preserve intended requirement and separately measure the deployed system against A1–A12 before calling it operational.
