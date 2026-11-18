import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/Button";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import FormMessage from "../components/FormMessage";
import { getPrestamos, registrarDevolucion } from "../services/prestamoService";
import { PlusCircle, Search, ArrowLeftRight, CheckCircle, RefreshCw } from "lucide-react";

export default function PrestamosList() {
  const [prestamos, setPrestamos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [soloActivos, setSoloActivos] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Devolución modal state (RF-10, RN-10)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrestamo, setSelectedPrestamo] = useState(null);
  const [observacionDevolucion, setObservacionDevolucion] = useState("");
  const [observacionError, setObservacionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPrestamos = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await getPrestamos(soloActivos, searchTerm);
      setPrestamos(data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar la lista de préstamos de equipos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrestamos();
  }, [soloActivos]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchPrestamos();
  };

  const openDevolucionModal = (prestamo) => {
    setSelectedPrestamo(prestamo);
    setObservacionDevolucion("");
    setObservacionError("");
    setIsModalOpen(true);
    setMessage("");
  };

  const handleDevolucionSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPrestamo) return;

    if (!observacionDevolucion.trim() || observacionDevolucion.trim().length < 5) {
      setObservacionError("Toda devolución deberá registrar observaciones detalladas (mínimo 5 caracteres - RN-10).");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");
      await registrarDevolucion(selectedPrestamo.id, {
        observacion: observacionDevolucion.trim(),
      });
      setMessageType("success");
      setMessage(`Devolución de '${selectedPrestamo.equipoNombre}' registrada con éxito. El equipo volvió a estado 'Disponible'.`);
      setIsModalOpen(false);
      fetchPrestamos();
    } catch (err) {
      setMessageType("error");
      setMessage(err.message || "Error al procesar la devolución.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer
      title="Gestión de Préstamos y Devoluciones (RF-11, RF-12)"
      subtitle="Historial institucional y control de activos actualmente asignados a colaboradores"
      actions={
        <Link to="/prestamos/nuevo">
          <Button variant="primary">
            <PlusCircle className="w-4 h-4" />
            Registrar Préstamo
          </Button>
        </Link>
      }
    >
      <FormMessage type={messageType} message={message} />

      {/* Filter Bar */}
      <div className="bg-gray-50/70 p-4 rounded-lg border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:w-96">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por equipo o colaborador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white"
            />
          </div>
          <Button type="submit" variant="secondary">
            Buscar
          </Button>
        </form>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoloActivos(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              !soloActivos ? "bg-blue-600 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            Todos los Movimientos (RF-11)
          </button>
          <button
            onClick={() => setSoloActivos(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              soloActivos ? "bg-blue-600 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            Solo Préstamos Activos (RF-12)
          </button>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="p-12 text-center text-gray-500">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
          <p className="text-sm font-medium">Consultando registros de préstamos...</p>
        </div>
      ) : error ? (
        <p className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">{error}</p>
      ) : prestamos.length === 0 ? (
        <div className="p-12 text-center text-gray-400">
          <ArrowLeftRight className="w-10 h-10 mx-auto text-gray-300 mb-2" />
          <p className="text-base font-semibold">No se encontraron préstamos registrados.</p>
          <p className="text-xs mt-1">Haga clic en 'Registrar Préstamo' para crear una nueva asignación de equipo.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100/70 text-gray-700 uppercase text-[11px] font-semibold border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Equipo</th>
                <th className="px-4 py-3">Colaborador (Responsable)</th>
                <th className="px-4 py-3">Área</th>
                <th className="px-4 py-3">Fecha Préstamo</th>
                <th className="px-4 py-3">Fecha Devolución</th>
                <th className="px-4 py-3">Observaciones</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {prestamos.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/30 transition">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">{p.equipoNombre}</p>
                    <p className="text-xs text-blue-700 font-mono font-bold">{p.equipoCodigoPatrimonial}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{p.usuarioNombreCompleto}</p>
                    <p className="text-xs text-gray-400">{p.usuarioCorreo}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.usuarioArea}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 font-mono">
                    {new Date(p.fechaPrestamo).toLocaleDateString()} {new Date(p.fechaPrestamo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600 font-mono">
                    {p.fechaDevolucion ? (
                      `${new Date(p.fechaDevolucion).toLocaleDateString()} ${new Date(p.fechaDevolucion).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                    ) : (
                      <span className="text-amber-600 font-semibold italic">En préstamo</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-xs truncate" title={p.observacion}>
                    {p.observacion || "Sin observaciones"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.esActivo ? "Prestado" : "Finalizado"} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    {p.esActivo ? (
                      <Button
                        onClick={() => openDevolucionModal(p)}
                        variant="success"
                        className="!text-xs !py-1 !px-2.5"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Registrar Devolución
                      </Button>
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">Devuelto</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for RF-10 & RN-10: Registrar Devolución */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar Devolución de Equipo (RF-10)"
      >
        <form onSubmit={handleDevolucionSubmit} className="space-y-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs space-y-1">
            <p><strong>Equipo:</strong> {selectedPrestamo?.equipoNombre} ({selectedPrestamo?.equipoCodigoPatrimonial})</p>
            <p><strong>Colaborador:</strong> {selectedPrestamo?.usuarioNombreCompleto} ({selectedPrestamo?.usuarioArea})</p>
            <p><strong>Fecha de Préstamo:</strong> {selectedPrestamo && new Date(selectedPrestamo.fechaPrestamo).toLocaleString()}</p>
          </div>

          <InputField
            label="Observaciones de Devolución (RN-10)"
            name="observacionDevolucion"
            value={observacionDevolucion}
            onChange={(e) => {
              setObservacionDevolucion(e.target.value);
              setObservacionError("");
            }}
            placeholder="Detalle el estado del equipo al momento de entrega (ej: Operativo, con cargador y sin rayones)..."
            rows={4}
            required
            error={observacionError}
          />

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="success" disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Confirmar Devolución"}
            </Button>
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
}
