using Microsoft.Extensions.Configuration;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core;
using Project.PostHarvestManagement.Core.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Project.PostHarvestManagement.Core.Models;
using System.Data;
using System.Threading.Tasks;

namespace Project.PostHarvestManagement.Services
{
    public class MobileService : IMobileService
    {
        private readonly IPostHarvestManagementUnitOfWork UnitOfWork;
        private readonly IPostHarvestManagementResponse PostHarvestManagementResponse;
        private readonly IConfiguration configuration;

        public MobileService(IPostHarvestManagementUnitOfWork UnitOfWork, IPostHarvestManagementResponse PostHarvestManagementResponse, IConfiguration configuration)
        {
            this.PostHarvestManagementResponse = PostHarvestManagementResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<PostHarvestManagementResponse> UpdateVerifyStatus(UpdateVerifyDetailsInputModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserID", Tuple.Create(model.UserID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "UserType", Tuple.Create(model.UserType.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "QrCode", Tuple.Create(model.QrCode.ToString(), DbType.String, ParameterDirection.Input) },
                    { "VerifyStatus", Tuple.Create(2.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "Result", Tuple.Create("-1".ToString(), DbType.Int32, ParameterDirection.Output) }
                };

                var result = await UnitOfWork.Repository<UpdateVerifyDetailsInputModel>().ExecuteSPWithInputOutputAsync("[Administration].[UpdateVerifyStatus]", parameters);
                if (result > 0)
                {
                    return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), "User Verified Successfully", result);
                }
                else
                {
                    return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Error.ToString(), "User Verification Failed", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<PostHarvestManagementResponse> GetUserDetailsForProfile(UpdateVerifyDetailsInputModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserID", Tuple.Create(model.UserID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "UserType", Tuple.Create(model.UserType.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<GetUserDetailsForProfileModel>().GetEntityBySPAsync("[Administration].[GetUserDetailsForProfile]", parameters);
                if (result != null)
                {
                    return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), "User Retrieved Successfully", result);
                }
                else
                {
                    return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Error.ToString(), "No Records to display", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
