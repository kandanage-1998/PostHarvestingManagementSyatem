using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Models;
using Project.PostHarvestManagement.Core.Services;

namespace Project.PostHarvestManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CropRegistrationController : ControllerBase
    {
        private readonly ICropRegistrationService CropRegistrationService;
        public CropRegistrationController(ICropRegistrationService CropRegistrationService)
        {
            this.CropRegistrationService = CropRegistrationService;
        }

        [HttpPost]
        [Route("SaveCropRegistration")]
        public async Task<PostHarvestManagementResponse> SaveCropRegistration(CropRegistrationSaveModel model)
        {
            return await CropRegistrationService.SaveCropRegistration(model);
        }

    }
}
