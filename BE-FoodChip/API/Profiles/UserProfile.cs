using API.DTOs;
using AutoMapper;
using Domain;

namespace API.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserAuthDto, User>()
                .ForMember(p => p.Email, opt => opt.MapFrom(s => s.RegularUserEmail))
                .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.RegularUserEmail))
                .ReverseMap();

        }
    }
}
