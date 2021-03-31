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
        [HttpGet]
        public ActionResult<string> AddNewListEvents([FromBody] Events events)
        {
            events.AddEvents(events.EventTitle, events.DescriptionOfTheEvent, events.PlannedStartDate, events.PlannedEndDate, events.ImageEvents);
            db.Create(events);
            return new OkObjectResult(events);
        }

        [Route("readallevents")]
        [HttpPost]
        public ActionResult<string> ReadAllListEvents()
        {
            return new OkObjectResult(db.ReadAll());
        }

        [Route("updateevents")]
        [HttpPut]
        public ActionResult<string> UpdateListEvents([FromBody] Events events)
        {
            db.Update(events);
            return new OkObjectResult(events);
        }

        [Route("deleteevents")]
        [HttpDelete]
        public ActionResult<string> DeleteListEvents([FromBody] Events events)
        {
            db.Delete(events.GuidEventsId);
            return new OkObjectResult("delete events" + events.GuidEventsId);
        }
    }
}
