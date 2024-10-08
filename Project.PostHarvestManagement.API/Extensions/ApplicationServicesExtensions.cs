﻿using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Services;
using Project.PostHarvestManagement.Services;

namespace Project.PostHarvestManagement.API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddTransient<IPostHarvestManagementResponse, PostHarvestManagementResponse>();
            services.AddTransient<ITestService, TestService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IDonationTypeService, DonationTypeService>();
            services.AddTransient<IDonorService, DonorService>();
            services.AddTransient<ISeekerService, SeekerService>();
            services.AddTransient<IMobileService, MobileService>();
            services.AddTransient<IDonationRequestService, DonationRequestService>();

            return services;
        }
    }
}
