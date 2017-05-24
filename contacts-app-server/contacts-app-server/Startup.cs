using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
//Cors, see https://docs.microsoft.com/en-us/aspnet/core/security/cors
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using contacts_app_server.Interfaces;
using contacts_app_server.Services;
using contacts_app_server.Data;
using contacts_app_server.Middleware;
using contacts_app_server.Models;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace contacts_app_server
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        //Authentication middleware
        private static readonly string secretKey = "!!!supersecretkey!!!";
        //End authentication middleware

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.

            //Contacts
            services.AddDbContext<ContactsContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DatabaseConnection")));

            //Identity
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DatabaseConnection")));

            // Cors, see https://docs.microsoft.com/en-us/aspnet/core/security/cors
            // Add Cors and create Policy with options
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            //Identity
            services.AddIdentity<ApplicationUser, IdentityRole> (options =>
            {
                // configure identity options
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 6;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();
            //end Identity

            //MVC
            services.AddMvc();

            //Add app services

            //Contacts repository
            //services.AddSingleton<IContactsRepository, ContactsService>();
            services.AddScoped<IContactsRepository, ContactsService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, ContactsContext context)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            //Cors
            app.UseCors("CorsPolicy");

            //Authentication middleware
            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));

            //Token provider
            var options = new TokenProviderOptions
            {
                Audience = "Test",
                Issuer = "Test",
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256),
            };

            app.UseMiddleware<TokenProviderMiddleware>(Options.Create(options));
            //End token provider

            //Token validation
            var tokenValidationParameters = new TokenValidationParameters
            {
                // The signing key must match!
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,

                // Validate the JWT Issuer (iss) claim
                ValidateIssuer = true,
                ValidIssuer = "Test",

                // Validate the JWT Audience (aud) claim
                ValidateAudience = true,
                ValidAudience = "Test",

                // Validate the token expiry
                ValidateLifetime = true,

                // If you want to allow a certain amount of clock drift, set that here:
                ClockSkew = TimeSpan.Zero
            };

            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                TokenValidationParameters = tokenValidationParameters
            });
            //End token validation

            //End authentication middleware

            //Identity
            app.UseIdentity();
            //End Identity

            app.UseMvc();

            DbInitializer.Initialize(context);
        }
    }
}
