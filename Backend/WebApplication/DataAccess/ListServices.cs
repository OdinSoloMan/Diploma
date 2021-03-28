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
        public Guid GuidServicesId { get; set; }
        public Services Services { get; set; }
    }
}
