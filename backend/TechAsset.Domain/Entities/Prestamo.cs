namespace TechAsset.Domain.Entities;

public class Prestamo
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime FechaPrestamo { get; set; } = DateTime.UtcNow;
    public DateTime? FechaDevolucion { get; set; }
    public string Observacion { get; set; } = string.Empty;

    public Guid UsuarioId { get; set; }
    public Usuario? Usuario { get; set; }

    public Guid EquipoId { get; set; }
    public Equipo? Equipo { get; set; }
}
