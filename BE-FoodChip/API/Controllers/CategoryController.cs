using API.DTOs;
using Application.Categories.Commands.CreateCategory;
using Application.Categories.Queries.GetCategory;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public CategoryController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CategoryPutPostDto category)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var created = await _mediator.Send(new CreateCategoryCommand { CategoryName = category.CategoryName });
            var dto = _mapper.Map<CategoryGetDto>(created);
            return CreatedAtAction(nameof(GetCategoryById), new { categoryId = created.Id }, dto);
        }

        [HttpGet]
        [Route("{categoryId}")]
        public async Task<IActionResult> GetCategoryById(int categoryId)
        {
            var query = new GetCategoryQuery { CategoryId = categoryId};
            var result = await _mediator.Send(query);

            if (result == null)
                return NotFound();

            var mappedResult = _mapper.Map<CategoryGetDto>(result);
            return Ok(mappedResult);
        }

    }
}
