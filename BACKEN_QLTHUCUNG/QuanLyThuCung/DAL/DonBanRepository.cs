using DAL.Interface;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DonBanRepository : IDonBanRepository
    {
        private IDatabaseHelper _dbHelper;

        public DonBanRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<DonBan_DTO> GetAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_All_DonBan");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<DonBan_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<V_DonBan_DTO> GetById(int id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_DonBan_ByMaKH", "@MaKhachHang", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<V_DonBan_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DonBan_DTO> GetByTK(string tk)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_DonBan_ByTaiKhoan", "@TaiKhoan", tk);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<DonBan_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int Create(DonBan_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Them_DonBan",
                    "@NgayBan", model.ngayBan,
                    "@MaKhachHang", model.maKhachHang,
                    "@MaNhanVien", model.maNhanVien,
                    "@TongTien", model.tongTien
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
                throw ex;
            }
        }

        public bool Update(DonBan_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Sua_DonBan",
                    "@MaDonBan", model.maDonBan,
                    "@NgayBan", model.ngayBan,
                    "@MaKhachHang", model.maKhachHang,
                    "@MaNhanVien", model.maNhanVien,
                    "@TongTien", model.tongTien,
                    "@TrangThai", model.trangThai
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
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "Xoa_DonBan", "@MaDonBan", id);
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
