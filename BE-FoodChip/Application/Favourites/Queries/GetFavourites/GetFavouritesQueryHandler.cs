using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Favourites.Queries.GetFavourites
{
    public class GetFavouritesQueryHandler : IRequestHandler<GetFavouritesQuery, List<Recipe>>
    {
        private readonly UserManager<User> _userManager;
        public GetFavouritesQueryHandler(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        public async Task<List<Recipe>> Handle(GetFavouritesQuery request, CancellationToken cancellationToken)
        {
            var recipes = _userManager.Users
                .Include(u => u.Favourites)
                .FirstOrDefault(u => u.Id == request.UserId).Favourites;
            return await Task.FromResult(recipes);
        }
    }
}
