import type { JobApplicationInfo } from "../types";

const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/";

export async function applyJob(input: JobApplicationInfo): Promise<boolean> {
  const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "failed to send application");
  }

  const data = await response.json();
  return data.ok as boolean;
}
