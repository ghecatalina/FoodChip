using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Recipes.Queries.SearchByIngredients
{
    public class SearchByIngredientsQuery : IRequest<List<Recipe>>
    {
        public string Category { get; set; }
        public List<string> Ingredients { get; set; }
    }
}
