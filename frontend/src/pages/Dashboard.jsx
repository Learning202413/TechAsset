import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatsCard from "../components/StatsCard";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/Button";
import { getDashboardStats } from "../services/dashboardService";
import { 
  Laptop, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowLeftRight, 
  Building2, 
  TrendingUp, 
  PlusCircle,
  Users,
  RefreshCw,
  Layers,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  ArrowUpRight
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadData = async (manual = false) => {
    try {
      if (manual) setIsRefreshing(true);
      else setIsLoading(true);
      setError("");
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron conectar los indicadores con el servidor Kestrel / PostgreSQL.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[480px] flex flex-col items-center justify-center p-12 text-slate-500 space-y-4">
        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm animate-pulse">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        </div>
        <div className="text-center">
          <p className="text-base font-bold text-slate-800">Sincronizando Dashboard Ejecutivo...</p>
          <p className="text-xs text-slate-500 mt-1">Consultando métricas en PostgreSQL mediante Kestrel API</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 text-red-700 rounded-2xl border border-red-200/80 max-w-2xl mx-auto my-12 text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-red-900">Interrupción de Comunicación</h3>
          <p className="text-xs text-red-700 mt-1">{error}</p>
        </div>
        <Button onClick={() => loadData(true)} variant="primary" className="mx-auto">
          <RefreshCw className="w-4 h-4" />
          Reintentar Sincronización
        </Button>
      </div>
    );
  }

  const disponibilidadPorcentaje = stats.totalEquipos > 0
    ? Math.round((stats.equiposDisponibles / stats.totalEquipos) * 100)
    : 0;

  return (
    <div className="space-y-8">
      {/* Executive Welcome & Norman Affordance Actions Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 p-6 lg:p-8 rounded-3xl text-white shadow-xl shadow-slate-950/10 border border-slate-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Monitoreo en Tiempo Real &bull; Control de Activos TI
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
            Panel de Operaciones TI
          </h1>
          <p className="text-xs lg:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Gestión institucional integral de activos tecnológicos, control de asignaciones y métricas de rotación para Innovatech Solutions S.A.C.
          </p>
        </div>

        {/* Norman Affordances: Clear, prominent primary action buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/equipos/nuevo">
            <button
              type="button"
              className="px-3.5 py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 active:scale-98 transition shadow-lg shadow-blue-600/30 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Registrar Equipo Tecnológico</span>
            </button>
          </Link>

          <Link to="/prestamos/nuevo">
            <button
              type="button"
              className="px-3.5 py-2.5 rounded-xl font-semibold text-xs text-slate-100 bg-slate-800/90 hover:bg-slate-700 hover:text-white transition border border-slate-700 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <ArrowLeftRight className="w-4 h-4 text-emerald-400" />
              <span>Registrar Nuevo Préstamo de Equipo</span>
            </button>
          </Link>

          <Link to="/usuarios/nuevo">
            <button
              type="button"
              className="px-3.5 py-2.5 rounded-xl font-semibold text-xs text-slate-100 bg-slate-800/90 hover:bg-slate-700 hover:text-white transition border border-slate-700 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Registrar Colaborador / Usuario</span>
            </button>
          </Link>

          <button
            type="button"
            onClick={() => loadData(true)}
            disabled={isRefreshing}
            className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition border border-slate-700/80 disabled:opacity-50"
            title="Actualizar indicadores del sistema"
            aria-label="Actualizar indicadores del sistema"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-blue-400" : ""}`} />
          </button>
        </div>
      </div>

      {/* Grid of 6 KPIs: Métricas de Control de Activos */}
      <section aria-label="Indicadores clave de rendimiento">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4">
          <StatsCard
            title="Total Activos"
            value={stats.totalEquipos}
            description="Inventario total"
            badge="Global"
            icon={Laptop}
            color="blue"
          />
          <StatsCard
            title="Disponibles"
            value={stats.equiposDisponibles}
            description="Listos para entrega"
            badge={`${disponibilidadPorcentaje}% Cap.`}
            icon={CheckCircle2}
            color="emerald"
          />
          <StatsCard
            title="En Préstamo"
            value={stats.equiposPrestados}
            description="En uso asignado"
            badge="En Custodia"
            icon={Clock}
            color="purple"
          />
          <StatsCard
            title="Mantenimiento"
            value={stats.equiposEnMantenimiento}
            description="Taller técnico"
            badge="No Prestable"
            icon={AlertTriangle}
            color="amber"
          />
          <StatsCard
            title="Préstamos"
            value={stats.totalPrestamos}
            description={`${stats.prestamosActivos} en curso`}
            badge="Historial"
            icon={ArrowLeftRight}
            color="indigo"
          />
          <StatsCard
            title="Mayor Demanda"
            value={stats.areaConMayorUso}
            description={`${stats.areaMayorUsoCantidad} asignaciones`}
            badge="Área Top"
            icon={Building2}
            color="rose"
          />
        </div>
      </section>

      {/* Analytics Row: Distribution by Area & Most Requested Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Préstamos por Área */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Distribución por Área Funcional
                  </h2>
                  <p className="text-xs text-slate-500">Demanda departamental acumulada</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {stats.prestamosPorArea?.length || 0} Áreas
              </span>
            </div>

            {stats.prestamosPorArea?.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Building2 className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-semibold">Sin registros de préstamos por área</p>
                <p className="text-xs mt-0.5">Los préstamos asignados clasificarán el uso aquí automáticamente.</p>
              </div>
            ) : (
              <div className="space-y-4 my-2">
                {stats.prestamosPorArea.map((item) => {
                  const percentage = stats.totalPrestamos > 0
                    ? Math.round((item.cantidadPrestamos / stats.totalPrestamos) * 100)
                    : 0;

                  return (
                    <div key={item.area} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">{item.area}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900">
                            {item.cantidadPrestamos} {item.cantidadPrestamos === 1 ? "préstamo" : "préstamos"}
                          </span>
                          <span className="text-[11px] font-semibold text-blue-600 font-mono bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                            {percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(percentage, 4)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Fuente: Módulo de Préstamos TechAsset</span>
            <span className="font-semibold text-slate-700">Total: {stats.totalPrestamos} movimientos</span>
          </div>
        </div>

        {/* Equipos Más Solicitados en Préstamo */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Equipos Más Solicitados
                  </h2>
                  <p className="text-xs text-slate-500">Ranking de rotación e intensidad de uso</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                Top Frecuencia
              </span>
            </div>

            {stats.equiposMasUtilizados?.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Laptop className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-semibold">Aún no se registran préstamos recurrentes</p>
                <p className="text-xs mt-0.5">El ranking se calculará con los movimientos generados.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {stats.equiposMasUtilizados.map((eq, idx) => {
                  const medalColors = [
                    "bg-amber-100 text-amber-800 border-amber-300",
                    "bg-slate-200 text-slate-800 border-slate-300",
                    "bg-orange-100 text-orange-800 border-orange-300",
                  ];
                  const rankClass = medalColors[idx] || "bg-slate-100 text-slate-600 border-slate-200";

                  return (
                    <div key={eq.equipoId} className="py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shrink-0 border ${rankClass}`}
                        >
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {eq.nombre}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-blue-700 border border-slate-200/80">
                              {eq.codigoPatrimonial}
                            </span>
                            <span className="text-[11px] text-slate-500 truncate">
                              &bull; {eq.categoria}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200/80 inline-flex items-center gap-1">
                          <span className="font-bold">{eq.cantidadPrestamos}</span>
                          <span className="text-[10px] text-emerald-600">préstamos</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Análisis de rotación de hardware</span>
            <Link to="/equipos" className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-0.5">
              <span>Inventario completo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Historial de Movimientos y Préstamos Recientes */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Movimientos y Préstamos Recientes
              </h2>
              <p className="text-xs text-slate-500">
                Últimas operaciones de asignación y devolución registradas en el sistema
              </p>
            </div>
          </div>
          <Link
            to="/prestamos"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition border border-transparent hover:border-blue-100"
          >
            <span>Ver historial completo</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {stats.movimientosRecientes?.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Layers className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-base font-semibold">No se registran movimientos recientes</p>
            <p className="text-xs mt-1">Haga clic en 'Nuevo Préstamo' para iniciar la custodia de un activo.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs" aria-label="Tabla de movimientos recientes">
              <thead className="bg-slate-50/80 text-slate-600 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200/80">
                <tr>
                  <th scope="col" className="px-5 py-3.5">Equipo Tecnológico</th>
                  <th scope="col" className="px-5 py-3.5">Colaborador Responsable</th>
                  <th scope="col" className="px-5 py-3.5">Área</th>
                  <th scope="col" className="px-5 py-3.5">Fecha de Asignación</th>
                  <th scope="col" className="px-5 py-3.5 text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {stats.movimientosRecientes.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-slate-900">{m.equipoNombre}</div>
                      <div className="font-mono text-[11px] text-blue-700 font-bold mt-0.5">
                        {m.equipoCodigoPatrimonial}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 border border-slate-200">
                          {m.usuarioNombreCompleto
                            ? m.usuarioNombreCompleto.substring(0, 2).toUpperCase()
                            : "TI"}
                        </div>
                        <span className="font-medium text-slate-800">{m.usuarioNombreCompleto}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{m.usuarioArea}</td>
                    <td className="px-5 py-3.5 font-mono text-slate-500">
                      {new Date(m.fechaPrestamo).toLocaleDateString()} &bull; {new Date(m.fechaPrestamo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <StatusBadge status={m.esActivo ? "Prestado" : "Finalizado"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
