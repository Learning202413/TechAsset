using TechAsset.Domain.Entities;

namespace TechAsset.Application.Interfaces;

public interface IPrestamoRepository
{
    Task<IEnumerable<Prestamo>> ObtenerTodosAsync();
    Task<IEnumerable<Prestamo>> ObtenerActivosAsync();
    Task<Prestamo?> ObtenerPorIdAsync(Guid id);
    Task<Prestamo?> ObtenerPrestamoActivoPorEquipoIdAsync(Guid equipoId);
    Task AgregarAsync(Prestamo prestamo);
    Task ActualizarAsync(Prestamo prestamo);
    Task GuardarCambiosAsync();
}
