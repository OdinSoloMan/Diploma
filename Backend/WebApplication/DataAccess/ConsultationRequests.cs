using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.DataAccess
{
    public class ConsultationRequests
    {
        [Key]
        public Guid GuidConsultationRequestsId { get; set; }
        public string Description { get; set; }
        public string ReverseCommunication { get; set; }


        //public List<ListServices> ListServices { get; set; } = new List<ListServices>();

        public Guid UsersId { get; set; }
        public Users Users { get; set; }

        public Guid ListServicesId { get; set; }
        public ListServices ListServices { get; set; }
    }
}
