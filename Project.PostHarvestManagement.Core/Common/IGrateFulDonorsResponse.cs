using System;
using System.Collections.Generic;
using System.Text;

namespace Project.PostHarvestManagement.Core.Common
{
    public interface IPostHarvestManagementResponse
    {
        PostHarvestManagementResponse GenerateResponseMessage(string statusCode, string message, Dictionary<string, object> dataHoldDictionary);
        PostHarvestManagementResponse GenerateResponseMessage(string statusCode, string message, object data);
        PostHarvestManagementResponse GenerateResponseMessage(string statusCode, string message);
        PostHarvestManagementResponse GenerateResponseMessage(object data);
    }
}
