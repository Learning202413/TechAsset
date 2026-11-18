using System.ComponentModel.DataAnnotations;

namespace TechAsset.Application.DTOs;

public class CreateUsuarioDto
{
    [Required(ErrorMessage = "Los nombres son obligatorios.")]
    [MinLength(2, ErrorMessage = "Los nombres deben tener al menos 2 caracteres.")]
    [MaxLength(100, ErrorMessage = "Los nombres no pueden superar los 100 caracteres.")]
    public string Nombres { get; set; } = string.Empty;

    [Required(ErrorMessage = "Los apellidos son obligatorios.")]
    [MinLength(2, ErrorMessage = "Los apellidos deben tener al menos 2 caracteres.")]
    [MaxLength(100, ErrorMessage = "Los apellidos no pueden superar los 100 caracteres.")]
    public string Apellidos { get; set; } = string.Empty;

    [Required(ErrorMessage = "El correo electrónico es obligatorio.")]
    [EmailAddress(ErrorMessage = "El formato de correo no es válido.")]
    [MaxLength(150, ErrorMessage = "El correo no puede superar los 150 caracteres.")]
    public string Correo { get; set; } = string.Empty;

    [Required(ErrorMessage = "El área es obligatoria.")]
    [MaxLength(100, ErrorMessage = "El área no puede superar los 100 caracteres.")]
    public string Area { get; set; } = string.Empty;
}

public class UpdateUsuarioDto
{
    [Required(ErrorMessage = "Los nombres son obligatorios.")]
    [MinLength(2, ErrorMessage = "Los nombres deben tener al menos 2 caracteres.")]
    [MaxLength(100, ErrorMessage = "Los nombres no pueden superar los 100 caracteres.")]
    public string Nombres { get; set; } = string.Empty;

    [Required(ErrorMessage = "Los apellidos son obligatorios.")]
    [MinLength(2, ErrorMessage = "Los apellidos deben tener al menos 2 caracteres.")]
    [MaxLength(100, ErrorMessage = "Los apellidos no pueden superar los 100 caracteres.")]
    public string Apellidos { get; set; } = string.Empty;

    [Required(ErrorMessage = "El correo electrónico es obligatorio.")]
    [EmailAddress(ErrorMessage = "El formato de correo no es válido.")]
    [MaxLength(150, ErrorMessage = "El correo no puede superar los 150 caracteres.")]
    public string Correo { get; set; } = string.Empty;

    [Required(ErrorMessage = "El área es obligatoria.")]
    [MaxLength(100, ErrorMessage = "El área no puede superar los 100 caracteres.")]
    public string Area { get; set; } = string.Empty;

    public bool Estado { get; set; } = true;
}

public class UsuarioResponseDto
{
    public Guid Id { get; set; }
    public string Nombres { get; set; } = string.Empty;
    public string Apellidos { get; set; } = string.Empty;
    public string Correo { get; set; } = string.Empty;
    public string Area { get; set; } = string.Empty;
    public bool Estado { get; set; }
}
