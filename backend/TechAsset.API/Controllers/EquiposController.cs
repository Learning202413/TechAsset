using Microsoft.AspNetCore.Mvc;
using TechAsset.Application.DTOs;
using TechAsset.Application.Interfaces;

namespace TechAsset.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EquiposController : ControllerBase
{
    private readonly IEquipoService _equipoService;

    public EquiposController(IEquipoService equipoService)
    {
        _equipoService = equipoService;
    }

    [HttpGet]
    public async Task<IActionResult> ObtenerTodos([FromQuery] string? estado, [FromQuery] string? categoria, [FromQuery] string? busqueda)
    {
        try
        {
            var equipos = await _equipoService.ObtenerTodosAsync(estado, categoria, busqueda);
            return Ok(new
            {
                success = true,
                data = equipos
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = "Error al consultar equipos.",
                detail = ex.Message
            });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> ObtenerPorId(Guid id)
    {
        try
        {
            var equipo = await _equipoService.ObtenerPorIdAsync(id);
            if (equipo == null)
            {
                return NotFound(new
                {
                    success = false,
                    message = $"Equipo con ID '{id}' no encontrado."
                });
            }

            return Ok(new
            {
                success = true,
                data = equipo
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = "Error al consultar equipo.",
                detail = ex.Message
            });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Registrar([FromBody] CreateEquipoDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new
            {
                success = false,
                message = "Datos de equipo inválidos.",
                errors = ModelState
            });
        }

        try
        {
            var creado = await _equipoService.RegistrarEquipoAsync(dto);
            return Ok(new
            {
                success = true,
                message = "Equipo registrado correctamente.",
                data = creado
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
                message = "Ocurrió un error al registrar equipo.",
                detail = ex.Message
            });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Actualizar(Guid id, [FromBody] UpdateEquipoDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new
            {
                success = false,
                message = "Datos inválidos para actualización de equipo.",
                errors = ModelState
            });
        }

        try
        {
            var actualizado = await _equipoService.ActualizarEquipoAsync(id, dto);
            return Ok(new
            {
                success = true,
                message = "Equipo actualizado correctamente.",
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
                message = "Error interno al actualizar equipo.",
                detail = ex.Message
            });
        }
    }

    [HttpPatch("{id}/estado")]
    public async Task<IActionResult> ActualizarEstado(Guid id, [FromBody] UpdateEstadoEquipoDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new
            {
                success = false,
                message = "Estado inválido.",
                errors = ModelState
            });
        }

        try
        {
            var actualizado = await _equipoService.ActualizarEstadoAsync(id, dto.Estado);
            return Ok(new
            {
                success = true,
                message = "Estado del equipo actualizado correctamente.",
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
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = "Error al actualizar estado del equipo.",
                detail = ex.Message
            });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Eliminar(Guid id)
    {
        try
        {
            await _equipoService.EliminarEquipoAsync(id);
            return Ok(new
            {
                success = true,
                message = "Equipo eliminado correctamente."
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
                message = "Error interno al eliminar equipo.",
                detail = ex.Message
            });
        }
    }
}
