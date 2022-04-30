namespace API.DTOs
{
    public class CategoryGetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<RecipeGetDto> Recipes { get; set; }
    }
}
