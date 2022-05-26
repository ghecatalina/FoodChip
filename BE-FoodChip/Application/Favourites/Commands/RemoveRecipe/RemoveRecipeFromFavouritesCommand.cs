using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Favourites.Commands.RemoveRecipe
{
    public class RemoveRecipeFromFavouritesCommand : IRequest<User>
    {
        public Guid UserId { get; set; }
        public int RecipeId { get; set; }
    }
}
