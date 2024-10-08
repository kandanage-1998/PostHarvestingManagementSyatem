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
using System.Linq;

namespace Project.PostHarvestManagement.Services
{
    public class CropRegistrationService : ICropRegistrationService
    {
        private readonly IPostHarvestManagementUnitOfWork UnitOfWork;
        private readonly IPostHarvestManagementResponse PostHarvestManagementResponse;
        private readonly IConfiguration configuration;

        public CropRegistrationService(IPostHarvestManagementUnitOfWork UnitOfWork, IPostHarvestManagementResponse PostHarvestManagementResponse, IConfiguration configuration)
        {
            this.PostHarvestManagementResponse = PostHarvestManagementResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }

        public async Task<PostHarvestManagementResponse> SaveCropRegistration(CropRegistrationSaveModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "CropTypeID", Tuple.Create(0.ToString(), DbType.Int32, ParameterDirection.InputOutput) },
                    { "CollectionPointID", Tuple.Create(model.CollectionPointID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "CropTypeName", Tuple.Create(model.CropTypeName.ToString(), DbType.String, ParameterDirection.Input) },
                    { "CropCategory", Tuple.Create(model.CropCategory.ToString(), DbType.String, ParameterDirection.Input) },
                    { "HarvestedLocation", Tuple.Create(model.HarvestedLocation.ToString(), DbType.String, ParameterDirection.Input) },
                    { "CropPrice", Tuple.Create(model.CropPrice.ToString(), DbType.Decimal, ParameterDirection.Input) },
                    { "RegisterNumber", Tuple.Create(model.RegisterNumber.ToString(), DbType.String, ParameterDirection.Input) },
                    { "RegisterDate", Tuple.Create(model.RegisterDate.ToString(), DbType.DateTime, ParameterDirection.Input) },
                };

                var result = await UnitOfWork.Repository<CropRegistrationSaveModel>().ExecuteSPWithInputOutputAsync("[Administration].[SaveCropRegistrationDetails]", parameters);
                if (result > 0)
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
