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
    public class GrillController : ApiController
    {
        [HttpGet]
        [Route("{gillId: Guid}")]
        public Grill GetSingleGrill(Guid grillID)
        {
            var grillDao = new GrillDao();
            return grillDao.GetSingleGrillById(grillID);
        }

        [HttpGet]
        public Grill[] GetGrills(string brand = null, string model = null, string city = null, int? cost, int? rating)
        {
            var grillDao = new GrillDao();
            IEnumerable<Grill> grills = grillDao.GetGrills();
            
            if (!string.IsNullOrWhiteSpace(brand))
            {
                grills = grills.Where(g => g.Brand.Contains(brand));
            }

            if (!string.IsNullOrWhiteSpace(model))
            {
                grills = grills.Where(g => g.Model.Contains(model));
            }

            if (!string.IsNullOrWhiteSpace(city))
            {
                grills = grills.Where(g => g.City.Contains(city));
            }

            if (cost.HasValue)
            {
                grills = grills.Where(g => g.Cost.Equals(cost));
            }

            if (rating.HasValue)
            {
                grills = grills.Where(g => g.Rating.Equals(rating));
            }

            return grills.ToArray();
        }

        [HttpPost]
        public Grill AddNewGrill(Grill inGrill)
        {
            var grillDao = new GrillDao();
            return grillDao.CreateNewGrill(inGrill);
        }
    }
}
