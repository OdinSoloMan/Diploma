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
                return "Good";
            }
            catch
            {
                return "No good";
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
            db.Update(news);
            return new OkObjectResult(news);
        }

        [Route("deletenews")]
        [HttpDelete]
        public ActionResult<string> DeleteNews([FromBody] News news)
        {
            db.Delete(news.GuidNewsId);
            return new OkObjectResult("delete news" + news.GuidNewsId);
        }
    }
}
