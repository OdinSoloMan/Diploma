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

        [Route("addlistsevices")]
        [HttpGet]
        public ActionResult<string> AddNewListServices([FromBody] ListServices listServices)
        {
            //listServices.AddListServices(listServices.Description, listServices.ServicesId);
            db.Create(listServices);
            return new OkObjectResult(listServices);
        }

        [Route("readalllistsevices")]
        [HttpPost]
        public ActionResult<string> ReadAllListServices()
        {
            return new OkObjectResult(db.ReadAll());
        }

        [Route("readalllistsevicesfullinfo")]
        [HttpPost]
        public ActionResult<string> ReadAllFullInfoListServices()
        {
            return new OkObjectResult(db.ReadAllFullInfo());
        }

        [Route("updatelistsevices")]
        [HttpPut]
        public ActionResult<string> UpdateListServices([FromBody] ListServices listServices)
        {
            db.Update(listServices);
            return new OkObjectResult(listServices);
        }

        [Route("deletelistsevices")]
        [HttpDelete]
        public ActionResult<string> DeleteListServices([FromBody] ListServices listServices)
        {
            db.Delete(listServices.GuidListSevicesId);
            return new OkObjectResult("delete listsevices" + listServices.ServicesId);
        }
    }
}
