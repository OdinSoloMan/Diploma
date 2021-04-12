using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.DataAccess
{
    public class AppDatabaseContext : DbContext
    {
        public AppDatabaseContext(DbContextOptions<AppDatabaseContext> options) :
            base(options)
        { }

        public AppDatabaseContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder OptionsBuilder)
        {
            OptionsBuilder.UseSqlServer($"Data Source=localhost;Initial Catalog={nameof(AppDatabaseContext)};Integrated Security=True");
        }

        public DbSet<Events> Events { get; set; }
        public DbSet<Services> Services { get; set; }
        public DbSet<ListServices> ListServices { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<ConsultationRequests> ConsultationRequests { get; set; }
    }
}
