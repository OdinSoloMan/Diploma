using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.DataAccess
{
    public class ConsultationRequests
    {
        [Key]
        public Guid GuidConsultationRequestsId { get; set; }
        public string Description { get; set; }
        public string ReverseCommunication { get; set; }
        public bool IsVerified { get; set; }
        public string Message { get; set; }

        public Guid UsersId { get; set; }
        public Users Users { get; set; }

        public Guid ListServicesId { get; set; }
        public ListServices ListServices { get; set; }


        public ConsultationRequests()
        {
            Guid guid = new Guid();
            GuidConsultationRequestsId = new Guid();
            Description = "";
            ReverseCommunication = "";
            IsVerified = false;
            Message = "";
            UsersId = guid;
            ListServicesId = guid;
        }

        public ConsultationRequests(string _Description, string _ReverseCommunication, string _Message, bool isVerified,  Guid _guidUsers, Guid _gudiListServies)
        {
            Description = _Description;
            ReverseCommunication = _ReverseCommunication;
            Message = _Message;
            UsersId = _guidUsers;
            IsVerified = isVerified;
            ListServicesId = _gudiListServies;
        }

        public void AddConsultationRequests(string _Description, string _ReverseCommunication, string _Message, bool isVerified, Guid _guidUsers, Guid _gudiListServies)
        {
            Description = _Description;
            ReverseCommunication = _ReverseCommunication;
            Message = _Message;
            UsersId = _guidUsers;
            IsVerified = isVerified;
            ListServicesId = _gudiListServies;
        }
    }
}
