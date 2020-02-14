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
            var grillcol = db.GetCollection<Grill>("Grills");
            return grillcol.FindById(grillID);

        }

        public Grill[] GetGrills(Expression<Func<Grill, bool>> predicate = null)
        {
            var grillCol = db.GetCollection<Grill>("Grills");
            return predicate == null
                ? grillCol.FindAll().ToArray()
                : grillCol.Find(predicate).ToArray();


        }


        public Grill CreateNewGrill(Grill inGrill)
        {
            var userDao = new UserDao();
            var foundUser = userDao.GetSingleUserById(inGrill.OwnerId);
            if (foundUser == null)
            {
                throw new KeyNotFoundException("User doesn't exist: " + inGrill.OwnerId.ToString());
            }
            var grillCol = db.GetCollection<Grill>("Grills");
            var newGrill = new Grill()
            {
                Id = Guid.NewGuid(),
                Brand = inGrill.Brand,
                Model = inGrill.Model,
                City = inGrill.City,
                Cost = inGrill.Cost,
                Rating = inGrill.Rating,
                OwnerId = inGrill.OwnerId,
                DeliveryFee = inGrill.DeliveryFee,
                //RenterId = inGrill.RenterId
            };

			grillCol.Insert(newGrill);
            return newGrill;
        }

        public void DeleteGrill(Guid grillId)
        {
            var grillCol = db.GetCollection<Grill>("Grills");
            grillCol.Delete(grillId);

        }
    }
}
