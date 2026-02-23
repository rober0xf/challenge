import { useEffect, useState } from "react";
import type { CandidateInfo } from "./types";
import { getCandidate } from "./api";
import { JobList } from "./components";

function App() {
  const [candidate, setCandidate] = useState<CandidateInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCandidate(import.meta.env.VITE_EMAIL);
        setCandidate(data);
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

  if (!candidate) {
    return <div>no candidate found</div>;
  }

  return <JobList candidate={candidate} />;
}

export default App;
