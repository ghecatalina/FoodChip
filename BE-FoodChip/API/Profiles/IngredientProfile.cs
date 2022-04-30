﻿using API.DTOs;
using AutoMapper;
using Domain;

namespace API.Profiles
{
    public class IngredientProfile : Profile
    {
        public IngredientProfile()
        {
            CreateMap<IngredientPutPostDto, Ingredient>()
                .ForMember(p => p.IngredientName, opt => opt.MapFrom(s => s.IngredientName))
                .ReverseMap();

            CreateMap<IngredientGetDto, Ingredient>()
                .ForMember(p => p.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(p => p.IngredientName, opt => opt.MapFrom(s => s.IngredientName))
                .ReverseMap();
            CreateMap<IngredientQuantityDto, IngredientQuantity>()
                .ForPath(p => p.Ingredient.IngredientName, opt => opt.MapFrom(s => s.IngredientName))
                .ForMember(p => p.Quantity, opt => opt.MapFrom(s => s.Quantity))
                .ReverseMap();
        }
    }
}
