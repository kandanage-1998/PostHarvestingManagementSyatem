using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Models;
using Project.PostHarvestManagement.Core.Services;

namespace Project.PostHarvestManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationRequestController : ControllerBase
    {
        private readonly IDonationRequestService donationRequestService;
        public DonationRequestController(IDonationRequestService donationRequestService)
        {
            this.donationRequestService = donationRequestService;
        }

        [HttpPost]
        [Route("SaveDonationRequest")]
        public async Task<PostHarvestManagementResponse> SaveDonationRequest(DonationRequestSaveModel model)
        {
            return await donationRequestService.SaveDonationRequest(model);
        }


        [HttpGet]
        [Route("DonationRequestDetailsGet")]
        public async Task<PostHarvestManagementResponse> DonationRequestDetailsGet(int DonationTypeID)
        {
            return await donationRequestService.DonationRequestDetailsGet(DonationTypeID);
        }

    }
}
