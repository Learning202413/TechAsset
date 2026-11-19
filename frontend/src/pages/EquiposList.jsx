import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/Button";
import Modal from "../components/Modal";
import SelectField from "../components/SelectField";
import FormMessage from "../components/FormMessage";
import { getEquipos, updateEstadoEquipo, deleteEquipo } from "../services/equipoService";
import { 
  PlusCircle, 
  Search, 
  Trash2, 
  Edit3, 
  RefreshCw, 
  Laptop, 
  X, 
  Tag, 
  AlertCircle,
  RotateCcw
} from "lucide-react";

export default function EquiposList() {
  const [equipos, setEquipos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Filters
  const [estadoFilter, setEstadoFilter] = useState("Todos");
  const [categoriaFilter, setCategoriaFilter] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State for Changing Status (RF-08)
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchEquipos = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await getEquipos({
        estado: estadoFilter,
        categoria: categoriaFilter,
        busqueda: searchTerm,
      });
      setEquipos(data);
    } catch (err) {
      console.error(err);
      setError("Error de comunicación al consultar el inventario de equipos tecnológicos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipos();
  }, [estadoFilter, categoriaFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEquipos();
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    getEquipos({
      estado: estadoFilter,
      categoria: categoriaFilter,
      busqueda: "",
    }).then(setEquipos).catch(console.error);
  };

  const handleResetFilters = () => {
    setEstadoFilter("Todos");
    setCategoriaFilter("Todas");
    setSearchTerm("");
    getEquipos({ estado: "Todos", categoria: "Todas", busqueda: "" })
      .then(setEquipos)
      .catch(console.error);
  };

  const openStatusModal = (equipo) => {
    setSelectedEquipo(equipo);
    setNuevoEstado(equipo.estado);
    setIsModalOpen(true);
    setMessage("");
  };

  const handleSaveStatus = async (e) => {
    e.preventDefault();
    if (!selectedEquipo) return;

    try {
      setIsUpdating(true);
      setMessage("");
      await updateEstadoEquipo(selectedEquipo.id, nuevoEstado);
      setMessageType("success");
      setMessage(`Estado del activo [${selectedEquipo.codigoPatrimonial}] actualizado exitosamente a '${nuevoEstado}'.`);
      setIsModalOpen(false);
      fetchEquipos();
    } catch (err) {
      setMessageType("error");
      setMessage(err.message || "Error al actualizar el estado del equipo.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id, codigo, totalPrestamos) => {
    if (totalPrestamos > 0) {
      if (!window.confirm(`El equipo ${codigo} tiene ${totalPrestamos} préstamo(s) registrado(s). Según la regla RN-06 no podrá ser eliminado si tiene histórico de préstamos. ¿Desea intentar la eliminación?`)) {
        return;
      }
    } else {
      if (!window.confirm(`¿Confirmar eliminación definitiva del equipo ${codigo}? Esta acción no se puede deshacer.`)) {
        return;
      }
    }

    try {
      setMessage("");
      await deleteEquipo(id);
      setMessageType("success");
      setMessage(`Equipo ${codigo} eliminado correctamente.`);
      fetchEquipos();
    } catch (err) {
      setMessageType("error");
      setMessage(err.message || "No se pudo eliminar el equipo.");
    }
  };

  const categorias = [
    { value: "Todas", label: "Todas las categorías" },
    { value: "Laptop", label: "Laptop" },
    { value: "Computadoras de escritorio", label: "Computadora de escritorio" },
    { value: "Monitor", label: "Monitor" },
    { value: "Impresoras", label: "Impresora" },
    { value: "Tablets", label: "Tablet" },
    { value: "Proyector multimedia", label: "Proyector multimedia" },
    { value: "Equipos de red", label: "Equipos de red" },
  ];

  const estados = [
    { value: "Todos", label: "Todos los estados" },
    { value: "Disponible", label: "Disponible" },
    { value: "Prestado", label: "Prestado" },
    { value: "Mantenimiento", label: "Mantenimiento" },
    { value: "Baja", label: "Baja" },
  ];

  const activeFiltersCount = 
    (estadoFilter !== "Todos" ? 1 : 0) + 
    (categoriaFilter !== "Todas" ? 1 : 0) + 
    (searchTerm.trim() ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Executive Header Banner */}
      <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Inventario de Equipos Tecnológicos
            </h1>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
              RF-07
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Consulta, filtrado multidimensional y actualización operativa del parque de activos TI
          </p>
        </div>

        <Link to="/equipos/nuevo">
          <Button variant="primary">
            <PlusCircle className="w-4 h-4" />
            <span>Registrar Nuevo Equipo</span>
          </Button>
        </Link>
      </div>

      <FormMessage type={messageType} message={message} />

      {/* High-Fidelity Search & Filter Bar */}
      <div className="bg-white p-4 lg:p-5 rounded-2xl shadow-xs border border-slate-200/80 space-y-3">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          {/* Search Input with Clear Button */}
          <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar por código patrimonial, nombre o marca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-9 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50 hover:bg-white text-slate-800 transition"
                aria-label="Buscar equipo"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition"
                  title="Limpiar búsqueda"
                  aria-label="Limpiar campo de búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <Button type="submit" variant="secondary" className="!py-2 !text-xs shrink-0">
              Buscar
            </Button>
          </form>

          {/* Category & Status Selects */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2.5 items-center">
            {/* Category */}
            <div className="w-full sm:w-48">
              <select
                value={categoriaFilter}
                onChange={(e) => setCategoriaFilter(e.target.value)}
                aria-label="Filtrar por categoría"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50/50 hover:bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-medium cursor-pointer"
              >
                {categorias.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="w-full sm:w-40">
              <select
                value={estadoFilter}
                onChange={(e) => setEstadoFilter(e.target.value)}
                aria-label="Filtrar por estado operativo"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50/50 hover:bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-medium cursor-pointer"
              >
                {estados.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Filter Stats & Reset Indicator */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Resultados: <strong className="text-slate-800">{equipos.length}</strong> activos</span>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
                {activeFiltersCount} {activeFiltersCount === 1 ? "filtro activo" : "filtros activos"}
              </span>
            )}
          </div>

          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer filtros</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Table Content or States */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
        {isLoading ? (
          <div className="p-16 text-center text-slate-500 space-y-3">
            <RefreshCw className="w-7 h-7 animate-spin mx-auto text-blue-600" />
            <p className="text-xs font-semibold">Consultando catálogo de activos en PostgreSQL...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 bg-red-50 space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto text-red-500" />
            <p className="text-sm font-semibold">{error}</p>
            <Button onClick={fetchEquipos} variant="outline" className="!text-xs">
              Reintentar
            </Button>
          </div>
        ) : equipos.length === 0 ? (
          /* High-Quality Illustrated Empty State */
          <div className="p-16 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center border border-slate-200 shadow-inner">
              <Laptop className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                No se encontraron equipos
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                No hay activos tecnológicos que coincidan con los criterios de búsqueda o filtros seleccionados.
              </p>
            </div>
            <div className="flex justify-center gap-2 pt-2">
              {activeFiltersCount > 0 ? (
                <Button onClick={handleResetFilters} variant="secondary" className="!text-xs">
                  <RotateCcw className="w-3.5 h-3.5" />
                  Limpiar Filtros
                </Button>
              ) : (
                <Link to="/equipos/nuevo">
                  <Button variant="primary" className="!text-xs">
                    <PlusCircle className="w-3.5 h-3.5" />
                    Registrar Primer Equipo
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs" aria-label="Tabla de inventario de equipos">
              <thead className="bg-slate-50/90 text-slate-600 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200/80">
                <tr>
                  <th scope="col" className="px-5 py-3.5">Código Patrimonial</th>
                  <th scope="col" className="px-5 py-3.5">Nombre y Modelo</th>
                  <th scope="col" className="px-5 py-3.5">Categoría</th>
                  <th scope="col" className="px-5 py-3.5">Marca</th>
                  <th scope="col" className="px-5 py-3.5">Estado Operativo</th>
                  <th scope="col" className="px-5 py-3.5 text-center">Historial</th>
                  <th scope="col" className="px-5 py-3.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {equipos.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Monospace Pastille Badge for Code */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="font-mono font-bold text-[11px] px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs">
                        {e.codigoPatrimonial}
                      </span>
                    </td>

                    {/* Equipment Name */}
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-slate-900">{e.nombre}</div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 text-slate-600">
                        <Tag className="w-3 h-3 text-slate-400" />
                        {e.categoria}
                      </span>
                    </td>

                    {/* Brand */}
                    <td className="px-5 py-3.5 text-slate-600 font-medium">
                      {e.marca}
                    </td>

                    {/* Semantic Status */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <StatusBadge status={e.estado} />
                    </td>

                    {/* Total loans */}
                    <td className="px-5 py-3.5 text-center whitespace-nowrap">
                      <span className="font-mono text-slate-600 font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-[11px]">
                        {e.totalPrestamos} {e.totalPrestamos === 1 ? "préstamo" : "préstamos"}
                      </span>
                    </td>

                    {/* Actions with Norman Signifiers */}
                    <td className="px-5 py-3.5 text-right whitespace-nowrap space-x-1.5">
                      <button
                        type="button"
                        onClick={() => openStatusModal(e)}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 inline-flex items-center gap-1 transition focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        title="Actualizar estado operativo del equipo (RF-08)"
                        aria-label={`Actualizar estado del equipo ${e.codigoPatrimonial}`}
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Estado</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(e.id, e.codigoPatrimonial, e.totalPrestamos)}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 border border-slate-200 inline-flex items-center gap-1 transition focus:outline-none focus:ring-2 focus:ring-red-500/20"
                        title={
                          e.totalPrestamos > 0
                            ? "Equipo con historial: protegido por RN-06"
                            : "Eliminar equipo del catálogo"
                        }
                        aria-label={`Eliminar equipo ${e.codigoPatrimonial}`}
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                        <span>Eliminar</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for RF-08: Actualizar estado de equipo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Actualizar Estado Operativo &bull; ${selectedEquipo?.codigoPatrimonial}`}
      >
        <form onSubmit={handleSaveStatus} className="space-y-4">
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-600">Equipo:</span>
              <strong className="text-slate-900">{selectedEquipo?.nombre}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-600">Categoría & Marca:</span>
              <span className="text-slate-700">{selectedEquipo?.categoria} &bull; {selectedEquipo?.marca}</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-200">
              <span className="font-semibold text-slate-600">Estado Actual:</span>
              <StatusBadge status={selectedEquipo?.estado} />
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 space-y-1">
            <p className="font-semibold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              Reglas de Negocio Institucionales:
            </p>
            <p className="text-[11px] leading-relaxed">
              &bull; <strong>RN-02:</strong> Los equipos en <em>Mantenimiento</em> quedan excluidos de nuevos préstamos.<br />
              &bull; <strong>RN-03:</strong> Los equipos dados de <em>Baja</em> quedan fuera del flujo operativo.
            </p>
          </div>

          <SelectField
            label="Nuevo Estado Operativo (RF-08)"
            name="estado"
            value={nuevoEstado}
            onChange={(e) => setNuevoEstado(e.target.value)}
            options={[
              { value: "Disponible", label: "Disponible (Listo para asignación)" },
              { value: "Prestado", label: "Prestado (En custodia de colaborador)" },
              { value: "Mantenimiento", label: "Mantenimiento (En taller de soporte técnico)" },
              { value: "Baja", label: "Baja (Fuera de servicio definitivo)" },
            ]}
            required
          />

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={isUpdating}>
              {isUpdating ? "Guardando en DB..." : "Guardar Nuevo Estado"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
