using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace MinutoSeguros.API
{
    public class Startup
    {

        public Startup(IConfiguration configuration) { Configuration = configuration; }

        public IConfiguration Configuration { get; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            var conn = Configuration["ConnectionStrings:MinutoSegurosDatabase"];
            services.AddDbContext<APIContext>(o => o.UseSqlServer(conn));

            services.AddCors();

            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(o => {
                    o.SerializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.None;
                    o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });
        }
        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseCors(
                options => options.WithOrigins("http://localhost:3000").AllowAnyMethod()
            );

            app.UseMvc();
        }

    }
}
