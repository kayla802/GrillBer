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
    public class RatingController : ApiController
    {
        [HttpPost]
        public Rating NewRating(Rating rating)
        {
            var ratingDao = new RatingDao();
            return ratingDao.NewRating(rating);
        }
        
        [HttpGet]
        public IEnumerable<Rating> GetAllRatings()
        {
            var ratingDao = new RatingDao();
            return ratingDao.GetAllRatings();
        }
    }
}
