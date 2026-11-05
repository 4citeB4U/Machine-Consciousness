import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const ENGINEERING_LOOP = Object.freeze([
  'INVESTIGATE', 'DIAGNOSE', 'PLAN', 'IMPLEMENT', 'TEST', 'VALIDATE',
  'REPAIR', 'RETEST', 'VERIFY', 'EVIDENCE', 'CHECKPOINT', 'CONTINUE'
]);

const REQUIRED_AGENT_FIELDS = Object.freeze([
  'systemLeewayId', 'immutableRoleId', 'displayName', 'agentFamily',
  'allowedWorkflows', 'allowedTools', 'allowedModelRoutes',
  'allowedExecutionEnvironments', 'telemetryStreamIds', 'identityPulseStatus'
]);

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf8').replace(/^\uFEFF/, ''));
}

export function validateUniversalContract(contract) {
  const errors = [];
  if (contract?.contractId !== 'LEEWAY_UNIVERSAL_EMPLOYEE_MACHINE_CONSCIOUSNESS_V1') errors.push('CONTRACT_ID_INVALID');
  if (contract?.appliesTo !== 'ALL_LEEWAY_AGENTS_AND_DIGITAL_EMPLOYEES') errors.push('CONTRACT_SCOPE_INVALID');
  if (contract?.core?.type !== 'DETERMINISTIC_NON_LLM_MACHINE_CONSCIOUSNESS') errors.push('CORE_TYPE_INVALID');
  if (contract?.core?.requiredForEveryEmployee !== true) errors.push('UNIVERSAL_BINDING_NOT_REQUIRED');
  if (JSON.stringify(contract?.engineeringLoop) !== JSON.stringify(ENGINEERING_LOOP)) errors.push('ENGINEERING_LOOP_INVALID');
  if (contract?.modelPolicy?.modelHubOnly !== true || contract?.modelPolicy?.neverAuthority !== true || contract?.modelPolicy?.neverDirectAction !== true) errors.push('MODEL_POLICY_NOT_FAIL_CLOSED');
  if (contract?.storagePolicy?.durableAuthority !== 'LEEWAY_CONTINUUM_ONLY' || contract?.storagePolicy?.otherDurableStores !== 'FORBIDDEN') errors.push('STORAGE_POLICY_NOT_CONTINUUM_ONLY');
  if (contract?.actionPolicy?.directLlmAction !== 'FORBIDDEN' || contract?.actionPolicy?.unreceiptedAction !== 'FORBIDDEN') errors.push('ACTION_POLICY_NOT_FAIL_CLOSED');
  return errors;
}

export function validateAgentBinding(agent) {
  const errors = [];
  for (const field of REQUIRED_AGENT_FIELDS) {
    if (agent?.[field] === undefined || agent?.[field] === null || (field !== 'allowedModelRoutes' && Array.isArray(agent[field]) && agent[field].length === 0)) {
      errors.push(`AGENT_${field.toUpperCase()}_MISSING`);
    }
  }
  if (!Array.isArray(agent?.blockedActions) || !agent.blockedActions.includes('DIRECT_LLM_ACTION')) errors.push('AGENT_DIRECT_LLM_ACTION_NOT_BLOCKED');
  if (!Array.isArray(agent?.blockedActions) || !agent.blockedActions.includes('UNRECEIPTED_ACTION')) errors.push('AGENT_UNRECEIPTED_ACTION_NOT_BLOCKED');
  if (agent?.canRunTerminal === true && agent?.requiresHumanApproval !== true) errors.push('AGENT_TERMINAL_WITHOUT_APPROVAL');
  return errors;
}

export function validateAgentBook(agentBook, contract) {
  const errors = validateUniversalContract(contract);
  const agents = Array.isArray(agentBook?.agents) ? agentBook.agents : [];
  if (!agents.length) errors.push('AGENT_BOOK_EMPTY_OR_INVALID');
  const bindings = agents.map(agent => {
    const agentErrors = validateAgentBinding(agent);
    return {
      agentId: agent.systemLeewayId || null,
      roleId: agent.immutableRoleId || null,
      displayName: agent.displayName || null,
      status: agentErrors.length ? 'BLOCKED' : 'DERIVED_BINDING_PASS',
      errors: agentErrors,
      modelOptional: true,
      consciousness: 'LEEWAY_MACHINE_CONSCIOUSNESS_SHARED_SUBSTRATE'
    };
  });
  for (const binding of bindings) for (const error of binding.errors) errors.push(`${binding.agentId || 'UNKNOWN'}:${error}`);
  return {
    status: errors.length ? 'UNIVERSAL_CONSCIOUSNESS_CONTRACT_BLOCKED' : 'UNIVERSAL_CONSCIOUSNESS_CONTRACT_PASS',
    contractId: contract?.contractId || null,
    appliesTo: contract?.appliesTo || null,
    totalAgents: agents.length,
    coveredAgents: bindings.filter(binding => binding.status === 'DERIVED_BINDING_PASS').length,
    blockedAgents: bindings.filter(binding => binding.status === 'BLOCKED').length,
    bindings,
    errors,
    modelPolicy: contract?.modelPolicy || null,
    storagePolicy: contract?.storagePolicy || null,
    engineeringLoop: contract?.engineeringLoop || null
  };
}

export function auditPaths({ contractPath, agentBookPath }) {
  const contract = readJson(contractPath);
  const agentBook = readJson(agentBookPath);
  return validateAgentBook(agentBook, contract);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, value, index, all) => {
    if (value.startsWith('--')) pairs.push([value.slice(2), all[index + 1]]);
    return pairs;
  }, []));
  const contractPath = args.contract || path.resolve(import.meta.dirname, '..', 'contracts', 'leeway-universal-employee-consciousness.v1.json');
  const agentBookPath = args['agent-book'] || process.env.LEEWAY_AGENT_BOOK_PATH;
  if (!agentBookPath) {
    console.error(JSON.stringify({ status: 'UNIVERSAL_CONSCIOUSNESS_CONTRACT_BLOCKED', error: 'AGENT_BOOK_PATH_REQUIRED' }, null, 2));
    process.exitCode = 2;
  } else {
    const result = auditPaths({ contractPath, agentBookPath });
    console.log(JSON.stringify(result, null, 2));
    if (result.status !== 'UNIVERSAL_CONSCIOUSNESS_CONTRACT_PASS') process.exitCode = 1;
  }
}
