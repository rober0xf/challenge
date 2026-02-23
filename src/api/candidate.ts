import type { CandidateInfo } from "../types";

const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/";

export async function getCandidate(email: string): Promise<CandidateInfo> {
  const response = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${email}`,
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "failed fetching candidate");
  }

  return response.json();
}
