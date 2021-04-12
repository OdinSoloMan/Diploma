using Microsoft.AspNetCore.Authorization;
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
        //[Authorize]
        [Route("addnews")]
        [HttpPost]
        public ActionResult<string> AddNewNews([FromBody] News news)
        {
            try
            {
                //news.AddNews(news.NewTitle, news.NewDescription, news.DataNew, news.ImageNew);
                db.Create(news);
                return new OkObjectResult("Add news");
            }
            catch
            {
                return new OkObjectResult("Not add news");
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
                return new OkObjectResult("Update info news");
            }
            catch
            {
                return new OkObjectResult("Not update info news");
            }
        }

        [Route("deletenews")]
        [HttpDelete]
        public ActionResult<string> DeleteNews([FromBody] News news)
        {
            try
            {
                db.Delete(news.GuidNewsId);
                return new OkObjectResult("News delete");
            }
            catch
            {
                return new OkObjectResult("News not delete");
            }
        }
    }
}
