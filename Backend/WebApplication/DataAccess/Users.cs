using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.DataAccess
{
    public class Users
    {
        [Key]
        public Guid GuidId { get; set; }
        public string SecondName { get; set; }
        public string FirstName { get; set; }
        public string MiddleMame { get; set; }
        public int Telephone { get; set; }
        public string Position { get; set; }
        public string TypeOfEnterprise { get; set; }
        public string Password { get; set; }
    }
}
