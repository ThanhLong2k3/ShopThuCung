using BLL.Interface;
using DAL.Interface;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class ThongKe_BLL:IThongKe_BLL
    {
        private IThongKeReponsitory _res;

        public ThongKe_BLL(IThongKeReponsitory res)
        {
            _res = res;
        }
        public ThongKe_DTO getThongKe()
        {
            return _res.getThongKe();
        }

    }
}
