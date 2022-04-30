using Application.Interfaces;
using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Categories.Queries.GetCategory
{
    public class GetCategoryQueryHandler : IRequestHandler<GetCategoryQuery, Category>
    {
        private readonly ICategoryRepository _repository;
        public GetCategoryQueryHandler(ICategoryRepository repository)
        {
            _repository = repository;
        }
        public async Task<Category> Handle(GetCategoryQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetById(request.CategoryId);
        }
    }
}
