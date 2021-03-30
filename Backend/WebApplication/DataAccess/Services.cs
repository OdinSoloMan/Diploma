using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.DataAccess
{
    public class Services
    {
        [Key]
        public Guid GuidServicesId { get; set; }
        public string Name { get; set; }
        public List<ListServices> ListServices { get; set; } = new List<ListServices>();

        public Services()
        {
            GuidServicesId = new Guid();
            Name = "";
            ListServices =  new List<ListServices>();
        }

        public Services(string _Name, List<ListServices> _ListServices)
        {
            Name = _Name;
            ListServices = _ListServices;
        }

        public void AddServices(string _Name, List<ListServices> _ListServices)
        {
            GuidServicesId = Guid.NewGuid();
            Name = _Name;
            ListServices = _ListServices;
        }
    }
}
