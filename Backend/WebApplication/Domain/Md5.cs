using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace WebApplication.Domain
{
    public class Md5
    {
        public static string Convert(string str)
        {
            MD5 hashMaker = MD5.Create();
            byte[] hash = hashMaker.ComputeHash(Encoding.Unicode.GetBytes(str));

            StringBuilder sBuilder = new StringBuilder();

            foreach (var b in hash)
                sBuilder.Append(b.ToString("x2"));

            return sBuilder.ToString();
        }
    }
}
