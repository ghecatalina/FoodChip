using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Recipes.Queries.IsFavourite
{
    public class IsFavouriteQueryHandler : IRequestHandler<IsFavouriteQuery, bool>
    {
        private readonly UserManager<User> _userManager;
        public IsFavouriteQueryHandler(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        public Task<bool> Handle(IsFavouriteQuery request, CancellationToken cancellationToken)
        {
            var recipe = _userManager.Users
                .Include(u => u.Favourites)
                .ThenInclude(u => u.FavouriteRecipes)
                .FirstOrDefault(u => u.Id == request.UserId).Favourites.FavouriteRecipes.FirstOrDefault(r => r.Id == request.RecipeId);
            if (recipe == null)
                return Task.FromResult(false);
            return Task.FromResult(true);
        }
    }
}
