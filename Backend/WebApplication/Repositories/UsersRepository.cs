using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess;
using WebApplication.Domain;

namespace WebApplication.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        public AppDatabaseContext db;

        public UsersRepository()
        {
            db = new AppDatabaseContext();
        }

        public void Create(Users users)
        {
            db.Users.Add(users);
            db.SaveChanges();
        }

        public void Delete(Guid GuidUsersId)
        {
            Users users = db.Users.Find(GuidUsersId);
            if (users != null)
                db.Users.Remove(users);
            db.SaveChanges();
        }

        public Users Read(Guid GuidUsersId)
        {
            return db.Users.Find(GuidUsersId);
        }

        IEnumerable IUsersRepository.ReadAll()
        {
            return db.Users;
        }

        public void Update(Users users)
        {
            Users users1 = db.Users.Find(users.GuidUsersId);
            if(users1.FullName != users.FullName & users.FullName != "")
            {
                users1.FullName = users.FullName;
            }
            if (users1.Email != users.Email & users.Email != "")
            {
                users1.Email = users.Email;
            }
            if (users1.Telephone != users.Telephone & users.Telephone != "")
            {
                users1.Telephone = users.Telephone;
            }
            if (users1.Position != users.Position & users.Position != "")
            {
                users1.Position = users.Position;
            }
            if (users1.TypeOfEnterprise != users.TypeOfEnterprise & users.TypeOfEnterprise != "")
            {
                users1.TypeOfEnterprise = users.TypeOfEnterprise;
            }
            if (users1.Password != users.Password & users.Password != "")
            {
                users1.Password = Md5.Encrypt(users.Password);
            }
            if (users1.Role != users.Role & users.Role != "")
            {
                users1.Role = users.Role;
            }
            if (users1.events != users.events & users.events != null)
            {
                users1.events = users.events;
            }
            if (users1.news != users.news & users.news != null)
            {
                users1.news = users.news;
            }
            if (users1.consultationRequests != users.consultationRequests & users.consultationRequests != null)
            {
                users1.consultationRequests = users.consultationRequests;
            }
            db.Entry(users1).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}
