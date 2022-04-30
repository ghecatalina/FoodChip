using Application.Interfaces;
using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Categories.Commands.CreateCategory
{
    public class CreateCategoryCommandHandlern : IRequestHandler<CreateCategoryCommand, Category>
    {
        private readonly ICategoryRepository _repository;
        public CreateCategoryCommandHandlern(ICategoryRepository repository)
        {
            _repository = repository;
        }
        public async Task<Category> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = new Category() { CategoryName = request.CategoryName };
            await _repository.Add(category);
            return category;
        }
    }
}
