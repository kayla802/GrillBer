using GrillBer.Backend.Data_Acess;
using GrillBer.Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GrillBer.Backend.Data_Access
{
    public class UserDao: DaoBase

    {
        public User NewUser(User user)
        {
            //using (var db = new LiteDatabase(GrillBerDBLocation))
            //{
            //    var userCol = db.GetCollection<User>("Users");
            //    var newUser = new User()
            //    {
            //        Id = Guid.NewGuid(),
            //        Username = user.Username,
            //        FirstName = user.FirstName,
            //        LastName = user.LastName
            //    };

            //    userCol.Insert(newUser);
            //    return newUser;
            //}
            return null;

        }
    }
}