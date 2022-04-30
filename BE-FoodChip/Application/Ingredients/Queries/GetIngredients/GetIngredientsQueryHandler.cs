using Application.Interfaces;
using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Ingredients.Queries.GetIngredients
{
    public class GetIngredientsQueryHandler : IRequestHandler<GetIngredientsQuery, IEnumerable<Ingredient>>
    {
        private readonly IIngredientRepository _repository;
        public GetIngredientsQueryHandler(IIngredientRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<Ingredient>> Handle(GetIngredientsQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetAll();
        }
    }
}
