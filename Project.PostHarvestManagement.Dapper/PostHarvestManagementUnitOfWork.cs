using Project.Core.Data;
using Project.DataAccess.Dapper;
using Project.PostHarvestManagement.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project.PostHarvestManagement.Dapper
{
    public class PostHarvestManagementUnitOfWork : UnitOfWork, IPostHarvestManagementUnitOfWork
    {
        public PostHarvestManagementUnitOfWork(IPostHarvestManagementConnectionFactory ConnectionFactory) : base(ConnectionFactory) { }
    }
}
