import { useEffect, useState } from "react";
import type { CandidateInfo, Job } from "../types";
import { getPositions } from "../api";
import { JobItem } from "./JobItem";

interface Props {
  candidate: CandidateInfo;
}

export const JobList = ({ candidate }: Props) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPositions();
        setJobs(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error: {error}</div>;
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} candidate={candidate} />
      ))}
    </div>
  );
};
