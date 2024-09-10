using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Services;

namespace Project.PostHarvestManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ITestService testService;

        public TestController(ITestService testService)
        {
            this.testService = testService;
        }
        [HttpGet]
        [Route("GetCustomerGeneralDetailsByCustomerID")]
        public async Task<PostHarvestManagementResponse> GetCustomerGeneralDetailsByCustomerID(int customerID)
        {
            return await testService.GetCustomerGeneralDetailsByCustomerID(customerID);
        }
    }
}
