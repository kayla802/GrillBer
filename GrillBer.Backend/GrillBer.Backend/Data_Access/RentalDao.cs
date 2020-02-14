using GrillBer.Backend.Data_Acess;
using GrillBer.Backend.Models;
using LiteDB;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GrillBer.Backend.Data_Access
{
    public class RentalDao : DaoBase
    {
        public Rental NewRental(Rental inRental)
        {
            var RentalCol = db.GetCollection<Rental>("Rentals");
            Rental newRental = new Rental()
            {
                Id = Guid.NewGuid(),
                User = inRental.User,
                Grill = inRental.Grill,
                Start = DateTime.Now,
                End = inRental.End != default(DateTime) ? inRental.End : DateTime.Now.AddHours(2)

            };

            RentalCol.Insert(newRental);
            return newRental;

        }

        public IEnumerable<Rental> GetAllRentals()
        {
            var RentalCol = db.GetCollection<Rental>("Rentals");
            return RentalCol.FindAll().ToArray();

        }

        //internal static Rental newRental(Rental inRental)
        //{
        //    throw new NotImplementedException();
        //}
    }
}