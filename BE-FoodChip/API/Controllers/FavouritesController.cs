using API.DTOs;
using Application.Favourites.Commands.AddRecipe;
using Application.Favourites.Commands.RemoveRecipe;
using Application.Favourites.Queries.GetFavourites;
using Application.Recipes.Queries.IsFavourite;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouritesController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public FavouritesController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("{userId}")]
        public async Task<IActionResult> GetFavouritesByUser(Guid userId)
        {
            var query = new GetFavouritesQuery() { UserId = userId };
            var result = await _mediator.Send(query);
            var mappedResult = _mapper.Map<List<RecipeGetDto>>(result);
            return Ok(mappedResult);
        }

        [HttpPut]
        [Route("add")]
        public async Task<IActionResult> AddToFavourites([FromBody] FavouritesDto favourites)
        {
            var command = new AddRecipeToFavouritesCommand() { RecipeId = favourites.RecipeId, UserId = favourites.UserId };
            var result = await _mediator.Send(command);
            var mappedResult = _mapper.Map<UserNameDto>(result);
            return Ok(mappedResult);
        }

        [HttpPut]
        [Route("delete")]
        public async Task<IActionResult> RemoveFromFavourites([FromBody] FavouritesDto favourites)
        {
            var command = new RemoveRecipeFromFavouritesCommand() { UserId=favourites.UserId, RecipeId = favourites.RecipeId };
            var result = await _mediator.Send(command);
            var mappedResult = _mapper.Map<UserNameDto>(result);
            return Ok(mappedResult);
        }

        [HttpPost]
        public async Task<IActionResult> IsFavourite([FromBody] FavouritesDto favourites)
        {
            var query = new IsFavouriteQuery() { RecipeId=favourites.RecipeId, UserId = favourites.UserId };
            var result = await _mediator.Send(query);
            return Ok(result);
        }
        
    }

}
