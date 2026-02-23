import { useState } from "react";
import type { CandidateInfo, Job } from "../types";
import { applyJob } from "../api";

interface Props {
  candidate: CandidateInfo;
  job: Job;
}

export const JobItem = ({ candidate, job }: Props) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const ok = await applyJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl,
      });

      if (ok) {
        setSuccess(true);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <input
        type="text"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading} className="job-button">
        {loading ? "submitting" : "submit"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>sent</p>}
    </div>
  );
};
