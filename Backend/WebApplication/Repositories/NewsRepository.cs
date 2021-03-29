using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess;

namespace WebApplication.Repositories
{
    public class NewsRepository : INewsRepository
    {
        public AppDatabaseContext db;

        public NewsRepository()
        {
            db = new AppDatabaseContext();
        }

        public void Create(News news)
        {
            db.News.Add(news);
            db.SaveChanges();
        }

        public void Delete(Guid GuidNewsId)
        {
            News news = db.News.Find(GuidNewsId);
            if (news != null)
                db.News.Remove(news);
            db.SaveChanges();
        }

        public News Read(Guid GuidNewsId)
        {
            return db.News.Find(GuidNewsId);
        }

        IEnumerable INewsRepository.ReadAll()
        {
            return db.News;
        }

        public void Update(News news)
        {
            db.Entry(news).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}
