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
    [Route("events")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private IEventsRepository db;

        public EventsController()
        {
            db = new EventsRepository();
        }

        [Authorize(Roles = "admin, users")]
        [Route("addevents")]
        [HttpPost]
        public ActionResult<string> AddNewListEvents([FromBody] Events events)
        {
            try
            {
                events.AddEvents(events.EventTitle, events.DescriptionOfTheEvent, events.PlannedStartDate, events.ImageEvents, events.IsConsidered, events.UsersId);
                db.Create(events);
                return new OkObjectResult(events);
            }
            catch
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "admin, users")]
        [Route("readalltevents")]
        [HttpGet]
        public ActionResult<string> ReadAlltListEvents()
        {
            return new OkObjectResult(db.ReadAllTrue());
        }

        [Authorize(Roles = "admin")]
        [Route("readallevents")]
        [HttpGet]
        public ActionResult<string> ReadAllListEvents()
        {
            return new OkObjectResult(db.ReadAll());
        }

        [Authorize(Roles = "admin")]
        [Route("updateevents")]
        [HttpPut]
        public ActionResult<string> UpdateListEvents([FromBody] Events events)
        {
            try
            {
                db.Update(events);
                return new OkObjectResult(events);
            }
            catch
            {
                return new OkObjectResult("Not update info Events");
            }
        }

        [Authorize(Roles = "admin")]
        [Route("deleteevents/{guid}")]
        [HttpDelete]
        public ActionResult<string> DeleteListEvents(Guid guid)
        {
            try
            {
                Events events = new Events() { };
                events.GuidEventsId = guid;
                db.Delete(events.GuidEventsId);
                return new OkObjectResult(new { delete_events = guid });
            }
            catch
            {
                return new OkObjectResult("Events not delete");
            }
        }
    }
}
