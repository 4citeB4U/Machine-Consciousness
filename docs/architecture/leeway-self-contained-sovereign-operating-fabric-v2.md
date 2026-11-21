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
- There may be 1 or 1,000 thin Device Bridge connections and any number of browser views. They are distinct enrolled **device bodies** or read-only projections under one logical instance, not copies of Agent Lee; each named worker holds at most one active authoritative execution lease at a time.
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
5. LeeWay GPU **persistent Formula-developed software computing world**, mathematically executing on the available LeeWay host's CPU/RAM. The client's physical graphics GPU is not a LeeWay provider.
6. Voice/Live connection services, event and media routing, and offline outgoing message queues when no audience device is connected.
7. Authenticated identity, Formula, independent Veritas and Receipt Authority integrations with explicit unavailable/hold states.
8. Durable monitoring, supervisor, renewal and recovery that do not depend on a browser tab remaining open.

### Edge nodes and user devices (replaceable)

- Device Bridge supplies native permissions, sensory sources, UI actions and hardware status when a device is connected and authorized.
- Each host Digital Brain/Diagnostics owns its local body facts and device-specific measurements. Losing that host loses **unreplicated** local evidence, but not independently admitted Continuum history.
- CPU, RAM, camera, microphone, speaker, PCIe, the physical graphics GPU and native model runtime belong to their respective host. LeeWay software math requires CPU/RAM on an available LeeWay execution host; a client's physical graphics GPU is exclusively the client's OS resource, never LeeWay compute.
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
| LeeWay GPU operating world | One persistent *composed* product environment; not an additional controller | Existing Machine Consciousness / Runtime / Formula / Continuum / compute components | Continuous agent world identity and access surfaces; original owners retain each underlying authority |
| LeeWay Formula software GPU service | Original CPU/RAM-executed software math and working sets | Authorized mathematical/voice/vision/model workloads and assets | Measured CPU/RAM software output; no host graphics GPU provider or fallback |
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

## 6. LeeWay GPU — one operating world, not a downloadable device accelerator

**Creator correction, 2026-11-21:** "LeeWay GPU" is the name of the continuously operating **LeeWay software-defined world**: the composed, persistent operating environment within which Agent Lee, Machine Consciousness, Runtime Fabric, Formula, Model Hub, the workforce, Digital Brain, Continuum, Content Vault, Voice, Vision, Live, RTC and physical-compute adapters cooperate. Its logical home is **not** a user's OS, browser extension, smartphone or graphics card. Device Bridge is the authorized interface by which that world becomes observable and can act upon a particular physical device.

