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
        Task<List<Recipe>> GetAll();
        Task<IEnumerable<Recipe>> GetAllSearch();
        Task<Recipe> GetById(int id);
        Task Add(Recipe recipe);
        void Update(Recipe recipe);
        Task Delete(int id);
    }
}
