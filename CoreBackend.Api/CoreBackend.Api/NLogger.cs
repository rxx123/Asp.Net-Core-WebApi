using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreBackend.Api
{
    public class NLogger
    {
        public static NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
    }
}
