using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Domain;

namespace WebApplication.DataAccess
{
    [Index("Email", IsUnique = true, Name = "Email_Index")]
    [Index("Telephone", IsUnique = true, Name = "Telephone_Index")]
    public class Users
    {
        [Key]
        public Guid GuidUsersId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string Position { get; set; }
        public string TypeOfEnterprise { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

        public List<Events> events { get; set; } = new List<Events>();
        public List<News> news { get; set; } = new List<News>();

        public List<ConsultationRequests> consultationRequests { get; set; } = new List<ConsultationRequests>();


        public Users()
        {
            GuidUsersId = new Guid();
            FullName = "";
            Email = "";
            Telephone = "";
            TypeOfEnterprise = "";
            Position = "";
            Password = "";
            Role = "users";
        }

        public Users(string _FullName, string _Email, string _Telephone, string _TypeOfEnterprise, string _Position, string _Password)
        {
            FullName = _FullName;
            Email = _Email;
            Telephone = _Telephone;
            TypeOfEnterprise = _TypeOfEnterprise;
            Position = _Position;
            Password = Md5.Encrypt(_Password);
            Role = "users";
        }

        public void Recording(string _FullName, string _Email, string _Telephone, string _TypeOfEnterprise, string _Position, string _Password, string _Role)
        {
            FullName = _FullName;
            Email = _Email;
            Telephone = _Telephone;
            TypeOfEnterprise = _TypeOfEnterprise;
            Position = _Position;
            Password = Md5.Encrypt(_Password);
            if (_Role != "")
            {
                Role = _Role;
            }
            else
            {
                Role = "users";
            }
        }
    }
}
