using System;
using System.Collections.Generic;
using System.Text;

namespace Project.PostHarvestManagement.Core.Models
{
    public class GetCollectionPointsForDropDownModel
    {
        public int CollectionPointID { get; set; }
        public string CollectionPointName { get; set; }
        public bool IsActive { get; set; }
    }
}
