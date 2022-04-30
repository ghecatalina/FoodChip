using API.DTOs;
using AutoMapper;
using Domain;

namespace API.Profiles
{
    public class RecipeProfile : Profile
    {
        public RecipeProfile()
        {
            CreateMap<RecipeGetDto, Recipe>()
                .ForMember(p => p.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(p => p.Status, opt => opt.MapFrom(s => s.Status))
                .ForMember(p => p.RecipeName, opt => opt.MapFrom(s => s.Name))
                .ForMember(p => p.RecipeDescription, opt => opt.MapFrom(s => s.Description))
                .ForMember(p => p.Ingredients, opt => opt.MapFrom(s => s.Ingredients))
                .ForPath(p => p.RecipeCategory.CategoryName, opt => opt.MapFrom(s => s.Category))
                .ReverseMap();
        }
    }
}
