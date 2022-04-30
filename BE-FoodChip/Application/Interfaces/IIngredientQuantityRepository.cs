using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IIngredientQuantityRepository
    {
        Task<IEnumerable<IngredientQuantity>> GetAll();
        Task<IngredientQuantity> GetById(int id);
        Task Add(IngredientQuantity ingredientQuantity);
        Task Update(IngredientQuantity ingredientQuantity);
        Task Delete(int id);
    }
}
