import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Layers, 
  LogIn, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ShieldCheck, 
  UserCheck, 
  Info,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import FormMessage from "../components/FormMessage";

export default function Login() {
  const navigate = useNavigate();
  const { login, demoUsers } = useAuth();

  const [correo, setCorreo] = useState("carlos.mendoza@innovatech.com");
  const [password, setPassword] = useState("Innovatech2026*");
  const [showPassword, setShowPassword] = useState(false);
  const [recordar, setRecordar] = useState(true);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Nielsen #5: Error prevention
  const validate = () => {
    const newErrors = {};
    const trimmed = correo.trim();

    if (!trimmed) {
      newErrors.correo = "El correo institucional es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      newErrors.correo = "Ingrese un formato de correo válido (ej: usuario@innovatech.com).";
    }

    if (!password) {
      newErrors.password = "La contraseña de acceso es requerida.";
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
      // Simulate real auth handshake with immediate feedback (Nielsen #1)
      await new Promise((resolve) => setTimeout(resolve, 600));

      const loggedUser = login(correo, password);
      setMessageType("success");
      setMessage(`Bienvenido al sistema, ${loggedUser.nombre}. Redirigiendo al dashboard...`);

      // Yield closure (Shneiderman) & redirection
      setTimeout(() => {
        navigate("/dashboard");
      }, 700);
    } catch (err) {
      setMessageType("error");
      setMessage("Credenciales inválidas. Por favor verifique sus datos o use un perfil demo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Nielsen #6: Recognition rather than recall - Quick Demo Selector
  const handleSelectDemo = (demo) => {
    setCorreo(demo.correo);
    setPassword("Innovatech2026*");
    setErrors({});
    setMessage(`Perfil de ${demo.rol} cargado automáticamente.`);
    setMessageType("success");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white">
      {/* Back to landing button (Nielsen #3: User control and freedom) */}
      <div className="max-w-md w-full mx-auto mb-6 px-4 sm:px-0">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Portal Institucional</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex p-3 bg-blue-600 text-white rounded-2xl shadow-md mb-3">
            <Layers className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Acceso a TechAsset
          </h2>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Innovatech Solutions S.A.C. &bull; Control Institucional de TI
          </p>
        </div>

        {/* Card */}
        <div className="mt-6 bg-white py-8 px-6 sm:px-10 shadow-xl rounded-2xl border border-slate-200">
          <FormMessage type={messageType} message={message} />

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Input Correo with Signifier (Norman) */}
            <div>
              <label htmlFor="correo" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Correo Electrónico Corporativo
              </label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  autoComplete="email"
                  value={correo}
                  onChange={(e) => {
                    setCorreo(e.target.value);
                    setErrors((prev) => ({ ...prev, correo: "" }));
                  }}
                  placeholder="usuario@innovatech.com"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border outline-none transition focus:ring-2 bg-slate-50 focus:bg-white text-slate-900 ${
                    errors.correo
                      ? "border-red-500 focus:ring-red-200"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />
              </div>
              {errors.correo && (
                <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1" role="alert">
                  <Info className="w-3.5 h-3.5" />
                  {errors.correo}
                </p>
              )}
            </div>

            {/* Input Password with Eye Toggle Signifier (Norman & Nielsen #3) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => alert("Para fines de evaluación académica, podés ingresar con cualquier contraseña o utilizar los perfiles demo de abajo.")}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  placeholder="••••••••"
                  className={`w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border outline-none transition focus:ring-2 bg-slate-50 focus:bg-white text-slate-900 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-200"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1" role="alert">
                  <Info className="w-3.5 h-3.5" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                id="recordar"
                name="recordar"
                type="checkbox"
                checked={recordar}
                onChange={(e) => setRecordar(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
              />
              <label htmlFor="recordar" className="ml-2 block text-xs text-slate-600 cursor-pointer select-none">
                Mantener sesión abierta en este dispositivo
              </label>
            </div>

            {/* Submit Button (Affordance & Status Visibility) */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold text-sm shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 transition flex items-center justify-center gap-2"
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
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Accounts (Nielsen #6: Recognition Rather than Recall) */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Acceso Rápido para Evaluación Docente
              </p>
            </div>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Hacé clic en cualquier perfil para cargar sus credenciales de prueba al instante (Regla de Shneiderman para reducir memoria de trabajo):
            </p>

            <div className="space-y-2">
              {demoUsers.map((u) => (
                <button
                  key={u.correo}
                  type="button"
                  onClick={() => handleSelectDemo(u)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg border transition flex items-center justify-between text-xs ${
                    correo === u.correo
                      ? "bg-blue-50/70 border-blue-400 text-blue-900 font-semibold"
                      : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                      {u.iniciales}
                    </span>
                    <div>
                      <p className="font-semibold">{u.nombre}</p>
                      <p className="text-[11px] text-slate-500">{u.rol} &bull; {u.area}</p>
                    </div>
                  </div>
                  {correo === u.correo && (
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Security / Compliance Notice (Nielsen #10) */}
        <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Acceso seguro protegido &bull; Innovatech Solutions S.A.C. 2026</span>
        </div>
      </div>
    </div>
  );
}
