using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess;

namespace WebApplication.Repositories
{
    interface IServicesRepository
    {
        IEnumerable ReadAll();
        void Create(Services services);
        Services Read(Guid GuidServicesId);
        void Update(Services services);
        void Delete(Guid GuidServicesId);
    }
}
