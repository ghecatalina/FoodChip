using DataAccessLayer.Entities;
using DataAccessLayer.DefaultAPIData;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.AppDbContext
{
    public partial class DefaultAPIDbContext : IdentityDbContext<User>
    {
        public DbSet<Student> Students { get; set; }
        public DefaultAPIDbContext(DbContextOptions options ) : base (options)
        {
            
        }
      
        protected override void OnModelCreating(ModelBuilder builder)
        {
            
            base.OnModelCreating(builder);
            builder.DefaultAPI();
        }
    }
}
