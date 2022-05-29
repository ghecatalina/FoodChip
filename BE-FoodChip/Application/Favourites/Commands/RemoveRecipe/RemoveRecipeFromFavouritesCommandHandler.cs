using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Favourites.Commands.RemoveRecipe
{
    public class RemoveRecipeFromFavouritesCommandHandler : IRequestHandler<RemoveRecipeFromFavouritesCommand, User>
    {
        private readonly UserManager<User> _userManager;
        private readonly IRecipeRepository _recipeRepository;
        public RemoveRecipeFromFavouritesCommandHandler(UserManager<User> userManager, IRecipeRepository recipeRepository)
        {
            _userManager = userManager;
            _recipeRepository = recipeRepository;
        }
        public async Task<User> Handle(RemoveRecipeFromFavouritesCommand request, CancellationToken cancellationToken)
        {
            var user = _userManager.Users
                .Include(u => u.Favourites)
                .ThenInclude(f => f.FavouriteRecipes)
                .FirstOrDefault(u => u.Id == request.UserId);
            var recipe = await _recipeRepository.GetById(request.RecipeId);
            if (recipe != null && user != null)
            {
                user.Favourites.FavouriteRecipes.Remove(recipe);
                await _userManager.UpdateAsync(user);
            }
            return user;
        }
    }
}
