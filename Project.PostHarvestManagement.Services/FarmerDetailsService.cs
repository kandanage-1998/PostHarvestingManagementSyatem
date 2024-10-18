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
using System.Linq;
using System.Reflection;

namespace Project.PostHarvestManagement.Services
{
    public class FarmerDetailsService : IFarmerDetailsService
    {
        private readonly IPostHarvestManagementUnitOfWork UnitOfWork;
        private readonly IPostHarvestManagementResponse PostHarvestManagementResponse;
        private readonly IConfiguration configuration;

        public FarmerDetailsService(IPostHarvestManagementUnitOfWork UnitOfWork, IPostHarvestManagementResponse PostHarvestManagementResponse, IConfiguration configuration)
        {
            this.PostHarvestManagementResponse = PostHarvestManagementResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<PostHarvestManagementResponse> GetFarmerDetailsCollectionPointWise(FarmerDetailsInputModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "CollectionPointID", Tuple.Create(model.CollectionPointID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "FarmerID", Tuple.Create(model.FarmerID == 0 ? null : model.FarmerID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "StartDate", Tuple.Create(model.StartDate.ToString(), DbType.DateTime, ParameterDirection.Input) },
                    { "EndDate", Tuple.Create(model.EndDate.ToString(), DbType.DateTime, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<FarmerDetailsOutputModel>().GetEntitiesBySPAsync("[Administration].[GetFarmerDetailsCollectionPointWise]", parameters);
                if (result.Count() > 0)
                {
                    return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), "Get Farmer Details Sucessfully", result);
                }
                else
                {
                    return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Error.ToString(), "Get Farmer Details Failed", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

    }
}

