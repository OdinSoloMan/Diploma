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
    [Route("consultationRequests")]
    [ApiController]
    public class ConsultationRequestsController : ControllerBase
    {
        private IConsultationRequestsRepository db;

        public ConsultationRequestsController()
        {
            db = new ConsultationRequestsRepository();
        }

        [Route("addconsultationRequests")]
        [HttpPost]
        public ActionResult<string> AddNewListServices([FromBody] ConsultationRequests consultationRequests)
        {
            consultationRequests.AddConsultationRequests(consultationRequests.Description, consultationRequests.ReverseCommunication, consultationRequests.UsersId, consultationRequests.ListServicesId);
            db.Create(consultationRequests);
            return new OkObjectResult(consultationRequests);
        }

        [Route("readallconsultationRequests")]
        [HttpGet]
        public ActionResult<string> ReadAllListServices()
        {
            return new OkObjectResult(db.ReadAll());
        }

        [Route("updateconsultationRequests")]
        [HttpPut]
        public ActionResult<string> UpdateListServices([FromBody] ConsultationRequests consultationRequests)
        {
            db.Update(consultationRequests);
            return new OkObjectResult(consultationRequests);
        }

        [Route("deleteconsultationRequests/{guid}")]
        [HttpDelete]
        public ActionResult<string> DeleteListServices(Guid guid)
        {
            ConsultationRequests consultationRequests = new ConsultationRequests() { };
            consultationRequests.GuidConsultationRequestsId = guid;
            db.Delete(consultationRequests.GuidConsultationRequestsId);
            return new OkObjectResult("delete listsevices" + consultationRequests.GuidConsultationRequestsId);
        }
    }
}
