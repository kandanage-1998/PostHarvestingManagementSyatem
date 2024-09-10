using Microsoft.Extensions.Configuration;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Models;
using Project.PostHarvestManagement.Core;
using Project.PostHarvestManagement.Core.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace Project.PostHarvestManagement.Services
{
    public class SeekerService : ISeekerService
    {
        private readonly IPostHarvestManagementUnitOfWork UnitOfWork;
        private readonly IPostHarvestManagementResponse PostHarvestManagementResponse;
        private readonly IConfiguration configuration;

        public SeekerService(IPostHarvestManagementUnitOfWork UnitOfWork, IPostHarvestManagementResponse PostHarvestManagementResponse, IConfiguration configuration)
        {
            this.PostHarvestManagementResponse = PostHarvestManagementResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<PostHarvestManagementResponse> GetAllSeekerLength()
        {
            try
            {
                var result = await UnitOfWork.Repository<GetSeekerLengthModel>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetAllSeekerLength]");
                return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<PostHarvestManagementResponse> GetCurrentSeekerID(int UserID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserID", Tuple.Create(UserID.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<SeekerIDModel>().GetEntityBySPAsync("[Administration].[GetCurrentSeekerID]", parameters);
                return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, result);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
