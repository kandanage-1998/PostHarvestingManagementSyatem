using System;
using System.Collections.Generic;
using System.Text;

namespace Project.PostHarvestManagement.Core.Models
{
    public class GetFarmersForDropdownsModel
    {
        public int FarmerID { get; set; }
        public string FarmerName { get; set; }
        public bool IsActive { get; set; }
    }
}
