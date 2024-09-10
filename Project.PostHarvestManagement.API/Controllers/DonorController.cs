using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Services;
using Project.PostHarvestManagement.Services;

namespace Project.PostHarvestManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorController : ControllerBase
    {
        private readonly IDonorService donorService;
        public DonorController(IDonorService donorService)
        {
            this.donorService = donorService;
        }

        [HttpGet]
        [Route("GetAllDonorLength")]
        public async Task<PostHarvestManagementResponse> GetAllDonorLength()
        {
            return await donorService.GetAllDonorLength();
        }
    }
}
