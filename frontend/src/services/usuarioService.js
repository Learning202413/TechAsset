import { API_BASE_URL, handleApiResponse } from "./apiConfig";

const URL = `${API_BASE_URL}/usuarios`;

export async function getUsuarios() {
  const response = await fetch(URL);
  const json = await handleApiResponse(response);
  return json.data || [];
}

export async function getUsuarioById(id) {
  const response = await fetch(`${URL}/${id}`);
  const json = await handleApiResponse(response);
  return json.data;
}

export async function createUsuario(usuarioData) {
  const response = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuarioData),
  });
  return await handleApiResponse(response);
}

export async function updateUsuario(id, usuarioData) {
  const response = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuarioData),
  });
  return await handleApiResponse(response);
}

export async function toggleEstadoUsuario(id, activo) {
  const response = await fetch(`${URL}/${id}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(activo),
  });
  return await handleApiResponse(response);
}
