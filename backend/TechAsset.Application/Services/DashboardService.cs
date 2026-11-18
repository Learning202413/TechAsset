using TechAsset.Application.DTOs;
using TechAsset.Application.Interfaces;

namespace TechAsset.Application.Services;

public class DashboardService : IDashboardService
{
    private readonly IEquipoRepository _equipoRepository;
    private readonly IPrestamoRepository _prestamoRepository;

    public DashboardService(IEquipoRepository equipoRepository, IPrestamoRepository prestamoRepository)
    {
        _equipoRepository = equipoRepository;
        _prestamoRepository = prestamoRepository;
    }

    public async Task<DashboardStatsDto> ObtenerEstadisticasAsync()
    {
        var equipos = (await _equipoRepository.ObtenerTodosAsync()).ToList();
        var prestamos = (await _prestamoRepository.ObtenerTodosAsync()).ToList();

        var totalEquipos = equipos.Count;
        var disponibles = equipos.Count(e => e.Estado.Equals("Disponible", StringComparison.OrdinalIgnoreCase));
        var prestados = equipos.Count(e => e.Estado.Equals("Prestado", StringComparison.OrdinalIgnoreCase));
        var mantenimiento = equipos.Count(e => e.Estado.Equals("Mantenimiento", StringComparison.OrdinalIgnoreCase));

        var totalPrestamos = prestamos.Count;
        var prestamosActivos = prestamos.Count(p => p.FechaDevolucion == null);

        // Agrupación por área de usuario (RF-16)
        var prestamosPorArea = prestamos
            .Where(p => p.Usuario != null && !string.IsNullOrWhiteSpace(p.Usuario.Area))
            .GroupBy(p => p.Usuario!.Area)
            .Select(g => new AreaUsoDto
            {
                Area = g.Key,
                CantidadPrestamos = g.Count()
            })
            .OrderByDescending(a => a.CantidadPrestamos)
            .ToList();

        var areaMayor = prestamosPorArea.FirstOrDefault();

        // Equipos más utilizados (RF-15)
        var equiposMasUsados = prestamos
            .Where(p => p.Equipo != null)
            .GroupBy(p => p.Equipo!)
            .Select(g => new EquipoUsoDto
            {
                EquipoId = g.Key.Id,
                CodigoPatrimonial = g.Key.CodigoPatrimonial,
                Nombre = g.Key.Nombre,
                Categoria = g.Key.Categoria,
                CantidadPrestamos = g.Count()
            })
            .OrderByDescending(e => e.CantidadPrestamos)
            .Take(5)
            .ToList();

        // Equipos por estado (RF-14)
        var equiposPorEstado = equipos
            .GroupBy(e => e.Estado)
            .Select(g => new EstadoConteoDto
            {
                Estado = g.Key,
                Cantidad = g.Count()
            })
            .ToList();

        // Movimientos recientes (RF-17)
        var recientes = prestamos
            .OrderByDescending(p => p.FechaPrestamo)
            .Take(10)
            .Select(p => new PrestamoResponseDto
            {
                Id = p.Id,
                FechaPrestamo = p.FechaPrestamo,
                FechaDevolucion = p.FechaDevolucion,
                Observacion = p.Observacion,
                UsuarioId = p.UsuarioId,
                UsuarioNombreCompleto = p.Usuario != null ? $"{p.Usuario.Nombres} {p.Usuario.Apellidos}".Trim() : "Desconocido",
                UsuarioCorreo = p.Usuario?.Correo ?? string.Empty,
                UsuarioArea = p.Usuario?.Area ?? "Sin Área",
                EquipoId = p.EquipoId,
                EquipoCodigoPatrimonial = p.Equipo?.CodigoPatrimonial ?? string.Empty,
                EquipoNombre = p.Equipo?.Nombre ?? "Desconocido",
                EquipoCategoria = p.Equipo?.Categoria ?? string.Empty
            })
            .ToList();

        return new DashboardStatsDto
        {
            TotalEquipos = totalEquipos,
            EquiposDisponibles = disponibles,
            EquiposPrestados = prestados,
            EquiposEnMantenimiento = mantenimiento,
            TotalPrestamos = totalPrestamos,
            PrestamosActivos = prestamosActivos,
            AreaConMayorUso = areaMayor?.Area ?? "Sin datos",
            AreaMayorUsoCantidad = areaMayor?.CantidadPrestamos ?? 0,
            PrestamosPorArea = prestamosPorArea,
            EquiposMasUtilizados = equiposMasUsados,
            EquiposPorEstado = equiposPorEstado,
            MovimientosRecientes = recientes
        };
    }
}
