using Application.Interfaces;
using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Recipes.Queries.GetAllRecipes
{
    public class GetAllRecipesQueryHandler : IRequestHandler<GetAllRecipesQuery, IEnumerable<Recipe>>
    {
        private readonly IRecipeRepository _repository;
        public GetAllRecipesQueryHandler(IRecipeRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<Recipe>> Handle(GetAllRecipesQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetAll();
        }
    }
}
