using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Favourites.Queries.GetFavourites
{
    public class GetFavouritesQuery : IRequest<List<Recipe>>
    {
        public Guid UserId { get; set; }
    }
}
