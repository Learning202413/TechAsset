using TechAsset.Application.DTOs;

namespace TechAsset.Application.Interfaces;

public interface IPrestamoService
{
    Task<IEnumerable<PrestamoResponseDto>> ObtenerTodosAsync(bool soloActivos = false, string? busqueda = null);
    Task<PrestamoResponseDto?> ObtenerPorIdAsync(Guid id);
    Task<PrestamoResponseDto> RegistrarPrestamoAsync(CreatePrestamoDto dto);
    Task<PrestamoResponseDto> RegistrarDevolucionAsync(Guid id, DevolucionPrestamoDto dto);
}
