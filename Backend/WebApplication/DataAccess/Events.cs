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
        public string ImageEvents { get; set; }
        public bool IsConsidered { get; set; }

        public Guid UsersId { get; set; }
        public Users Users { get; set; }

        public Events()
        {
            Guid guid = new Guid();
            GuidEventsId = guid;
            EventTitle = "";
            DescriptionOfTheEvent = "";
            PlannedStartDate = new DateTime();
            ImageEvents = "";
            IsConsidered = false;
            UsersId = guid;
        }

        public Events(string _EventTitle, string _DescriptionOfTheEvent, DateTime _PlannedStartDate, string _ImageEvents, bool _IsConsidered, Guid _UsersId)
        {
            EventTitle = _EventTitle;
            DescriptionOfTheEvent = _DescriptionOfTheEvent;
            PlannedStartDate = _PlannedStartDate;
            ImageEvents = _ImageEvents;
            IsConsidered = false;
            UsersId = _UsersId;
        }

        public void AddEvents(string _EventTitle, string _DescriptionOfTheEvent, DateTime _PlannedStartDate, string _ImageEvents, bool _IsConsidered, Guid _UsersId)
        {
            EventTitle = _EventTitle;
            DescriptionOfTheEvent = _DescriptionOfTheEvent;
            PlannedStartDate = _PlannedStartDate;
            ImageEvents = _ImageEvents;
            IsConsidered = false;
            UsersId = _UsersId;
        }
    }
}
