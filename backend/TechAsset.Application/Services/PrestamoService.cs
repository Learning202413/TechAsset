using TechAsset.Application.DTOs;
using TechAsset.Application.Interfaces;
using TechAsset.Domain.Entities;

namespace TechAsset.Application.Services;

public class PrestamoService : IPrestamoService
{
    private readonly IPrestamoRepository _prestamoRepository;
    private readonly IEquipoRepository _equipoRepository;
    private readonly IUsuarioRepository _usuarioRepository;

    public PrestamoService(
        IPrestamoRepository prestamoRepository,
        IEquipoRepository equipoRepository,
        IUsuarioRepository usuarioRepository)
    {
        _prestamoRepository = prestamoRepository;
        _equipoRepository = equipoRepository;
        _usuarioRepository = usuarioRepository;
    }

    public async Task<IEnumerable<PrestamoResponseDto>> ObtenerTodosAsync(bool soloActivos = false, string? busqueda = null)
    {
        var prestamos = soloActivos 
            ? await _prestamoRepository.ObtenerActivosAsync()
            : await _prestamoRepository.ObtenerTodosAsync();

        if (!string.IsNullOrWhiteSpace(busqueda))
        {
            var q = busqueda.Trim().ToLowerInvariant();
            prestamos = prestamos.Where(p =>
                (p.Equipo != null && (p.Equipo.Nombre.ToLowerInvariant().Contains(q) || p.Equipo.CodigoPatrimonial.ToLowerInvariant().Contains(q))) ||
                (p.Usuario != null && (p.Usuario.Nombres.ToLowerInvariant().Contains(q) || p.Usuario.Apellidos.ToLowerInvariant().Contains(q) || p.Usuario.Area.ToLowerInvariant().Contains(q))));
        }

        return prestamos.Select(p => MapToResponseDto(p));
    }

    public async Task<PrestamoResponseDto?> ObtenerPorIdAsync(Guid id)
    {
        var p = await _prestamoRepository.ObtenerPorIdAsync(id);
        if (p == null) return null;
        return MapToResponseDto(p);
    }

    public async Task<PrestamoResponseDto> RegistrarPrestamoAsync(CreatePrestamoDto dto)
    {
        // RN-05: Todo préstamo debe registrar un responsable.
        if (dto.UsuarioId == Guid.Empty)
        {
            throw new ArgumentException("Debe seleccionar un usuario responsable del préstamo (RN-05).");
        }

        var usuario = await _usuarioRepository.ObtenerPorIdAsync(dto.UsuarioId);
        if (usuario == null)
        {
            throw new KeyNotFoundException($"El usuario con ID '{dto.UsuarioId}' no existe.");
        }
        if (!usuario.Estado)
        {
            throw new InvalidOperationException($"El usuario '{usuario.Nombres} {usuario.Apellidos}' está deshabilitado y no puede recibir préstamos.");
        }

        if (dto.EquipoId == Guid.Empty)
        {
            throw new ArgumentException("Debe seleccionar un equipo para el préstamo.");
        }

        var equipo = await _equipoRepository.ObtenerPorIdAsync(dto.EquipoId);
        if (equipo == null)
        {
            throw new KeyNotFoundException($"El equipo con ID '{dto.EquipoId}' no existe.");
        }

        // RN-02: No se puede prestar un equipo en estado “Mantenimiento”.
        if (equipo.Estado.Equals("Mantenimiento", StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidOperationException("No se puede prestar un equipo en estado 'Mantenimiento' (RN-02).");
        }

        // RN-03: No se puede prestar un equipo en estado “Baja”.
        if (equipo.Estado.Equals("Baja", StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidOperationException("No se puede prestar un equipo en estado 'Baja' (RN-03).");
        }

        // RN-01: Un equipo solo puede estar asociado a un préstamo activo.
        var prestamoActivo = await _prestamoRepository.ObtenerPrestamoActivoPorEquipoIdAsync(dto.EquipoId);
        if (prestamoActivo != null || equipo.Estado.Equals("Prestado", StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidOperationException("El equipo ya cuenta con un préstamo activo vigente (RN-01).");
        }

        var prestamo = new Prestamo
        {
            Id = Guid.NewGuid(),
            FechaPrestamo = DateTime.UtcNow,
            FechaDevolucion = null,
            Observacion = string.IsNullOrWhiteSpace(dto.Observacion) ? "Préstamo registrado exitosamente" : dto.Observacion.Trim(),
            UsuarioId = usuario.Id,
            EquipoId = equipo.Id,
            Usuario = usuario,
            Equipo = equipo
        };

        // Cambiar estado del equipo a "Prestado"
        equipo.Estado = "Prestado";
        await _equipoRepository.ActualizarAsync(equipo);

        await _prestamoRepository.AgregarAsync(prestamo);
        await _prestamoRepository.GuardarCambiosAsync();

        return MapToResponseDto(prestamo);
    }

    public async Task<PrestamoResponseDto> RegistrarDevolucionAsync(Guid id, DevolucionPrestamoDto dto)
    {
        var prestamo = await _prestamoRepository.ObtenerPorIdAsync(id);
        if (prestamo == null)
        {
            throw new KeyNotFoundException($"No se encontró el préstamo con ID '{id}'.");
        }

        if (prestamo.FechaDevolucion != null)
        {
            throw new InvalidOperationException("Este préstamo ya fue devuelto previamente.");
        }

        // RN-10: Toda devolución deberá registrar observaciones.
        if (string.IsNullOrWhiteSpace(dto.Observacion))
        {
            throw new ArgumentException("Toda devolución deberá registrar observaciones detalladas sobre el estado del equipo (RN-10).");
        }

        var ahora = DateTime.UtcNow;
        // RN-04: La fecha de devolución debe ser posterior a la fecha de préstamo.
        if (ahora < prestamo.FechaPrestamo)
        {
            ahora = prestamo.FechaPrestamo.AddMinutes(1);
        }

        prestamo.FechaDevolucion = ahora;
        prestamo.Observacion = string.IsNullOrWhiteSpace(prestamo.Observacion) 
            ? $"[Devolución]: {dto.Observacion.Trim()}"
            : $"{prestamo.Observacion} | [Devolución]: {dto.Observacion.Trim()}";

        // Devolver equipo a estado "Disponible"
        var equipo = await _equipoRepository.ObtenerPorIdAsync(prestamo.EquipoId);
        if (equipo != null)
        {
            equipo.Estado = "Disponible";
            await _equipoRepository.ActualizarAsync(equipo);
        }

        await _prestamoRepository.ActualizarAsync(prestamo);
        await _prestamoRepository.GuardarCambiosAsync();

        return MapToResponseDto(prestamo);
    }

    private static PrestamoResponseDto MapToResponseDto(Prestamo p)
    {
        return new PrestamoResponseDto
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
            EquipoNombre = p.Equipo?.Nombre ?? "Equipo Desconocido",
            EquipoCategoria = p.Equipo?.Categoria ?? string.Empty
        };
    }
}
