using Application.Interfaces;
using Domain;
using MediatR;

namespace Application.Ingredients.Commands.CreateIngredient
{
    public class CreateIngredientCommandHandler : IRequestHandler<CreateIngredientCommand, Ingredient>
    {
        private readonly IIngredientRepository _repository;
        public CreateIngredientCommandHandler(IIngredientRepository repository)
        {
            _repository = repository;
        }
        public async Task<Ingredient> Handle(CreateIngredientCommand request, CancellationToken cancellationToken)
        {
            var ingredient = new Ingredient() { IngredientName = request.IngredientName };
            await _repository.Add(ingredient);
            return ingredient;
        }
    }
}
