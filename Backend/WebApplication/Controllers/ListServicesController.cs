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
    [Route("listsevices")]
    [ApiController]
    public class ListServicesController : ControllerBase
    {
        private IListSevicesRepository db;

        public ListServicesController()
        {
            db = new ListServicesRepoitory();
        }

        [Authorize(Roles = "admin")]
        [Route("addlistsevices")]
        [HttpPost]
        public ActionResult<string> AddNewListServices([FromBody] ListServices listServices)
        {
            listServices.AddListServices(listServices.Description, listServices.ServicesId);
            db.Create(listServices);
            return new OkObjectResult(listServices);
        }

        [Authorize(Roles = "admin, users")]
        [Route("readalllistsevices")]
        [HttpGet]
        public ActionResult<string> ReadAllListServices()
        {
            return new OkObjectResult(db.ReadAll());
        }

        [Authorize(Roles = "admin, users")]
        [Route("readalllistsevicesfullinfo")]
        [HttpPost]
        public ActionResult<string> ReadAllFullInfoListServices()
        {
            return new OkObjectResult(db.ReadAllFullInfo());
        }

        [Authorize(Roles = "admin")]
        [Route("updatelistsevices")]
        [HttpPut]
        public ActionResult<string> UpdateListServices([FromBody] ListServices listServices)
        {
            db.Update(listServices);
            return new OkObjectResult(listServices);
        }

        [Authorize(Roles = "admin")]
        [Route("deletelistsevices/{guid}")]
        [HttpDelete]
        public ActionResult<string> DeleteListServices(Guid guid)
        {
            ListServices listServices = new ListServices() { };
            listServices.GuidListSevicesId = guid;
            db.Delete(listServices.GuidListSevicesId);
            return new OkObjectResult(new { delete_listservice = guid });
        }
    }
}
