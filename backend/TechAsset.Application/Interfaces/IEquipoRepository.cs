using TechAsset.Domain.Entities;

namespace TechAsset.Application.Interfaces;

public interface IEquipoRepository
{
    Task<IEnumerable<Equipo>> ObtenerTodosAsync();
    Task<Equipo?> ObtenerPorIdAsync(Guid id);
    Task<Equipo?> ObtenerPorCodigoPatrimonialAsync(string codigo);
    Task AgregarAsync(Equipo equipo);
    Task ActualizarAsync(Equipo equipo);
    Task EliminarAsync(Equipo equipo);
    Task<bool> TieneHistorialPrestamosAsync(Guid equipoId);
    Task GuardarCambiosAsync();
}
