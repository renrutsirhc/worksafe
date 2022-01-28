using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Google.Cloud.Firestore;
using WorkSafe_BE.DataAccess;

namespace WorkSafe_BE
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
            .ConfigureServices(services =>
                services.AddSingleton(new FirestoreService()
                )
            )
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
    }
}



