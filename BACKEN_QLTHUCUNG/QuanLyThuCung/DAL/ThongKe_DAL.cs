using DAL.Interface;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ThongKe_DAL:IThongKeReponsitory
    {
        private IDatabaseHelper _dbHelper;
        public ThongKe_DAL(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public ThongKe_DTO getThongKe()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "ThongKeDoanhThu_ThangHienTai");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThongKe_DTO>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
