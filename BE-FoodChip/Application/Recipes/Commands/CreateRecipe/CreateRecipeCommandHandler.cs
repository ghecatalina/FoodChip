using Application.Interfaces;
using Domain;
using MediatR;

namespace Application.Recipes.Commands.CreateRecipe
{
    public class CreateRecipeCommandHandler : IRequestHandler<CreateRecipeCommand, Recipe>
    {
        private readonly IRecipeRepository _recipeRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IIngredientRepository _ingredientRepository;
        public CreateRecipeCommandHandler(IRecipeRepository recipeRepository, ICategoryRepository categoryRepository, IIngredientRepository ingredientRepository)
        {
            _recipeRepository = recipeRepository;
            _categoryRepository = categoryRepository;
            _ingredientRepository = ingredientRepository;
        }
        public async Task<Recipe> Handle(CreateRecipeCommand request, CancellationToken cancellationToken)
        {
            var category = await _categoryRepository.GetById(request.CategoryId);
            var recipe = new Recipe() { RecipeName = request.Name, RecipeDescription = request.Description, RecipeCategory = category, Status = request.Status, Ingredients = new List<IngredientQuantity>(), RecipeCoverImage = request.RecipeCoverImage };
            foreach (var ingredient in request.Ingredients)
            {
                var ingr = await _ingredientRepository.GetByName(ingredient.Key);
                if (ingr == null)
                {
                    ingr = new Ingredient() { IngredientName = ingredient.Key };
                    await _ingredientRepository.Add(ingr);
                }
                var ingrQuan = new IngredientQuantity() { Ingredient = ingr, Quantity = ingredient.Value };
                recipe.Ingredients.Add(ingrQuan);
            }
            await _recipeRepository.Add(recipe);
            return recipe;
        }
    }
}
