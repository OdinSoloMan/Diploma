using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess;

namespace WebApplication.Repositories
{
    public class ConsultationRequestsRepository : IConsultationRequestsRepository
    {
        public AppDatabaseContext db;

        public ConsultationRequestsRepository()
        {
            db = new AppDatabaseContext();
        }

        public void Create(ConsultationRequests consultationRequests)
        {
            db.ConsultationRequests.Add(consultationRequests);
            db.SaveChanges();
        }

        public void Delete(Guid GuidConsultationRequestsId)
        {
            ConsultationRequests consultationRequests = db.ConsultationRequests.Find(GuidConsultationRequestsId);
            if (consultationRequests != null)
                db.ConsultationRequests.Remove(consultationRequests);
            db.SaveChanges();
        }

        public ConsultationRequests Read(Guid GuidConsultationRequestsId)
        {
            return db.ConsultationRequests.Find(GuidConsultationRequestsId);
        }

        public IEnumerable ReadAll()
        {
            return db.ConsultationRequests;
        }

        public void Update(ConsultationRequests consultationRequests)
        {
            db.Entry(consultationRequests).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}
