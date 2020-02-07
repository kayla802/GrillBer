using GrillBer.Backend.Data_Acess;
using GrillBer.Backend.Data_Acess;
using GrillBer.Backend.Models;
using LiteDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GrillBer.Backend.Data_Access
{
    public class RentalDao : DaoBase
    {
        public Rental NewRental(Rental inRental)
        {
            using (var db = new LiteDatabase(GrillBerDBLocation))
            {
                var RentalCol = db.GetCollection<Rental>("Rentals");
                Rental newRental = new Rental()
                {
                    Id = Guid.NewGuid(),
                    User = inRental.User,
                    Grill = inRental.Grill,
                    Start = DateTime.Now,
                    End = DateTime.Now


                };

                RentalCol.Insert(newRental);
                return newRental;
            }
        }

        //internal static Rental newRental(Rental inRental)
        //{
        //    throw new NotImplementedException();
        //}
    }
}