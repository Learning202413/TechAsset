import { API_BASE_URL, handleApiResponse } from "./apiConfig";

const URL = `${API_BASE_URL}/prestamos`;

export async function getPrestamos(soloActivos = false, busqueda = "") {
  const params = new URLSearchParams();
  if (soloActivos) params.append("soloActivos", "true");
  if (busqueda) params.append("busqueda", busqueda);

  const query = params.toString() ? `?${params.toString()}` : "";
  const response = await fetch(`${URL}${query}`);
  const json = await handleApiResponse(response);
  return json.data || [];
}

export async function getPrestamoById(id) {
  const response = await fetch(`${URL}/${id}`);
  const json = await handleApiResponse(response);
  return json.data;
}

export async function createPrestamo(prestamoData) {
  const response = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prestamoData),
  });
  return await handleApiResponse(response);
}

export async function registrarDevolucion(id, devolucionData) {
  const response = await fetch(`${URL}/${id}/devolucion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(devolucionData),
  });
  return await handleApiResponse(response);
}
