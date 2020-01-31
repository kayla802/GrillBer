using GrillBer.Backend.Data_Acess;
using GrillBer.Backend.Models;
using LiteDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GrillBer.Backend.Data_Access
{
    public class GrillDao : DaoBase
    {
        public Grill GetSingleGrillById(Guid grillID)
        {
            using (var db = new LiteDatabase(GrillBerDBLocation))
            {
                var grillcol = db.GetCollection<Grill>("Grills");
                return grillcol.FindById(grillID);
            }
        }
    }
}