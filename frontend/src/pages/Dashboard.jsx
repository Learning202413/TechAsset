import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
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
  RefreshCw
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los indicadores del sistema.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-12 text-center text-gray-500">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-3" />
        <p className="font-medium">Cargando indicadores del sistema...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 text-red-700 rounded-xl border border-red-200">
        <p className="font-semibold">{error}</p>
        <Button onClick={loadData} variant="outline" className="mt-4">
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Container */}
      <PageContainer
        title="Dashboard General de Operaciones"
        subtitle="Monitoreo en tiempo real de inventario tecnológico y préstamos institucionales (Innovatech Solutions S.A.C.)"
        actions={
          <div className="flex gap-2">
            <Link to="/prestamos/nuevo">
              <Button variant="primary">
                <PlusCircle className="w-4 h-4" />
                Nuevo Préstamo
              </Button>
            </Link>
            <Button onClick={loadData} variant="secondary">
              <RefreshCw className="w-4 h-4" />
              Actualizar
            </Button>
          </div>
        }
      >
        {/* KPI Grid - Requerimiento 10 del Caso Práctico */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatsCard
            title="Total de Equipos"
            value={stats.totalEquipos}
            description="Registrados en inventario"
            icon={Laptop}
            color="blue"
          />
          <StatsCard
            title="Equipos Disponibles"
            value={stats.equiposDisponibles}
            description="Listos para préstamo"
            icon={CheckCircle2}
            color="emerald"
          />
          <StatsCard
            title="Equipos Prestados"
            value={stats.equiposPrestados}
            description="Actualmente asignados"
            icon={Clock}
            color="purple"
          />
          <StatsCard
            title="En Mantenimiento"
            value={stats.equiposEnMantenimiento}
            description="Fuera de servicio"
            icon={AlertTriangle}
            color="amber"
          />
          <StatsCard
            title="Total de Préstamos"
            value={stats.totalPrestamos}
            description={`${stats.prestamosActivos} en curso`}
            icon={ArrowLeftRight}
            color="indigo"
          />
          <StatsCard
            title="Área con Mayor Uso"
            value={stats.areaConMayorUso}
            description={`${stats.areaMayorUsoCantidad} préstamos`}
            icon={Building2}
            color="rose"
          />
        </div>
      </PageContainer>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Préstamos por Área (RF-16) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Distribución de Préstamos por Área Funcional (RF-16)
          </h3>
          {stats.prestamosPorArea?.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">No hay registros de préstamos clasificados por área.</p>
          ) : (
            <div className="space-y-3">
              {stats.prestamosPorArea.map((item) => (
                <div key={item.area} className="space-y-1">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-700">{item.area}</span>
                    <span className="text-gray-900 font-bold">{item.cantidadPrestamos} préstamos</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${Math.min(100, (item.cantidadPrestamos / (stats.totalPrestamos || 1)) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Equipos Más Utilizados (RF-15) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Equipos Más Solicitados en Préstamo (RF-15)
          </h3>
          {stats.equiposMasUtilizados?.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">Aún no se registran movimientos para determinar equipos populares.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {stats.equiposMasUtilizados.map((eq, idx) => (
                <li key={eq.equipoId} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{eq.nombre}</p>
                      <p className="text-xs text-gray-500 font-mono">{eq.codigoPatrimonial} &bull; {eq.categoria}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                    {eq.cantidadPrestamos} veces prestado
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Historial de Movimientos Recientes (RF-17) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            Movimientos y Préstamos Recientes (RF-17)
          </h3>
          <Link to="/prestamos" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Ver todos los movimientos &rarr;
          </Link>
        </div>

        {stats.movimientosRecientes?.length === 0 ? (
          <p className="text-sm text-gray-400 py-6 text-center">No se registran préstamos en el sistema.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-[11px] font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Equipo</th>
                  <th className="px-4 py-3">Responsable</th>
                  <th className="px-4 py-3">Área</th>
                  <th className="px-4 py-3">Fecha Préstamo</th>
                  <th className="px-4 py-3">Estado Préstamo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {stats.movimientosRecientes.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      <div>{m.equipoNombre}</div>
                      <div className="text-xs text-gray-400 font-mono">{m.equipoCodigoPatrimonial}</div>
                    </td>
                    <td className="px-4 py-3">{m.usuarioNombreCompleto}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{m.usuarioArea}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 font-mono">
                      {new Date(m.fechaPrestamo).toLocaleDateString()} {new Date(m.fechaPrestamo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-4 py-3">
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
