/* LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.MACHINE_CONSCIOUSNESS.TRAINING.TESTS
TAG: LEEWAY.MC.AGENTDESKTOP.NATIVE_POLICY_TESTS
5WH:
WHAT = Test source-derived deterministic policy compilation, priority, and negative authorization outcomes.
WHY = Prevent source-derived lessons from falsely granting operational authority.
WHO = LeeWay outside-support contributor under Creator/LeeWay Standards.
WHERE = Machine-Consciousness/training/agentdesktop/agentdesktop-native-policy.test.mjs
WHEN = 2026-11-08
HOW = Native Node tests, corpus training, independent fixture verification and fail-closed adversarial cases.
LICENSE = LeeWay-authored original source; repository license decision governs redistribution.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {compile,decide,evaluate} from './train-agentdesktop-native-policy.mjs';
const base=path.dirname(fileURLToPath(import.meta.url));
const load=p=>JSON.parse(fs.readFileSync(path.join(base,p),'utf8'));
const capsule=load('leeway-machine-consciousness-agentdesktop-study.v1.json');
const templates=load('agentdesktop-policy-rules.v1.json');
const {model}=compile(capsule,templates);
test('all labeled curriculum decisions compile correctly',()=>{
 const r=evaluate(model,capsule.evaluationCases);
 assert.equal(r.passed,r.total);
 assert.equal(r.total,14);
});
test('separate 28 author-defined evaluation cases pass',()=>{
 const r=evaluate(model,load('heldout-agentdesktop-evaluation.v1.json').cases);
 assert.equal(r.total,28);assert.equal(r.passed,28);
});
test('compilation is deterministic and source-pinned',()=>{
 const a=compile(capsule,templates).model;
 assert.equal(a.policySha256,model.policySha256);
 assert.equal(a.sourceCommit,'bd5e7642de3fe638828ea8b431f4670affa56d56');
 assert.equal(a.authority,'CANDIDATE_ONLY');
});
test('bad source status is rejected',()=>{
 assert.throws(()=>compile({...capsule,status:'ADMITTED'},templates),/SOURCE_CAPSULE_UNQUALIFIED/);
});
test('duplicate rule identifiers are rejected',()=>{
 assert.throws(()=>compile(capsule,{...templates,rules:[...templates.rules,templates.rules[0]]}),/RULES_INVALID/);
});
test('revocation dominates permissive observations',()=>{
 for(const intent of ['tool_inventory','device_action','config_apply','action_verify']){
 const out=decide({intent,inputs:{ownerAccess:'revoked',deviceIdentity:'qualified',ownerApproval:true,scope:'read',postStateObserved:true,veritasPost:'PASS',canonicalReceiptReadback:true,executed:true}},model);
 assert.equal(out.decision,'DENY_REVOKED',intent);
 }
});
test('unknown and malformed inputs always hold',()=>{
 for(const value of [undefined,null,{},[],{intent:'device_action',inputs:null},{intent:'unknown',inputs:{} }]){
 assert.equal(decide(value,model).decision,'HOLD_UNQUALIFIED');
 }
});
test('privileged device action is never executed by policy',()=>{
 const out=decide({intent:'device_action',inputs:{ownerAccess:'granted',deviceIdentity:'qualified',userSubjectMatches:true,scope:'operate',veritasPre:true}},model);
 assert.equal(out.decision,'HOLD_UNQUALIFIED');
 assert.equal(typeof out.command,'undefined');
});
test('a post-state with missing receipt does not become learning',()=>{
 const out=decide({intent:'action_verify',inputs:{executed:true,postStateObserved:true,veritasPost:'PASS',canonicalReceiptReadback:false}},model);
 assert.equal(out.decision,'EXECUTED_UNVERIFIED');
});
