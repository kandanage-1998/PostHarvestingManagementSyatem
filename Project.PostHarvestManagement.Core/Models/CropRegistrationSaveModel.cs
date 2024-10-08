using System;
using System.Collections.Generic;
using System.Text;

namespace Project.PostHarvestManagement.Core.Models
{
    public class CropRegistrationSaveModel
    {
        //public int CropTypeID { get; set; }
        public int CollectionPointID { get; set; }
        public string CropTypeName { get; set; }
        public string CropCategory { get; set; }
        public string HarvestedLocation { get; set; }
        public decimal CropPrice { get; set; }
        public string RegisterNumber { get; set; }
        public DateTime RegisterDate { get; set; }
    }
}
