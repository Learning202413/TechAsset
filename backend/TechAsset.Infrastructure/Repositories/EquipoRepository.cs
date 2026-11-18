using Microsoft.EntityFrameworkCore;
using TechAsset.Application.Interfaces;
using TechAsset.Domain.Entities;
using TechAsset.Infrastructure.Data;

namespace TechAsset.Infrastructure.Repositories;

public class EquipoRepository : IEquipoRepository
{
    private readonly AppDbContext _context;

    public EquipoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Equipo>> ObtenerTodosAsync()
    {
        return await _context.Equipos
            .Include(e => e.Prestamos)
            .OrderBy(e => e.Nombre)
            .ToListAsync();
    }

    public async Task<Equipo?> ObtenerPorIdAsync(Guid id)
    {
        return await _context.Equipos
            .Include(e => e.Prestamos)
            .FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<Equipo?> ObtenerPorCodigoPatrimonialAsync(string codigo)
    {
        return await _context.Equipos
            .Include(e => e.Prestamos)
            .FirstOrDefaultAsync(e => e.CodigoPatrimonial.ToLower() == codigo.ToLower());
    }

    public async Task AgregarAsync(Equipo equipo)
    {
        await _context.Equipos.AddAsync(equipo);
    }

    public Task ActualizarAsync(Equipo equipo)
    {
        _context.Equipos.Update(equipo);
        return Task.CompletedTask;
    }

    public Task EliminarAsync(Equipo equipo)
    {
        _context.Equipos.Remove(equipo);
        return Task.CompletedTask;
    }

    public async Task<bool> TieneHistorialPrestamosAsync(Guid equipoId)
    {
        return await _context.Prestamos.AnyAsync(p => p.EquipoId == equipoId);
    }

    public async Task GuardarCambiosAsync()
    {
        await _context.SaveChangesAsync();
    }
}
