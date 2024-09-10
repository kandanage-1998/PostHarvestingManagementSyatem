using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Models;
using Project.PostHarvestManagement.Core.Services;
using Project.PostHarvestManagement.Services;

namespace Project.PostHarvestManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }
        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<PostHarvestManagementResponse> GetAllUsers()
        {
            return await userService.GetAllUsers();
        }
        [HttpPost]
        [Route("Registration")]
        public async Task<PostHarvestManagementResponse> Registration(UserRegistrationInsertModel model)
        {
            return await userService.Registration(model);
        }
        [HttpPost]
        [Route("Login")]
        public async Task<PostHarvestManagementResponse> Login(UserLoginModel model)
        {
            return await userService.Login(model);
        }

        [HttpGet]
        [Route("GetUserDetailsByUserID")]
        public async Task<PostHarvestManagementResponse> GetUserDetailsByUserID(int UserID)
        {
            return await userService.GetUserDetailsByUserID(UserID);
        }

        [HttpGet]
        [Route("GetUserImageByUserID")]
        public async Task<PostHarvestManagementResponse> GetUserImageByUserID(int UserID)
        {
            return await userService.GetUserImageByUserID(UserID);
        }
    }
}
