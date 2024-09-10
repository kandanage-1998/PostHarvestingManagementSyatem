using Microsoft.Extensions.Configuration;
using Project.PostHarvestManagement.Core;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Project.PostHarvestManagement.Services
{
    public class TestService : ITestService
    {
        private readonly IPostHarvestManagementUnitOfWork UnitOfWork;
        private readonly IPostHarvestManagementResponse PostHarvestManagementResponse;
        private readonly IConfiguration configuration;

        public TestService(IPostHarvestManagementUnitOfWork UnitOfWork, IPostHarvestManagementResponse PostHarvestManagementResponse, IConfiguration configuration)
        {
            this.PostHarvestManagementResponse = PostHarvestManagementResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<PostHarvestManagementResponse> GetCustomerGeneralDetailsByCustomerID(int customerID)
        {
            try
            {
                Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "CustomerID", Tuple.Create(customerID.ToString(), DbType.Int32, ParameterDirection.Input) },
                };
                var result = (await UnitOfWork.Repository<TestModel>().GetEntitiesBySPAsync("[cms].[GetCustomerDetailsByCustomerID]", parameters));
                return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            
        }
    }
}
