using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess;

namespace WebApplication.Repositories
{
    public class EventsRepository : IEventsRepository
    {
        public AppDatabaseContext db;

        public EventsRepository()
        {
            db = new AppDatabaseContext();
        }

        public void Create(Events events)
        {
            db.Events.Add(events);
            db.SaveChanges();
        }

        public void Delete(Guid GuidEventsId)
        {
            Events events = db.Events.Find(GuidEventsId);
            if (events != null)
                db.Events.Remove(events);
            db.SaveChanges();
        }

        public Events Read(Guid GuidEventsId)
        {
            return db.Events.Find(GuidEventsId);
        }

        public IEnumerable ReadAll()
        {
            return db.Events;
        }

        public void Update(Events events)
        {
            db.Entry(events).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}
