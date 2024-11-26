using DAL.Interface;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DonNhapRepository : IDonNhapRepository
    {
        private IDatabaseHelper _dbHelper;
        public DonNhapRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<V_DonNhap_DTO> GetAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_All_DonNhap");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<V_DonNhap_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<V_DonNhap_DTO> GetById(int id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_DonNhap_ById", "@MaDonNhap", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<V_DonNhap_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Create(DonNhap_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Them_DonNhap",
                    "@NgayNhap", model.ngayNhap,
                    "@MaNhaCungCap", model.maNhaCungCap,
                    "@MaNhanVien", model.maNhanVien,
                    "@TongTien", model.tongTien,
                    "@TrangThai", model.trangThai
                );

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception("Database error: " + msgError);
                }

                if (result != null)
                {
                    return Convert.ToInt32(result);
                }
                else
                {
                    throw new Exception("Thủ tục SQL không trả về mã đơn nhập.");
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public bool Update(DonNhap_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Sua_DonNhap",
                    "@MaDonNhap", model.maDonNhap,
                    "@NgayNhap", model.ngayNhap,
                    "@MaNhaCungCap", model.maNhaCungCap,
                    "@MaNhanVien", model.maNhanVien,
                    "@TongTien", model.tongTien,
                    "@TrangThai",model.trangThai
                );
                if (!string.IsNullOrEmpty(result?.ToString()) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Delete(int id)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "Xoa_DonNhap", "@MaDonNhap", id);
                if (Convert.ToInt32(result) > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
