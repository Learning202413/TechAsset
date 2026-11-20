import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage = 1,
  totalItems = 0,
  pageSize = 8,
  onPageChange,
  className = "",
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxButtons - 1);

      if (end - start < maxButtons - 1) {
        start = Math.max(1, end - maxButtons + 1);
      }

      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Navegación de paginación"
      className={`px-5 py-3.5 bg-slate-50/90 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 select-none ${className}`}
    >
      {/* Information Counter */}
      <div className="flex items-center gap-1.5 font-medium">
        <span>Mostrando</span>
        <strong className="font-mono text-slate-900 font-bold">{startItem}</strong>
        <span>al</span>
        <strong className="font-mono text-slate-900 font-bold">{endItem}</strong>
        <span>de</span>
        <strong className="font-mono text-slate-900 font-bold">{totalItems}</strong>
        <span>registros</span>
        <span className="text-slate-400 mx-1">&bull;</span>
        <span className="text-slate-500">
          Pág. <strong className="font-mono text-slate-800">{currentPage}</strong> de{" "}
          <strong className="font-mono text-slate-800">{totalPages}</strong>
        </span>
      </div>

      {/* Navigation Buttons */}
      <div className="inline-flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label="Página anterior"
          title="Ir a la página anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === currentPage ? "page" : undefined}
            className={`min-w-[2rem] h-8 px-2 rounded-lg text-xs font-semibold font-mono transition focus:outline-none focus:ring-2 ${
              p === currentPage
                ? "bg-blue-600 text-white shadow-xs border border-blue-600 focus:ring-blue-500/30"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 focus:ring-blue-500/20"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label="Página siguiente"
          title="Ir a la página siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
