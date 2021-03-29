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

        public News()
        {
            GuidNewsId = new Guid();
            NewTitle = "";
            NewDescription = "";
            DataNew = new DateTime();
            ImageNew = "";
        }

        public News(string _NewTitle, string _NewDescription, DateTime _DataNew, string _ImageNew)
        {
            NewTitle = _NewTitle;
            NewDescription = _NewDescription;
            DataNew = _DataNew;
            ImageNew = _ImageNew;
        }

        public void AddNews(string _NewTitle, string _NewDescription, DateTime _DataNew, string _ImageNew)
        {
            GuidNewsId = Guid.NewGuid();
            NewTitle = _NewTitle;
            NewDescription = _NewDescription;
            DataNew = _DataNew;
            ImageNew = _ImageNew;
        }
    }
}
