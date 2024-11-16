using DAL.Interface;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class GioHangRepository: IGioHangRepository
    {
        private IDatabaseHelper _dbHelper;

        public GioHangRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<V_GioHang_DTO> getGioHang_TK(string tk)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_GioHang_ByTaiKhoan",
                    "@TaiKhoan",tk);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<V_GioHang_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<GioHang_DTO> get_gh_tk_id(string tk, int ma)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "get_gh_tk_id",
                    "@TaiKhoan", tk,
                    "@maThuCung",ma);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<GioHang_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Create(GioHang_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Them_GioHang",
                    "@TaiKhoan", model.taiKhoan,
                    "@MaThuCung", model.maThuCung,
                    "@SoLuong", model.soLuong
                );
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(Convert.ToString(result) + msgError);
                return Convert.ToInt32(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Update(string tk,string matc, int ac)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Sua_GioHang",
                    "@TaiKhoan",tk,
                    "@MaThuCung",matc,
                    "@Action",ac
                );
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
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
        public bool Update_gh(GioHang_DTO md)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Sua_GioHang",
                    "@TaiKhoan", md.taiKhoan,
                    "@MaThuCung", md.maThuCung,
                    "@SoLuong", md.soLuong
                );
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
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

        public bool Delete(string tk,int id)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "Xoa_GioHang", "@TaiKhoan", tk, "@MaThuCung",id);
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
        public bool Delete_TK(string tk)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "DELETE_GH_TK", "@TaiKhoan", tk);
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
