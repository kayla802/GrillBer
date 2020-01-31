using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace GrillBer.Backend.Data_Acess
{
    public class DaoBase
    {

        public const string GrillBerDBLocation = @"C:\GrillBer\Grillber.db";

        public DaoBase()
        {
            var grillberDBDir = Path.GetDirectoryName(GrillBerDBLocation);
            if (grillberDBDir != null && !Directory.Exists(grillberDBDir))
            {
                Directory.CreateDirectory(grillberDBDir);
            }
        }
    }
}