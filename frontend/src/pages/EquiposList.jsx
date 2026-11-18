import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/Button";
import Modal from "../components/Modal";
import SelectField from "../components/SelectField";
import FormMessage from "../components/FormMessage";
import { getEquipos, updateEstadoEquipo, deleteEquipo } from "../services/equipoService";
import { PlusCircle, Search, Filter, Trash2, Edit3, RefreshCw } from "lucide-react";

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
      setError("Error al cargar la lista de equipos tecnológicos.");
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
      setMessage(`Estado del equipo ${selectedEquipo.codigoPatrimonial} actualizado a '${nuevoEstado}'.`);
      setIsModalOpen(false);
      fetchEquipos();
    } catch (err) {
      setMessageType("error");
      setMessage(err.message || "Error al actualizar estado del equipo.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id, codigo) => {
    if (!window.confirm(`¿Está seguro de eliminar el equipo ${codigo}? Esta acción fallará si tiene historial de préstamos (RN-06).`)) {
      return;
    }

    try {
      setMessage("");
      await deleteEquipo(id);
      setMessageType("success");
      setMessage(`Equipo ${codigo} eliminado correctamente.`);
      fetchEquipos();
    } catch (err) {
      setMessageType("error");
      setMessage(err.message);
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

  return (
    <PageContainer
      title="Inventario de Equipos Tecnológicos (RF-07)"
      subtitle="Consulta, filtrado y actualización de activos de la empresa Innovatech Solutions"
      actions={
        <Link to="/equipos/nuevo">
          <Button variant="primary">
            <PlusCircle className="w-4 h-4" />
            Registrar Equipo
          </Button>
        </Link>
      }
    >
      <FormMessage type={messageType} message={message} />

      {/* Filter and Search Bar */}
      <div className="bg-gray-50/70 p-4 rounded-lg border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 items-end">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2 w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por código, nombre o marca..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white"
            />
          </div>
          <Button type="submit" variant="secondary">
            Buscar
          </Button>
        </form>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="w-44">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Categoría</label>
            <select
              value={categoriaFilter}
              onChange={(e) => setCategoriaFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-200"
            >
              {categorias.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="w-40">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Estado (RF-14)</label>
            <select
              value={estadoFilter}
              onChange={(e) => setEstadoFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-200"
            >
              {estados.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="p-12 text-center text-gray-500">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
          <p className="text-sm font-medium">Consultando inventario de activos...</p>
        </div>
      ) : error ? (
        <p className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">{error}</p>
      ) : equipos.length === 0 ? (
        <div className="p-12 text-center text-gray-400">
          <p className="text-base font-semibold">No se encontraron equipos con los criterios especificados.</p>
          <p className="text-xs mt-1">Pruebe ajustando los filtros de búsqueda o registre un nuevo activo.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100/70 text-gray-700 uppercase text-[11px] font-semibold border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Código</th>
                <th className="px-4 py-3">Equipo</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Marca</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Préstamos</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {equipos.map((e) => (
                <tr key={e.id} className="hover:bg-blue-50/30 transition">
                  <td className="px-4 py-3 font-mono font-bold text-blue-700 text-xs">
                    {e.codigoPatrimonial}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{e.nombre}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{e.categoria}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{e.marca}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={e.estado} />
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 font-mono">
                    {e.totalPrestamos} registros
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => openStatusModal(e)}
                      className="px-2.5 py-1 text-xs font-semibold rounded bg-gray-100 hover:bg-gray-200 text-gray-700 inline-flex items-center gap-1 transition"
                      title="Actualizar estado del equipo (RF-08)"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Estado
                    </button>
                    <button
                      onClick={() => handleDelete(e.id, e.codigoPatrimonial)}
                      className="px-2.5 py-1 text-xs font-semibold rounded bg-red-50 hover:bg-red-100 text-red-600 inline-flex items-center gap-1 transition"
                      title="Eliminar equipo (RN-06)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for RF-08: Actualizar estado de equipo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Actualizar Estado del Equipo: ${selectedEquipo?.codigoPatrimonial}`}
      >
        <form onSubmit={handleSaveStatus} className="space-y-4">
          <p className="text-xs text-gray-500">
            Modifique el estado operativo de <strong>{selectedEquipo?.nombre}</strong>. Si el equipo se encuentra en Mantenimiento o Baja no podrá ser prestado (RN-02, RN-03).
          </p>

          <SelectField
            label="Nuevo Estado"
            name="estado"
            value={nuevoEstado}
            onChange={(e) => setNuevoEstado(e.target.value)}
            options={[
              { value: "Disponible", label: "Disponible (Listo para préstamo)" },
              { value: "Prestado", label: "Prestado (En custodia de colaborador)" },
              { value: "Mantenimiento", label: "Mantenimiento (En soporte técnico - RN-02)" },
              { value: "Baja", label: "Baja (Fuera de inventario operativo - RN-03)" },
            ]}
            required
          />

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={isUpdating}>
              {isUpdating ? "Guardando..." : "Actualizar Estado"}
            </Button>
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
}
