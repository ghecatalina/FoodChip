﻿using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Ingredients.Queries.GetIngredients
{
    public class GetIngredientsQuery : IRequest<IEnumerable<Ingredient>>
    {
    }
}
