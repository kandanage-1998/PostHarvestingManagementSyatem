using Project.PostHarvestManagement.Core.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.PostHarvestManagement.Core.Services
{
    public interface IDonationTypeService
    {
        Task<PostHarvestManagementResponse> GetAllDonationTypeLength();
        Task<PostHarvestManagementResponse> GetDonationTypesForTheDropDown();
        Task<PostHarvestManagementResponse> GetDonationTypeID(int userID);
    }
}
