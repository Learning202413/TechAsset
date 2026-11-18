import { API_BASE_URL, handleApiResponse } from "./apiConfig";

const URL = `${API_BASE_URL}/equipos`;

export async function getEquipos(filters = {}) {
  const params = new URLSearchParams();
  if (filters.estado && filters.estado !== "Todos") params.append("estado", filters.estado);
  if (filters.categoria && filters.categoria !== "Todas") params.append("categoria", filters.categoria);
  if (filters.busqueda) params.append("busqueda", filters.busqueda);

  const query = params.toString() ? `?${params.toString()}` : "";
  const response = await fetch(`${URL}${query}`);
  const json = await handleApiResponse(response);
  return json.data || [];
}

export async function getEquipoById(id) {
  const response = await fetch(`${URL}/${id}`);
  const json = await handleApiResponse(response);
  return json.data;
}

export async function createEquipo(equipoData) {
  const response = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(equipoData),
  });
  return await handleApiResponse(response);
}

export async function updateEquipo(id, equipoData) {
  const response = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(equipoData),
  });
  return await handleApiResponse(response);
}

export async function updateEstadoEquipo(id, estado) {
  const response = await fetch(`${URL}/${id}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado }),
  });
  return await handleApiResponse(response);
}

export async function deleteEquipo(id) {
  const response = await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });
  return await handleApiResponse(response);
}
