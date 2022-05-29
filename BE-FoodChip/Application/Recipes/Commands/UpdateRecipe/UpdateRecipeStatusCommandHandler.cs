using Application.Interfaces;
using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Recipes.Commands.UpdateRecipe
{
    public class UpdateRecipeStatusCommandHandler : IRequestHandler<UpdateRecipeStatusCommand, Recipe>
    {
        private readonly IRecipeRepository _recipeRepository;
        public UpdateRecipeStatusCommandHandler(IRecipeRepository recipeRepository)
        {
            _recipeRepository = recipeRepository;
        }
        public async Task<Recipe> Handle(UpdateRecipeStatusCommand request, CancellationToken cancellationToken)
        {
            var recipe = await _recipeRepository.GetById(request.RecipeId);
            recipe.Status = request.Status;
            _recipeRepository.Update(recipe);
            return recipe;
        }
    }
}
