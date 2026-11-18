import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/Button";
import FormMessage from "../components/FormMessage";
import { getUsuarios, toggleEstadoUsuario } from "../services/usuarioService";
import { PlusCircle, Search, Users, UserCheck, UserX, RefreshCw } from "lucide-react";

export default function UsuariosList() {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleToggleEstado = async (id, nombres, estadoActual) => {
    const accion = estadoActual ? "deshabilitar" : "habilitar";
    if (!window.confirm(`¿Está seguro de ${accion} al usuario ${nombres}? (RN-09)`)) {
      return;
    }

    try {
      setMessage("");
      await toggleEstadoUsuario(id, !estadoActual);
      setMessageType("success");
      setMessage(`Usuario ${nombres} ${!estadoActual ? "habilitado" : "deshabilitado"} exitosamente.`);
      fetchUsuarios();
    } catch (err) {
      setMessageType("error");
      setMessage(err.message || "Error al modificar estado del colaborador.");
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

  return (
    <PageContainer
      title="Gestión de Colaboradores y Usuarios (RF-03)"
      subtitle="Administración del personal autorizado para solicitar activos tecnológicos institucionales"
      actions={
        <Link to="/usuarios/nuevo">
          <Button variant="primary">
            <PlusCircle className="w-4 h-4" />
            Registrar Usuario
          </Button>
        </Link>
      }
    >
      <FormMessage type={messageType} message={message} />

      {/* Search Bar */}
      <div className="bg-gray-50/70 p-4 rounded-lg border border-gray-200 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar colaborador por nombre, correo o área..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white"
          />
        </div>
        <p className="text-xs text-gray-500">
          Mostrando <strong>{filtered.length}</strong> colaboradores registrados
        </p>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="p-12 text-center text-gray-500">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
          <p className="text-sm font-medium">Consultando colaboradores registrados...</p>
        </div>
      ) : error ? (
        <p className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">{error}</p>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-gray-400">
          <Users className="w-10 h-10 mx-auto text-gray-300 mb-2" />
          <p className="text-base font-semibold">No se encontraron colaboradores.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100/70 text-gray-700 uppercase text-[11px] font-semibold border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Colaborador</th>
                <th className="px-4 py-3">Correo Institucional (RN-08)</th>
                <th className="px-4 py-3">Área Funcional</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acción (RN-09)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-blue-50/30 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {u.apellidos}, {u.nombres}
                  </td>
                  <td className="px-4 py-3 text-xs text-blue-600 font-mono">
                    {u.correo}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600 font-medium">
                    {u.area}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge activo={u.estado} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleToggleEstado(u.id, `${u.nombres} ${u.apellidos}`, u.estado)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded inline-flex items-center gap-1 transition ${
                        u.estado
                          ? "bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200"
                      }`}
                      title={u.estado ? "Deshabilitar usuario (RF-04, RN-09)" : "Habilitar usuario"}
                    >
                      {u.estado ? (
                        <>
                          <UserX className="w-3.5 h-3.5" />
                          Deshabilitar
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-3.5 h-3.5" />
                          Habilitar
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageContainer>
  );
}
