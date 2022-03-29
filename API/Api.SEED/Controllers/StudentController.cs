
using BLL.ParsingService;
using BLL.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController
    {
        private readonly IStudentService _studentService;

        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpGet("{id}")]
        public StudentModel GetStudent(int id)
        {

            return _studentService.GetStudent(id);
        }

        [HttpGet]
        public List<StudentModel> GetStudents()
        {

            return _studentService.GetStudents();
        }

        [HttpPost]
        public GenericModel<StudentModel> AddStudent(StudentModel student)
        {
            return _studentService.AddStudent(student);
        }

        [HttpPut]
        public GenericModel<StudentModel> UpdateStudent(StudentModel student)
        {
            return _studentService.UpdateStudent(student);
        }

        [HttpDelete("{id}")]
        public GenericModel<StudentModel> DeleteStudent(int id)
        {
            return _studentService.DeleteStudent(id);
        }

    }
}
