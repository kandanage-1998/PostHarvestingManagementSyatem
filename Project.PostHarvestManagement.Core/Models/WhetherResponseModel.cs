using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Project.PostHarvestManagement.Core.Models
{
    public class WhetherResponseModel
    {
        [JsonProperty("location")]
        public LocationModel Location { get; set; }

        [JsonProperty("current")]
        public CurrentModel Current { get; set; }

    }
}
