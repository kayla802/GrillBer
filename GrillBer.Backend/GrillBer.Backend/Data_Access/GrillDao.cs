using GrillBer.Backend.Data_Acess;
using GrillBer.Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LiteDB;

namespace GrillBer.Backend.Data_Access
{
    public class GrillDao : DaoBase
    {
        public Grill GetSingleGrillById(Guid grillID)
        {
            using (var db = new LiteDatabase(GrillBerDBLocation))
            {
                var grillcol = db.GetCollection<Grill>("Grills");
                return grillcol.FindById(grillID);
            }
        }

        public Grill CreateNewGrill(Grill inGrill)
        {
            using (var db = new LiteDatabase(GrillBerDBLocation))
            {
                var grillCol = db.GetCollection<Grill>("Grills");
                var userDao = new UserDao();
                var foundUser = userDao.GetSingleUserById(owner);
                if (foundUser == null)
                {
                    throw new KeyNotFoundException("User doesn't exist: " + owner.ToSting());
                }
                var newGrill = new Grill()
                {
                    Id = Guid.NewGuid(),
                    Brand = inGrill.Brand,
                    Model = inGrill.Model,
                    City = inGrill.City,
                    Cost = inGrill.Cost,
                    Rating = inGrill.Rating,
                    Owner = inGrill.Owner,
                    RenterId = inGrill.RenterId
                };
                grillCol.Insert(newGrill);
                return newGrill;
            
                
            }
        }

    }
}