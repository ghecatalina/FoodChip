using Application.Interfaces;
using Domain;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _context;
        public CategoryRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task Add(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Category>> GetAll()
        {
            return await _context.Categories
                .ToListAsync();
        }

        public async Task<Category> GetById(int id)
        {
            var category = await _context.Categories
                .Include(c => c.Recipes)
                .ThenInclude(c => c.Ingredients)
                .ThenInclude(c => c.Ingredient)
                .FirstOrDefaultAsync(c => c.Id == id);
            return category;
        }

        public Task Update(Category category)
        {
            throw new NotImplementedException();
        }
    }
}
