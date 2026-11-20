import { ChevronDown } from "lucide-react";

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "-- Seleccione una opción --",
  required = false,
  error = "",
  disabled = false,
}) {
  const errorId = `${name}-error`;

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-700"
        >
          {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          required={required}
          disabled={disabled}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full appearance-none pl-3.5 pr-10 py-2.5 border rounded-xl text-sm outline-none transition focus:ring-2 bg-white text-slate-800 ${
            error
              ? "border-red-500 focus:ring-red-100 bg-red-50/20"
              : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
          } ${disabled ? "bg-slate-100 cursor-not-allowed text-slate-400" : ""}`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-slate-800 py-1">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-red-600 text-xs mt-1.5 font-medium flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
}
