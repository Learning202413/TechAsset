using Microsoft.EntityFrameworkCore;
using TechAsset.Application.Interfaces;
using TechAsset.Domain.Entities;
using TechAsset.Infrastructure.Data;

namespace TechAsset.Infrastructure.Repositories;

public class PrestamoRepository : IPrestamoRepository
{
    private readonly AppDbContext _context;

    public PrestamoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Prestamo>> ObtenerTodosAsync()
    {
        return await _context.Prestamos
            .Include(p => p.Usuario)
            .Include(p => p.Equipo)
            .OrderByDescending(p => p.FechaPrestamo)
            .ToListAsync();
    }

    public async Task<IEnumerable<Prestamo>> ObtenerActivosAsync()
    {
        return await _context.Prestamos
            .Include(p => p.Usuario)
            .Include(p => p.Equipo)
            .Where(p => p.FechaDevolucion == null)
            .OrderByDescending(p => p.FechaPrestamo)
            .ToListAsync();
    }

    public async Task<Prestamo?> ObtenerPorIdAsync(Guid id)
    {
        return await _context.Prestamos
            .Include(p => p.Usuario)
            .Include(p => p.Equipo)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Prestamo?> ObtenerPrestamoActivoPorEquipoIdAsync(Guid equipoId)
    {
        return await _context.Prestamos
            .Include(p => p.Usuario)
            .Include(p => p.Equipo)
            .FirstOrDefaultAsync(p => p.EquipoId == equipoId && p.FechaDevolucion == null);
    }

    public async Task AgregarAsync(Prestamo prestamo)
    {
        await _context.Prestamos.AddAsync(prestamo);
    }

    public Task ActualizarAsync(Prestamo prestamo)
    {
        _context.Prestamos.Update(prestamo);
        return Task.CompletedTask;
    }

    public async Task GuardarCambiosAsync()
    {
        await _context.SaveChangesAsync();
    }
}
