import { API_BASE_URL, handleApiResponse } from "./apiConfig";

const URL = `${API_BASE_URL}/dashboard`;

export async function getDashboardStats() {
  const response = await fetch(URL);
  const json = await handleApiResponse(response);
  return json.data || {};
}
