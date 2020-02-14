using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GrillBer.Backend.Models
{
    public class Grill
    {
        public Guid Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string City { get; set; }
        public int Cost { get; set; }

        public int DeliveryFee { get; set; }
        public int Rating { get; set; }
        public Guid OwnerId { get; set; }

        //public Guid RenterId { get; set; }
    }
}