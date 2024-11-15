using DAL.Interface;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class TaiKhoanRepository: ITaiKhoanRepository
    {
        private IDatabaseHelper _dbHelper;
        public TaiKhoanRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public TaiKhoan_DTO DangNhap(string taiKhoan,string matKhau)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "DangNhap", 
                    "@taiKhoan", taiKhoan,
                    "@matKhau",matKhau);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<TaiKhoan_DTO>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int DangKy(TaiKhoan_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "DangKy",
                    "@taiKhoan", model.taiKhoan,
                    "@matKhau", model.matKhau,
                    "@vaiTro", model.vaiTro
                );

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception("Stored procedure error: " + msgError);
                }
                if (result == null || Convert.ToInt32(result) == 0)
                {
                    throw new Exception("DangKy failed: Account might already exist.");
                }

                return Convert.ToInt32(result);
            }
            catch (Exception ex)
            {
                throw new Exception("Error in DangKy: ", ex);
            }
        }
        public bool DoiMK(string taikhoan, string mkm)
        {
            string msgError = "";
            try
            {
                // Thực thi stored procedure và lấy kết quả
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "DoiMK",
                    "@taiKhoan", taikhoan,
                    "@matkhaumoi", mkm
                );

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception("Stored procedure error: " + msgError);
                }

                // Kiểm tra kết quả trả về từ stored procedure
                if (result == null || Convert.ToInt32(result) == 0)
                {
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error in DoiMK: ", ex);
            }
        }



    }
}
