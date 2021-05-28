﻿using Microsoft.AspNetCore.Authorization;
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

        [Authorize(Roles = "admin")]
        [Route("addusers")]
        [HttpPost]
        public ActionResult<string> AddNewUsers([FromBody] Users users)
        {
            users.Recording(users.FullName, users.Email, users.Telephone, users.Position, users.TypeOfEnterprise, users.Password, users.Role);
            db.Create(users);
            return new OkObjectResult(users);
        }

        [Authorize(Roles = "admin")]
        [Route("readallusers")]
        [HttpGet]
        public ActionResult<string> ReadAllUsers()
        {
            return new OkObjectResult(db.ReadAll());
        }

        [Authorize(Roles = "admin, users")]
        [Route("{guid}")]
        [HttpGet]
        public ActionResult<string> ReadUsers(Guid guid)
        {
            return new OkObjectResult(db.Read(guid));
        }

        [Authorize(Roles = "admin, users")]
        [Route("updateusers")]
        [HttpPut]
        public ActionResult<string> UpdateUsers([FromBody] Users users)
        {
            try
            {
                db.Update(users);
                return new OkObjectResult(db.Read(users.GuidUsersId));
            }
            catch
            {
                return BadRequest();
            }
           
        }

        [Authorize(Roles = "admin")]
        [Route("deleteusers/{guid}")]
        [HttpDelete]
        public ActionResult<string> DeleteUsers(Guid guid)
        {
            Users users = new Users { };
            users.GuidUsersId = guid;
            db.Delete(users.GuidUsersId);
            return new OkObjectResult(new
                { delete_users = guid }
            );
        }
    }
}
