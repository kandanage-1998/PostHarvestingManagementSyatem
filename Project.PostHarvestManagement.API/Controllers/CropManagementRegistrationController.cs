using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Models;
using Project.PostHarvestManagement.Core.Services;

namespace Project.PostHarvestManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CropManagementRegistrationController : ControllerBase
    {
        private readonly ICropManagementRegistrationService CropManagementRegistrationService;
        public CropManagementRegistrationController(ICropManagementRegistrationService CropManagementRegistrationService)
        {
            this.CropManagementRegistrationService = CropManagementRegistrationService;
        }

        [HttpPost]
        [Route("SaveCropManagementRegistration")]
        public async Task<PostHarvestManagementResponse> SaveCropManagementRegistration(CropManagementRegistrationModel model)
        {
            return await CropManagementRegistrationService.SaveCropManagementRegistration(model);
        }
    }
}
