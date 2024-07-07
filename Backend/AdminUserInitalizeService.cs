using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using QuizzSystem.Models;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace QuizzSystem
{
    public class AdminUserInitalizeService : IHostedService
    {
        private readonly IServiceProvider _provider;

        public AdminUserInitalizeService(IServiceProvider provider)
        {
            _provider = provider;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _provider.CreateScope();
            using var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();

            var isUserExisted = await userManager.FindByNameAsync("admin");
            if (isUserExisted == null)
            {
                var result = await userManager.CreateAsync(new AppUser
                {
                    UserName = "admin",
                    Email = "admin@gmail.com"
                }, "Admin@2024");
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
