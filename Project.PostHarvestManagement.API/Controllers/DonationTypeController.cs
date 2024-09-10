using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Services;
using Project.PostHarvestManagement.Services;

namespace Project.PostHarvestManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationTypeController : ControllerBase
    {
        public readonly IDonationTypeService donationTypeService;
        public DonationTypeController(IDonationTypeService donationTypeService)
        {
            this.donationTypeService = donationTypeService;
        }
        [HttpGet]
        [Route("GetAllDonationTypeLength")]
        public async Task<PostHarvestManagementResponse> GetAllDonationTypeLength()
        {
            return await donationTypeService.GetAllDonationTypeLength();
        }

        [HttpGet]
        [Route("GetDonationTypesForTheDropDown")]
        public async Task<PostHarvestManagementResponse> GetDonationTypesForTheDropDown()
        {
            return await donationTypeService.GetDonationTypesForTheDropDown();
        }

        [HttpGet]
        [Route("GetDonationTypeID")]
        public async Task<PostHarvestManagementResponse> GetDonationTypeID(int userID)
        {
            return await donationTypeService.GetDonationTypeID(userID);
        }
    }
}
