namespace API.DTOs
{
    public class RecipeGetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public string Category { get; set; }
        public ICollection<IngredientQuantityDto> Ingredients { get; set; }
        public object CoverImage { get; internal set; }
    }
}
