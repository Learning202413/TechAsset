using Microsoft.EntityFrameworkCore;
using TechAsset.Application.Interfaces;
using TechAsset.Domain.Entities;
using TechAsset.Infrastructure.Data;

namespace TechAsset.Infrastructure.Repositories;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly AppDbContext _context;

    public UsuarioRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Usuario>> ObtenerTodosAsync()
    {
        return await _context.Usuarios
            .OrderBy(u => u.Apellidos)
            .ThenBy(u => u.Nombres)
            .ToListAsync();
    }

    public async Task<Usuario?> ObtenerPorIdAsync(Guid id)
    {
        return await _context.Usuarios.FindAsync(id);
    }

    public async Task<Usuario?> ObtenerPorCorreoAsync(string correo)
    {
        return await _context.Usuarios
            .FirstOrDefaultAsync(u => u.Correo.ToLower() == correo.ToLower());
    }

    public async Task AgregarAsync(Usuario usuario)
    {
        await _context.Usuarios.AddAsync(usuario);
    }

    public Task ActualizarAsync(Usuario usuario)
    {
        _context.Usuarios.Update(usuario);
        return Task.CompletedTask;
    }

    public async Task GuardarCambiosAsync()
    {
        await _context.SaveChangesAsync();
    }
}
