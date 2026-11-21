import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.jpg";
import { 
  Layers, 
  LogIn, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles,
  AlertCircle,
  ArrowRight,
  Check
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import FormMessage from "../components/FormMessage";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [correo, setCorreo] = useState("carlos.mendoza@innovatech.com");
  const [password, setPassword] = useState("Innovatech2026*");
  const [showPassword, setShowPassword] = useState(false);
  const [recordar, setRecordar] = useState(true);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3 Official Personas for 1-Click Demo Evaluation (ISO 9241-210 & Shneiderman Rule #8)
  const personasDemo = [
    {
      id: "admin",
      nombre: "Carlos Mendoza Ramos",
      rol: "Administrador de Sistemas (Admin TI)",
      area: "Tecnología & Infraestructura",
      correo: "carlos.mendoza@innovatech.com",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200"
    },
    {
      id: "soporte",
      nombre: "Sofía Valenzuela",
      rol: "Responsable de Soporte TI",
      area: "Soporte y Despacho Operativo",
      correo: "soporte@innovatech.com",
      foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200"
    },
    {
      id: "colaborador",
      nombre: "Juan Pérez",
      rol: "Colaborador Institucional",
      area: "Desarrollo de Software",
      correo: "ana.perez@innovatech.com", // Linked to existing demo account
      foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
    }
  ];

  // Norman: Error Prevention & Shneiderman: Simple error handling
  const validate = () => {
    const newErrors = {};
    const trimmed = correo.trim();

    if (!trimmed) {
      newErrors.correo = "El correo electrónico institucional es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      newErrors.correo = "Ingrese un formato de correo corporativo válido (@innovatech.com).";
    }

    if (!password) {
      newErrors.password = "La contraseña de acceso es obligatoria.";
    } else if (password.length < 4) {
      newErrors.password = "La contraseña debe contener al menos 4 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    try {
      setIsSubmitting(true);
      // Feedback informativo inmediato (Shneiderman Regla #3)
      await new Promise((resolve) => setTimeout(resolve, 600));

      const loggedUser = login(correo, password);
      setMessageType("success");
      setMessage(`Bienvenido al sistema, ${loggedUser.nombre}. Redirigiendo al Dashboard...`);

      // Cierre de diálogo (Shneiderman Regla #4)
      setTimeout(() => {
        navigate("/dashboard");
      }, 700);
    } catch {
      setMessageType("error");
      setMessage("Credenciales inválidas. Por favor verifique sus datos o use un perfil demo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reducción de la carga en la memoria de trabajo (Shneiderman Regla #8 & Norman: Recognition rather than recall)
  const handleSelectDemo = (persona) => {
    setCorreo(persona.correo);
    setPassword("Innovatech2026*");
    setErrors({});
    setMessage(`Perfil de ${persona.rol} cargado con credenciales oficiales.`);
    setMessageType("success");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row selection:bg-blue-600 selection:text-white">
      {/* ============================================================== */}
      {/* LEFT PANE: 50% SPLIT-SCREEN ENTERPRISE BRANDING & IMAGERY      */}
      {/* ============================================================== */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-12 overflow-hidden border-r border-slate-800">
        {/* Background Tech Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80" 
            alt="Infraestructura Tecnológica Enterprise" 
            className="w-full h-full object-cover brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/85 to-blue-950/80"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
        </div>

        {/* Top Header in Left Pane */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logoImg} 
              alt="TechAsset Logo" 
              className="w-11 h-11 object-contain rounded-xl bg-white p-1 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition" 
            />
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                Tech<span className="text-cyan-400">Asset</span> <span className="text-[10px] uppercase font-bold text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30">Enterprise</span>
              </span>
              <span className="text-xs font-semibold text-slate-400 tracking-wider block">
                INNOVATECH SOLUTIONS S.A.C.
              </span>
            </div>
          </Link>

          <span className="text-xs font-medium text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Servicios en Línea
          </span>
        </div>

        {/* Central Value Content */}
        <div className="relative z-10 my-auto py-12 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Sistema Institucional de Gestión y Trazabilidad de TI</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-4">
            Control patrimonial de precisión para infraestructura tecnológica y activos corporativos.
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            Plataforma integral para la administración ágil de activos, trazabilidad de custodias y control operativo institucional en tiempo real.
          </p>

          {/* Trust Metrics Grid */}
          <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800">
            <div>
              <p className="text-2xl font-black text-white">500+</p>
              <p className="text-[11px] font-bold text-blue-400 uppercase tracking-wide">Colaboradores</p>
              <p className="text-[10px] text-slate-400">Padrón activo</p>
            </div>
            <div className="border-l border-slate-800 pl-4">
              <p className="text-2xl font-black text-emerald-400">100%</p>
              <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide">Trazabilidad</p>
              <p className="text-[10px] text-slate-400">Control de flujo</p>
            </div>
            <div className="border-l border-slate-800 pl-4">
              <p className="text-2xl font-black text-cyan-400">0</p>
              <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-wide">Duplicados</p>
              <p className="text-[10px] text-slate-400">Códigos únicos</p>
            </div>
          </div>

          {/* Glassmorphism User Testimonial Card */}
          <div className="mt-8 p-5 rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-blue-500/30 shadow-xl">
            <p className="text-xs text-slate-200 italic leading-relaxed mb-4">
              "TechAsset eliminó el descontrol de las hojas de cálculo en nuestro almacén. Ahora cada activo cuenta con código patrimonial único, historial de préstamos auditado y bloqueo estricto de equipos en mantenimiento."
            </p>
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" 
                alt="Carlos Mendoza Ramos" 
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              />
              <div>
                <p className="text-xs font-bold text-white">Carlos Mendoza Ramos</p>
                <p className="text-[11px] text-blue-400">Administrador de Sistemas &bull; Innovatech Solutions S.A.C.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Left Pane Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80 pt-6">
          <span>Seguridad Corporativa &bull; Alta Disponibilidad</span>
          <span>Innovatech Solutions S.A.C. &bull; 2026</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* RIGHT PANE: 50% SPLIT-SCREEN ACCESSIBLE LOGIN FORM             */}
      {/* ============================================================== */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-y-auto">
        {/* Top Bar Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition group"
          >
            <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-blue-50 transition">
              <ArrowLeft className="w-4 h-4 text-slate-600 group-hover:text-blue-600" />
            </div>
            <span>Volver al Portal Institucional</span>
          </Link>

          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Acceso Corporativo Seguro
          </span>
        </div>

        {/* Main Form Container */}
        <div className="max-w-md w-full mx-auto my-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="w-12 h-12 rounded-xl bg-white p-1 border border-slate-200 shadow-xs mb-3 flex items-center justify-center">
              <img src={logoImg} alt="TechAsset Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Bienvenido a Tech<span className="text-cyan-600">Asset</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              Ingresá tus credenciales autorizadas de Innovatech Solutions S.A.C. para acceder al panel de control patrimonial.
            </p>
          </div>

          <FormMessage type={messageType} message={message} />

          {/* Form with WCAG 2.1 AA & ISO 40500 Compliance */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Input Correo */}
            <div>
              <label 
                htmlFor="correo" 
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Correo Electrónico Institucional <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.correo}
                  aria-describedby={errors.correo ? "correo-error" : undefined}
                  value={correo}
                  onChange={(e) => {
                    setCorreo(e.target.value);
                    if (errors.correo) setErrors((prev) => ({ ...prev, correo: "" }));
                  }}
                  placeholder="ejemplo@innovatech.com"
                  className={`w-full pl-10 pr-3 py-3 text-sm rounded-xl border outline-none transition focus:ring-2 bg-slate-50/80 focus:bg-white text-slate-900 font-medium ${
                    errors.correo
                      ? "border-red-500 focus:ring-red-100 bg-red-50/20"
                      : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
                  }`}
                />
              </div>
              {errors.correo && (
                <p 
                  id="correo-error" 
                  role="alert" 
                  className="text-red-600 text-xs mt-1.5 font-semibold flex items-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.correo}</span>
                </p>
              )}
            </div>

            {/* Input Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="password" 
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Contraseña de Acceso <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setMessage("Para fines de evaluación académica, podés hacer clic en cualquiera de los 3 perfiles demo de abajo para cargar credenciales verificadas.");
                    setMessageType("info");
                  }}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition hover:underline"
                >
                  ¿Ayuda con la contraseña?
                </button>
              </div>

              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-11 py-3 text-sm rounded-xl border outline-none transition focus:ring-2 bg-slate-50/80 focus:bg-white text-slate-900 font-medium ${
                    errors.password
                      ? "border-red-500 focus:ring-red-100 bg-red-50/20"
                      : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
                  }`}
                />
                {/* Norman Signifier & Shneiderman Control: Eye icon button with proper aria-label */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña en texto claro"}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p 
                  id="password-error" 
                  role="alert" 
                  className="text-red-600 text-xs mt-1.5 font-semibold flex items-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label htmlFor="recordar" className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  id="recordar"
                  name="recordar"
                  type="checkbox"
                  checked={recordar}
                  onChange={(e) => setRecordar(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
                />
                <span className="text-xs text-slate-600 font-medium">
                  Mantener sesión activa en este dispositivo
                </span>
              </label>
            </div>

            {/* Submit Button with Affordance & Loading Spinner */}
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-extrabold text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 transition-all flex items-center justify-center gap-2.5 transform active:scale-98"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Verificando credenciales...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Iniciar Sesión en TechAsset</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* QUICK DEMO PERSONA SELECTOR (Shneiderman Regla #8: Reduce Short-term Memory Load) */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                  Acceso Rápido por Perfil (1 Clic)
                </span>
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                Docente / Evaluación
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Hacé clic en cualquier persona para cargar sus credenciales institucionales de prueba al instante sin tener que memorizarlas:
            </p>

            <div className="space-y-2.5">
              {personasDemo.map((persona) => {
                const isSelected = correo === persona.correo;
                return (
                  <button
                    key={persona.id}
                    type="button"
                    onClick={() => handleSelectDemo(persona)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-blue-50/80 border-blue-400 ring-2 ring-blue-400/20 shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100/80 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={persona.foto} 
                        alt={persona.nombre} 
                        className="w-9 h-9 rounded-full object-cover border border-slate-300 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900 leading-none">{persona.nombre}</p>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${persona.badgeColor}`}>
                            {persona.id === "admin" ? "Admin" : persona.id === "soporte" ? "Soporte" : "Usuario"}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-none">{persona.rol} &bull; {persona.correo}</p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="p-1 rounded-full bg-blue-600 text-white shrink-0 ml-2">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Innovatech Solutions S.A.C. &bull; 2026</span>
          </div>
          <Link to="/dashboard" className="text-blue-600 font-semibold hover:underline">
            Entrar como Invitado &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
