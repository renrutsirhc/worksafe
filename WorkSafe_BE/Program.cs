using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Google.Cloud.Firestore;

namespace WorkSafe_BE
{
    public class Program
    {
        public static void Main(string[] args)
        {
<<<<<<< HEAD
            builder.WithOrigins("https://localhost:7001", "http://localhost:7000",
                "https://localhost:3000", "http://localhost:3000");
        });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
||||||| 874ee4d
            builder.WithOrigins("https://localhost:7001", "http://localhost:7000",
                "https://localhost:3000");
        });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
=======
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
>>>>>>> main
}



