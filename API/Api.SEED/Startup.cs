using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.AppDbContext;
using VIT.UserManagement.Models.Auth;
using VIT.UserManagement;
using DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity;
using VIT.UserManagement.Interfaces;
using BLL.Repository.DefaultRepo;
using BLL.ValidationService;
using BLL.ValidationService.StudentValidation;
using BLL.ParsingService;
using BLL.Repository;
using AutoMapper;
using BLL.Mapper;

namespace Api.DefaultAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            //Here is where you set your ConnectionString to use the certain one from appsettings.json
            services.AddDbContext<DefaultAPIDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            var settings = this.Configuration.GetSection("JwtSettings").Get<JwtSettingsModel>();
            //services.AddTransient<IUsersRepository<User>, UsersRepository>();
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MapperProfile());
            });
            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);
            services.AddTransient<IStudentValidationService, StudentValidationService>();
            services.AddTransient<IStudentService, StudentService>();
            services.AddTransient<IBaseRepository<Student, DefaultAPIDbContext>, BaseRepository<Student, DefaultAPIDbContext>>();


            services.AddUserManagement<User, DefaultAPIDbContext>(settings, new IdentityOptions
            {
                Password = new PasswordOptions
                {
                    RequireDigit = false,
                    RequiredLength = 6,
                    RequireNonAlphanumeric = false,
                    RequireLowercase = false,
                    RequireUppercase = false
                }
            });
            services.Configure<DataProtectionTokenProviderOptions>(opt => opt.TokenLifespan = TimeSpan.FromHours(2));

            services.AddCors();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api.DefaultAPI", Version = "v1" });
            });
            services.AddSwaggerGenNewtonsoftSupport();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Api.DefaultAPI v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();
            app.UseCors(x => x
              .AllowAnyMethod()
              .AllowAnyHeader()
              .SetIsOriginAllowed(origin => true) // allow any origin  
              .AllowCredentials()); // allow credentials 

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
