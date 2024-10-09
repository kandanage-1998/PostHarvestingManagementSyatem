using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text.Json;
using Project.PostHarvestManagement.Core.Common;
using Project.PostHarvestManagement.Core.Models;
using Project.PostHarvestManagement.Core.Services;
using Project.PostHarvestManagement.Services;
using Newtonsoft.Json;

namespace Project.PostHarvestManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WhetherForcastController : ControllerBase
    {
        private static readonly HttpClient client = new HttpClient();

        [HttpGet]
        [Route("GetAllLocations")]
        public  async Task<WhetherResponseModel> GetAllLocations(string City)
        {
            try
            {
                string apiKey = "4610c745fa2f46a18f1170521240810";
                string url = $"http://api.weatherapi.com/v1/current.json?key={apiKey}&q={City}";

                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();
                //var weather = JsonSerializer.Deserialize<WhetherResponseModel>(responseBody);
                var weather = JsonConvert.DeserializeObject<WhetherResponseModel>(responseBody);
                Console.WriteLine(responseBody);

                return weather;
            }
            catch (Exception ex)
            {

                throw ex;
            }
           
        }
    }
}
