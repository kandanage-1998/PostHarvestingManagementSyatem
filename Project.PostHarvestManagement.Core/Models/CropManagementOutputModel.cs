using System;
using System.Collections.Generic;
using System.Text;

namespace Project.PostHarvestManagement.Core.Models
{
    public class CropManagementOutputModel
    {
        public string CropTypeName { get; set; }
        public string CropCategory { get; set; }
        public decimal SellingKilos { get; set; }
        public string SellingPurpose { get; set; }
        public string CropRemovePurpose { get; set; }
        public decimal CropPrice { get; set; }
        public string CollectionPointName { get; set; }
        public DateTime RegisterDate { get; set; }
    }
}
