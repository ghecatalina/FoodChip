using API.DTOs;
using Application.Recipes.Commands.CreateRecipe;
using Application.Recipes.Queries.GetRecipeById;
using Application.Recipes.Queries.SearchByIngredients;
using Application.Recipes.Queries.GetAllRecipes;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Recipes.Commands.UpdateRecipe;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public RecipeController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRecipe([FromBody] RecipePutPostDto recipe)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _mediator.Send(new CreateRecipeCommand
            {
                Name = recipe.Name,
                Description = recipe.Description,
                CategoryId = recipe.CategoryId,
                Status = recipe.Status,
                UserId = recipe.UserId,
                Ingredients = recipe.Ingredients,
                RecipeCoverImage = recipe.CoverImage,
            });
            var dto = _mapper.Map<RecipeGetDto>(created);

            return CreatedAtAction(nameof(GetRecipeById), new { recipeId = created.Id }, dto);
        }

        [HttpGet]
        [Route("{recipeId}")]
        public async Task<IActionResult> GetRecipeById(int recipeId)
        {
            var query = new GetRecipeByIdQuery { RecipeId = recipeId };
            var result = await _mediator.Send(query);

            if (result == null)
                return NotFound();

            var mappedResult = _mapper.Map<RecipeGetDto>(result);
            return Ok(mappedResult);
        }

        [HttpPost]
        [Route("search")]
        public async Task<IActionResult> SearchByIngredients([FromBody] SearchDto search)
        {
            var query = new SearchByIngredientsQuery() { Category = search.Category, Ingredients = search.Ingredients };
            var result = await _mediator.Send(query);
            var mappedResult = _mapper.Map<List<RecipeGetDto>>(result);
            return Ok(mappedResult);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRecipes()
        {
            var query = new GetAllRecipesQuery();
            var result = await _mediator.Send(query);
            var mappedResult = _mapper.Map<IEnumerable<RecipeDto>>(result);
            return Ok(mappedResult);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateRecipe([FromBody] UpdateRecipeDto updateRecipe)
        {
            var command = new UpdateRecipeStatusCommand() { RecipeId = updateRecipe.RecipeId, Status = updateRecipe.Status };
            var result = await _mediator.Send(command);
            var mappedResult = _mapper.Map<RecipeGetDto>(result);
            return Ok(mappedResult);
        }
    }
}
