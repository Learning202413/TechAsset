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

  return (
    <div
      className={`relative overflow-hidden bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 group flex flex-col justify-between ${theme.borderHover}`}
    >
      {/* Top micro-accent line */}
      <div
        className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${theme.topAccent} opacity-80 group-hover:opacity-100 transition-opacity`}
        aria-hidden="true"
      />

      {/* Header with Title and Icon */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
            {title}
          </p>
          <p className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5 leading-none">
            {value}
          </p>
        </div>

        {Icon && (
          <div
            className={`p-2.5 rounded-xl border shrink-0 transition-all duration-200 ${theme.iconBox}`}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Footer / Context Descriptor (Shneiderman #8 - Reduce Short-Term Memory Load) */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {description && (
          <span className="text-slate-500 font-medium truncate" title={description}>
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
