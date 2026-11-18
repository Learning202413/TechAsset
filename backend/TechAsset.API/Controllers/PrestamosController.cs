using Microsoft.AspNetCore.Mvc;
using TechAsset.Application.DTOs;
using TechAsset.Application.Interfaces;

namespace TechAsset.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PrestamosController : ControllerBase
{
    private readonly IPrestamoService _prestamoService;

    public PrestamosController(IPrestamoService prestamoService)
    {
        _prestamoService = prestamoService;
    }

    [HttpGet]
    public async Task<IActionResult> ObtenerTodos([FromQuery] bool soloActivos = false, [FromQuery] string? busqueda = null)
    {
        try
        {
            var prestamos = await _prestamoService.ObtenerTodosAsync(soloActivos, busqueda);
            return Ok(new
            {
                success = true,
                data = prestamos
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = "Error al consultar préstamos.",
                detail = ex.Message
            });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> ObtenerPorId(Guid id)
    {
        try
        {
            var prestamo = await _prestamoService.ObtenerPorIdAsync(id);
            if (prestamo == null)
            {
                return NotFound(new
                {
                    success = false,
                    message = $"Préstamo con ID '{id}' no encontrado."
                });
            }

            return Ok(new
            {
                success = true,
                data = prestamo
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = "Error al consultar préstamo.",
                detail = ex.Message
            });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Registrar([FromBody] CreatePrestamoDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new
            {
                success = false,
                message = "Datos de préstamo inválidos.",
                errors = ModelState
            });
        }

        try
        {
            var creado = await _prestamoService.RegistrarPrestamoAsync(dto);
            return Ok(new
            {
                success = true,
                message = "Préstamo registrado correctamente.",
                data = creado
            });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new
            {
                success = false,
                message = ex.Message
            });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new
            {
                success = false,
                message = ex.Message
            });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new
            {
                success = false,
                message = ex.Message
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = "Ocurrió un error al registrar préstamo.",
                detail = ex.Message
            });
        }
    }

    [HttpPost("{id}/devolucion")]
    public async Task<IActionResult> RegistrarDevolucion(Guid id, [FromBody] DevolucionPrestamoDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new
            {
                success = false,
                message = "Datos inválidos para devolución.",
                errors = ModelState
            });
        }

        try
        {
            var actualizado = await _prestamoService.RegistrarDevolucionAsync(id, dto);
            return Ok(new
            {
                success = true,
                message = "Devolución registrada correctamente.",
                data = actualizado
            });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new
            {
                success = false,
                message = ex.Message
            });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new
            {
                success = false,
                message = ex.Message
            });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new
            {
                success = false,
                message = ex.Message
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = "Error al procesar devolución.",
                detail = ex.Message
            });
        }
    }
}
