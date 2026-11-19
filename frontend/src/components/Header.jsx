import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Home, Shield, User } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("¿Desea cerrar la sesión actual?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            TechAsset
          </h1>
          <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold font-mono">
            v1.0
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Innovatech Solutions S.A.C. &bull; Control Institucional de TI
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Landing link */}
        <Link
          to="/"
          className="text-xs font-semibold text-gray-600 hover:text-blue-600 transition inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100"
          title="Ir al Portal Institucional / Landing"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Portal Landing</span>
        </Link>

        {/* Status indicator */}
        <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Sistema Operativo
        </span>

        <div className="h-7 w-px bg-gray-200"></div>

        {/* User profile & Logout */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {user?.iniciales || "TI"}
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-gray-800 leading-tight">
              {user?.nombre || "Carlos Mendoza"}
            </p>
            <p className="text-[11px] text-gray-500 font-medium">
              {user?.rol || "Administrador TI"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
            title="Cerrar sesión segura (Shneiderman: Permit easy reversal)"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
