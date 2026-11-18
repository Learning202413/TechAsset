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
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1.5 text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-lg text-sm outline-none transition focus:ring-2 bg-white text-gray-800 ${
          error
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
        } ${disabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>
      )}
    </div>
  );
}
