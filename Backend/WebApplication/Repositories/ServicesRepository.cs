using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using WebApplication.DataAccess;

namespace WebApplication.Repositories
{
    public class ServicesRepository : IServicesRepository
    {
        public AppDatabaseContext db;

        public ServicesRepository()
        {
            db = new AppDatabaseContext();
        }

        public object Create(Services services)
        {
            try
            {
                db.Services.Add(services);
                db.SaveChanges();
            }
            catch (Exception e)
            {
                if(Regex.IsMatch(e.InnerException.Message, "Name_Index", RegexOptions.IgnoreCase))
                    return new { message = "Error name busy" };
            }
            return new { message = "not error" };
        }

        public void Delete(Guid GuidServicesId)
        {
            Services services = db.Services.Find(GuidServicesId);
            if (services != null)
                db.Services.Remove(services);
            db.SaveChanges();
        }

        public Services Read(Guid GuidServicesId)
        {
            return db.Services.Find(GuidServicesId);
        }

        public IEnumerable ReadAll()
        {
            return db.Services;
        }

        public IEnumerable ReadAllFullInfo()
        {
            JsonSerializerSettings jss = new JsonSerializerSettings();
            jss.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            var lst = db.Services.Include(c => c.ListServices).ToList();
            string json = JsonConvert.SerializeObject(lst, jss);
            return json;
        }

        public object Update(Services services)
        {
            try
            {
                db.Entry(services).State = EntityState.Modified;
                db.SaveChanges();
            }
            catch (Exception e)
            {
                if (Regex.IsMatch(e.InnerException.Message, "Name_Index", RegexOptions.IgnoreCase))
                    return new { message = "Error name busy" };
            }
            return new { message = "not error" };
        }
    }
}
