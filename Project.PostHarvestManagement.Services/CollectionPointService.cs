using Microsoft.Extensions.Configuration;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core;
using Project.PostHarvestManagement.Core.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Project.PostHarvestManagement.Core.Models;
using System.Threading.Tasks;
using System.Data;

namespace Project.PostHarvestManagement.Services
{
    public class CollectionPointService : ICollectionPointService
    {
        private readonly IPostHarvestManagementUnitOfWork UnitOfWork;
        private readonly IPostHarvestManagementResponse PostHarvestManagementResponse;
        private readonly IConfiguration configuration;

        public CollectionPointService(IPostHarvestManagementUnitOfWork UnitOfWork, IPostHarvestManagementResponse PostHarvestManagementResponse, IConfiguration configuration)
        {
            this.PostHarvestManagementResponse = PostHarvestManagementResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<PostHarvestManagementResponse> GetCollectionPointsForTheDropDown()
        {
            try
            {
                var result = await UnitOfWork.Repository<GetCollectionPointsForDropDownModel>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetCollectionPointsForTheDropDown]");
                return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

    }
}
