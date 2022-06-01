using Application.Interfaces;
using Domain;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly AppDbContext _context;
        public RecipeRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task Add(Recipe recipe)
        {
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Recipe>> GetAll()
        {
            return await _context.Recipes
                .Include(r => r.RecipeCategory)
                .AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<Recipe>> GetAllSearch()
        {
            return await _context.Recipes
                .Include(r => r.Ingredients)
                .ThenInclude(r => r.Ingredient)
                .Include(r => r.RecipeCategory).ToListAsync();
        }

        public async Task<Recipe> GetById(int id)
        {
            return await _context.Recipes
                .Include(r => r.Ingredients)
                .ThenInclude(r => r.Ingredient)
                .Include(r => r.RecipeCategory)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public void Update(Recipe recipe)
        {
            _context.Recipes.Attach(recipe);
            _context.Entry(recipe).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
