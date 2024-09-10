using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.PostHarvestManagement.Core.Services
{
    public interface IUserService
    {
        Task<PostHarvestManagementResponse> GetAllUsers();
        Task<PostHarvestManagementResponse> Login(UserLoginModel model);
        Task<PostHarvestManagementResponse> Registration(UserRegistrationInsertModel model);
        Task<PostHarvestManagementResponse> GetUserDetailsByUserID(int UserID);
        Task<PostHarvestManagementResponse> GetUserImageByUserID(int UserID);
        Task<PostHarvestManagementResponse> GetLastQRCodeNumber();
    }
}
