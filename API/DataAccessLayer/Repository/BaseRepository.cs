using Microsoft.EntityFrameworkCore;
using System.Linq;


namespace BLL.Repository
{

    public class BaseRepository<TEntity, TContext> : IBaseRepository<TEntity, TContext>
        where TEntity : class
        where TContext : DbContext
    {

        TContext context;

        public BaseRepository(TContext context)
        {
            this.context = context;
        }

        public void Add(TEntity element)
        {
            this.context.Add(element);
            this.context.SaveChanges();
        }

        public void Delete(int id)
        {
            this.context.Remove(this.context.Find<TEntity>(id));
            this.context.SaveChanges();
        }

        public TEntity[] Get()
        {
            return this.context.Set<TEntity>().ToArray();
        }

        public TEntity Get(int id)
        {
            return this.context.Find<TEntity>(id);
        }

        public void Update(TEntity element)
        {
            this.context.Update(element);
            this.context.SaveChanges();
        }
    }
}
