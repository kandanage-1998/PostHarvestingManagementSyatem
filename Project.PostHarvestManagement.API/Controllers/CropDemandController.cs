using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Models;
using Project.PostHarvestManagement.Core.Services;


namespace Project.PostHarvestManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CropDemandController : ControllerBase
    {
        public readonly ICropDemandService CropDemandService;
        public CropDemandController(ICropDemandService CropDemandService)
        {
            this.CropDemandService = CropDemandService;
        }

        [HttpPost]
        [Route("GetCropDemandCollectionPointWise")]
        public async Task<PostHarvestManagementResponse> GetCropDemandCollectionPointWise(CropDemandInputModel CropDemandInputModel)
        {
            return await CropDemandService.GetCropDemandCollectionPointWise(CropDemandInputModel);
        }
    }
}
