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
        public bool IsConsidered { get; set; }

        public Guid UsersId { get; set; }
        public Users Users { get; set; }

        public News()
        {
            Guid guid = new Guid();
            GuidNewsId = guid;
            NewTitle = "";
            NewDescription = "";
            DataNew = new DateTime();
            ImageNew = "";
            IsConsidered = false;
            UsersId = guid;
        }

        public News(string _NewTitle, string _NewDescription, DateTime _DataNew, string _ImageNew, Guid guid)
        {
            NewTitle = _NewTitle;
            NewDescription = _NewDescription;
            DataNew = _DataNew;
            ImageNew = _ImageNew;
            UsersId = guid;
        }

        public void AddNews(string _NewTitle, string _NewDescription, DateTime _DataNew, string _ImageNew, Guid guid)
        {
            NewTitle = _NewTitle;
            NewDescription = _NewDescription;
            DataNew = _DataNew;
            ImageNew = _ImageNew;
            UsersId = guid;
        }
    }
}
