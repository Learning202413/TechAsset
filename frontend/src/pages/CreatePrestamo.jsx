import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import SelectField from "../components/SelectField";
import InputField from "../components/InputField";
import Button from "../components/Button";
import FormMessage from "../components/FormMessage";
import { createPrestamo } from "../services/prestamoService";
import { getEquipos } from "../services/equipoService";
import { getUsuarios } from "../services/usuarioService";
import { ArrowLeft, Check, RefreshCw } from "lucide-react";

export default function CreatePrestamo() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [formData, setFormData] = useState({
    usuarioId: "",
    equipoId: "",
    observacion: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadResources() {
      try {
        setIsLoadingData(true);
        // Load active users
        const uList = await getUsuarios();
        setUsuarios(uList.filter((u) => u.estado));

        // Load available equipments (Disponible)
        const eList = await getEquipos({ estado: "Disponible" });
        setEquipos(eList);
      } catch (err) {
        console.error(err);
        setMessage("Error al cargar los colaboradores o los equipos disponibles.");
        setMessageType("error");
      } finally {
        setIsLoadingData(false);
      }
    }
    loadResources();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.usuarioId) {
      newErrors.usuarioId = "Debe seleccionar un colaborador responsable del préstamo.";
    }

    if (!formData.equipoId) {
      newErrors.equipoId = "Debe seleccionar el equipo tecnológico a asignar.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const payload = {
        usuarioId: formData.usuarioId,
        equipoId: formData.equipoId,
        observacion: formData.observacion.trim() || "Préstamo asignado en operaciones",
      };

      const result = await createPrestamo(payload);
      setMessageType("success");
      setMessage(result.message || "Préstamo registrado exitosamente.");

      setTimeout(() => {
        navigate("/prestamos");
      }, 1200);
    } catch (err) {
      setMessageType("error");
      setMessage(err.message || "No se pudo registrar el préstamo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const userOptions = usuarios.map((u) => ({
    value: u.id,
    label: `${u.nombres} ${u.apellidos} — [Área: ${u.area}]`,
  }));

  const equipoOptions = equipos.map((eq) => ({
    value: eq.id,
    label: `${eq.codigoPatrimonial} - ${eq.nombre} (${eq.categoria})`,
  }));

  return (
    <PageContainer
      title="Registrar Nuevo Préstamo de Equipo"
      subtitle="Asignación controlada de activos tecnológicos a colaboradores institucionales"
      actions={
        <Link to="/prestamos">
          <Button variant="secondary">
            <ArrowLeft className="w-4 h-4" />
            Volver a Préstamos
          </Button>
        </Link>
      }
    >
      <div className="max-w-2xl mx-auto py-2">
        <FormMessage type={messageType} message={message} />

        {isLoadingData ? (
          <div className="p-8 text-center text-gray-500">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
            <p className="text-sm">Cargando inventario disponible y lista de colaboradores...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-lg text-xs text-blue-900 space-y-1">
              <p className="font-bold">Condiciones de Asignación:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Solo se listan equipos con estado <strong>Disponible</strong> para entrega inmediata.</li>
                <li>Todo préstamo queda formalmente vinculado al colaborador que recibe la custodia.</li>
                <li>Al confirmar, el estado del activo cambiará automáticamente a <strong>Prestado</strong>.</li>
              </ul>
            </div>

            <SelectField
              label="Colaborador Responsable"
              name="usuarioId"
              value={formData.usuarioId}
              onChange={handleChange}
              options={userOptions}
              placeholder="-- Seleccione el colaborador solicitante --"
              required
              error={errors.usuarioId}
            />

            <SelectField
              label="Equipo Tecnológico a Prestar"
              name="equipoId"
              value={formData.equipoId}
              onChange={handleChange}
              options={equipoOptions}
              placeholder={equipos.length === 0 ? "No hay equipos disponibles actualmente" : "-- Seleccione un equipo disponible --"}
              required
              disabled={equipos.length === 0}
              error={errors.equipoId}
            />

            <InputField
              label="Observaciones Iniciales (Opcional)"
              name="observacion"
              value={formData.observacion}
              onChange={handleChange}
              placeholder="Motivo del préstamo, accesorios entregados (mouse, cargador, maletín), etc."
              rows={3}
            />

            <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
              <Link to="/prestamos">
                <Button variant="secondary">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || equipos.length === 0}
              >
                {isSubmitting ? (
                  "Procesando asignación..."
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Confirmar Préstamo
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </PageContainer>
  );
}
