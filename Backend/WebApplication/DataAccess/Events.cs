using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.DataAccess
{
    public class Events
    {
        [Key]
        public Guid GuidEventsId { get; set; }
        public string EventTitle { get; set; }
        public string DescriptionOfTheEvent { get; set; }
        public DateTime PlannedStartDate { get; set; }
        public DateTime PlannedEndDate { get; set; }
        public string ImageEvents { get; set; }
    }
}
