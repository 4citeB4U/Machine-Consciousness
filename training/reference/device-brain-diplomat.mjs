/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.TRAINING_REFERENCE
TAG: AGNOSTIC_DEVICE_BRAIN_BOUNDARY
5WH:
WHAT = Keep portable LeeWay logic separate from device-owned diagnostics and native paths.
WHY = Let Machine Consciousness request device capability without making a host path its identity.
WHO = LeeWay Machine Consciousness training boundary.
WHERE = training/reference/device-brain-diplomat.mjs.
WHEN = 2026-11-11.
HOW = Reject hard-coded host paths in agnostic payloads and grant bounded leases only from device evidence.
LICENSE = Repository terms unchanged; candidate reference only.
*/

const HARDCODED_OS_PATH = /(?:[A-Za-z]:\\|\/Users\/|\/home\/|\/data\/data\/|\/var\/mobile\/)/;

export function assertAgnosticPurity(payload) {
  const match = String(payload ?? '').match(HARDCODED_OS_PATH);
  return match
    ? { pure: false, violation: `DEVICE_PATH_IN_AGNOSTIC_PAYLOAD:${match[0]}` }
    : { pure: true };
}

export function evaluateDeviceBrainLease(request, grant) {
  if (!String(request?.creatorLineageSignature ?? '').startsWith('LEEWAY_CREATOR_SIG_')) {
    return { proceedWithExecution: false, conveyorStatus: 'UNTRUSTED_LINEAGE' };
  }
  const diagnostics = grant?.diagnosticsSnapshot ?? {};
  if (grant?.permissionGrantedByDevice !== true || diagnostics.gpuTempC > 83 || diagnostics.availableVramMb < request.minimumVramMb) {
    return { proceedWithExecution: false, conveyorStatus: 'REFUSED_BY_DEVICE_DIAGNOSTICS' };
  }
  return { proceedWithExecution: true, boundExecutionTarget: grant.deviceNativePathResolved, conveyorStatus: 'LEASE_GRANTED_BY_DEVICE' };
}

export function sanitizeForAgnosticConveyor(rawLog, deviceNativePath, logicalComponentId) {
  if (!deviceNativePath || !logicalComponentId) throw new TypeError('SANITIZE_REQUIRES_PATH_AND_LOGICAL_COMPONENT');
  return String(rawLog).split(deviceNativePath).join(`$AGNOSTIC_NODE[${logicalComponentId}]`);
}
