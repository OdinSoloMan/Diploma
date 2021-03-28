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

        public Users()
        {
            GuidId = new Guid();
            SecondName = "";
            FirstName = "";
            MiddleMame = "";
            Telephone = 0;
            Position = "";
            TypeOfEnterprise = "";
            Password = "";
        }

        public Users(string _SecondName, string _FirstName, string _MiddleMame, int _Telephone, string _Position, string _TypeOfEnterprise, string _Password)
        {
            SecondName = _SecondName;
            FirstName = _FirstName;
            MiddleMame = _MiddleMame;
            Telephone = _Telephone;
            Position = _Position;
            TypeOfEnterprise = _TypeOfEnterprise;
            Password = _Password;
        }

        public void Recording(string _SecondName, string _FirstName, string _MiddleMame, int _Telephone, string _Position, string _TypeOfEnterprise, string _Password)
        {
            GuidId = Guid.NewGuid();
            SecondName = _SecondName;
            FirstName = _FirstName;
            MiddleMame = _MiddleMame;
            Telephone = _Telephone;
            Position = _Position;
            TypeOfEnterprise = _TypeOfEnterprise;
            Password = _Password;
        }
    }
}
