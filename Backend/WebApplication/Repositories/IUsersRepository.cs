using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess;

namespace WebApplication.Repositories
{
    interface IUsersRepository
    {
        IEnumerable ReadAll();
        void Create(Users users);
        Users Read(Guid GuidUsersId);
        void Update(Users users);
        void Delete(Guid GuidUsersId);
    }
}
