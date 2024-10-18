using System.Text;
using Project.PostHarvestManagement.Core.Models;
using System.Threading.Tasks;
using System.Data;
using Project.PostHarvestManagement.Core.Services;
using Microsoft.Extensions.Configuration;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core;
using System;

namespace Project.PostHarvestManagement.Services
{
    public class FarmerService : IFarmerService
    {
        private readonly IPostHarvestManagementUnitOfWork UnitOfWork;
        private readonly IPostHarvestManagementResponse PostHarvestManagementResponse;
        private readonly IConfiguration configuration;

        public FarmerService(IPostHarvestManagementUnitOfWork UnitOfWork, IPostHarvestManagementResponse PostHarvestManagementResponse, IConfiguration configuration)
        {
            this.PostHarvestManagementResponse = PostHarvestManagementResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<PostHarvestManagementResponse> GetAllFarmersForTheDropDown()
        {
            try
            {
                var result = await UnitOfWork.Repository<GetFarmersForDropdownsModel>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetAllFarmersForTheDropDown]");
                return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
               

        }
    }
}
