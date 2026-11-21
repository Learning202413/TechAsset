import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Button from "../components/Button";
import FormMessage from "../components/FormMessage";
import { createEquipo } from "../services/equipoService";
import { normalizeText } from "../utils/normalizeText";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Check, ShieldAlert } from "lucide-react";

export default function CreateEquipo() {
  const navigate = useNavigate();
  const { canManageEquipos } = useAuth();

  const [formData, setFormData] = useState({
    codigoPatrimonial: "",
    nombre: "",
    categoria: "Laptop",
    marca: "",
    estado: "Disponible",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categorias = [
    { value: "Laptop", label: "Laptop" },
    { value: "Computadoras de escritorio", label: "Computadora de escritorio" },
    { value: "Monitor", label: "Monitor" },
    { value: "Impresoras", label: "Impresora" },
    { value: "Tablets", label: "Tablet" },
    { value: "Proyector multimedia", label: "Proyector multimedia" },
    { value: "Equipos de red", label: "Equipos de red" },
  ];

  const estados = [
    { value: "Disponible", label: "Disponible" },
    { value: "Mantenimiento", label: "Mantenimiento" },
    { value: "Baja", label: "Baja" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    const codigo = normalizeText(formData.codigoPatrimonial);
    const nombre = normalizeText(formData.nombre);
    const marca = normalizeText(formData.marca);

    if (!codigo) {
      newErrors.codigoPatrimonial = "El código patrimonial es obligatorio.";
    } else if (codigo.length < 3) {
      newErrors.codigoPatrimonial = "El código patrimonial debe tener al menos 3 caracteres.";
    }

    if (!nombre) {
      newErrors.nombre = "El nombre del equipo es obligatorio.";
    } else if (nombre.length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres.";
    }

    if (!formData.categoria) {
      newErrors.categoria = "Debe seleccionar una categoría.";
    }

    if (!marca) {
      newErrors.marca = "La marca del equipo es obligatoria.";
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
        codigoPatrimonial: normalizeText(formData.codigoPatrimonial).toUpperCase(),
        nombre: normalizeText(formData.nombre),
        categoria: formData.categoria,
        marca: normalizeText(formData.marca),
        estado: formData.estado,
      };

      const result = await createEquipo(payload);
      setMessageType("success");
      setMessage(result.message || "Equipo registrado exitosamente.");

      // Limpiar formulario o redirigir
      setTimeout(() => {
        navigate("/equipos");
      }, 1200);
    } catch (err) {
      setMessageType("error");
      setMessage(err.message || "Error al registrar el equipo en el inventario.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!canManageEquipos) {
    return (
      <PageContainer
        title="Acceso Restringido"
        subtitle="Módulo exclusivo para Administradores y Personal de TI"
      >
        <div className="bg-white p-8 rounded-2xl shadow-xs border border-slate-200 text-center max-w-lg mx-auto my-12 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Permisos Insuficientes</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              El registro de nuevos activos tecnológicos en el catálogo está reservado para personal de Tecnología y Administradores.
            </p>
          </div>
          <Link to="/equipos">
            <Button variant="primary" className="mx-auto !text-xs mt-2">
              Volver al Inventario
            </Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Registrar Equipo Tecnológico"
      subtitle="Ingrese los datos del nuevo activo tecnológico institucional para Innovatech Solutions"
      actions={
        <Link to="/equipos">
          <Button variant="secondary">
            <ArrowLeft className="w-4 h-4" />
            Volver al Inventario
          </Button>
        </Link>
      }
    >
      <div className="max-w-2xl mx-auto py-2">
        <FormMessage type={messageType} message={message} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Código Patrimonial"
              name="codigoPatrimonial"
              value={formData.codigoPatrimonial}
              onChange={handleChange}
              placeholder="Ej: EQ-00109"
              required
              error={errors.codigoPatrimonial}
            />

            <InputField
              label="Marca del Fabricante"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              placeholder="Ej: Dell, Apple, HP, Cisco"
              required
              error={errors.marca}
            />
          </div>

          <InputField
            label="Nombre / Descripción del Activo"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Laptop Lenovo ThinkPad T14 Gen 3"
            required
            error={errors.nombre}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Categoría del Activo"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              options={categorias}
              required
              error={errors.categoria}
            />

            <SelectField
              label="Estado Inicial"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              options={estados}
              required
              error={errors.estado}
            />
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
            <Link to="/equipos">
              <Button variant="secondary">Cancelar</Button>
            </Link>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? (
                "Guardando..."
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Guardar Equipo
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
