using Project.Core.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Project.PostHarvestManagement.Dapper
{
    public class PostHarvestManagementConnectionFactory : IPostHarvestManagementConnectionFactory
    {
        private readonly string connectionString;

        public PostHarvestManagementConnectionFactory(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public IDbConnection GetConnection()
        {
            return new SqlConnection(this.connectionString);
        }
    }
}
