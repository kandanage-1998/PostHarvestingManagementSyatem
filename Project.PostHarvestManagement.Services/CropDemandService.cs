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
    public class CropDemandService : ICropDemandService
    {
        private readonly IPostHarvestManagementUnitOfWork UnitOfWork;
        private readonly IPostHarvestManagementResponse PostHarvestManagementResponse;
        private readonly IConfiguration configuration;

        public CropDemandService(IPostHarvestManagementUnitOfWork UnitOfWork, IPostHarvestManagementResponse PostHarvestManagementResponse, IConfiguration configuration)
        {
            this.PostHarvestManagementResponse = PostHarvestManagementResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<PostHarvestManagementResponse> GetCropDemandCollectionPointWise(CropDemandInputModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "CollectionPointID", Tuple.Create(model.CollectionPointID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "CropTypeID", Tuple.Create(model.CropTypeID == 0 ? null : model.CropTypeID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "StartDate", Tuple.Create(model.StartDate.ToString(), DbType.DateTime, ParameterDirection.Input) },
                    { "EndDate", Tuple.Create(model.EndDate.ToString(), DbType.DateTime, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<CropDemandOutputModel>().GetEntitiesBySPAsync("[Administration].[GetCropDemandCollectionPointWise]", parameters);
                if (result.Count() > 0)
                {
                    return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), "Crop Regitrated Sucessfully", result);
                }
                else
                {
                    return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Error.ToString(), "Crop Registrated Failed", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

    }
}
