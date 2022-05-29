using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Recipes.Commands.UpdateRecipe
{
    public class UpdateRecipeStatusCommand : IRequest<Recipe>
    {
        public int RecipeId { get; set; }
        public string Status { get; set; }
    }
}
