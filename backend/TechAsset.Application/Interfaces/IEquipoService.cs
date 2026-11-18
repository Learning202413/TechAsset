using TechAsset.Application.DTOs;

namespace TechAsset.Application.Interfaces;

public interface IEquipoService
{
    Task<IEnumerable<EquipoResponseDto>> ObtenerTodosAsync(string? estado = null, string? categoria = null, string? busqueda = null);
    Task<EquipoResponseDto?> ObtenerPorIdAsync(Guid id);
    Task<EquipoResponseDto> RegistrarEquipoAsync(CreateEquipoDto dto);
    Task<EquipoResponseDto> ActualizarEquipoAsync(Guid id, UpdateEquipoDto dto);
    Task<EquipoResponseDto> ActualizarEstadoAsync(Guid id, string nuevoEstado);
    Task EliminarEquipoAsync(Guid id);
}
