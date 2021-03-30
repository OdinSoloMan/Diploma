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
        }

        public Services(string _Name)
        {
            Name = _Name;
        }

        public void AddServices(string _Name)
        {
            GuidServicesId = Guid.NewGuid();
            Name = _Name;
        }
    }
}
