using Project.PostHarvestManagement.Core.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace Project.PostHarvestManagement.Core.Services
{
    public interface IFarmerService
    {
        Task<PostHarvestManagementResponse> GetAllFarmersForTheDropDown();
    }
}
