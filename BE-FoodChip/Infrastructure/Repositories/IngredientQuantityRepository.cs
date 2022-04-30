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
    public class IngredientQuantityRepository : IIngredientQuantityRepository
    {
        private readonly AppDbContext _context;
        public IngredientQuantityRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task Add(IngredientQuantity ingredientQuantity)
        {
            _context.IngredientQuantities.Add(ingredientQuantity);
            await _context.SaveChangesAsync();
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<IngredientQuantity>> GetAll()
        {
            return await _context.IngredientQuantities.ToListAsync();
        }

        public async Task<IngredientQuantity> GetById(int id)
        {
            var ingredientQuantity = await _context.IngredientQuantities.FirstOrDefaultAsync(x => x.Id == id);
            return ingredientQuantity;
        }

        public Task Update(IngredientQuantity ingredientQuantity)
        {
            throw new NotImplementedException();
        }
    }
}
