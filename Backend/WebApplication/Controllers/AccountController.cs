using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
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
            users.Recording(users.FullName, users.Email, users.Telephone, users.Position, users.TypeOfEnterprise, users.Password, "users");
            dynamic info = db.Create(users);
            if (info.message != "not error")
            {
                return BadRequest(info.message);
            }
            return new OkObjectResult(users);
        }

        [Route("login")]
        [HttpPost]
        public ActionResult<string> Login([FromBody] AccountLoginOptions value)
        {
            var identity = GetIdentity(value.Email, value.Password);

            if (identity == null)
            {
                return BadRequest();
            }

            var s = identity.Claims.ToList();
            var x = s[0].Value;

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
                token = encodedJwt,
                guid = x
            });
        }


        [Authorize(Roles = "admin")]
        [Route("getrole")]
        [HttpPost]
        public ActionResult<string> GetRole()
        {
            string s = Md5.Encrypt("modile@test.com");
            string s1 = Md5.Decrypt("MVYaN/FEdZ3/wzRXwtDnNg==");
            return new OkObjectResult(new { EncodeTo64 = s, DecodeFrom64 = s1});
            //return new OkObjectResult(User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role).Value);
        }

        private ClaimsIdentity GetIdentity(string email, string password)
        {
            Users users = db.isUsers(email, password);
            if (users != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, users.GuidUsersId.ToString()),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, users.Role)
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
