using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess;
using WebApplication.Repositories;

namespace WebApplication.Controllers
{
    [Route("news")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private INewsRepository db;

        public NewsController()
        {
            db = new NewsRepository();
        }

        [Route("addnews")]
        [HttpPost]
        public ActionResult<string> AddNewNews([FromBody] News news)
        {
            try
            {
                news.AddNews(news.NewTitle, news.NewDescription, news.DataNew, news.ImageNew);
                db.Create(news);
                return "Add news";
            }
            catch
            {
                return "Not add news";
            }
        }

        [Route("readallnews")]
        [HttpGet]
        public ActionResult<string> ReadAllNews()
        {
            return new OkObjectResult(db.ReadAll());
        }

        [Route("updatenews")]
        [HttpPut]
        public ActionResult<string> UpdateNews([FromBody] News news)
        {
            try
            {
                db.Update(news);
                return "Update info news";
            }
            catch
            {
                return "Not update info news";
            }
        }

        [Route("deletenews")]
        [HttpDelete]
        public ActionResult<string> DeleteNews([FromBody] News news)
        {
            try
            {
                db.Delete(news.GuidNewsId);
                return "News delete";
            }
            catch
            {
                return "News not delete";
            }
        }
    }
}
