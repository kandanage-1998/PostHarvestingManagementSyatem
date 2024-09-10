﻿using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core;
using Project.PostHarvestManagement.Core.Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Project.PostHarvestManagement.Core.Models;
using System.Linq;
using Project.PostHarvestManagement.Dapper;
using System.IO;
using Dapper;
using static Dapper.SqlMapper;

namespace Project.PostHarvestManagement.Services
{
    public class UserService : IUserService
    {
        private readonly IPostHarvestManagementUnitOfWork UnitOfWork;
        private readonly IPostHarvestManagementResponse PostHarvestManagementResponse;
        private readonly IConfiguration configuration;

        public UserService(IPostHarvestManagementUnitOfWork UnitOfWork, IPostHarvestManagementResponse PostHarvestManagementResponse, IConfiguration configuration)
        {
            this.PostHarvestManagementResponse = PostHarvestManagementResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<PostHarvestManagementResponse> GetAllUsers()
        {
            try
            {
                var result = await UnitOfWork.Repository<UserGetModel>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetAllUsers]");
                return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<PostHarvestManagementResponse> Login(UserLoginModel model)
        {
            try
            {
                var encryptedPassword = PasswordEncrypt(model.Password);
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserName", Tuple.Create(model.Username.ToString(), DbType.String, ParameterDirection.Input) },
                    { "Password", Tuple.Create(encryptedPassword.ToString(), DbType.String, ParameterDirection.Input) },
                };

                var result = (await UnitOfWork.Repository<UserReturnModel>().GetEntitiesBySPAsync("[Administration].[UserLogin]", parameters)).ToList();
                if (result.Count() > 0)
                {
                    return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, result);
                }
                else
                {
                    return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Error.ToString(), string.Empty, result);
                }
                
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<PostHarvestManagementResponse> Registration(UserRegistrationInsertModel model)
        {
            var lastrecordValue = await GetLastQRCodeNumber();
            var lastNumber = (int)lastrecordValue.Data;
            int incrementedNum;
            if (lastNumber != 0)
            {
                incrementedNum = lastNumber + 1;
            }
            else
            {
                incrementedNum = 01000000;
            }
            var passwordEncrypted = PasswordEncrypt(model.Password);
            if(model.UserTypeID == 1)
            {
                try
                {
                    var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                    {
                        { "UserID", Tuple.Create(0.ToString(), DbType.Int32, ParameterDirection.InputOutput) },
                        { "UserName", Tuple.Create(model.FirstName.ToString(), DbType.String, ParameterDirection.Input) },
                        { "UserType", Tuple.Create(model.UserTypeID.ToString(), DbType.Int32, ParameterDirection.Input) },
                        { "Email", Tuple.Create(model.Email == "" ? null : model.Email.ToString(), DbType.String, ParameterDirection.Input) },
                        { "Password", Tuple.Create(passwordEncrypted.ToString(), DbType.String, ParameterDirection.Input) },
                        { "ContactNumber", Tuple.Create(model.ContactNumber.ToString(), DbType.String, ParameterDirection.Input) },
                        { "QRTagNumber", Tuple.Create(incrementedNum.ToString(), DbType.String, ParameterDirection.Input) },
                        { "VerifyStatus", Tuple.Create(2.ToString(), DbType.Int32, ParameterDirection.Input) },
                    };

                    var result = await UnitOfWork.Repository<UserRegistrationInsertModel>().ExecuteSPWithInputOutputAsync("[Administration].[DonorTypeUserDetailsSave]", parameters);
                    if (result > 0)
                    {
                        return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, result);
                    }
                    else
                    {
                        return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Error.ToString(), string.Empty, result);
                    }
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
            else if (model.UserTypeID == 2)
            {
                var configath = configuration.GetSection("UserImagePath:Path").Value;
                var directoryPath = configuration.GetSection("UserImagePath:Directry").Value;
                var baseLink = configuration.GetSection("UserImagePath:FileLinkBase").Value;
                int DonorID = await UnitOfWork.Repository<UserRegistrationInsertModel>().SaveDonor(model, configath, directoryPath, baseLink, passwordEncrypted, incrementedNum);
                if (DonorID > 0)
                {
                    return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, DonorID);
                }
                else
                {
                    return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Error.ToString(), string.Empty, DonorID);
                }
            }
            else
            {
                var configath = configuration.GetSection("UserImagePath:Path").Value;
                var directoryPath = configuration.GetSection("UserImagePath:Directry").Value;
                var baseLink = configuration.GetSection("UserImagePath:FileLinkBase").Value;
                int SeekerID = await UnitOfWork.Repository<UserRegistrationInsertModel>().SaveSeeker(model, configath, directoryPath, baseLink, passwordEncrypted, incrementedNum);
                if (SeekerID > 0)
                {
                    return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, SeekerID);
                }
                else
                {
                    return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Error.ToString(), string.Empty, SeekerID);
                }
            }
        }

        public async Task<PostHarvestManagementResponse> GetUserDetailsByUserID(int UserID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserID", Tuple.Create(UserID.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<UserGetModel>().GetEntityBySPAsync("[Administration].[GetUserDetailsByUserID]", parameters);
                return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, result);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        public string PasswordEncrypt(string Password) 
        {
            string Key = "adef@@kfxcbv@";

            if (string.IsNullOrEmpty(Password)) return "";
            Password += Key;

            var passwordBytes = Encoding.UTF8.GetBytes(Password);
            return Convert.ToBase64String(passwordBytes);
        }
        public string PasswordDecrypt(string Password)
        {
            string Key = "adef@@kfxcbv@";

            if (string.IsNullOrEmpty(Password)) return "";
            var base64EncodeBytes = Convert.FromBase64String(Password);
            var result = Encoding.UTF8.GetString(base64EncodeBytes);
            result = result.Substring(0, result.Length - Key.Length);
            return result;
        }

        public async Task<PostHarvestManagementResponse> GetUserImageByUserID(int UserID)
        {
            if (UserID != 0)
            {
                try
                {
                    var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                    {
                        { "UserID", Tuple.Create(UserID.ToString(), DbType.Int32, ParameterDirection.Input) }
                    };

                    var result = await UnitOfWork.Repository<GetUserImageModel>().GetEntityBySPAsync("[Administration].[GetUserImageByUserID]", parameters);
                    if (result != null)
                    {
                        byte[] imageArray = File.ReadAllBytes(Path.Combine(result.Image));
                        result.Image = Convert.ToBase64String(imageArray);
                        return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, result);
                    }
                    else
                    {
                        return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, null);
                    }

                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
            else
            {
                return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, null);
            }
            
        }

        public async Task<PostHarvestManagementResponse> GetLastQRCodeNumber()
        {
            try
            {
                var result = await UnitOfWork.Repository<GetLastQRTagNumber>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetLastQRTagNumber]");
                var firstItem = result.FirstOrDefault();
                if (firstItem != null)
                {
                    return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, firstItem.QRTagNumber);
                }
                return PostHarvestManagementResponse.GenerateResponseMessage(PostHarvestManagementResponseEnum.Success.ToString(), string.Empty, 0);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }

}
