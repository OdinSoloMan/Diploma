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
    }
}
