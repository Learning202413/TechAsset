import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import FormMessage from "../components/FormMessage";
import { getPrestamos, registrarDevolucion } from "../services/prestamoService";
import { 
  PlusCircle, 
  Search, 
  ArrowLeftRight, 
  CheckCircle, 
  RefreshCw, 
  Calendar, 
  Clock, 
  X, 
  ShieldCheck, 
  AlertCircle,
  FileCheck2,
  CheckCircle2
} from "lucide-react";

export default function PrestamosList() {
  const [prestamos, setPrestamos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [soloActivos, setSoloActivos] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 6;

  // Devolución modal state
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
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      setError("Error de comunicación al consultar el historial de préstamos.");
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

  const handleClearSearch = () => {
    setSearchTerm("");
    getPrestamos(soloActivos, "").then(setPrestamos).catch(console.error);
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

    const trimmed = observacionDevolucion.trim();
    if (!trimmed || trimmed.length < 5) {
      setObservacionError(
        "Toda devolución deberá registrar observaciones detalladas sobre el estado del equipo (mínimo 5 caracteres)."
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");
      await registrarDevolucion(selectedPrestamo.id, {
        observacion: trimmed,
      });
      setMessageType("success");
      setMessage(
        `Devolución del equipo [${selectedPrestamo.equipoCodigoPatrimonial} - ${selectedPrestamo.equipoNombre}] registrada con éxito. El activo ha vuelto a estar 'Disponible' para nuevos préstamos.`
      );
      setIsModalOpen(false);
      fetchPrestamos();
    } catch (err) {
      setMessageType("error");
      setMessage(err.message || "Error al procesar la devolución en el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick suggestion chips
  const quickTemplates = [
    "Equipo entregado en perfecto estado operativo y con cargador completo.",
    "Operativo con desgaste regular por uso de oficina.",
    "Equipo operativo; se entrega con funda y adaptador de corriente original.",
  ];

  const totalActivosCount = prestamos.filter((p) => p.esActivo).length;
  const paginatedPrestamos = prestamos.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="space-y-6">
      {/* Executive Header Banner */}
      <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Control de Préstamos
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
              Registro de Custodia
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Historial de movimientos, trazabilidad de custodia y registro formal de devoluciones con inspección física
          </p>
        </div>

        <Link to="/prestamos/nuevo">
          <Button variant="primary">
            <PlusCircle className="w-4 h-4" />
            <span>Registrar Nuevo Préstamo de Equipo</span>
          </Button>
        </Link>
      </div>

      <FormMessage type={messageType} message={message} />

      {/* Modern Filter Tabs and Search Bar */}
      {/* Toolbar: High-Quality Pill Tabs Switcher & Search Bar */}
      <div className="bg-white p-4 lg:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Tactile Tab Pills Switcher */}
        <div
          role="tablist"
          aria-label="Filtro de movimientos de préstamos"
          className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80 shrink-0 select-none"
        >
          <button
            type="button"
            role="tab"
            aria-selected={!soloActivos}
            onClick={() => setSoloActivos(false)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
              !soloActivos
                ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Todos los Movimientos</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={soloActivos}
            onClick={() => setSoloActivos(true)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
              soloActivos
                ? "bg-white text-blue-700 shadow-xs border border-blue-200/60"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span>Solo Préstamos Activos</span>
            {!soloActivos && totalActivosCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 text-[10px] font-mono">
                {totalActivosCount}
              </span>
            )}
          </button>
        </div>

        {/* Search input with clear button */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full lg:max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por equipo, código o colaborador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50 hover:bg-white text-slate-800 transition"
              aria-label="Buscar préstamo"
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
      </div>

      {/* Main Table Content */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
        {isLoading ? (
          <div className="p-16 text-center text-slate-500 space-y-3">
            <RefreshCw className="w-7 h-7 animate-spin mx-auto text-blue-600" />
            <p className="text-xs font-semibold">Cargando libro de asignaciones y préstamos...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 bg-red-50 space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto text-red-500" />
            <p className="text-sm font-semibold">{error}</p>
            <Button onClick={fetchPrestamos} variant="outline" className="!text-xs">
              Reintentar
            </Button>
          </div>
        ) : prestamos.length === 0 ? (
          /* Empty state */
          <div className="p-16 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center border border-slate-200 shadow-inner">
              <ArrowLeftRight className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {soloActivos ? "No hay préstamos activos" : "No se registraron préstamos"}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {soloActivos
                  ? "Todos los activos prestados han sido devueltos a almacén satisfactoriamente."
                  : "No existen registros de préstamos con los criterios de búsqueda especificados."}
              </p>
            </div>
            <div className="pt-2">
              <Link to="/prestamos/nuevo">
                <Button variant="primary" className="!text-xs">
                  <PlusCircle className="w-3.5 h-3.5" />
                  Registrar Asignación de Equipo
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
            <table className="w-full table-fixed text-left text-xs" aria-label="Tabla de préstamos de equipos">
              <colgroup>
                <col className="w-[24%]" />
                <col className="w-[25%]" />
                <col className="w-[11%]" />
                <col className="w-[11%]" />
                <col className="w-[12%]" />
                <col className="w-[8%]" />
                <col className="w-[9%]" />
              </colgroup>
              <thead className="bg-slate-50/90 text-slate-600 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200/80">
                <tr>
                  <th scope="col" className="px-2.5 py-3">Equipo Asignado</th>
                  <th scope="col" className="px-2.5 py-3">Colaborador / Área</th>
                  <th scope="col" className="px-2 py-3 whitespace-nowrap">Fecha Salida</th>
                  <th scope="col" className="px-2 py-3 whitespace-nowrap">Fecha Devolución</th>
                  <th scope="col" className="px-2.5 py-3">Observaciones</th>
                  <th scope="col" className="px-2 py-3 text-center whitespace-nowrap">Estado</th>
                  <th scope="col" className="px-2 py-3 text-right whitespace-nowrap">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {paginatedPrestamos.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Equipment with code pastille */}
                    <td className="px-2.5 py-3 align-middle">
                      <div className="font-bold text-slate-900 leading-snug line-clamp-2">{p.equipoNombre}</div>
                      <div className="mt-1">
                        <span className="inline-block whitespace-nowrap font-mono font-bold text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs">
                          {p.equipoCodigoPatrimonial}
                        </span>
                      </div>
                    </td>

                    {/* Collaborator & Department unified for optimal scanning and zero overflow */}
                    <td className="px-2.5 py-3 align-middle">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-2xs">
                          {p.usuarioNombreCompleto
                            ? p.usuarioNombreCompleto.substring(0, 2).toUpperCase()
                            : "CO"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-slate-800 leading-tight truncate">
                            {p.usuarioNombreCompleto}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200/60 whitespace-nowrap shrink-0">
                              {p.usuarioArea}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono truncate" title={p.usuarioCorreo}>
                              {p.usuarioCorreo}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Loan Date (Compact Stacked) */}
                    <td className="px-2 py-3 whitespace-nowrap align-middle">
                      <div className="flex items-center gap-1 text-slate-700 text-xs font-medium">
                        <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{new Date(p.fechaPrestamo).toLocaleDateString()}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono pl-4">
                        {new Date(p.fechaPrestamo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    {/* Return Date (Compact Stacked) */}
                    <td className="px-2 py-3 whitespace-nowrap align-middle">
                      {p.fechaDevolucion ? (
                        <div>
                          <div className="flex items-center gap-1 text-slate-700 text-xs font-medium">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{new Date(p.fechaDevolucion).toLocaleDateString()}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono pl-4">
                            {new Date(p.fechaDevolucion).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200/80">
                          <Clock className="w-2.5 h-2.5 text-amber-500" />
                          En custodia
                        </span>
                      )}
                    </td>

                    {/* Observations */}
                    <td className="px-2.5 py-3 align-middle" title={p.observacion || "Sin observaciones iniciales"}>
                      <p className="text-slate-600 text-xs truncate">
                        {p.observacion || "Sin observaciones iniciales"}
                      </p>
                    </td>

                    {/* Status Badge */}
                    <td className="px-2 py-3 text-center whitespace-nowrap align-middle">
                      <StatusBadge status={p.esActivo ? "Prestado" : "Finalizado"} />
                    </td>

                    {/* Action with clear Norman Signifier */}
                    <td className="px-2 py-3 text-right whitespace-nowrap align-middle">
                      {p.esActivo ? (
                        <Button
                          onClick={() => openDevolucionModal(p)}
                          variant="success"
                          className="!text-xs !py-1 !px-2.5 shadow-xs"
                          title="Registrar devolución de equipo"
                          aria-label={`Registrar devolución de ${p.equipoNombre}`}
                        >
                          <FileCheck2 className="w-3.5 h-3.5" />
                          <span>Devolver</span>
                        </Button>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 px-1 py-0.5">
                          <CheckCircle className="w-3 h-3 text-slate-400" />
                          Devuelto
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalItems={prestamos.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </>
        )}
      </div>

      {/* Modal: Registrar Devolución */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar Devolución de Activo Tecnológico"
      >
        <form onSubmit={handleDevolucionSubmit} className="space-y-4">
          {/* Detailed summary card of the active asset being returned */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2 text-xs">
            <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-200/80">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Activo en Retorno</p>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">{selectedPrestamo?.equipoNombre}</h4>
              </div>
              <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200/80">
                {selectedPrestamo?.equipoCodigoPatrimonial}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-slate-600">
              <div>
                <span className="font-medium text-slate-500">Responsable:</span>
                <p className="font-semibold text-slate-800">{selectedPrestamo?.usuarioNombreCompleto}</p>
                <p className="text-[10px] text-slate-400">{selectedPrestamo?.usuarioArea}</p>
              </div>
              <div>
                <span className="font-medium text-slate-500">Fecha Préstamo:</span>
                <p className="font-mono font-semibold text-slate-800">
                  {selectedPrestamo && new Date(selectedPrestamo.fechaPrestamo).toLocaleDateString()}
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  {selectedPrestamo && new Date(selectedPrestamo.fechaPrestamo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>

          {/* Protocol reminder */}
          <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200/80 text-xs text-blue-900 space-y-1">
            <p className="font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              Protocolo de Recepción e Inspección Física:
            </p>
            <p className="text-[11px] leading-relaxed text-blue-800">
              Toda devolución deberá registrar observaciones detalladas sobre el estado del equipo
              (mínimo 5 caracteres). Al confirmar, el activo retornará automáticamente al estado <strong>'Disponible'</strong>.
            </p>
          </div>

          {/* Observation textarea with character counter & reactive validation */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="observacionDevolucion" className="text-xs font-bold text-slate-700">
                Observaciones del Estado de Recepción <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <span
                className={`text-[11px] font-mono font-semibold ${
                  observacionDevolucion.trim().length >= 5
                    ? "text-emerald-600"
                    : "text-slate-400"
                }`}
              >
                {observacionDevolucion.length} / 500 caracteres
              </span>
            </div>

            <textarea
              id="observacionDevolucion"
              name="observacionDevolucion"
              value={observacionDevolucion}
              onChange={(e) => {
                setObservacionDevolucion(e.target.value);
                setObservacionError("");
              }}
              rows={3}
              placeholder="Describa el estado físico, operatividad y accesorios devueltos (ej: Operativo, pantalla limpia, cargador original intacto)..."
              maxLength={500}
              required
              aria-invalid={!!observacionError}
              aria-describedby={observacionError ? "observacion-error" : undefined}
              className={`w-full p-3 border rounded-xl text-xs outline-none transition focus:ring-2 bg-white text-slate-800 ${
                observacionError
                  ? "border-red-400 focus:ring-red-200"
                  : observacionDevolucion.trim().length >= 5
                  ? "border-emerald-400 focus:ring-emerald-200"
                  : "border-slate-300 focus:ring-blue-200 focus:border-blue-500"
              }`}
            />

            {observacionError ? (
              <p id="observacion-error" className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {observacionError}
              </p>
            ) : observacionDevolucion.trim().length >= 5 ? (
              <p className="mt-1 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                Observación conforme para el cierre de custodia
              </p>
            ) : null}
          </div>

          {/* Quick suggestions / templates */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Plantillas Rápidas de Inspección:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {quickTemplates.map((template) => (
                <button
                  key={template}
                  type="button"
                  onClick={() => {
                    setObservacionDevolucion(template);
                    setObservacionError("");
                  }}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition text-left"
                >
                  &ldquo;{template.substring(0, 42)}...&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="success"
              disabled={isSubmitting || observacionDevolucion.trim().length < 5}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>{isSubmitting ? "Registrando Devolución..." : "Confirmar Recepción"}</span>
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
