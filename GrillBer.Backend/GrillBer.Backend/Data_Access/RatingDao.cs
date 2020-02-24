using GrillBer.Backend.Data_Acess;
using GrillBer.Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GrillBer.Backend.Data_Access
{
    public class RatingDao : DaoBase

    {
        public Rating NewRating(Rating rating)
        {
            var ratingCol = db.GetCollection<Rating>("Ratings");
            var newRating = new Rating()
            {
                Id = Guid.NewGuid(),
                UserId = rating.UserId,
                RatingScore = rating.RatingScore,
                GrillId = rating.GrillId,
                RentalId = rating.RentalId
            };
            ratingCol.Insert(newRating);
            return newRating;
        }
        public IEnumerable<Rating> GetAllRatings()
        {
            var ratingCol = db.GetCollection<Rating>("Ratings");
            return ratingCol.FindAll().ToArray();

        }
        public Rating GetSingleRatingById(Guid ratingId)
        {
            var ratingcol = db.GetCollection<Rating>("Ratings");
            return ratingcol.FindById(ratingId);

        }

  
    }

}