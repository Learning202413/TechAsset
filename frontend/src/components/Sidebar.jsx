import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoIcon from "../assets/logo-icon.png";
import { 
  LayoutDashboard, 
  Laptop, 
  Users, 
  ArrowLeftRight, 
  ShieldCheck 
} from "lucide-react";

export default function Sidebar() {
  const { user } = useAuth();

  const getLinkClass = ({ isActive }) =>
    `relative flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 group ${
      isActive
        ? "bg-gradient-to-r from-blue-600/25 via-blue-500/15 to-transparent text-white font-semibold border border-blue-500/30 shadow-sm"
        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent"
    }`;

  const renderActiveIndicator = (isActive) =>
    isActive ? (
      <span
        className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.9)]"
        aria-hidden="true"
      />
    ) : null;

  return (
    <aside
      aria-label="Menú principal de navegación"
      className="w-64 bg-slate-950 text-slate-200 h-screen sticky top-0 p-4 flex flex-col justify-between shrink-0 border-r border-slate-800/80 select-none z-30"
    >
      <div className="flex-1 flex flex-col min-h-0 space-y-6">
        {/* Brand / Executive Header */}
        <div className="px-1 py-3 border-b border-slate-800/80 flex items-center gap-3 shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-xl shadow-blue-500/25 shrink-0 p-2 border border-white/20">
            <img 
              src={logoIcon} 
              alt="TechAsset Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-black tracking-tight text-white leading-none">
                Tech<span className="text-cyan-400">Asset</span>
              </h2>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/25 text-blue-300 border border-blue-500/40">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight mt-1 truncate">
              Innovatech Solutions &bull; TI
            </p>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto space-y-5 pr-1" aria-label="Módulos de la aplicación">
          {/* Section: Principal */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Principal
            </p>
            <ul className="space-y-1">
              <li>
                <NavLink to="/dashboard" className={getLinkClass}>
                  {({ isActive }) => (
                    <>
                      {renderActiveIndicator(isActive)}
                      <LayoutDashboard
                        className={`w-4 h-4 transition-transform duration-150 group-hover:scale-110 ${
                          isActive ? "text-blue-400" : "text-slate-400"
                        }`}
                      />
                      <span>Dashboard General</span>
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Section: Módulos del Sistema */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Módulos del Sistema
            </p>
            <ul className="space-y-1">
              <li>
                <NavLink to="/equipos" end className={getLinkClass}>
                  {({ isActive }) => (
                    <>
                      {renderActiveIndicator(isActive)}
                      <Laptop
                        className={`w-4 h-4 transition-transform duration-150 group-hover:scale-110 ${
                          isActive ? "text-blue-400" : "text-slate-400"
                        }`}
                      />
                      <span>Inventario de Equipos</span>
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/prestamos" end className={getLinkClass}>
                  {({ isActive }) => (
                    <>
                      {renderActiveIndicator(isActive)}
                      <ArrowLeftRight
                        className={`w-4 h-4 transition-transform duration-150 group-hover:scale-110 ${
                          isActive ? "text-blue-400" : "text-slate-400"
                        }`}
                      />
                      <span>Control de Préstamos</span>
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/usuarios" end className={getLinkClass}>
                  {({ isActive }) => (
                    <>
                      {renderActiveIndicator(isActive)}
                      <Users
                        className={`w-4 h-4 transition-transform duration-150 group-hover:scale-110 ${
                          isActive ? "text-blue-400" : "text-slate-400"
                        }`}
                      />
                      <span>Colaboradores y Usuarios</span>
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Footer Area: User Session Profile (Permanently docked at bottom) */}
      <div className="pt-3 border-t border-slate-800/80 shrink-0 mt-auto">
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
            {user?.iniciales || "TI"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-200 truncate leading-tight">
              {user?.nombre || "Carlos Mendoza"}
            </p>
            <p className="text-[10px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3 h-3 text-blue-400 inline shrink-0" />
              {user?.rol || "Administrador TI"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
