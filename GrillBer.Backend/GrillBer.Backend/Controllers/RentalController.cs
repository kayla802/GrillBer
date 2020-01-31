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
    [RoutePrefix("api/rentals")]
    public class RentalController : ApiController
    {
                
            [HttpPost]
        public Rental NewRental(Rental inRental)
        {
            RentalDao rentalDao = new RentalDao();
            return RentalDao.newRental(inRental);
        }

    }
}

