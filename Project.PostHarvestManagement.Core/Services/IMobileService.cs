using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.PostHarvestManagement.Core.Services
{
    public interface IMobileService
    {
        Task<PostHarvestManagementResponse> UpdateVerifyStatus(UpdateVerifyDetailsInputModel model);
        Task<PostHarvestManagementResponse> GetUserDetailsForProfile(UpdateVerifyDetailsInputModel model);
    }
}
