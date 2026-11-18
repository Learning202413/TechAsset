using System.ComponentModel.DataAnnotations;

namespace TechAsset.Application.DTOs;

public class CreatePrestamoDto
{
    [Required(ErrorMessage = "El usuario responsable es obligatorio.")]
    public Guid UsuarioId { get; set; }

    [Required(ErrorMessage = "El equipo a prestar es obligatorio.")]
    public Guid EquipoId { get; set; }

    [MaxLength(500, ErrorMessage = "La observación inicial no puede superar los 500 caracteres.")]
    public string Observacion { get; set; } = string.Empty;
}

public class DevolucionPrestamoDto
{
    [Required(ErrorMessage = "Las observaciones de devolución son obligatorias.")]
    [MinLength(5, ErrorMessage = "Las observaciones deben detallar el estado en que se entrega el equipo (mínimo 5 caracteres).")]
    [MaxLength(500, ErrorMessage = "Las observaciones no pueden superar los 500 caracteres.")]
    public string Observacion { get; set; } = string.Empty;
}

public class PrestamoResponseDto
{
    public Guid Id { get; set; }
    public DateTime FechaPrestamo { get; set; }
    public DateTime? FechaDevolucion { get; set; }
    public string Observacion { get; set; } = string.Empty;

    public Guid UsuarioId { get; set; }
    public string UsuarioNombreCompleto { get; set; } = string.Empty;
    public string UsuarioCorreo { get; set; } = string.Empty;
    public string UsuarioArea { get; set; } = string.Empty;

    public Guid EquipoId { get; set; }
    public string EquipoCodigoPatrimonial { get; set; } = string.Empty;
    public string EquipoNombre { get; set; } = string.Empty;
    public string EquipoCategoria { get; set; } = string.Empty;

    public bool EsActivo => FechaDevolucion == null;
}
