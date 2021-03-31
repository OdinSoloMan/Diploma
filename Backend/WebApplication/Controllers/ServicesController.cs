using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess;
using WebApplication.Repositories;

namespace WebApplication.Controllers
{
    [Route("services")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private IServicesRepository db;

        public ServicesController()
        {
            db = new ServicesRepository();
        }

        [Route("addservices")]
        [HttpGet]
        public ActionResult<string> AddNewServices([FromBody] Services services)
        {
            services.AddServices(services.Name);
            db.Create(services);
            return new OkObjectResult(services);
        }

        [Route("readallservices")]
        [HttpPost]
        public ActionResult<string> ReadAllServices()
        {
            return new OkObjectResult(db.ReadAll());
        }

        [Route("readallservicesfullinfo")]
        [HttpPost]
        public ActionResult<string> ReadAllFullInfoListServices()
        {
            return new OkObjectResult(db.ReadAllFullInfo());
        }

        [Route("updateservices")]
        [HttpPut]
        public ActionResult<string> UpdateServices([FromBody] Services services)
        {
            db.Update(services);
            return new OkObjectResult(services);
        }

        [Route("deleteservices")]
        [HttpDelete]
        public ActionResult<string> DeleteServices([FromBody] Services services)
        {
            db.Delete(services.GuidServicesId);
            return new OkObjectResult("delete services" + services.GuidServicesId);
        }
    }
}
