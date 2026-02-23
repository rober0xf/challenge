export type CandidateInfo = {
  uuid: string;
  candidateId: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Job = {
  id: string;
  title: string;
};

export type JobApplicationInfo = {
  uuid: string;
  jobId: string;
  candidateId: string;
  applicationId: string;
  repoUrl: string;
};
