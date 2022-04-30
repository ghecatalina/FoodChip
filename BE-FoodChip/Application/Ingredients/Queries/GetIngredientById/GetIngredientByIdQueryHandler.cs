using Application.Interfaces;
using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Ingredients.Queries.GetIngredientById
{
    public class GetIngredientByIdQueryHandler : IRequestHandler<GetIngredientByIdQuery, Ingredient>
    {
        private readonly IIngredientRepository _repository;
        public GetIngredientByIdQueryHandler(IIngredientRepository repository)
        {
            _repository = repository;   
        }
        public async Task<Ingredient> Handle(GetIngredientByIdQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetById(request.Id);
        }
    }
}
