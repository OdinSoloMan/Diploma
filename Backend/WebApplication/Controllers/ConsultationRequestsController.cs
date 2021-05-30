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
    [Route("consultationRequests")]
    [ApiController]
    public class ConsultationRequestsController : ControllerBase
    {
        private IConsultationRequestsRepository db;

        public ConsultationRequestsController()
        {
            db = new ConsultationRequestsRepository();
        }

        [Authorize(Roles = "admin, users")]
        [Route("addconsultationRequests")]
        [HttpPost]
        public ActionResult<string> AddNewListServices([FromBody] ConsultationRequests consultationRequests)
        {
            consultationRequests.AddConsultationRequests(consultationRequests.Description, consultationRequests.ReverseCommunication, consultationRequests.Message, consultationRequests.IsVerified, consultationRequests.UsersId, consultationRequests.ListServicesId);
            db.Create(consultationRequests);
            return new OkObjectResult(consultationRequests);
        }

        [Authorize(Roles = "admin")]
        [Route("readallconsultationRequests")]
        [HttpGet]
        public ActionResult<string> ReadAllListServices()
        {
            return new OkObjectResult(db.ReadAll());
        }

        [Authorize(Roles = "admin")]
        [Route("updateconsultationRequests")]
        [HttpPut]
        public ActionResult<string> UpdateListServices([FromBody] ConsultationRequests consultationRequests)
        {
            db.Update(consultationRequests);
            return new OkObjectResult(consultationRequests);
        }

        [Authorize(Roles = "admin")]
        [Route("deleteconsultationRequests/{guid}")]
        [HttpDelete]
        public ActionResult<string> DeleteListServices(Guid guid)
        {
            ConsultationRequests consultationRequests = new ConsultationRequests() { };
            consultationRequests.GuidConsultationRequestsId = guid;
            db.Delete(consultationRequests.GuidConsultationRequestsId);
            return new OkObjectResult(new { delete_consultationRequests = guid });
        }
    }
}
