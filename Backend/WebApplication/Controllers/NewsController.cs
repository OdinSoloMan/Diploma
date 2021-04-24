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

        [Authorize(Roles = "admin, users")]
        [Route("addnews")]
        [HttpPost]
        public ActionResult<string> AddNewNews([FromBody] News news)
        {
            try
            {
                news.AddNews(news.NewTitle, news.NewDescription, news.DataNew, news.ImageNew, news.IsConsidered, news.UsersId);
                db.Create(news);
                return new OkObjectResult(news);
            }
            catch
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "admin, users")]
        [Route("readalltnews")]
        [HttpGet]
        public ActionResult<string> ReadAlltNews()
        {
            return new OkObjectResult(db.ReadAllTrue());
        }

        [Authorize(Roles = "admin")]
        [Route("readallnews")]
        [HttpGet]
        public ActionResult<string> ReadAllNews()
        {
            return new OkObjectResult(db.ReadAll());
        }

        [Authorize(Roles = "admin")]
        [Route("updatenews")]
        [HttpPut]
        public ActionResult<string> UpdateNews([FromBody] News news)
        {
            try
            {
                db.Update(news);
                return new OkObjectResult(news);
            }
            catch
            {
                return new OkObjectResult("Not update info news");
            }
        }

        [Authorize(Roles = "admin")]
        [Route("deletenews/{guid}")]
        [HttpDelete]
        public ActionResult<string> DeleteNews(Guid guid)
        {
            try
            {
                News news = new News() { };
                news.GuidNewsId = guid;
                db.Delete(news.GuidNewsId);
                return new OkObjectResult("News delete" + news.GuidNewsId);
            }
            catch
            {
                return new OkObjectResult("News not delete");
            }
        }
    }
}
