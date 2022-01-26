var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var AllowPorts = "_allowPorts";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowPorts,
        builder =>
        {
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
}

//app.UseHttpsRedirection();

app.UseCors(AllowPorts);

app.UseAuthorization();

app.MapControllers();

app.Run();
