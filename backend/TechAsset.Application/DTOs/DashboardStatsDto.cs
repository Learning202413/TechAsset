namespace TechAsset.Application.DTOs;

public class AreaUsoDto
{
    public string Area { get; set; } = string.Empty;
    public int CantidadPrestamos { get; set; }
}

public class EquipoUsoDto
{
    public Guid EquipoId { get; set; }
    public string CodigoPatrimonial { get; set; } = string.Empty;
    public string Nombre { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
    public int CantidadPrestamos { get; set; }
}

public class EstadoConteoDto
{
    public string Estado { get; set; } = string.Empty;
    public int Cantidad { get; set; }
}

public class DashboardStatsDto
{
    public int TotalEquipos { get; set; }
    public int EquiposDisponibles { get; set; }
    public int EquiposPrestados { get; set; }
    public int EquiposEnMantenimiento { get; set; }
    public int TotalPrestamos { get; set; }
    public int PrestamosActivos { get; set; }
    public string AreaConMayorUso { get; set; } = "Sin datos";
    public int AreaMayorUsoCantidad { get; set; }

    public List<AreaUsoDto> PrestamosPorArea { get; set; } = new();
    public List<EquipoUsoDto> EquiposMasUtilizados { get; set; } = new();
    public List<EstadoConteoDto> EquiposPorEstado { get; set; } = new();
    public List<PrestamoResponseDto> MovimientosRecientes { get; set; } = new();
}
