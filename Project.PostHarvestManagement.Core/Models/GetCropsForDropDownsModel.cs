using System;
using System.Collections.Generic;
using System.Text;

namespace Project.PostHarvestManagement.Core.Models
{
    public class GetCropsForDropDownsModel
    {
        public int CropTypeID { get; set; }
        public string CropTypeName { get; set; }
        public bool IsActive { get; set; }
    }
}
