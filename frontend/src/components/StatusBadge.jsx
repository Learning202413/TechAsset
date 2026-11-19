export default function StatusBadge({ status, activo = null }) {
  if (activo !== null) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
          activo
            ? "bg-emerald-50 text-emerald-800 border-emerald-200/80"
            : "bg-slate-100 text-slate-700 border-slate-200/80"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            activo ? "bg-emerald-500" : "bg-slate-400"
          }`}
          aria-hidden="true"
        />
        {activo ? "Activo" : "Deshabilitado"}
      </span>
    );
  }

  const statusConfig = {
    Disponible: {
      style: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
      dot: "bg-emerald-500",
    },
    Prestado: {
      style: "bg-blue-50 text-blue-800 border-blue-200/80",
      dot: "bg-blue-500",
    },
    Mantenimiento: {
      style: "bg-amber-50 text-amber-800 border-amber-200/80",
      dot: "bg-amber-500",
    },
    Baja: {
      style: "bg-rose-50 text-rose-800 border-rose-200/80",
      dot: "bg-rose-500",
    },
    Finalizado: {
      style: "bg-slate-100 text-slate-700 border-slate-200/80",
      dot: "bg-slate-400",
    },
  };

  const config = statusConfig[status] || {
    style: "bg-slate-100 text-slate-700 border-slate-200/80",
    dot: "bg-slate-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.style}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} aria-hidden="true" />
      {status || "Desconocido"}
    </span>
  );
}
