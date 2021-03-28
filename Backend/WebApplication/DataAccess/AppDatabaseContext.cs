using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.DataAccess
{
    public class AppDatabaseContext : DbContext
    {
        public AppDatabaseContext(DbContextOptions<AppDatabaseContext> options) :
            base(options)
        { }

        DbSet<Events> Events { get; set; }
        DbSet<Services> Services { get; set; }
        DbSet<ListServices> ListServices { get; set; }
        DbSet<News> News { get; set; }
        DbSet<Users> Users { get; set; }
    }
}
