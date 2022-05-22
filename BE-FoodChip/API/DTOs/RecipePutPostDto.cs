namespace API.DTOs
{
    public class RecipePutPostDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public int CategoryId { get; set; }
        public Dictionary<string, double> Ingredients { get; set; }
        public string CoverImage { get; set; }
    }
}
