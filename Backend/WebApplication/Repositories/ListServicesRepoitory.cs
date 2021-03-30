using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess;

namespace WebApplication.Repositories
{
    public class ListServicesRepoitory : IListSevicesRepository
    {
        public AppDatabaseContext db;

        public ListServicesRepoitory()
        {
            db = new AppDatabaseContext();
        }

        public void Create(ListServices listServices)
        {
            db.ListServices.Add(listServices);
            db.SaveChanges();
        }

        public void Delete(Guid GuidListSevicesId)
        {
            ListServices listServices = db.ListServices.Find(GuidListSevicesId);
            if (listServices != null)
                db.ListServices.Remove(listServices);
            db.SaveChanges();
        }

        public ListServices Read(Guid GuidListSevicesId)
        {
            return db.ListServices.Find(GuidListSevicesId);
        }

        public IEnumerable ReadAll()
        {
            return db.ListServices;
        }

        public IEnumerable ReadAllFullInfo()
        {
            JsonSerializerSettings jss = new JsonSerializerSettings();
            jss.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            var lst = db.ListServices.Include(c => c.Services).ToList();
            string json = JsonConvert.SerializeObject(lst, jss);
            return json;
        }

        public void Update(ListServices listServices)
        {
            db.Entry(listServices).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}
