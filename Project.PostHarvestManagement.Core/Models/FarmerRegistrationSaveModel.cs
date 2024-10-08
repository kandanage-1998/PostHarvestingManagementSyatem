using System;
using System.Collections.Generic;
using System.Text;

namespace Project.PostHarvestManagement.Core.Models
{
    public class FarmerRegistrationSaveModel
    {
        public string FarmerName { get; set; }
        public string Nic { get; set; }
        public string TpNumber { get; set; }
        public string District { get; set; }
        public string FieldType { get; set; }
        public string LandExtent { get; set; }
        public string FarmingPractice { get; set; }
        public string TechnologiesUsed { get; set; }
        public string IrrigationMethod { get; set; }
        public string WaterSource { get; set; }
        public int CollectionPointID { get; set; }
        public string CropTypeName { get; set; }
        public string TransportType { get; set; }
        public string CropCategory { get; set; }
        public string HarvestedLocation { get; set; }
        public decimal CropPrice { get; set; }
        public string RegisterNumber { get; set; }
        public DateTime RegisterDate { get; set; }
    }
}
