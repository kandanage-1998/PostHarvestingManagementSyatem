using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Services;
using Project.PostHarvestManagement.Services;

namespace Project.PostHarvestManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CropController : ControllerBase
    {
        public readonly ICropService CropService;
        public CropController(ICropService CropService)
        {
            this.CropService = CropService;
        }

        [HttpGet]
        [Route("GetAllCropsForTheDropDown")]
        public async Task<PostHarvestManagementResponse> GetAllCropsForTheDropDown()
        {
            return await CropService.GetAllCropsForTheDropDown();
        }
    }
}
