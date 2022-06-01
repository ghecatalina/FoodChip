namespace API.DTOs
{
    public class RecipeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public Guid UserId { get; set; }
        public string Category { get; set; }
        public object CoverImage { get; internal set; }
    }
}
