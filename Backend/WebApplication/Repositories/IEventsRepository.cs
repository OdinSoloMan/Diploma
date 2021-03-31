using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess;

namespace WebApplication.Repositories
{
    interface IEventsRepository
    {
        IEnumerable ReadAll();
        void Create(Events events);
        Events Read(Guid GuidEventsId);
        void Update(Events events);
        void Delete(Guid GuidEventsId);
    }
}
