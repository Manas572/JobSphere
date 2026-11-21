import BackendApi from '../AxiInt';

const CF_API = '/api/cf';

export const getCFProfile = (handle) =>
  BackendApi.get(`${CF_API}/perinfo`, { params: { userinfo: handle }, timeout: 15000 });

export const getCFChallenge = () =>
  BackendApi.get(`${CF_API}/genverq`, { timeout: 15000 });

export const verifyCFChallenge = (handle, problem) =>
  BackendApi.post(`${CF_API}/verifyce`, {
    contestId: problem.contestId,
    index: problem.index,
  }, { params: { userinfo: handle }, timeout: 15000 });

export const getCFUnsolvedProblems = (handle) =>
  BackendApi.get(`${CF_API}/submissionhistory`, { params: { userinfo: handle }, timeout: 15000 });

export const verifyCFProblem = (handle, problem) =>
  BackendApi.post(`${CF_API}/verifysub`, {
    contestId: problem.contestId,
    index: problem.index,
  }, { params: { userinfo: handle }, timeout: 15000 });
