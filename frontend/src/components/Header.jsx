export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          TechAsset
        </h1>
        <p className="text-xs text-gray-500">
          Innovatech Solutions S.A.C. &bull; Gestión de Inventario y Préstamos
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Sistema Operativo
        </span>
        <div className="h-8 w-px bg-gray-200"></div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-800">Administrador TI</p>
          <p className="text-[11px] text-gray-500">admin@innovatech.com</p>
        </div>
      </div>
    </header>
  );
}
