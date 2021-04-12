using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Domain;

namespace WebApplication.DataAccess
{
    public class Users
    {
        [Key]
        public Guid GuidUsersId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public int Position { get; set; }
        public string TypeOfEnterprise { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

        public List<Events> events { get; set; } = new List<Events>();
        public List<News> news { get; set; } = new List<News>();

        public List<ConsultationRequests> consultationRequests { get; set; } = new List<ConsultationRequests>();


        //public Users()
        //{
        //    GuidId = new Guid();
        //    SecondName = "";
        //    FirstName = "";
        //    MiddleMame = "";
        //    Telephone = 0;
        //    Position = "";
        //    TypeOfEnterprise = "";
        //    Password = "";
        //}

        //public Users(string _SecondName, string _FirstName, string _MiddleMame, int _Telephone, string _Position, string _TypeOfEnterprise, string _Password)
        //{
        //    SecondName = _SecondName;
        //    FirstName = _FirstName;
        //    MiddleMame = _MiddleMame;
        //    Telephone = _Telephone;
        //    Position = _Position;
        //    TypeOfEnterprise = _TypeOfEnterprise;
        //    Password = _Password;
        //}

        //public void Recording(string _SecondName, string _FirstName, string _MiddleMame, int _Telephone, string _Position, string _TypeOfEnterprise, string _Password)
        //{
        //    GuidId = Guid.NewGuid();
        //    SecondName = _SecondName;
        //    FirstName = _FirstName;
        //    MiddleMame = _MiddleMame;
        //    Telephone = _Telephone;
        //    Position = _Position;
        //    TypeOfEnterprise = _TypeOfEnterprise;
        //    Password = Md5.Convert(_Password);
        //}
    }
}
