export const API_BASE_URL = "http://localhost:5153/api";

export async function handleApiResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    let errorMsg = data.message || "Ocurrió un error en el servidor.";
    if (data.errors) {
      const details = Object.values(data.errors).flat().join(" ");
      if (details) errorMsg = `${errorMsg} ${details}`;
    }
    throw new Error(errorMsg);
  }

  return data;
}
