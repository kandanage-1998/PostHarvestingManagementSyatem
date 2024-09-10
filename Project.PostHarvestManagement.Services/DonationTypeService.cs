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
    public class DonationTypeService : IDonationTypeService
    {
        private readonly IPostHarvestManagementUnitOfWork UnitOfWork;
        private readonly IPostHarvestManagementResponse PostHarvestManagementResponse;
        private readonly IConfiguration configuration;

        public DonationTypeService(IPostHarvestManagementUnitOfWork UnitOfWork, IPostHarvestManagementResponse PostHarvestManagementResponse, IConfiguration configuration)
        {
            this.PostHarvestManagementResponse = PostHarvestManagementResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }

        public async Task<PostHarvestManagementResponse> GetAllDonationTypeLength()
        {
            try
            {
                var result = await UnitOfWork.Repository<GetAllDonationTypeLengthModels>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetAllDonationTypeLength]");
                return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<PostHarvestManagementResponse> GetDonationTypesForTheDropDown()
        {
            try
            {
                var result = await UnitOfWork.Repository<GetDonationTypesForDropDownModel>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetDonationTypesForTheDropDown]");
                return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<PostHarvestManagementResponse> GetDonationTypeID(int userID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserID", Tuple.Create(userID.ToString(), DbType.Int32, ParameterDirection.Input) }
                };
                var result = await UnitOfWork.Repository<GetDonationTypeIDModel>().GetEntityBySPAsync("[Administration].[GetDonationTypeIDByUserID]", parameters);
                return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
