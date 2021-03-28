using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess;

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
            db.Entry(users).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}
