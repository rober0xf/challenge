import type { Job } from "../types";

const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/";

export async function getPositions(): Promise<Job[]> {
  const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "failed to fetch positions");
  }

  return response.json();
}
