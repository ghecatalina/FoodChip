using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Recipe
    {
        public int Id { get; set; }
        public string RecipeName { get; set; }
        public string RecipeDescription { get; set; }
        public Category RecipeCategory { get; set; }
        public ICollection<IngredientQuantity> Ingredients { get; set; }
        public string Status { get; set; }
        public string RecipeCoverImage { get; set; }
    }
}
