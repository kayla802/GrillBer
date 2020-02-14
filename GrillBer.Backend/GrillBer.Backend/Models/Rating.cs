using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GrillBer.Backend.Models
{
    public class Rating
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public int RatingScore { get; set; }
        public Guid GrillId { get; set; }
        public Guid RentalId { get; set; }
    }
}