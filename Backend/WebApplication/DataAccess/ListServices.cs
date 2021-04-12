using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.DataAccess
{
    public class ListServices
    {
        [Key]
        public Guid GuidListSevicesId { get; set; }
        public string Description { get; set; }

        public List<ConsultationRequests> consultationRequests { get; set; } = new List<ConsultationRequests>();

        public Guid ServicesId { get; set; }
        public Services Services { get; set; }

/*        public ListServices()
        {
            GuidListSevicesId = new Guid();
            Description = "";
            ServicesId = new Guid();
        }

        public ListServices(string _Description, Guid _GuidServicesId)
        {
            Description = _Description;
            ServicesId = _GuidServicesId;
        }

        public void AddListServices(string _Description, Guid _GuidServicesId)
        {
            GuidListSevicesId = Guid.NewGuid();
            Description = _Description;
            ServicesId = _GuidServicesId;
        }*/
    }
}
