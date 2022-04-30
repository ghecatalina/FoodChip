using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IIngredientRepository
    {
        Task<IEnumerable<Ingredient>> GetAll();
        Task<Ingredient> GetById(int id);
        Task<Ingredient> GetByName(string name);
        Task Add(Ingredient ingredient);
        Task Update(Ingredient ingredient);
        Task Delete(int id);
    }
}
