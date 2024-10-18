using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Services;
using Project.PostHarvestManagement.Services;

namespace Project.PostHarvestManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FarmerController : ControllerBase
    {
        public readonly IFarmerService FarmerService;
        public FarmerController(IFarmerService FarmerService)
        {
            this.FarmerService = FarmerService;
        }

        [HttpGet]
        [Route("GetAllFarmersForTheDropDown")]
        public async Task<PostHarvestManagementResponse> GetAllFarmersForTheDropDown()
        {
            return await FarmerService.GetAllFarmersForTheDropDown();
        }
    }
}
