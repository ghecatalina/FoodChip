using Application.Interfaces;
using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Recipes.Queries.SearchByIngredients
{
    public class SearchByIngredientsQueryHandler : IRequestHandler<SearchByIngredientsQuery, List<Recipe>>
    {
        private readonly IRecipeRepository _repository;
        public SearchByIngredientsQueryHandler(IRecipeRepository repository)
        {
            _repository = repository;
        }
        public async Task<List<Recipe>> Handle(SearchByIngredientsQuery request, CancellationToken cancellationToken)
        {
            var recipes = await _repository.GetAllSearch();
            if (request.Category.ToLower() != "all")
                recipes = recipes.Where(r => r.RecipeCategory.CategoryName == request.Category.ToLower());

            var dictionary = new Dictionary<Recipe, List<string>>();
            foreach (var recipe in recipes)
            {
                dictionary[recipe] = new List<string>();
                foreach (var item in recipe.Ingredients)
                {
                    dictionary[recipe].Add(item.Ingredient.IngredientName);
                }
            }

            var result = dictionary
                .OrderByDescending(d => d.Value.Intersect(request.Ingredients).Count())
                .ThenBy(d => d.Value.Count - d.Value.Intersect(request.Ingredients).Count())
                .Select(d => d.Key);


            return result.ToList();
        }
    }
}
