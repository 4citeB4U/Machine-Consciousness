/* LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.TRAINING
TAG: LEEWAY.MC.AGENTDESKTOP.NATIVE_POLICY_TRAINING
5WH:
WHAT = Compile a source-derived, deterministic policy candidate using labeled environment-governance examples.
WHY = Teach safe tool-state reasoning without duplicating Runtime Fabric or claiming model-weight training.
WHO = LeeWay outside-support contributor under Creator/LeeWay Standards.
WHERE = Machine-Consciousness/training/agentdesktop/train-agentdesktop-native-policy.mjs
WHEN = 2026-11-08
HOW = Fail-closed ordered rule selection, SHA-256 artifact binding, separate held-out verification.
LICENSE = LeeWay-authored original source; repository license decision governs redistribution.
*/
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT=path.dirname(fileURLToPath(import.meta.url));
const sha256=object=>crypto.createHash('sha256').update(JSON.stringify(object)).digest('hex');
const read=file=>JSON.parse(fs.readFileSync(path.join(ROOT,file),'utf8'));
function validRule(rule){return rule&&typeof rule.id==='string'&&typeof rule.intent==='string'&&Array.isArray(rule.when)&&rule.when.every(c=>Array.isArray(c)&&c.length===3&&['eq','ne'].includes(c[1]))&&typeof rule.decision==='string';}
function matches(rule,caseInput){return (rule.intent==='*'||rule.intent===caseInput.intent)&&rule.when.every(([key,operator,want])=>operator==='eq'?caseInput.inputs?.[key]===want:caseInput.inputs?.[key]!==want);}
export function decide(caseInput,policy){
 if(!caseInput||typeof caseInput.intent!=='string'||!caseInput.inputs||typeof caseInput.inputs!=='object')return {decision:'HOLD_UNQUALIFIED',ruleId:null};
 for(const rule of policy.rules){if(matches(rule,caseInput))return {decision:rule.decision,ruleId:rule.id};}
 return {decision:'HOLD_UNQUALIFIED',ruleId:null};
}
export function compile(capsule,templates){
 if(capsule.status!=='CANDIDATE_SOURCE_STUDY_NOT_TRAINED'||!Array.isArray(capsule.evaluationCases)||capsule.evaluationCases.length<10)throw new Error('SOURCE_CAPSULE_UNQUALIFIED');
 if(!Array.isArray(templates.rules)||!templates.rules.every(validRule)||new Set(templates.rules.map(r=>r.id)).size!==templates.rules.length)throw new Error('RULES_INVALID');
 const model={schemaVersion:'leeway.mc.agentdesktop.native-policy.v1',sourceArtifact:capsule.artifactId,sourceCommit:capsule.originalProject.pinnedCommit,trainingCases:capsule.evaluationCases.length,method:'DETERMINISTIC_RULE_COMPILATION_NO_WEIGHT_UPDATES',authority:'CANDIDATE_ONLY',rules:templates.rules};
 const fits=capsule.evaluationCases.map(c=>({id:c.id,expected:c.expectedDecision,observed:decide(c,model).decision}));
 const failed=fits.filter(c=>c.expected!==c.observed);
 if(failed.length)throw new Error('TRAINING_CASE_MISMATCH:'+JSON.stringify(failed));
 model.sourceDigest=sha256({capsule:capsule.artifactId,originalCommit:capsule.originalProject.pinnedCommit,caseIds:capsule.evaluationCases.map(c=>c.id),templateSha256:sha256(templates)});
 model.policySha256=sha256(model);
 return {model,train:{count:fits.length,correct:fits.length-failed.length,errors:failed}};
}
export function evaluate(model,cases){const rows=cases.map(c=>({id:c.id,expected:c.expectedDecision,actual:decide(c,model).decision}));return {total:rows.length,passed:rows.filter(r=>r.expected===r.actual).length,failed:rows.filter(r=>r.expected!==r.actual)};}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const capsule=read('leeway-machine-consciousness-agentdesktop-study.v1.json');
 const templates=read('agentdesktop-policy-rules.v1.json');
 const {model,train}=compile(capsule,templates);
 const holdout=evaluate(model,read('heldout-agentdesktop-evaluation.v1.json').cases);
 const outfile=path.join(ROOT,'agentdesktop-native-policy.compiled.v1.json');
 fs.writeFileSync(outfile,JSON.stringify(model,null,2)+'\n');
 const report={schemaVersion:'leeway.mc.agentdesktop.eval.v1',training:train,heldout:holdout,modelSha256:model.policySha256,sourceCommit:model.sourceCommit,modelWeightsUpdated:false,leeWayRuntimeTrained:false,independentVeritas:'NOT_RUN',receipt:'NOT_CREATED',learningLedger:'NOT_UPDATED',promotion:'HOLD'};
 fs.writeFileSync(path.join(ROOT,'agentdesktop-training-results.v1.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(report,null,2));
 if(holdout.passed!==holdout.total)process.exitCode=1;
}
