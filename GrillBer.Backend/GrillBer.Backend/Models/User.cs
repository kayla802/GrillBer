using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GrillBer.Backend.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

    }
}