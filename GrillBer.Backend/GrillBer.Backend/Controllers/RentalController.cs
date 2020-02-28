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
    [RoutePrefix("api/rental")]
    public class RentalController : ApiController
    {

        [HttpPost]
        public Rental NewRental(Rental inRental)
        {
            RentalDao rentalDao = new RentalDao();
            return rentalDao.NewRental(inRental);
        }

        [HttpGet]
        public Rental[] GetAllRentals(Guid? grill = null, Guid? user = null)
        {
            var rentalDao = new RentalDao();
            IEnumerable<Rental> rentals = rentalDao.GetAllRentals();

            if (grill != null)
            {
                rentals = rentals.Where(g => g.Grill.Equals(grill));
                return rentals.ToArray();
            }

            if (user != null)
            {
                rentals = rentals.Where(r => r.User.Equals(user));
                return rentals.ToArray();
            }
            else
            {
                return rentals.ToArray();
            }
        }
    }
}

