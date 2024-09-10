using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Models;
using Project.PostHarvestManagement.Core.Services;

namespace Project.PostHarvestManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MobileController : ControllerBase
    {
        private readonly IMobileService mobileService;
        public MobileController(IMobileService mobileService)
        {
            this.mobileService = mobileService;
        }
        [HttpPost]
        [Route("UpdateVerifyStatus")]
        public async Task<PostHarvestManagementResponse> UpdateVerifyStatus(UpdateVerifyDetailsInputModel model)
        {
            return await mobileService.UpdateVerifyStatus(model);
        }

        [HttpPost]
        [Route("GetUserDetailsForProfile")]
        public async Task<PostHarvestManagementResponse> GetUserDetailsForProfile(UpdateVerifyDetailsInputModel model)
        {
            return await mobileService.GetUserDetailsForProfile(model);
        }
    }
}
