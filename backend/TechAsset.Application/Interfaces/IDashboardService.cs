using TechAsset.Application.DTOs;

namespace TechAsset.Application.Interfaces;

public interface IDashboardService
{
    Task<DashboardStatsDto> ObtenerEstadisticasAsync();
}
