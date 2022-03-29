using Microsoft.EntityFrameworkCore;

namespace BLL.Repository
{
    public interface IBaseRepository<TEntity, TContext>
           where TEntity : class
           where TContext : DbContext
    {
        TEntity[] Get();
        TEntity Get(int id);
        void Add(TEntity element);
        void Update(TEntity element);
        void Delete(int id);
    }
}
