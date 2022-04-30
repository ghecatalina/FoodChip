using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Ingredients.Commands.CreateIngredient
{
    public class CreateIngredientCommand : IRequest<Ingredient>
    {
        public string IngredientName { get; set; }
    }
}
