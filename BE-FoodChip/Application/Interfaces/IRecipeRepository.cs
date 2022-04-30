using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IRecipeRepository
    {
        Task<IEnumerable<Recipe>> GetAll();
        Task<Recipe> GetById(int id);
        Task Add(Recipe recipe);
        Task Update(Recipe recipe);
        Task Delete(int id);
    }
}
