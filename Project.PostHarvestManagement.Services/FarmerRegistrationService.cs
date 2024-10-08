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
    public class FarmerRegistrationService : IFarmerRegistrationService
    {
        private readonly IPostHarvestManagementUnitOfWork UnitOfWork;
        private readonly IPostHarvestManagementResponse PostHarvestManagementResponse;
        private readonly IConfiguration configuration;

        public FarmerRegistrationService(IPostHarvestManagementUnitOfWork UnitOfWork, IPostHarvestManagementResponse PostHarvestManagementResponse, IConfiguration configuration)
        {
            this.PostHarvestManagementResponse = PostHarvestManagementResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }

        public async Task<PostHarvestManagementResponse> SaveFarmerRegistration(FarmerRegistrationSaveModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "FarmerID", Tuple.Create(0.ToString(), DbType.Int32, ParameterDirection.InputOutput) },
                    { "FarmerName", Tuple.Create(model.FarmerName.ToString(), DbType.String, ParameterDirection.Input) },
                    { "Nic", Tuple.Create(model.Nic.ToString(), DbType.String, ParameterDirection.Input) },
                    { "TpNumber", Tuple.Create(model.TpNumber.ToString(), DbType.String, ParameterDirection.Input) },
                    { "District", Tuple.Create(model.District.ToString(), DbType.String, ParameterDirection.Input) },
                    { "FieldType", Tuple.Create(model.FieldType.ToString(), DbType.String, ParameterDirection.Input) },
                    { "LandExtent", Tuple.Create(model.LandExtent.ToString(), DbType.String, ParameterDirection.Input) },
                    { "FarmingPractice", Tuple.Create(model.FarmingPractice.ToString(), DbType.String, ParameterDirection.Input) },
                    { "TechnologiesUsed", Tuple.Create(model.TechnologiesUsed.ToString(), DbType.String, ParameterDirection.Input) },
                    { "IrrigationMethod", Tuple.Create(model.IrrigationMethod.ToString(), DbType.String, ParameterDirection.Input) },
                    { "WaterSource", Tuple.Create(model.WaterSource.ToString(), DbType.String, ParameterDirection.Input) },
                    { "CollectionPointID", Tuple.Create(model.CollectionPointID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "CropTypeName", Tuple.Create(model.CropTypeName.ToString(), DbType.String, ParameterDirection.Input) },
                    { "TransportType", Tuple.Create(model.TransportType.ToString(), DbType.String, ParameterDirection.Input) },
                    { "CropCategory", Tuple.Create(model.CropCategory.ToString(), DbType.String, ParameterDirection.Input) },
                    { "HarvestedLocation", Tuple.Create(model.HarvestedLocation.ToString(), DbType.String, ParameterDirection.Input) },
                    { "CropPrice", Tuple.Create(model.CropPrice.ToString(), DbType.Decimal, ParameterDirection.Input) },
                    { "RegisterNumber", Tuple.Create(model.RegisterNumber.ToString(), DbType.String, ParameterDirection.Input) },
                    { "RegisterDate", Tuple.Create(model.RegisterDate.ToString(), DbType.DateTime, ParameterDirection.Input) },
                };

                var result = await UnitOfWork.Repository<FarmerRegistrationSaveModel>().ExecuteSPWithInputOutputAsync("[Administration].[SaveFarmerRegistrationDetails]", parameters);
                if (result > 0)
                {
                    return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), "Farmer Regitrated Sucessfully", result);
                }
                else
                {
                    return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Error.ToString(), "Farmer Registrated Failed", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
