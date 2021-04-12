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
    [Route("events")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private IEventsRepository db;

        public EventsController()
        {
            db = new EventsRepository();
        }

        [Route("addevents")]
        [HttpPost]
        public ActionResult<string> AddNewListEvents([FromBody] Events events)
        {
            try
            {
                events.AddEvents(events.EventTitle, events.DescriptionOfTheEvent, events.PlannedStartDate, events.ImageEvents, events.IsConsidered, events.UsersId);
                db.Create(events);
                return new OkObjectResult("Add Events");
            }
            catch
            {
                return new OkObjectResult("Not add Events");
            }
        }

        [Route("readallevents")]
        [HttpGet]
        public ActionResult<string> ReadAllListEvents()
        {
            return new OkObjectResult(db.ReadAll());
        }

        [Route("updateevents")]
        [HttpPut]
        public ActionResult<string> UpdateListEvents([FromBody] Events events)
        {
            try
            {
                db.Update(events);
                return new OkObjectResult("Update info Events");
            }
            catch
            {
                return new OkObjectResult("Not update info Events");
            }
        }

        [Route("deleteevents")]
        [HttpDelete]
        public ActionResult<string> DeleteListEvents([FromBody] Events events)
        {
            try
            {
                db.Delete(events.GuidEventsId);
                return new OkObjectResult("Events delete");
            }
            catch
            {
                return new OkObjectResult("Events not delete");
            }
        }
    }
}
