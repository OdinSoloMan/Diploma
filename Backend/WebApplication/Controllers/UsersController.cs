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
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUsersRepository db;

        public UsersController()
        {
            db = new UsersRepository();
        }

        [Route("registration")]
        [HttpGet]
        public ActionResult<string> registrationGet([FromBody] Users users)
        {
            users.Recording(users.SecondName, users.FirstName, users.MiddleMame, users.Telephone, users.Password, users.TypeOfEnterprise, users.Password);
            db.Create(users);
            return new OkObjectResult(users);
        }

        [Route("token")]
        [HttpPost]
        public ActionResult<string> Token()
        {
            return new OkObjectResult(5);
        }

        [Route("select")]
        [HttpPost]
        public ActionResult<string> Select()
        {
            return new OkObjectResult(db.ReadAll());
        }
    }
}
