using System.ComponentModel.DataAnnotations;

namespace TechAsset.Application.DTOs;

public class CreateEquipoDto
{
    [Required(ErrorMessage = "El código patrimonial es obligatorio.")]
    [MinLength(3, ErrorMessage = "El código patrimonial debe tener al menos 3 caracteres.")]
    [MaxLength(50, ErrorMessage = "El código patrimonial no puede superar los 50 caracteres.")]
    public string CodigoPatrimonial { get; set; } = string.Empty;

    [Required(ErrorMessage = "El nombre del equipo es obligatorio.")]
    [MinLength(3, ErrorMessage = "El nombre debe tener al menos 3 caracteres.")]
    [MaxLength(100, ErrorMessage = "El nombre no puede superar los 100 caracteres.")]
    public string Nombre { get; set; } = string.Empty;

    [Required(ErrorMessage = "La categoría es obligatoria.")]
    [MaxLength(50, ErrorMessage = "La categoría no puede superar los 50 caracteres.")]
    public string Categoria { get; set; } = string.Empty;

    [Required(ErrorMessage = "La marca es obligatoria.")]
    [MaxLength(50, ErrorMessage = "La marca no puede superar los 50 caracteres.")]
    public string Marca { get; set; } = string.Empty;

    public string Estado { get; set; } = "Disponible"; // Disponible, Prestado, Mantenimiento, Baja
}

public class UpdateEquipoDto
{
    [Required(ErrorMessage = "El código patrimonial es obligatorio.")]
    [MaxLength(50, ErrorMessage = "El código patrimonial no puede superar los 50 caracteres.")]
    public string CodigoPatrimonial { get; set; } = string.Empty;

    [Required(ErrorMessage = "El nombre del equipo es obligatorio.")]
    [MaxLength(100, ErrorMessage = "El nombre no puede superar los 100 caracteres.")]
    public string Nombre { get; set; } = string.Empty;

    [Required(ErrorMessage = "La categoría es obligatoria.")]
    [MaxLength(50, ErrorMessage = "La categoría no puede superar los 50 caracteres.")]
    public string Categoria { get; set; } = string.Empty;

    [Required(ErrorMessage = "La marca es obligatoria.")]
    [MaxLength(50, ErrorMessage = "La marca no puede superar los 50 caracteres.")]
    public string Marca { get; set; } = string.Empty;

    [Required(ErrorMessage = "El estado es obligatorio.")]
    [MaxLength(30, ErrorMessage = "El estado no puede superar los 30 caracteres.")]
    public string Estado { get; set; } = "Disponible";
}

public class UpdateEstadoEquipoDto
{
    [Required(ErrorMessage = "El estado es obligatorio.")]
    [MaxLength(30, ErrorMessage = "El estado no puede superar los 30 caracteres.")]
    public string Estado { get; set; } = string.Empty;
}

public class EquipoResponseDto
{
    public Guid Id { get; set; }
    public string CodigoPatrimonial { get; set; } = string.Empty;
    public string Nombre { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
    public string Marca { get; set; } = string.Empty;
    public string Estado { get; set; } = string.Empty;
    public int TotalPrestamos { get; set; }
}
