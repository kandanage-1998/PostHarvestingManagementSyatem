using Microsoft.Extensions.Configuration;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core;
using System;
using System.Collections.Generic;
using System.Text;
using Project.PostHarvestManagement.Core.Services;
using Project.PostHarvestManagement.Core.Models;
using System.Threading.Tasks;

namespace Project.PostHarvestManagement.Services
{
    public class DonorService : IDonorService
    {
        private readonly IPostHarvestManagementUnitOfWork UnitOfWork;
        private readonly IPostHarvestManagementResponse PostHarvestManagementResponse;
        private readonly IConfiguration configuration;

        public DonorService(IPostHarvestManagementUnitOfWork UnitOfWork, IPostHarvestManagementResponse PostHarvestManagementResponse, IConfiguration configuration)
        {
            this.PostHarvestManagementResponse = PostHarvestManagementResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<PostHarvestManagementResponse> GetAllDonorLength()
        {
            try
            {
                var result = await UnitOfWork.Repository<GetDonorLengthModel>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetDonorLength]");
                return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
