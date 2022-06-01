using API.Extensions;
using API.Settings;
using Application;
using Application.Interfaces;
using Domain;
using Infrastructure.Persistence;
using Infrastructure.Repositories;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddMediatR(typeof(AssemblyMarker));
builder.Services.AddTransient<IRecipeRepository, RecipeRepository>();
builder.Services.AddScoped<IIngredientRepository, IngredientRepository>();
builder.Services.AddScoped<IIngredientQuantityRepository, IngredientQuantityRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

//db confituration
var connectionString = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString)
    );

builder.Services.AddIdentity<User, Role>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

var jwtSettings = builder.Configuration.GetSection("Jwt").Get<JwtSettings>();

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));
builder.Services.AddAuth(jwtSettings);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseDeveloperExceptionPage();
app.UseAuth();
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();

app.MapControllers();

app.Run();
