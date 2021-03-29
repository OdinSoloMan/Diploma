using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess;

namespace WebApplication.Repositories
{
    interface INewsRepository
    {
        IEnumerable ReadAll();
        void Create(News news);
        News Read(Guid GuidNewsId);
        void Update(News news);
        void Delete(Guid GuidNewsId);
    }
}
