import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";
import Button from "./Button";
import { 
  LogOut, 
  ChevronRight, 
  ShieldCheck, 
  AlertTriangle,
  Menu
} from "lucide-react";

export default function Header({ onToggleMobileMenu }) {
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
        { label: "Inventario de Equipos", to: "/equipos" },
        { label: "Registrar Equipo Tecnológico", current: true },
      ];
    }
    if (path.startsWith("/equipos")) {
      return [
        { label: "TechAsset", to: "/dashboard" },
        { label: "Inventario de Equipos", current: true },
      ];
    }
    if (path.startsWith("/prestamos/nuevo")) {
      return [
        { label: "TechAsset", to: "/dashboard" },
        { label: "Control de Préstamos", to: "/prestamos" },
        { label: "Registrar Nuevo Préstamo de Equipo", current: true },
      ];
    }
    if (path.startsWith("/prestamos")) {
      return [
        { label: "TechAsset", to: "/dashboard" },
        { label: "Control de Préstamos", current: true },
      ];
    }
    if (path.startsWith("/usuarios/nuevo")) {
      return [
        { label: "TechAsset", to: "/dashboard" },
        { label: "Colaboradores y Usuarios", to: "/usuarios" },
        { label: "Registrar Colaborador / Usuario", current: true },
      ];
    }
    if (path.startsWith("/usuarios")) {
      return [
        { label: "TechAsset", to: "/dashboard" },
        { label: "Colaboradores y Usuarios", current: true },
      ];
    }
    return [
      { label: "TechAsset", to: "/dashboard" },
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
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30 shrink-0 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)]">
        {/* Left: Mobile Menu Toggle & Dynamic Breadcrumbs Navigation */}
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          {/* Mobile Hamburger Button (Norman Signifier: Menu affordance) */}
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 -ml-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shrink-0"
            aria-label="Abrir menú de navegación móvil"
            title="Abrir menú principal"
          >
            <Menu className="w-5 h-5" />
          </button>

          <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-xs min-w-0">
            {breadcrumbs.map((crumb, idx) => (
              <div key={crumb.label} className="flex items-center gap-1.5 min-w-0">
                {idx > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                )}
                {crumb.current ? (
                  <span className="font-bold text-slate-900 px-2 py-0.5 rounded-md bg-slate-100/80 border border-slate-200/60 truncate">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.to}
                    className="text-slate-500 hover:text-blue-600 transition-colors font-medium px-1 py-0.5 rounded hover:bg-slate-50 truncate hidden sm:inline"
                  >
                    {crumb.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right: User info & logout */}
        <div className="flex items-center gap-3">
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

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-2.5 pt-3 border-t border-slate-100">
            <Button
              variant="secondary"
              onClick={() => setIsLogoutModalOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmLogout}
              className="w-full sm:w-auto"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
