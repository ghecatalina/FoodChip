using API.DTOs;
using Application.Favourites.Commands.AddRecipe;
using Application.Favourites.Commands.RemoveRecipe;
using Application.Favourites.Queries.GetFavourites;
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
        public async Task<IActionResult> AddToFavourites([FromBody] FavouritesDto favourites)
        {
            var command = new AddRecipeToFavouritesCommand() { RecipeId = favourites.RecipeId, UserId = favourites.UserId };
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveFromFavourites([FromBody] FavouritesDto favourites)
        {
            var command = new RemoveRecipeFromFavouritesCommand() { UserId=favourites.UserId, RecipeId = favourites.RecipeId };
            var result = await _mediator.Send(command);
            return Ok(result);
        }
        
    }

}
