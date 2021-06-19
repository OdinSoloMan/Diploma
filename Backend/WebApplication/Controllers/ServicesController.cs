using Microsoft.AspNetCore.Authorization;
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

        [Authorize(Roles = "admin")]
        [Route("addservices")]
        [HttpPost]
        public ActionResult<string> AddNewServices([FromBody] Services services)
        {
            services.AddServices(services.Name);
            dynamic info = db.Create(services);
            if (info.message != "not error")
            {
                return BadRequest(info.message);
            }
            return new OkObjectResult(services);
        }

        [Authorize(Roles = "admin, users")]
        [Route("readallservices")]
        [HttpGet]
        public ActionResult<string> ReadAllServices()
        {
            return new OkObjectResult(db.ReadAll());
        }

        [Authorize(Roles = "admin, users")]
        [Route("readallservicesfullinfo")]
        [HttpPost]
        public ActionResult<string> ReadAllFullInfoListServices()
        {
            return new OkObjectResult(db.ReadAllFullInfo());
        }

        [Authorize(Roles = "admin")]
        [Route("updateservices")]
        [HttpPut]
        public ActionResult<string> UpdateServices([FromBody] Services services)
        {            
            dynamic info = db.Update(services);
            if (info.message != "not error")
            {
                return BadRequest(info.message);
            }
            return new OkObjectResult(services);
        }

        [Authorize(Roles = "admin")]
        [Route("deleteservices/{guid}")]
        [HttpDelete]
        public ActionResult<string> DeleteServices(Guid guid)
        {
            Services services = new Services() { };
            services.GuidServicesId = guid;
            db.Delete(services.GuidServicesId);
            return new OkObjectResult(new { delete_service = guid});
        }
    }
}
