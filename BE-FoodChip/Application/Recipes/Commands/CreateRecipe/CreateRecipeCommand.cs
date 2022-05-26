using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Recipes.Commands.CreateRecipe
{
    public class CreateRecipeCommand : IRequest<Recipe>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public Dictionary<string, double> Ingredients { get; set; }
        public string Status { get; set; }
        public Guid UserId { get; set; }
        public string RecipeCoverImage { get; set; }
    }
}
