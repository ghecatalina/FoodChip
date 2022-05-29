using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Recipes.Queries.IsFavourite
{
    public class IsFavouriteQuery : IRequest<bool>
    {
        public Guid UserId { get; set; }
        public int RecipeId { get; set; }
    }
}
