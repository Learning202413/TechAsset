using TechAsset.Domain.Entities;

namespace TechAsset.Application.Interfaces;

public interface IUsuarioRepository
{
    Task<IEnumerable<Usuario>> ObtenerTodosAsync();
    Task<Usuario?> ObtenerPorIdAsync(Guid id);
    Task<Usuario?> ObtenerPorCorreoAsync(string correo);
    Task AgregarAsync(Usuario usuario);
    Task ActualizarAsync(Usuario usuario);
    Task GuardarCambiosAsync();
}
