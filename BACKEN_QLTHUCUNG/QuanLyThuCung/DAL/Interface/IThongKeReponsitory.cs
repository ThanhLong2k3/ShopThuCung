using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interface
{
    public partial interface IThongKeReponsitory
    {
        public ThongKe_DTO getThongKe();
    }
}
