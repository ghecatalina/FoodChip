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
    public class IngredientRepository : IIngredientRepository
    {
        private readonly AppDbContext _context;
        public IngredientRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task Add(Ingredient ingredient)
        {
            _context.Ingredients.Add(ingredient);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var ingredient = await _context.Ingredients.FindAsync(id);
            _context.Ingredients.Remove(ingredient);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Ingredient>> GetAll()
        {
            return await _context.Ingredients.ToListAsync();
        }

        public async Task<Ingredient> GetById(int id)
        {
            var ingredient = await _context.Ingredients.FirstOrDefaultAsync(x => x.Id == id);
            return ingredient;
        }

        public async Task<Ingredient> GetByName(string name)
        {
            var ingredient = await _context.Ingredients.FirstOrDefaultAsync(x => x.IngredientName == name);
            return ingredient;
        }

        public Task Update(Ingredient ingredient)
        {
            throw new NotImplementedException();
        }
    }
}
