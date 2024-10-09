using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Project.PostHarvestManagement.Core.Models
{
    public class CoditionModel
    {
        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("icon")]
        public string Icon { get; set; }

        [JsonProperty("code")]
        public int Code { get; set; }
    }
}
