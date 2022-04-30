using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Recipes.Queries.GetRecipeById
{
    public class GetRecipeByIdQuery : IRequest<Recipe>
    {
        public int RecipeId { get; set; }
    }
}
