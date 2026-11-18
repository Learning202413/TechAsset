using TechAsset.Application.DTOs;
using TechAsset.Application.Interfaces;
using TechAsset.Domain.Entities;

namespace TechAsset.Application.Services;

public class UsuarioService : IUsuarioService
{
    private readonly IUsuarioRepository _usuarioRepository;

    public UsuarioService(IUsuarioRepository usuarioRepository)
    {
        _usuarioRepository = usuarioRepository;
    }

    public async Task<IEnumerable<UsuarioResponseDto>> ObtenerTodosAsync()
    {
        var usuarios = await _usuarioRepository.ObtenerTodosAsync();
        return usuarios.Select(u => new UsuarioResponseDto
        {
            Id = u.Id,
            Nombres = u.Nombres,
            Apellidos = u.Apellidos,
            Correo = u.Correo,
            Area = u.Area,
            Estado = u.Estado
        });
    }

    public async Task<UsuarioResponseDto?> ObtenerPorIdAsync(Guid id)
    {
        var u = await _usuarioRepository.ObtenerPorIdAsync(id);
        if (u == null) return null;

        return new UsuarioResponseDto
        {
            Id = u.Id,
            Nombres = u.Nombres,
            Apellidos = u.Apellidos,
            Correo = u.Correo,
            Area = u.Area,
            Estado = u.Estado
        };
    }

    public async Task<UsuarioResponseDto> RegistrarUsuarioAsync(CreateUsuarioDto dto)
    {
        var correoNormalizado = dto.Correo.Trim().ToLowerInvariant();

        // RN-08: El correo electrónico del usuario debe ser único.
        var existente = await _usuarioRepository.ObtenerPorCorreoAsync(correoNormalizado);
        if (existente != null)
        {
            throw new InvalidOperationException($"Ya existe un usuario registrado con el correo '{dto.Correo}'.");
        }

        var usuario = new Usuario
        {
            Id = Guid.NewGuid(),
            Nombres = dto.Nombres.Trim(),
            Apellidos = dto.Apellidos.Trim(),
            Correo = correoNormalizado,
            Area = dto.Area.Trim(),
            Estado = true
        };

        await _usuarioRepository.AgregarAsync(usuario);
        await _usuarioRepository.GuardarCambiosAsync();

        return new UsuarioResponseDto
        {
            Id = usuario.Id,
            Nombres = usuario.Nombres,
            Apellidos = usuario.Apellidos,
            Correo = usuario.Correo,
            Area = usuario.Area,
            Estado = usuario.Estado
        };
    }

    public async Task<UsuarioResponseDto> ActualizarUsuarioAsync(Guid id, UpdateUsuarioDto dto)
    {
        var usuario = await _usuarioRepository.ObtenerPorIdAsync(id);
        if (usuario == null)
        {
            throw new KeyNotFoundException($"No se encontró el usuario con ID '{id}'.");
        }

        var correoNormalizado = dto.Correo.Trim().ToLowerInvariant();
        if (!usuario.Correo.Equals(correoNormalizado, StringComparison.OrdinalIgnoreCase))
        {
            // RN-08: El correo debe ser único
            var existente = await _usuarioRepository.ObtenerPorCorreoAsync(correoNormalizado);
            if (existente != null && existente.Id != id)
            {
                throw new InvalidOperationException($"El correo '{dto.Correo}' ya pertenece a otro usuario.");
            }
        }

        usuario.Nombres = dto.Nombres.Trim();
        usuario.Apellidos = dto.Apellidos.Trim();
        usuario.Correo = correoNormalizado;
        usuario.Area = dto.Area.Trim();
        usuario.Estado = dto.Estado;

        await _usuarioRepository.ActualizarAsync(usuario);
        await _usuarioRepository.GuardarCambiosAsync();

        return new UsuarioResponseDto
        {
            Id = usuario.Id,
            Nombres = usuario.Nombres,
            Apellidos = usuario.Apellidos,
            Correo = usuario.Correo,
            Area = usuario.Area,
            Estado = usuario.Estado
        };
    }

    public async Task<bool> CambiarEstadoUsuarioAsync(Guid id, bool activo)
    {
        // RN-09: Solo el Administrador podrá deshabilitar usuarios.
        var usuario = await _usuarioRepository.ObtenerPorIdAsync(id);
        if (usuario == null)
        {
            throw new KeyNotFoundException($"No se encontró el usuario con ID '{id}'.");
        }

        usuario.Estado = activo;
        await _usuarioRepository.ActualizarAsync(usuario);
        await _usuarioRepository.GuardarCambiosAsync();
        return true;
    }
}
