using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Favourites
    {
        public int Id { get; set; }
        public List<Recipe> FavouriteRecipes { get; set; }
    }
}
