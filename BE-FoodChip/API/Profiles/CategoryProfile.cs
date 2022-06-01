using API.DTOs;
using AutoMapper;
using Domain;

namespace API.Profiles
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<CategoryGetDto, Category>()
                .ForMember(p => p.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(p => p.CategoryName, opt => opt.MapFrom(s => s.Name))
                .ReverseMap();
        }
    }
}
