using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Models;
using Project.PostHarvestManagement.Core.Services;

namespace Project.PostHarvestManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FarmerRegistrationController : ControllerBase
    {
        private readonly IFarmerRegistrationService FarmerRegistrationService;
        public FarmerRegistrationController(IFarmerRegistrationService FarmerRegistrationService)
        {
            this.FarmerRegistrationService = FarmerRegistrationService;
        }

        [HttpPost]
        [Route("SaveFarmerRegistration")]
        public async Task<PostHarvestManagementResponse> SaveFarmerRegistration(FarmerRegistrationSaveModel model)
        {
            return await FarmerRegistrationService.SaveFarmerRegistration(model);
        }
    }
}
