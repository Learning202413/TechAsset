import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Laptop, 
  Users, 
  ArrowLeftRight, 
  PlusCircle, 
  Layers,
  Globe
} from "lucide-react";

export default function Sidebar() {
  const getLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition duration-150 ${
      isActive
        ? "bg-blue-600 text-white shadow-sm font-semibold"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-5 flex flex-col justify-between shrink-0">
      <div>
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-gray-800">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-white">TechAsset</h2>
            <p className="text-[11px] text-gray-400 font-mono">v1.0.0 &bull; Clean Arch</p>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-6">
          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Principal
            </p>
            <ul className="space-y-1">
              <li>
                <NavLink to="/dashboard" className={getLinkClass}>
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard General</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Gestión de Equipos
            </p>
            <ul className="space-y-1">
              <li>
                <NavLink to="/equipos" end className={getLinkClass}>
                  <Laptop className="w-4 h-4" />
                  <span>Inventario de Equipos</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/equipos/nuevo" className={getLinkClass}>
                  <PlusCircle className="w-4 h-4" />
                  <span>Registrar Equipo</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Gestión de Préstamos
            </p>
            <ul className="space-y-1">
              <li>
                <NavLink to="/prestamos" end className={getLinkClass}>
                  <ArrowLeftRight className="w-4 h-4" />
                  <span>Historial y Préstamos</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/prestamos/nuevo" className={getLinkClass}>
                  <PlusCircle className="w-4 h-4" />
                  <span>Registrar Préstamo</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Gestión de Usuarios
            </p>
            <ul className="space-y-1">
              <li>
                <NavLink to="/usuarios" end className={getLinkClass}>
                  <Users className="w-4 h-4" />
                  <span>Colaboradores</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/usuarios/nuevo" className={getLinkClass}>
                  <PlusCircle className="w-4 h-4" />
                  <span>Registrar Usuario</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Footer Info & Landing Link */}
      <div className="pt-4 border-t border-gray-800 space-y-3">
        <NavLink
          to="/"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-white hover:bg-gray-800 transition"
        >
          <Globe className="w-4 h-4 text-blue-400" />
          <span>Ver Portal Landing</span>
        </NavLink>

        <div className="px-3 text-[11px] text-gray-500">
          <p className="font-semibold text-gray-400">Innovatech Solutions</p>
          <p>Construcción de Software 2026</p>
        </div>
      </div>
    </aside>
  );
}