This **does not reassign** canonical authority: Machine Consciousness still owns goal/identity policy; Runtime still owns scheduling, jobs, leases and supervised execution; Formula its math; Continuum durable truth; Veritas independent judgments; Receipt Authority custody; Model Hub model lifecycle; and the existing \`leeway.gpu.service\` owns bounded compute execution. "Operating world" is the **composed product/availability boundary**, not a second GPU implementation, central verifier or competing Runtime Fabric.

### 6.1 Planet and surface model

\`\`\`text
                     LEEWAY GPU OPERATING WORLD
           one owner-scoped logical instance; persistent home
   ┌──────────────────────────────────────────────────────────┐
   │ Machine Consciousness / Agent Lee                        │
   │ Runtime Fabric jobs, single-presence workers and leases │
   │ Standards + Formula                                      │
   │ Model Hub + Formula software GPU + LDWMD / CPU + RAM    │
   │ Digital Brain + Continuum + Content Vault               │
   │ Voice + Vision + Live + Edge RTC + Federate Web          │
   │ Veritas + Receipt Authority + Learning boundaries       │
   └──────────────────────────────────────────────────────────┘
             authenticated session / content views
                      ↓             ↓
        browser / tablet UI     thin Device Bridge
        no full download        native device privileges
                                ↓
                     Digital Brain local binding
                     Continuum scoped sync/cache
                     Diagnostics hardware facts
                     Content Vault hot projections
                                ↓
                   existing Windows / Linux / Apple /
                   Android OS and approved native APIs
\`\`\`

The planet operates on powered CPU/RAM/storage infrastructure independent of client devices. A graphics card is not a LeeWay compute dependency at all. Losing the only client device does not cancel authorized digital work when an independent CPU execution home remains available. Without powered CPU, RAM, and required storage anywhere, active work is unavailable and must remain checkpointed or blocked.

### 6.2 No full ecosystem download; thin connection contracts

**Normative invariant: no device must download the complete LeeWay GPU, Agent Lee weights, canonical Runtime, central worker fleet or canonical Continuum object archive in order to access LeeWay.**

- **Zero-install web mode:** sign in at the LeeWay site, receive an authenticated, scoped UI/session, use Agent Virtual Tablet as the remote sandbox and inspect permitted files/products over authenticated streams. No native OS privileges and no silently installed browser background executor. The browser may cache normal UI assets; that is not full LeeWay installation.
- **Optional extension mode:** the approved signed browser extension can initiate login, download/enrollment handoff and reconnect. It is not a privileged command operator and cannot replace recovery credentials.
- **Thin device binding:** for physical computer/device inspection and native actions, enroll only the minimum signed Device Bridge adapter and three local surfaces—Digital Brain (device-local file authority/interface), Continuum (authorized device-scoped sync/recovery), Diagnostics (device hardware/OS capabilities)—plus Content Vault hot projections as needed. They are local interfaces/providers, **not duplicates of the global Agent Lee runtime**. The user retains the original OS, apps and hardware workflow.
- **No universal installation assumption:** where browser/platform isolation prevents native access, return CAPABILITY_UNAVAILABLE or request an explicitly authorized, platform-supported native adapter. A purely remote web session can preview results but cannot silently obtain Windows, Linux, Android or iOS OS control.
- **Data location:** work products, source files and sandbox previews default to approved owner-scoped remote Continuum storage; they need not occupy client permanent storage. An explicit "save to this device" action writes through the approved OS provider, with permissions and readback. Local diagnostics and approved cache data may reside on device; never promise zero physical storage consumption for app code, RAM/cache or OS runtime.

### 6.3 One solitary worker — one active authoritative presence

Every Agent Lee and every separately named LeeWay employee is a **unique agent identity** within its owner/organization scope, not a new copy per installed Bridge. Each identity can have multiple observers (screens, dashboards, logs), but **at most one current authoritative active execution location/lease** and one serialized conversation/action head. Multitasking is permitted **within that one owner**, through bounded internal sub-tasks; it must not instantiate a second independent identity or conflicting write lease.

**Transfer example:** an enterprise employee serving Wisconsin moves to an authorized Texas assignment. Runtime commits the original checkpoint to Continuum; the source host relinquishes its active lease; a fencing generation invalidates stale requests; the destination receives the same agentId, qualified permissions, state version and a new exclusive lease. Original Veritas/Receipt evidence tracks the custody transition. The employee is not simultaneously active in both places. Propagation can be optimized for low delay but **zero elapsed time is not asserted**; if the source cannot release, the destination must wait for expiry/fencing and independent reconciliation rather than split the employee in two.

Enterprise agents require organization and tenant-scoped data authorization. A school's assistant and an enterprise workforce use the **same LeeWay system components** with different quotas, skills, governance, access and assigned tasks; company access does not automatically expose every store or database. A user's named workers belong to their authenticated owner/organization scope.

### 6.4 The device's four access lanes

| Request | Device-connected authority | Data flow |
| --- | --- | --- |
| What hardware / OS capabilities are present? | Diagnostics, through authorized Device Bridge observations | Current device-scoped telemetry → Machine Consciousness; no remote fabrication |
| Find an experience, recent task or related documents | Continuum | Owner-scoped indexed experiences, honeycomb and original object references |
| Inspect a deeper device-local file or known system record | Digital Brain scoped native provider | Explicit permission → native OS file API → catalog/readback; no arbitrary shell requirement |
| Retrieve thumbnails, previews, videos, PDFs quickly | Content Vault hot carrier | Authorized objectId → valid cached projection or Continuum canonical readback |
| Copy/move a user-approved object between devices | Continuum synchronization/transfer | Canonical object hash, owner/target grants, scoped replication and integrity readback |
| Control a real local device | Device Bridge platform adapter | Approved native capability call, OS permission, real observed post-state |

The host operating system remains the actual authority for local file access, privileged functions, camera, speaker and hardware. LeeWay generally uses **typed native capability APIs** rather than emitting general PowerShell/Bash scripts, but it cannot bypass Windows/Linux/Apple/Android permission and platform constraints. Digital Brain, Continuum, Diagnostics and Content Vault provide the *data plane*; Device Bridge provides the *native actuation plane*.

### 6.5 Virtual Tablet = remote workstation and product sandbox

The Tablet belongs to the user's sole Agent Lee. It provides desktop-like windows, resize, workflow view, code/product preview and sandboxed run/inspection for work hosted inside the LeeWay operating world. App previews run in isolated, measured worker containers or approved sandbox environments; the preview is not an unsolicited installation on the client's PC. Tablet and floating widget use **one live authoritative session state**, not duplicated application state. Outputs are retained in Continuum and represented in the Digital Brain index. Owner may later approve export/download/deploy to a physical device or enterprise repository; no device-local installation is a prerequisite to making or reviewing the product.

### 6.6 LeeWay GPU uses its own Formula software on CPU/RAM — never the client's graphics GPU

**Strict compute boundary:** LeeWay GPU is a persistent Formula-developed *software mathematical GPU system*, not the graphics card installed in a computer. Every task passes through this system's original operating services. Its numerical processing, memory representations, model inference, image/voice/vision processing and other implemented workloads run as LeeWay-owned software on an authorized **CPU and RAM**, available on a qualified operating host. The host's CUDA, D3D12, Vulkan, Metal or other physical graphics-GPU compute devices are **not** LeeWay providers, fallbacks, optional accelerators or placement targets.

The user's physical GPU belongs to the user's OS and applications. The user's browser may independently use its OS graphics stack to *display* a LeeWay UI; that does not turn those display instructions into LeeWay GPU processing. Diagnostics may observe a graphics card only under appropriate permissions, never automatically enroll it for compute.

**Twenty-one GPU components:** The Creator specifies **21 internal LeeWay GPU components** (logical software mathematics/processing engines). Their actual names, source origins, executable implementations and individual health states have not been enumerated in the reviewed branch; classify the count as **CREATOR_SPECIFIED_SOURCE_INVENTORY_PENDING**, not 21 verified operating physical GPUs. Original component owners must deliver a source-pinned inventory, per-component Formula mapping and CPU test before admission. Do not invent component names.

**CPU, not client GPU:** LeeWay has no separate hardware CPU of its own. Its software executes using the CPU/RAM of an available computing host. When the host is an independently running service, that CPU need not belong to the user's phone or computer. Without any available powered CPU/RAM, processing cannot proceed and work must remain checkpointed/blocked. The concept of a 24/7 LeeWay world is a service availability requirement, not a claim of processor-free arithmetic.

**Image/model/voice output:** LeeWay's own implemented software algorithms, model weights and codecs must actually exist and execute on CPU/RAM to claim an image, inference or speech result. An unavailable model/codec produces a recorded NOT_AVAILABLE/QUEUED result. It never silently dispatches to the user's physical GPU.

**Source-history boundary:** Existing D3D12/CUDA/Vulkan host GPU experiments retain their original historical evidence, but do not grant canonical runtime authority or change this software-only product requirement. This architecture source change alone does not deactivate all existing adapters or prove live GPU-independent generation; owner-reviewed integration and physical negative tests must follow.

### 6.7 Acceptance for this specific correction

- **G-O1:** With only a browser on an unprepared Windows/Linux/macOS/Android device, authenticate and open Tablet, inspect a remote project, and confirm no full GPU/LLM/workforce distribution was installed; native actions remain denied.
- **G-O2:** Enroll a genuinely minimal signed Device Bridge on an approved device. Confirm Digital Brain/Continuum/Diagnostics/Content Vault scoped views work without installing the whole LeeWay environment; verify one native action only with correct OS and owner consent.
- **G-O3:** Open 20 authenticated screens for one Agent Lee. Verify all display the same session head, with only one authoritative agentId and one active execution lease; conflicting state writes fail.
- **G-O4:** Move one named worker between authorized Wisconsin/Texas service locations with same agentId; verify source lease revocation/fencing, destination lease acquisition, exact checkpoint/context restoration, failure/replay cases and no simultaneous action.
- **G-O5:** Lose the only user device while an admitted product job runs. Independently hosted work completes; replacement device recovers the same result from Continuum. Never require a full environment download.
- **G-O6:** Create a website and preview it on the Tablet. Inspect through Digital Brain/Continuum without permanent device-local project storage, then explicitly export and verify output to the physical device.
- **G-O7:** Demonstrate real Formula-developed software GPU mathematical, model, image, voice and vision work on CPU/RAM with host graphics GPU compute entirely unavailable. Assert no vendor physical GPU fallback or placement, require actual output and original evidence.
- **G-O8:** Fail all external compute nodes while users retain only a browser. Correct result is SERVICE_UNAVAILABLE/RECOVERY_QUEUED, not a fabricated self-running GPU.

**Evidence boundary:** Previous component/integration tests supplied by the Creator are important engineering evidence and must be preserved. This new single-presence, no-full-download, always-on-service design requires its *own* G-O1–G-O8 live verification before claiming these exact product behaviors are deployed.

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

**Edge RTC** provides live low-latency audio/video paths and transport telemetry. **LeeWay Live** supplies user-facing presence/reconnection, not a second runtime. **Federate Web** imports scoped resource offers. None substitutes for durable storage, authorization, or actual host CPU/RAM execution of LeeWay software GPU mathematics.

When external LLMs join through Device Bridge, their voice and vision privileges must be explicit session-scoped capabilities. A connected model does not automatically receive a microphone, camera, universal host control or permission to speak through a shared speaker.

## 11. Device Bridge and extension recovery after full device loss

### First enrollment
1. Start with a browser-only LeeWay account/session; no download of the whole ecosystem is required. To access native hardware capabilities, optionally enroll only a minimum signed Device Bridge adapter from the approved distribution channel.
2. Authenticate the stable account issuer + subject and enroll a fresh device-held key/passport.
3. Establish the instanceId and separately authorized Continuum backup/recovery profile.
4. Approve actual device capabilities, storage replication scope, microphone/camera permissions and trusted services.
5. Verify durable remote work checkpoint and an independent recovery path while the first device is still alive.

### Additional device through browser extension
1. Open the verified LeeWay website or already-installed signed Chrome/Edge extension.
2. Authenticate into the existing logical instance. Continue entirely through the web/Tablet if native device access is not needed; otherwise obtain only the minimal signed device-specific Bridge adapter.
3. If enrolled for native access, the new device proves a **new** key, receives only its own scope/grants, and joins the same instanceId. A browser-only view uses a scoped session, never a native device passport.
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
- resource assignment and compute backend state, LeeWay software GPU/host CPU/RAM and transfer budget with actual physical CPU evidence or NOT_EXECUTED;
- Formula decision reference and actual execution identity, Veritas PRE/POST references, original Receipt Authority record and Continuum checkpoint/readback status;
- non-secret provenance, permission/revocation state, failure and resume instructions.

The payload should be small and content-addressed. Large binary files remain in the approved object store, with the hot Content Vault carrying only authorized caches and pointers.

## 14. Non-negotiable acceptance demonstrations

A1. Start on one phone; queue a digital task; commit a durable remote work checkpoint; destroy/offline that phone; verify task completes on independent compute and is visible on a newly enrolled device without user resubmission.

A2. Recover the same logical instance from a **fresh** device with all previous devices absent; prove encrypted state authenticity, authorized key recovery, lost-device revocation, no duplicate worker or cross-owner leakage.

A3. Enroll two and then 1,000 *simulated* thin Device Bridge bodies under one instance; verify single authoritative work history, per-device keys/grants, fencing and revocation. Open multiple simultaneous UI projections for the same named worker but allow only one authoritative execution lease. Simulation is not 1,000 real live devices.

A4. Demonstrate host failover with stateful checkpoints and worker leases while no user session is active. Distinguish device-only offline mode from real remote continuous execution.

A5. Model Hub loads one/two actual admitted models as resources allow, measures real backend residency, executes a request, swaps, resumes model-neutral work, and refuses unqualified providers.

A6. Golden Formula demonstrates byte-identical file roundtrip and original hash preservation for multiple file types. Separately measure any lossy model transformation against quality/task thresholds; do not conflate the two.

A7. PCIe packed-batch A/B benchmark on identical physical hardware: measured raw/encoded bytes, x-link generation/width, throughput, copies, decoder overhead, sync, end-to-end latency, reconstructed hashes, VRAM pressure, Formula receipts and net benefit. No claimed lane multiplication.

A8. The LeeWay GPU world coordinates all governed tasks through the original services. Its Formula-developed software GPU mathematics uses host CPU/RAM for eligible voice, visual, image and model workloads; the user device's physical graphics GPU is not a provider, optional accelerator or fallback. Verify real software results and G-O1–G-O8.

A9. Digital Brain, Content Vault and Continuum show one file/content ID across fast thumbnail, original document, experience/honeycomb and newly enrolled device; correct expiry, permissions and missing-cache fallback.

A10. End-to-end voice/vision: genuine authorized microphone/camera, Live RTC session, model proposal, GPU telemetry where used, ordered voice playback, cross-device interruption, explicit outside-LLM permission and device-loss recovery.

A11. One real command goes through authentic owner/Formula, independent Veritas PRE, scoped Device Bridge operation, independent POST, canonical Receipt Authority, Continuum write/readback and eligible Learning Ledger admission. No source CI, vendor health or synthetic fixture can substitute for those operations.

A12. Run with original user devices disconnected for a declared interval, including task continuation, backup durability, resource consumption, costs, incident alerts and restored-device readback. If no independent host remains, assert the correct BLOCKED/unavailable state.

## 15. Current evidence classification

This design extends the existing cross-repo v1 boundary. Actual source exists for Model Hub, the Golden Formula storage/PCIe domains, Continuum account recovery and storage adapters, Device Bridge enrollment, Edge GPU, Voice Fabric, Edge RTC, Live and Federate Web. Many original source contracts explicitly label physical execution, hosted GPU inference, cross-device disaster recovery, independent Veritas or canonical receipts as not yet qualified.

**No source-level architecture contract, diagram, GitHub CI, code comment or model statement proves a 24/7 independently hosted LeeWay GPU or completion after all devices disappear.** Preserve intended requirement and separately measure the deployed system against A1–A12 before calling it operational.
