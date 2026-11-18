using Microsoft.AspNetCore.Mvc;
using TechAsset.Application.Interfaces;

namespace TechAsset.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet]
    public async Task<IActionResult> ObtenerEstadisticas()
    {
        try
        {
            var stats = await _dashboardService.ObtenerEstadisticasAsync();
            return Ok(new
            {
                success = true,
                data = stats
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = "Error al obtener estadísticas del dashboard.",
                detail = ex.Message
            });
        }
    }
}
