import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { validateAgentDesktopStudy } from '../scripts/validate-agentdesktop-study.mjs';

const root = path.resolve(import.meta.dirname, '..', '..');
const studyPath = path.join(root, 'training', 'evidence', 'agentdesktop-reverse-engineering-candidate.v1.json');

test('AgentDesktop study is admitted as a bounded six-lesson candidate', () => {
  const study = JSON.parse(fs.readFileSync(studyPath, 'utf8'));
  const result = validateAgentDesktopStudy(study);
  assert.equal(result.status, 'AGENTDESKTOP_STUDY_STRUCTURALLY_VALID_NOT_TRAINED');
  assert.equal(result.lessonCount, 6);
  assert.equal(result.caseCount, 14);
  assert.equal(result.pinnedSourceCount, 7);
  assert.equal(result.execution, 'NOT_EXECUTED');
  assert.equal(result.promotion, 'CLOSED');
});

test('AgentDesktop study preserves LeeWay authority and learning boundaries', () => {
  const study = JSON.parse(fs.readFileSync(studyPath, 'utf8'));
  assert.equal(study.architectureDecision.rejectedDecision, 'INSTALL_AGENTDESKTOP_AS_A_SECOND_CONTROL_PLANE');
  assert.equal(study.architectureDecision.llmRequired, false);
  assert.equal(study.architectureDecision.modelWeightsModified, false);
  assert.equal(study.admission.runtimeLearningExecuted, false);
  assert.equal(study.admission.formula, 'NOT_EXECUTED');
  assert.equal(study.admission.veritas, 'NOT_RUN');
  assert.equal(study.admission.continuumReadback, 'NOT_RUN');
  assert.equal(study.admission.productionAdmission, 'CLOSED');
});
