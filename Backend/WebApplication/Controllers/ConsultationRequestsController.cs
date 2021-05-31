using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
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
        private IUsersRepository db1;
        private IListSevicesRepository db2;

        public ConsultationRequestsController()
        {
            db = new ConsultationRequestsRepository();
            db1 = new UsersRepository();
            db2 = new ListServicesRepoitory();
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

        public class Consultation
        {
            public Guid Guiduser { get; set; }
            public Guid Guidlistservice { get; set; }
        }

        [Authorize(Roles = "admin")]
        [Route("getInfUserAndListService")]
        [HttpPost]
        public ActionResult<string> ReadInf([FromBody] Consultation consultation)
        {
            return new OkObjectResult(new { userinfo = db1.Read(consultation.Guiduser), listservice = db2.Read(consultation.Guidlistservice) });
        }

        [Authorize(Roles = "admin")]
        [Route("updateconsultation/{guid}")]
        [HttpPut]
        public ActionResult<string> UpdateConsult(Guid guid)
        {
            var s = db.Read(guid);
            s.IsVerified = true;
            db.Update(s);
            return new OkObjectResult(s);
        }

        public class ConsultationMail
        {
            public Guid Guidconsultation { get; set; }
            public string Message { get; set; }
            public string Theme { get; set; }
        }

        [Authorize(Roles = "admin")]
        [Route("messageEmail")]
        [HttpPost]
        public ActionResult<string> MailMesseage([FromBody] ConsultationMail consultationMail)
        {
            var s = db.Read(consultationMail.Guidconsultation);
            s.IsVerified = true;
            s.Message = consultationMail.Message;
            db.Update(s);
            SendEmailAsync(s.ReverseCommunication, consultationMail.Theme, consultationMail.Message).GetAwaiter();
            return new OkObjectResult(Ok());
        }

        private static async Task SendEmailAsync(string _to, string _themeSub, string _messBody)
        {
            MailAddress from = new MailAddress("galinaburova1@gmail.com", "Company OdinSolo");
            MailAddress to = new MailAddress(_to);
            MailMessage m = new MailMessage(from, to);
            m.Subject = _themeSub;
            m.Body = _messBody;
            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            smtp.Credentials = new NetworkCredential("galinaburova1@gmail.com", "a93bfg510mtk17a");
            smtp.EnableSsl = true;
            await smtp.SendMailAsync(m);
        }
    }
}
