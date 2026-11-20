import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import FormMessage from "../components/FormMessage";
import { getUsuarios, toggleEstadoUsuario } from "../services/usuarioService";
import { PlusCircle, Search, Users, UserCheck, UserX, RefreshCw, AlertCircle, X } from "lucide-react";

export default function UsuariosList() {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 6;

  const fetchUsuarios = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar la lista de colaboradores.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const [toggleModal, setToggleModal] = useState({
    isOpen: false,
    usuario: null,
    isSubmitting: false,
  });

  const openToggleModal = (u) => {
    setToggleModal({
      isOpen: true,
      usuario: u,
      isSubmitting: false,
    });
  };

  const handleConfirmToggle = async () => {
    if (!toggleModal.usuario) return;
    const { id, nombres, apellidos, estado } = toggleModal.usuario;
    const nombreCompleto = `${nombres} ${apellidos}`;

    try {
      setToggleModal((prev) => ({ ...prev, isSubmitting: true }));
      setMessage("");
      await toggleEstadoUsuario(id, !estado);
      setMessageType("success");
      setMessage(`Colaborador ${nombreCompleto} ${!estado ? "habilitado" : "deshabilitado"} exitosamente.`);
      setToggleModal({ isOpen: false, usuario: null, isSubmitting: false });
      fetchUsuarios();
    } catch (err) {
      setMessageType("error");
      setMessage(err.message || "Error al modificar estado del colaborador.");
      setToggleModal((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const filtered = usuarios.filter((u) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      u.nombres.toLowerCase().includes(q) ||
      u.apellidos.toLowerCase().includes(q) ||
      u.correo.toLowerCase().includes(q) ||
      u.area.toLowerCase().includes(q)
    );
  });

  const paginatedUsuarios = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <PageContainer
      title="Gestión de Colaboradores y Usuarios"
      subtitle="Administración del personal autorizado para solicitar activos tecnológicos institucionales"
      actions={
        <Link to="/usuarios/nuevo">
          <Button variant="primary">
            <PlusCircle className="w-4 h-4" />
            <span>Registrar Colaborador / Usuario</span>
          </Button>
        </Link>
      }
    >
      <FormMessage type={messageType} message={message} />

      {/* Search Bar */}
      <div className="bg-white p-4 lg:p-5 rounded-2xl shadow-xs border border-slate-200/80 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar colaborador por nombre, correo o área..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-8 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-slate-800 transition"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
              }}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 transition"
              title="Limpiar búsqueda"
              aria-label="Limpiar campo de búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <p className="text-xs text-slate-500">
          Mostrando <strong>{filtered.length}</strong> colaboradores registrados
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
        {isLoading ? (
          <div className="p-16 text-center text-slate-500 space-y-3">
            <RefreshCw className="w-7 h-7 animate-spin mx-auto text-blue-600" />
            <p className="text-xs font-semibold">Consultando colaboradores en PostgreSQL...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 bg-red-50 space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto text-red-500" />
            <p className="text-sm font-semibold">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center space-y-3 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center border border-slate-200 shadow-inner">
              <Users className="w-8 h-8" />
            </div>
            <p className="text-sm font-bold text-slate-900">No se encontraron colaboradores</p>
            <p className="text-xs text-slate-500">No hay registros que coincidan con el término de búsqueda ingresado.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs" aria-label="Tabla de colaboradores">
                <thead className="bg-slate-50/90 text-slate-600 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200/80">
                  <tr>
                    <th scope="col" className="px-3.5 py-3">Colaborador</th>
                    <th scope="col" className="px-3.5 py-3">Correo Institucional</th>
                    <th scope="col" className="px-3.5 py-3">Área Funcional</th>
                    <th scope="col" className="px-3.5 py-3">Estado</th>
                    <th scope="col" className="px-3.5 py-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {paginatedUsuarios.map((u) => {
                    const initials = `${u.nombres?.charAt(0) || ""}${u.apellidos?.charAt(0) || ""}`.toUpperCase() || "CO";
                    return (
                      <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-3.5 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-2xs">
                              {initials}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 leading-tight">
                                {u.apellidos}, {u.nombres}
                              </p>
                              <span className="text-[10px] font-mono text-slate-400">ID #{u.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-3.5 py-3 whitespace-nowrap">
                          <span className="text-xs text-blue-600 font-mono">{u.correo}</span>
                        </td>
                        <td className="px-3.5 py-3 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
                            {u.area}
                          </span>
                        </td>
                        <td className="px-3.5 py-3 whitespace-nowrap">
                          <StatusBadge activo={u.estado} />
                        </td>
                        <td className="px-3.5 py-3 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => openToggleModal(u)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition shadow-2xs focus:outline-none focus:ring-2 ${
                              u.estado
                                ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 focus:ring-amber-400/20"
                                : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 focus:ring-emerald-400/20"
                            }`}
                            title={u.estado ? "Deshabilitar colaborador" : "Habilitar colaborador"}
                          >
                            {u.estado ? (
                              <>
                                <UserX className="w-3.5 h-3.5 text-amber-600" />
                                <span>Deshabilitar</span>
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Habilitar</span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalItems={filtered.length}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      {/* Modal accesible para alternar estado de colaborador (Reemplaza window.confirm) */}
      <Modal
        isOpen={toggleModal.isOpen}
        onClose={() => !toggleModal.isSubmitting && setToggleModal({ isOpen: false, usuario: null, isSubmitting: false })}
        title={toggleModal.usuario?.estado ? "Deshabilitar Colaborador" : "Habilitar Colaborador"}
      >
        <div className="space-y-4">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-600">Colaborador:</span>
              <strong className="text-slate-900">
                {toggleModal.usuario?.apellidos}, {toggleModal.usuario?.nombres}
              </strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-600">Correo Institucional:</span>
              <span className="font-mono text-blue-600">{toggleModal.usuario?.correo}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-600">Área Funcional:</span>
              <span className="text-slate-700">{toggleModal.usuario?.area}</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              Política de Seguridad Institucional:
            </p>
            <p className="text-[11px] leading-relaxed text-amber-800">
              Solo los perfiles autorizados pueden modificar el estado de un colaborador. Al {toggleModal.usuario?.estado ? "deshabilitar" : "habilitar"} al colaborador, este {toggleModal.usuario?.estado ? "no podrá recibir nuevas asignaciones de equipos" : "volverá a estar habilitado para la entrega de equipos"}.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              variant="secondary"
              onClick={() => setToggleModal({ isOpen: false, usuario: null, isSubmitting: false })}
              disabled={toggleModal.isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              variant={toggleModal.usuario?.estado ? "danger" : "success"}
              onClick={handleConfirmToggle}
              disabled={toggleModal.isSubmitting}
            >
              {toggleModal.isSubmitting
                ? "Procesando..."
                : toggleModal.usuario?.estado
                ? "Confirmar Deshabilitación"
                : "Confirmar Habilitación"}
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}
