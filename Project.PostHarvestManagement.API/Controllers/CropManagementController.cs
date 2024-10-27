using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Models;
using Project.PostHarvestManagement.Core.Services;

namespace Project.PostHarvestManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CropManagementController : ControllerBase
    {
        public readonly ICropManagementService CropManagementService;
        public CropManagementController(ICropManagementService CropManagementService)
        {
            this.CropManagementService = CropManagementService;
        }

        [HttpPost]
        [Route("GetCropManagementCollectionPointWise")]
        public async Task<PostHarvestManagementResponse> GetCropManagementCollectionPointWise(CropDemandInputModel CropDemandInputModel)
        {
            return await CropManagementService.GetCropManagementCollectionPointWise(CropDemandInputModel); 
        }
    }
}
