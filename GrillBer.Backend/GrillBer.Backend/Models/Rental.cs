using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GrillBer.Backend.Models
{
    public class Rental
    {
        public Guid Id { get; set; }
        public Guid User { get; set; }
        public Guid Grill { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}