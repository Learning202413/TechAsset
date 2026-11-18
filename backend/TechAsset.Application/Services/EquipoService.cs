using TechAsset.Application.DTOs;
using TechAsset.Application.Interfaces;
using TechAsset.Domain.Entities;

namespace TechAsset.Application.Services;

public class EquipoService : IEquipoService
{
    private readonly IEquipoRepository _equipoRepository;

    public EquipoService(IEquipoRepository equipoRepository)
    {
        _equipoRepository = equipoRepository;
    }

    public async Task<IEnumerable<EquipoResponseDto>> ObtenerTodosAsync(string? estado = null, string? categoria = null, string? busqueda = null)
    {
        var equipos = await _equipoRepository.ObtenerTodosAsync();

        if (!string.IsNullOrWhiteSpace(estado) && !estado.Equals("Todos", StringComparison.OrdinalIgnoreCase))
        {
            equipos = equipos.Where(e => e.Estado.Equals(estado, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(categoria) && !categoria.Equals("Todas", StringComparison.OrdinalIgnoreCase))
        {
            equipos = equipos.Where(e => e.Categoria.Equals(categoria, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(busqueda))
        {
            var q = busqueda.Trim().ToLowerInvariant();
            equipos = equipos.Where(e =>
                e.Nombre.ToLowerInvariant().Contains(q) ||
                e.CodigoPatrimonial.ToLowerInvariant().Contains(q) ||
                e.Marca.ToLowerInvariant().Contains(q));
        }

        return equipos.Select(e => new EquipoResponseDto
        {
            Id = e.Id,
            CodigoPatrimonial = e.CodigoPatrimonial,
            Nombre = e.Nombre,
            Categoria = e.Categoria,
            Marca = e.Marca,
            Estado = e.Estado,
            TotalPrestamos = e.Prestamos?.Count ?? 0
        });
    }

    public async Task<EquipoResponseDto?> ObtenerPorIdAsync(Guid id)
    {
        var e = await _equipoRepository.ObtenerPorIdAsync(id);
        if (e == null) return null;

        return new EquipoResponseDto
        {
            Id = e.Id,
            CodigoPatrimonial = e.CodigoPatrimonial,
            Nombre = e.Nombre,
            Categoria = e.Categoria,
            Marca = e.Marca,
            Estado = e.Estado,
            TotalPrestamos = e.Prestamos?.Count ?? 0
        };
    }

    public async Task<EquipoResponseDto> RegistrarEquipoAsync(CreateEquipoDto dto)
    {
        var codigo = dto.CodigoPatrimonial.Trim().ToUpperInvariant();

        // RN-07: El código patrimonial debe ser único.
        var existente = await _equipoRepository.ObtenerPorCodigoPatrimonialAsync(codigo);
        if (existente != null)
        {
            throw new InvalidOperationException($"Ya existe un equipo con el código patrimonial '{dto.CodigoPatrimonial}'.");
        }

        var equipo = new Equipo
        {
            Id = Guid.NewGuid(),
            CodigoPatrimonial = codigo,
            Nombre = dto.Nombre.Trim(),
            Categoria = dto.Categoria.Trim(),
            Marca = dto.Marca.Trim(),
            Estado = string.IsNullOrWhiteSpace(dto.Estado) ? "Disponible" : dto.Estado.Trim()
        };

        await _equipoRepository.AgregarAsync(equipo);
        await _equipoRepository.GuardarCambiosAsync();

        return new EquipoResponseDto
        {
            Id = equipo.Id,
            CodigoPatrimonial = equipo.CodigoPatrimonial,
            Nombre = equipo.Nombre,
            Categoria = equipo.Categoria,
            Marca = equipo.Marca,
            Estado = equipo.Estado,
            TotalPrestamos = 0
        };
    }

    public async Task<EquipoResponseDto> ActualizarEquipoAsync(Guid id, UpdateEquipoDto dto)
    {
        var equipo = await _equipoRepository.ObtenerPorIdAsync(id);
        if (equipo == null)
        {
            throw new KeyNotFoundException($"No se encontró el equipo con ID '{id}'.");
        }

        var codigo = dto.CodigoPatrimonial.Trim().ToUpperInvariant();
        if (!equipo.CodigoPatrimonial.Equals(codigo, StringComparison.OrdinalIgnoreCase))
        {
            // RN-07: El código patrimonial debe ser único.
            var existente = await _equipoRepository.ObtenerPorCodigoPatrimonialAsync(codigo);
            if (existente != null && existente.Id != id)
            {
                throw new InvalidOperationException($"El código patrimonial '{dto.CodigoPatrimonial}' ya pertenece a otro equipo.");
            }
        }

        equipo.CodigoPatrimonial = codigo;
        equipo.Nombre = dto.Nombre.Trim();
        equipo.Categoria = dto.Categoria.Trim();
        equipo.Marca = dto.Marca.Trim();
        equipo.Estado = dto.Estado.Trim();

        await _equipoRepository.ActualizarAsync(equipo);
        await _equipoRepository.GuardarCambiosAsync();

        return new EquipoResponseDto
        {
            Id = equipo.Id,
            CodigoPatrimonial = equipo.CodigoPatrimonial,
            Nombre = equipo.Nombre,
            Categoria = equipo.Categoria,
            Marca = equipo.Marca,
            Estado = equipo.Estado,
            TotalPrestamos = equipo.Prestamos?.Count ?? 0
        };
    }

    public async Task<EquipoResponseDto> ActualizarEstadoAsync(Guid id, string nuevoEstado)
    {
        var equipo = await _equipoRepository.ObtenerPorIdAsync(id);
        if (equipo == null)
        {
            throw new KeyNotFoundException($"No se encontró el equipo con ID '{id}'.");
        }

        equipo.Estado = nuevoEstado.Trim();
        await _equipoRepository.ActualizarAsync(equipo);
        await _equipoRepository.GuardarCambiosAsync();

        return new EquipoResponseDto
        {
            Id = equipo.Id,
            CodigoPatrimonial = equipo.CodigoPatrimonial,
            Nombre = equipo.Nombre,
            Categoria = equipo.Categoria,
            Marca = equipo.Marca,
            Estado = equipo.Estado,
            TotalPrestamos = equipo.Prestamos?.Count ?? 0
        };
    }

    public async Task EliminarEquipoAsync(Guid id)
    {
        var equipo = await _equipoRepository.ObtenerPorIdAsync(id);
        if (equipo == null)
        {
            throw new KeyNotFoundException($"No se encontró el equipo con ID '{id}'.");
        }

        // RN-06: No se puede eliminar un equipo con historial de préstamos.
        var tieneHistorial = await _equipoRepository.TieneHistorialPrestamosAsync(id);
        if (tieneHistorial)
        {
            throw new InvalidOperationException("No se puede eliminar un equipo que tiene historial de préstamos asociados (RN-06). Considere darlo de baja.");
        }

        await _equipoRepository.EliminarAsync(equipo);
        await _equipoRepository.GuardarCambiosAsync();
    }
}
