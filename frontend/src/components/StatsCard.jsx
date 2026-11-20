export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  color = "blue",
  badge = null,
}) {
  const themeMap = {
    blue: {
      borderHover: "hover:border-blue-300",
      topAccent: "from-blue-600 to-indigo-600",
      iconBox: "bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white",
      badge: "bg-blue-50 text-blue-700 border-blue-200/80",
    },
    emerald: {
      borderHover: "hover:border-emerald-300",
      topAccent: "from-emerald-500 to-teal-600",
      iconBox: "bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    },
    amber: {
      borderHover: "hover:border-amber-300",
      topAccent: "from-amber-500 to-orange-500",
      iconBox: "bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-600 group-hover:text-white",
      badge: "bg-amber-50 text-amber-700 border-amber-200/80",
    },
    purple: {
      borderHover: "hover:border-purple-300",
      topAccent: "from-purple-600 to-indigo-600",
      iconBox: "bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-600 group-hover:text-white",
      badge: "bg-purple-50 text-purple-700 border-purple-200/80",
    },
    indigo: {
      borderHover: "hover:border-indigo-300",
      topAccent: "from-indigo-600 to-blue-600",
      iconBox: "bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white",
      badge: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
    },
    rose: {
      borderHover: "hover:border-rose-300",
      topAccent: "from-rose-500 to-pink-600",
      iconBox: "bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-600 group-hover:text-white",
      badge: "bg-rose-50 text-rose-700 border-rose-200/80",
    },
  };

  const theme = themeMap[color] || themeMap.blue;

  // Determine dynamic font size based on value length and type
  const isTextValue = typeof value === "string" && isNaN(Number(value));
  const valueLength = String(value ?? "").length;

  let valueSizeClasses = "text-2xl lg:text-3xl font-extrabold";
  if (isTextValue) {
    if (valueLength > 12) {
      valueSizeClasses = "text-sm sm:text-base font-bold";
    } else if (valueLength > 6) {
      valueSizeClasses = "text-base sm:text-lg font-bold";
    } else {
      valueSizeClasses = "text-lg sm:text-xl font-bold";
    }
  }

  return (
    <div
      className={`relative overflow-hidden bg-white p-4 lg:p-4.5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group flex flex-col justify-between ${theme.borderHover}`}
    >
      {/* Top micro-accent line */}
      <div
        className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${theme.topAccent} opacity-80 group-hover:opacity-100 transition-opacity`}
        aria-hidden="true"
      />

      {/* Row 1: Title and Icon */}
      <div className="flex items-center justify-between gap-2">
        <span
          className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-tight"
          title={title}
        >
          {title}
        </span>

        {Icon && (
          <div
            className={`p-2 rounded-xl border shrink-0 transition-all duration-200 ${theme.iconBox}`}
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Row 2: Value (Dedicated Full Width Space) */}
      <div className="my-2 min-w-0">
        <div
          className={`${valueSizeClasses} text-slate-900 tracking-tight leading-snug truncate`}
          title={String(value ?? "")}
        >
          {value}
        </div>
      </div>

      {/* Row 3: Footer Descriptor & Badge */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1.5 text-xs">
        {description && (
          <span
            className="text-[11px] text-slate-500 font-medium truncate"
            title={description}
          >
            {description}
          </span>
        )}
        {badge && (
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${theme.badge}`}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
