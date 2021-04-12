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
        [HttpPost]
        public ActionResult<string> AddNewUsers([FromBody] Users users)
        {
           // users.Recording(users.SecondName, users.FirstName, users.MiddleMame, users.Telephone, users.Position, users.TypeOfEnterprise, users.Password);
            db.Create(users);
            return new OkObjectResult(users);
        }

        [Route("readallusers")]
        [HttpGet]
        public ActionResult<string> ReadAllUsers()
        {
            return new OkObjectResult(db.ReadAll());
        }

        [Route("{guid}")]
        [HttpGet]
        public ActionResult<string> ReadUsers(Guid guid)
        {
            return new OkObjectResult(db.Read(guid));
        }

        [Route("updateusers")]
        [HttpPut]
        public ActionResult<string> UpdateUsers([FromBody] Users users)
        {
            
            {
                db.Update(users);
                return new OkObjectResult(users);
            }
            
        }

        [Route("deleteusers/{guid}")]
        [HttpDelete]
        public ActionResult<string> DeleteUsers(Guid guid)
        {
/*            Users users = new Users { };
            users.GuidId = guid;
            db.Delete(users.GuidId);*/
            return new OkObjectResult("delete users" );
        }
    }
}
