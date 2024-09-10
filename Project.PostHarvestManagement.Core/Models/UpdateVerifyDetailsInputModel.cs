using System;
using System.Collections.Generic;
using System.Text;

namespace Project.PostHarvestManagement.Core.Models
{
    public class UpdateVerifyDetailsInputModel
    {
        public int UserID { get; set; }
        public int UserType { get; set; }
        public string QrCode { get; set; }
    }
}
