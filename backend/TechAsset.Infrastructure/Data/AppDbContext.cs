using Microsoft.EntityFrameworkCore;
using TechAsset.Domain.Entities;

namespace TechAsset.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Usuario> Usuarios => Set<Usuario>();
    public DbSet<Equipo> Equipos => Set<Equipo>();
    public DbSet<Prestamo> Prestamos => Set<Prestamo>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Usuario Configuration
        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(u => u.Id);
            entity.Property(u => u.Nombres).HasMaxLength(100).IsRequired();
            entity.Property(u => u.Apellidos).HasMaxLength(100).IsRequired();
            entity.Property(u => u.Correo).HasMaxLength(150).IsRequired();
            entity.Property(u => u.Area).HasMaxLength(100).IsRequired();
            entity.Property(u => u.Estado).HasDefaultValue(true);

            // RN-08: El correo electrónico del usuario debe ser único.
            entity.HasIndex(u => u.Correo).IsUnique();
        });

        // Equipo Configuration
        modelBuilder.Entity<Equipo>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.CodigoPatrimonial).HasMaxLength(50).IsRequired();
            entity.Property(e => e.Nombre).HasMaxLength(100).IsRequired();
            entity.Property(e => e.Categoria).HasMaxLength(50).IsRequired();
            entity.Property(e => e.Marca).HasMaxLength(50).IsRequired();
            entity.Property(e => e.Estado).HasMaxLength(30).HasDefaultValue("Disponible");

            // RN-07: El código patrimonial debe ser único.
            entity.HasIndex(e => e.CodigoPatrimonial).IsUnique();
        });

        // Prestamo Configuration
        modelBuilder.Entity<Prestamo>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.FechaPrestamo).IsRequired();
            entity.Property(p => p.FechaDevolucion);
            entity.Property(p => p.Observacion).HasColumnType("text");

            // Relationships
            entity.HasOne(p => p.Usuario)
                  .WithMany(u => u.Prestamos)
                  .HasForeignKey(p => p.UsuarioId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(p => p.Equipo)
                  .WithMany(e => e.Prestamos)
                  .HasForeignKey(p => p.EquipoId)
                  .OnDelete(DeleteBehavior.Restrict); // RN-06: Restrict delete on equipment with loans
        });
    }
}
