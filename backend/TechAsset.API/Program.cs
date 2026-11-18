using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using TechAsset.Application.Interfaces;
using TechAsset.Application.Services;
using TechAsset.Domain.Entities;
using TechAsset.Infrastructure.Data;
using TechAsset.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure PostgreSQL DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Dependency Injection - Clean Architecture
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();

builder.Services.AddScoped<IEquipoRepository, EquipoRepository>();
builder.Services.AddScoped<IEquipoService, EquipoService>();

builder.Services.AddScoped<IPrestamoRepository, PrestamoRepository>();
builder.Services.AddScoped<IPrestamoService, PrestamoService>();

builder.Services.AddScoped<IDashboardService, DashboardService>();

// CORS Policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Ensure Database & Initial Seeding
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.EnsureCreated();

    // Seed initial users if empty
    if (!context.Usuarios.Any())
    {
        var admin = new Usuario
        {
            Id = Guid.NewGuid(),
            Nombres = "Carlos",
            Apellidos = "Mendoza Ramos",
            Correo = "carlos.mendoza@innovatech.com",
            Area = "Tecnología",
            Estado = true
        };

        var user1 = new Usuario
        {
            Id = Guid.NewGuid(),
            Nombres = "Ana María",
            Apellidos = "Pérez Gómez",
            Correo = "ana.perez@innovatech.com",
            Area = "Desarrollo",
            Estado = true
        };

        var user2 = new Usuario
        {
            Id = Guid.NewGuid(),
            Nombres = "Luis Alberto",
            Apellidos = "Castillo Vega",
            Correo = "luis.castillo@innovatech.com",
            Area = "Operaciones",
            Estado = true
        };

        var user3 = new Usuario
        {
            Id = Guid.NewGuid(),
            Nombres = "Valeria",
            Apellidos = "Quispe Flores",
            Correo = "valeria.quispe@innovatech.com",
            Area = "Marketing",
            Estado = true
        };

        context.Usuarios.AddRange(admin, user1, user2, user3);
        context.SaveChanges();
    }

    // Seed initial equipments if empty
    if (!context.Equipos.Any())
    {
        var eq1 = new Equipo
        {
            Id = Guid.NewGuid(),
            CodigoPatrimonial = "EQ-00101",
            Nombre = "Laptop Dell Latitude 5420 Core i7",
            Categoria = "Laptop",
            Marca = "Dell",
            Estado = "Disponible"
        };

        var eq2 = new Equipo
        {
            Id = Guid.NewGuid(),
            CodigoPatrimonial = "EQ-00102",
            Nombre = "MacBook Pro 14 M2 Pro",
            Categoria = "Laptop",
            Marca = "Apple",
            Estado = "Disponible"
        };

        var eq3 = new Equipo
        {
            Id = Guid.NewGuid(),
            CodigoPatrimonial = "EQ-00103",
            Nombre = "Monitor LG UltraWide 29 Pulgadas",
            Categoria = "Monitor",
            Marca = "LG",
            Estado = "Disponible"
        };

        var eq4 = new Equipo
        {
            Id = Guid.NewGuid(),
            CodigoPatrimonial = "EQ-00104",
            Nombre = "Proyector Epson PowerLite E20",
            Categoria = "Proyector multimedia",
            Marca = "Epson",
            Estado = "Mantenimiento"
        };

        var eq5 = new Equipo
        {
            Id = Guid.NewGuid(),
            CodigoPatrimonial = "EQ-00105",
            Nombre = "Switch Cisco Catalyst 24 Puertos",
            Categoria = "Equipos de red",
            Marca = "Cisco",
            Estado = "Disponible"
        };

        context.Equipos.AddRange(eq1, eq2, eq3, eq4, eq5);
        context.SaveChanges();
    }
}

// Configure HTTP request pipeline
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
