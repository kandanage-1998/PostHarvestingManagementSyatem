using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Services;
using Project.PostHarvestManagement.Services;

namespace Project.PostHarvestManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeekerController : ControllerBase
    {
        private readonly ISeekerService seekerService;
        public SeekerController(ISeekerService seekerService)
        {
            this.seekerService = seekerService;
        }
        [HttpGet]
        [Route("GetAllSeekerLength")]
        public async Task<PostHarvestManagementResponse> GetAllSeekerLength()
        {
            return await seekerService.GetAllSeekerLength();
        }

        [HttpGet]
        [Route("GetCurrentSeekerID")]
        public async Task<PostHarvestManagementResponse> GetCurrentSeekerID(int UserID)
        {
            return await seekerService.GetCurrentSeekerID(UserID);
        }
    }
}
