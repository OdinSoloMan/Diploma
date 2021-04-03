using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApplication.DataAccess;
using WebApplication.Domain;
using WebApplication.Models;
using WebApplication.Repositories;

namespace WebApplication.Controllers
{
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IUsersRepository db;

        public AccountController()
        {
            db = new UsersRepository();
        }

        [Route("registration")]
        [HttpPost]
        public ActionResult<string> registrationPost([FromBody] Users users)
        {            
            users.Recording(users.SecondName, users.FirstName, users.MiddleMame, users.Telephone, users.Position, users.TypeOfEnterprise, users.Password);
            db.Create(users);
            return new OkObjectResult(users);
        }

        [Route("login")]
        [HttpGet]
        public ActionResult<string> Login([FromBody] AccountLoginOptions value)
        {
            var identity = GetIdentity(value.Username, value.Password);

            if (identity == null)
            {
                return null;
            }

            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                            issuer: AuthOptions.ISSUER,
                            audience: AuthOptions.AUDIENCE,
                            notBefore: now,
                            claims: identity.Claims,
                            expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                            signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new OkObjectResult(new
            {
                access_token = encodedJwt,
                login = value.Username
            });
        }

        [Authorize]
        [Route("getrole")]
        [HttpPost]
        public ActionResult<string> GetRole()
        {
            return new OkObjectResult("gg");
            //return new OkObjectResult(User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role).Value);
        }

        private ClaimsIdentity GetIdentity(string login, string password)
        {
            var Base = db.ReadAll();

            Users users = null;
            foreach (Users Elm in Base)
            {
                if (Elm.SecondName == login && Elm.Password == Md5.Convert(password)) 
                    users = Elm;
            }
            if (users != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, users.GuidId.ToString()),
                    //new Claim(ClaimsIdentity.DefaultRoleClaimType, users.Role)
                };

                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }
            return null;
        }
    }
}
