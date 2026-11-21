import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Button from "../components/Button";
import FormMessage from "../components/FormMessage";
import { createUsuario } from "../services/usuarioService";
import { normalizeText } from "../utils/normalizeText";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Check, ShieldAlert } from "lucide-react";

export default function CreateUsuario() {
  const navigate = useNavigate();
  const { canManageUsers } = useAuth();

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    area: "Tecnología",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const areas = [
    { value: "Tecnología", label: "Tecnología e Infraestructura" },
    { value: "Desarrollo", label: "Desarrollo de Software" },
    { value: "Operaciones", label: "Operaciones y Logística" },
    { value: "Marketing", label: "Marketing y Comunicaciones" },
    { value: "Recursos Humanos", label: "Gestión del Talento y RRHH" },
    { value: "Finanzas", label: "Finanzas y Contabilidad" },
    { value: "Comercial", label: "Ventas y Comercial" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    const nombres = normalizeText(formData.nombres);
    const apellidos = normalizeText(formData.apellidos);
    const correo = formData.correo.trim();

    if (!nombres) {
      newErrors.nombres = "Los nombres son obligatorios.";
    } else if (nombres.length < 2) {
      newErrors.nombres = "Debe ingresar al menos 2 caracteres.";
    }

    if (!apellidos) {
      newErrors.apellidos = "Los apellidos son obligatorios.";
    } else if (apellidos.length < 2) {
      newErrors.apellidos = "Debe ingresar al menos 2 caracteres.";
    }

    if (!correo) {
      newErrors.correo = "El correo electrónico institucional es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      newErrors.correo = "Ingrese un formato de correo electrónico válido.";
    }

    if (!formData.area) {
      newErrors.area = "Debe seleccionar un área de trabajo.";
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
        nombres: normalizeText(formData.nombres),
        apellidos: normalizeText(formData.apellidos),
        correo: formData.correo.trim().toLowerCase(),
        area: formData.area,
      };

      const result = await createUsuario(payload);
      setMessageType("success");
      setMessage(result.message || "Usuario registrado exitosamente.");

      setTimeout(() => {
        navigate("/usuarios");
      }, 1200);
    } catch (err) {
      setMessageType("error");
      setMessage(err.message || "Error al registrar el colaborador.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!canManageUsers) {
    return (
      <PageContainer
        title="Acceso Restringido"
        subtitle="Módulo exclusivo para Administradores de Sistemas"
      >
        <div className="bg-white p-8 rounded-2xl shadow-xs border border-slate-200 text-center max-w-lg mx-auto my-12 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Permisos Insuficientes</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              El registro de nuevos colaboradores institucionales está reservado para el rol <strong>Administrador de Sistemas</strong>.
            </p>
          </div>
          <Link to="/dashboard">
            <Button variant="primary" className="mx-auto !text-xs mt-2">
              Volver al Dashboard
            </Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Registrar Colaborador / Usuario"
      subtitle="Alta de personal en el sistema TechAsset para la asignación de activos tecnológicos"
      actions={
        <Link to="/usuarios">
          <Button variant="secondary">
            <ArrowLeft className="w-4 h-4" />
            Volver a Colaboradores
          </Button>
        </Link>
      }
    >
      <div className="max-w-2xl mx-auto py-2">
        <FormMessage type={messageType} message={message} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Nombres"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              placeholder="Ej: Sofía Elena"
              required
              error={errors.nombres}
            />

            <InputField
              label="Apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              placeholder="Ej: Navarro Sánchez"
              required
              error={errors.apellidos}
            />
          </div>

          <InputField
            label="Correo Electrónico Institucional"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            placeholder="Ej: sofia.navarro@innovatech.com"
            required
            error={errors.correo}
          />

          <SelectField
            label="Área Funcional"
            name="area"
            value={formData.area}
            onChange={handleChange}
            options={areas}
            required
            error={errors.area}
          />

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
            <Link to="/usuarios">
              <Button variant="secondary">Cancelar</Button>
            </Link>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? (
                "Guardando..."
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Guardar Colaborador
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
