export default function StatusBadge({ status, activo = null }) {
  if (activo !== null) {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
          activo
            ? "bg-green-100 text-green-800 border border-green-200"
            : "bg-gray-100 text-gray-700 border border-gray-300"
        }`}
      >
        {activo ? "Activo" : "Deshabilitado"}
      </span>
    );
  }

  const statusMap = {
    Disponible: "bg-emerald-100 text-emerald-800 border-emerald-200",
    Prestado: "bg-blue-100 text-blue-800 border-blue-200",
    Mantenimiento: "bg-amber-100 text-amber-800 border-amber-200",
    Baja: "bg-red-100 text-red-800 border-red-200",
    Finalizado: "bg-gray-100 text-gray-700 border-gray-200",
  };

  const badgeClass = statusMap[status] || "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeClass}`}
    >
      {status || "Desconocido"}
    </span>
  );
}
