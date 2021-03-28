using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.DataAccess
{
    public class News
    {
        [Key]
        public Guid GuidNewsId { get; set; }
        public string NewTitle { get; set; }
        public string NewDescription { get; set; }
        public DateTime DataNew { get; set; }
        public string ImageNew { get; set; }
    }
}
