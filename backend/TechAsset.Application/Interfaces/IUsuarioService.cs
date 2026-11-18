using TechAsset.Application.DTOs;

namespace TechAsset.Application.Interfaces;

public interface IUsuarioService
{
    Task<IEnumerable<UsuarioResponseDto>> ObtenerTodosAsync();
    Task<UsuarioResponseDto?> ObtenerPorIdAsync(Guid id);
    Task<UsuarioResponseDto> RegistrarUsuarioAsync(CreateUsuarioDto dto);
    Task<UsuarioResponseDto> ActualizarUsuarioAsync(Guid id, UpdateUsuarioDto dto);
    Task<bool> CambiarEstadoUsuarioAsync(Guid id, bool activo);
}
