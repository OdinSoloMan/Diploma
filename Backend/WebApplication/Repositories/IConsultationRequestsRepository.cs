using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess;

namespace WebApplication.Repositories
{
    interface IConsultationRequestsRepository
    {
        IEnumerable ReadAll();
        void Create(ConsultationRequests consultationRequests);
        ConsultationRequests Read(Guid GuidConsultationRequestsId);
        void Update(ConsultationRequests consultationRequests);
        void Delete(Guid GuidConsultationRequestsId);
    }
}
