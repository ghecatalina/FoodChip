using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.DefaultAPIData
{
    public static class ModelBuilderExtension
    {
        public static void DefaultAPI(this ModelBuilder modelBuilder)
        {
            // For seed Data
        //    modelBuilder.Entity<Default>().HasData(
        //        new DefaultType { Id = 1, Name = "Admin" },
         //       new Default { Id = 1, Description = "This is a test model",DefaultModelTypeId = 1 }
       //     );
        }
    }
}
