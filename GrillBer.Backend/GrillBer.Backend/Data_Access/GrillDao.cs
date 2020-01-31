using GrillBer.Backend.Data_Acess;
using GrillBer.Backend.Models;
using LiteDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

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

        public Grill[] GetGrills(Expression<Func<Grill, bool>> predicate = null)
        {
            using (var db = new LiteDatabase(GrillBerDBLocation))
            {
                var grillCol = db.GetCollection<Grill>("Grills");
                return predicate == null
                    ? grillCol.FindAll().ToArray()
                    : grillCol.Find(predicate).ToArray();
            }

        }

                     
        public Grill CreateNewGrill(Grill inGrill)
        {
            using (var db = new LiteDatabase(GrillBerDBLocation))
            {
                var grillCol = db.GetCollection<Grill>("Grills");
                var userDao = new UserDao();
                var foundUser = userDao.GetSingleUserById(inGrill.Owner);
                if (foundUser == null)
                {
                    throw new KeyNotFoundException("User doesn't exist: " + inGrill.Owner.ToString());
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
