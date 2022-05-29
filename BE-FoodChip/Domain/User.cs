﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class User : IdentityUser<Guid>
    {
        public Favourites Favourites { get; set; } = new Favourites() { FavouriteRecipes = new List<Recipe>() };
    }
}
