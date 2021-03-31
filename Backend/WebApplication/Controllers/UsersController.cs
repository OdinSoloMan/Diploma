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
    [Route("users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUsersRepository db;

        public UsersController()
        {
            db = new UsersRepository();
        }

        [Route("addusers")]
        [HttpGet]
        public ActionResult<string> AddNewUsers([FromBody] Users users)
        {
            users.Recording(users.SecondName, users.FirstName, users.MiddleMame, users.Telephone, users.Position, users.TypeOfEnterprise, users.Password);
            db.Create(users);
            return new OkObjectResult(users);
        }

        [Route("readallusers")]
        [HttpPost]
        public ActionResult<string> ReadAllUsers()
        {
            return new OkObjectResult(db.ReadAll());
        }

        [Route("updateusers")]
        [HttpPut]
        public ActionResult<string> UpdateUsers([FromBody] Users users)
        {
            db.Update(users);
            return new OkObjectResult(users);
        }

        [Route("deleteusers")]
        [HttpDelete]
        public ActionResult<string> DeleteUsers([FromBody] Users users)
        {
            db.Delete(users.GuidId);
            return new OkObjectResult("delete users" + users.GuidId);
        }
    }
}
