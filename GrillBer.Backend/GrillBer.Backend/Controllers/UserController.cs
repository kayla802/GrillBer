using GrillBer.Backend.Data_Access;
using GrillBer.Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GrillBer.Backend.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        [HttpGet]
        [Route("{userId:Guid}")]
        public User GetUser(Guid userId)
        {
            var userDao = new UserDao();
            return userDao.GetSingleUserById(userId);
        }

		[HttpGet]
		[Route("{username}")]
		public User GetUserByUsername(string username)
		{
			var userDao = new UserDao();
			return userDao.GetUserByUsername(username);
		}

		[HttpGet]
        public IEnumerable<User> GetAllUsers()
        {
            var userDao = new UserDao();
            return userDao.GetAllUsers();
        }

        [HttpPost]
        public User NewUser(User user)
        {
            var userDao = new UserDao();
            return userDao.NewUser(user);
        }
    }
}
