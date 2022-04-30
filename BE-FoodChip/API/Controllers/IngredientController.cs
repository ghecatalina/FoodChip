using API.DTOs;
using Application.Ingredients.Commands.CreateIngredient;
using Application.Ingredients.Queries.GetIngredientById;
using Application.Ingredients.Queries.GetIngredients;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public IngredientController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateIngredient([FromBody] IngredientPutPostDto ingredient)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            //var command = _mapper.Map<CreateIngredientCommand>(ingredient);

            //var created = await _mediator.Send(command);
            var created = await _mediator.Send(new CreateIngredientCommand { IngredientName = ingredient.IngredientName });

            var dto = _mapper.Map<IngredientGetDto>(created);

            return CreatedAtAction(nameof(GetIngredientById), new { ingredientId = created.Id }, dto);
        }

        [HttpGet]
        [Route("{ingredientId}")]
        public async Task<IActionResult> GetIngredientById(int ingredientId)
        {
            var query = new GetIngredientByIdQuery { Id = ingredientId };
            var result = await _mediator.Send(query);

            if (result == null)
                return NotFound();

            var mappedResult = _mapper.Map<IngredientGetDto>(result);
            return Ok(mappedResult);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllIngredients()
        {
            var query = new GetIngredientsQuery();
            var result = await _mediator.Send(query);
            var mappedResult = _mapper.Map<List<IngredientGetDto>>(result);
            return Ok(mappedResult);
        }
    }
}
