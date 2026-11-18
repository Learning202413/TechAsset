using Microsoft.AspNetCore.Mvc;
using TechAsset.Application.DTOs;
using TechAsset.Application.Interfaces;

namespace TechAsset.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuariosController : ControllerBase
{
    private readonly IUsuarioService _usuarioService;

    public UsuariosController(IUsuarioService usuarioService)
    {
        _usuarioService = usuarioService;
    }

    [HttpGet]
    public async Task<IActionResult> ObtenerTodos()
    {
        try
        {
            var usuarios = await _usuarioService.ObtenerTodosAsync();
            return Ok(new
            {
                success = true,
                data = usuarios
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = "Error al consultar usuarios.",
                detail = ex.Message
            });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> ObtenerPorId(Guid id)
    {
        try
        {
            var usuario = await _usuarioService.ObtenerPorIdAsync(id);
            if (usuario == null)
            {
                return NotFound(new
                {
                    success = false,
                    message = $"Usuario con ID '{id}' no encontrado."
                });
            }

            return Ok(new
            {
                success = true,
                data = usuario
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = "Error al consultar usuario.",
                detail = ex.Message
            });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Registrar([FromBody] CreateUsuarioDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new
            {
                success = false,
                message = "Datos de usuario inválidos.",
                errors = ModelState
            });
        }

        try
        {
            var creado = await _usuarioService.RegistrarUsuarioAsync(dto);
            return Ok(new
            {
                success = true,
                message = "Usuario registrado correctamente.",
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
                message = "Ocurrió un error interno al registrar usuario.",
                detail = ex.Message
            });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Actualizar(Guid id, [FromBody] UpdateUsuarioDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new
            {
                success = false,
                message = "Datos inválidos para actualización.",
                errors = ModelState
            });
        }

        try
        {
            var actualizado = await _usuarioService.ActualizarUsuarioAsync(id, dto);
            return Ok(new
            {
                success = true,
                message = "Usuario actualizado correctamente.",
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
                message = "Ocurrió un error al actualizar usuario.",
                detail = ex.Message
            });
        }
    }

    [HttpPatch("{id}/estado")]
    public async Task<IActionResult> CambiarEstado(Guid id, [FromBody] bool activo)
    {
        try
        {
            await _usuarioService.CambiarEstadoUsuarioAsync(id, activo);
            return Ok(new
            {
                success = true,
                message = activo ? "Usuario habilitado correctamente." : "Usuario deshabilitado correctamente."
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
                message = "Error al modificar estado de usuario.",
                detail = ex.Message
            });
        }
    }
}
