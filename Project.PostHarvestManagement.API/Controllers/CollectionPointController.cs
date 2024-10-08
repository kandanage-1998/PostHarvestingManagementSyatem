using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Services;
using Project.PostHarvestManagement.Services;

namespace Project.PostHarvestManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionPointController : ControllerBase
    {
        public readonly ICollectionPointService CollectionPointService;
        public CollectionPointController(ICollectionPointService CollectionPointService)
        {
            this.CollectionPointService = CollectionPointService;
        }

        [HttpGet]
        [Route("GetCollectionPointsForTheDropDown")]
        public async Task<PostHarvestManagementResponse> GetCollectionPointsForTheDropDown()
        {
            return await CollectionPointService.GetCollectionPointsForTheDropDown();
        }
    }
}
