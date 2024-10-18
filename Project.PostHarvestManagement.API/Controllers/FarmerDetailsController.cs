using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Models;
using Project.PostHarvestManagement.Core.Services;

namespace Project.PostHarvestManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FarmerDetailsController : ControllerBase
    {
        public readonly IFarmerDetailsService FarmerDetailsService;
        public FarmerDetailsController(IFarmerDetailsService FarmerDetailsService)
        {
            this.FarmerDetailsService = FarmerDetailsService;
        }

        [HttpPost]
        [Route("GetFarmerDetailsCollectionPointWise")]
        public async Task<PostHarvestManagementResponse> GetFarmerDetailsCollectionPointWise(FarmerDetailsInputModel FarmerDetailsInputModel)
        {
            return await FarmerDetailsService.GetFarmerDetailsCollectionPointWise(FarmerDetailsInputModel);
        }
    }
}
