using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess;

namespace WebApplication.Repositories
{
    interface IListSevicesRepository
    {
        IEnumerable ReadAll();
        void Create(ListServices listServices);
        ListServices Read(Guid GuidListSevicesId);
        void Update(ListServices listServices);
        void Delete(Guid GuidListSevicesId);
        IEnumerable ReadAllFullInfo();
    }
}
