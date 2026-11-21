import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";
import Button from "./Button";
import { 
  LogOut, 
  ChevronRight, 
  ShieldCheck, 
  AlertTriangle 
} from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Dynamic breadcrumbs based on active route
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path.startsWith("/equipos/nuevo")) {
      return [
        { label: "TechAsset", to: "/dashboard" },
        { label: "Inventario", to: "/equipos" },
        { label: "Registrar Activo", current: true },
      ];
    }
    if (path.startsWith("/equipos")) {
      return [
        { label: "TechAsset", to: "/dashboard" },
        { label: "Módulos", to: "/dashboard" },
        { label: "Inventario de Equipos", current: true },
      ];
    }
    if (path.startsWith("/prestamos/nuevo")) {
      return [
        { label: "TechAsset", to: "/dashboard" },
        { label: "Préstamos", to: "/prestamos" },
        { label: "Registrar Asignación", current: true },
      ];
    }
    if (path.startsWith("/prestamos")) {
      return [
        { label: "TechAsset", to: "/dashboard" },
        { label: "Módulos", to: "/dashboard" },
        { label: "Control de Préstamos", current: true },
      ];
    }
    if (path.startsWith("/usuarios/nuevo")) {
      return [
        { label: "TechAsset", to: "/dashboard" },
        { label: "Colaboradores", to: "/usuarios" },
        { label: "Registrar Usuario", current: true },
      ];
    }
    if (path.startsWith("/usuarios")) {
      return [
        { label: "TechAsset", to: "/dashboard" },
        { label: "Módulos", to: "/dashboard" },
        { label: "Directorio Colaboradores", current: true },
      ];
    }
    return [
      { label: "TechAsset", to: "/dashboard" },
      { label: "Panel Principal", to: "/dashboard" },
      { label: "Dashboard General", current: true },
    ];
  };

  const breadcrumbs = getBreadcrumbs();

  const handleConfirmLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shrink-0 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)]">
        {/* Left: Dynamic Breadcrumbs Navigation */}
        <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-xs">
          {breadcrumbs.map((crumb, idx) => (
            <div key={crumb.label} className="flex items-center gap-1.5">
              {idx > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
              )}
              {crumb.current ? (
                <span className="font-bold text-slate-900 px-2 py-0.5 rounded-md bg-slate-100/80 border border-slate-200/60">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.to}
                  className="text-slate-500 hover:text-blue-600 transition-colors font-medium px-1 py-0.5 rounded hover:bg-slate-50"
                >
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Right: User info & logout */}
        <div className="flex items-center gap-3">

          {/* System Health Badge with Pulse & Tooltip */}
          <div
            className="hidden md:inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs select-none"
            title="Servicios institucionales activos y sincronizados."
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-tight text-[11px]">Sistemas Operativos</span>
          </div>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" aria-hidden="true" />

          {/* Collaborator Profile & Accessible Logout */}
          <div className="flex items-center gap-2.5 pl-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-blue-500/20 shadow-sm shrink-0">
              {user?.iniciales || "TI"}
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                {user?.nombre || "Carlos Mendoza"}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                  <ShieldCheck className="w-2.5 h-2.5 text-blue-600" />
                  {user?.rol || "Administrador TI"}
                </span>
              </div>
            </div>

            {/* Logout Action with Signifier (Norman) & Easy Reversal (Shneiderman #5) */}
            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition focus:outline-none focus:ring-2 focus:ring-red-400"
              title="Cerrar sesión segura de trabajo"
              aria-label="Cerrar sesión del usuario actual"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Logout Confirmation Dialog */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Confirmación de Cierre de Sesión"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3.5 bg-amber-50 rounded-xl border border-amber-200/80">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900">
              <p className="font-bold">¿Está seguro de cerrar su sesión de trabajo?</p>
              <p className="mt-1 text-amber-800/90 leading-relaxed">
                Su sesión activa como <strong>{user?.nombre || "Administrador TI"}</strong> se dará por concluida.
                Todos los registros y movimientos realizados se encuentran respaldados de forma segura en el sistema.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
            <Button
              variant="secondary"
              onClick={() => setIsLogoutModalOpen(false)}
            >
              Permanecer en el Sistema
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmLogout}
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión Segura
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
