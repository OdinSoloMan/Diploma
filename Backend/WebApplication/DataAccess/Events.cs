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

        public Events()
        {
            GuidEventsId = new Guid();
            EventTitle = "";
            DescriptionOfTheEvent = "";
            PlannedStartDate = new DateTime();
            PlannedEndDate = new DateTime();
            ImageEvents = "";
        }

        public Events(string _EventTitle, string _DescriptionOfTheEvent, DateTime _PlannedStartDate, DateTime _PlannedEndDate, string _ImageEvents)
        {
            EventTitle = _EventTitle;
            DescriptionOfTheEvent = _DescriptionOfTheEvent;
            PlannedStartDate = _PlannedStartDate;
            PlannedEndDate = _PlannedEndDate;
            ImageEvents = _ImageEvents;
        }

        public void AddEvents(string _EventTitle, string _DescriptionOfTheEvent, DateTime _PlannedStartDate, DateTime _PlannedEndDate, string _ImageEvents)
        {
            EventTitle = _EventTitle;
            DescriptionOfTheEvent = _DescriptionOfTheEvent;
            PlannedStartDate = _PlannedStartDate;
            PlannedEndDate = _PlannedEndDate;
            ImageEvents = _ImageEvents;
        }
    }
}
