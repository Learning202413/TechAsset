export default function Button({
  children,
  disabled = false,
  type = "button",
  variant = "primary",
  onClick,
  className = "",
}) {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition duration-200 inline-flex items-center justify-center gap-2 text-sm";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 disabled:opacity-50",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-emerald-300",
    danger: "bg-red-600 hover:bg-red-700 text-white disabled:bg-red-300",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  );
}
