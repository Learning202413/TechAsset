namespace TechAsset.Domain.Entities;

public class Usuario
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Nombres { get; set; } = string.Empty;
    public string Apellidos { get; set; } = string.Empty;
    public string Correo { get; set; } = string.Empty;
    public string Area { get; set; } = string.Empty;
    public bool Estado { get; set; } = true;

    // Navigation property
    public ICollection<Prestamo> Prestamos { get; set; } = new List<Prestamo>();
}
