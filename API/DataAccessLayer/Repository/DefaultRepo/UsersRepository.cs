
using DataAccessLayer.AppDbContext;
using DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VIT.UserManagement.Interfaces;

namespace BLL.Repository.DefaultRepo
{
    public class UsersRepository : IUsersRepository<User>
    {
        private readonly DefaultAPIDbContext _context;
        private readonly UserManager<User> _userManager;


        public UsersRepository(DefaultAPIDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public List<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public async Task UpdateUser(User user)
        {
            var dbUser = await this._userManager.FindByIdAsync(user.Id);

            dbUser.Email = user.Email;
            dbUser.FirstName = user.FirstName;
            dbUser.LastName = user.LastName;
            dbUser.Token = user.Token;
            dbUser.UserName = user.Email;

            await this._userManager.UpdateAsync(dbUser);
        }

    }
}
