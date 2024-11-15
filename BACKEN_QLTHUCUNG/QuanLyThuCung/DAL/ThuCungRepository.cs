using DAL.Interface;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ThuCungRepository : IThuCungRepository
    {
        private IDatabaseHelper _dbHelper;
        public ThuCungRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<V_ThuCung_DTO> GetAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_All_ThuCung");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<V_ThuCung_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<V_ThuCung_DTO> Get_Top5_ThuCung()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_Top5_SP");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<V_ThuCung_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ThuCung_DTO> GetById(int id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_ThuCung_ById", "@MaThuCung", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ThuCung_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<V_ThuCung_DTO> Get_MaLoai(int id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_SP_MaLoai", "@MaLoai", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<V_ThuCung_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Create(ThuCung_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Them_ThuCung",
                    "@TenThuCung", model.tenThuCung,
                    "@MaLoai", model.maLoai,
                    "@SoLuong", model.soLuong,
                    "@GiaNhap", model.giaNhap,
                    "@GiaBan", model.giaBan,
                    "@Anh", model.anh,
                    "@MoTa",model.moTa
                );
                if (!string.IsNullOrEmpty(result?.ToString()) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return Convert.ToInt32(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Update(ThuCung_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Sua_ThuCung",
                    "@MaThuCung", model.maThuCung,
                      "@TenThuCung", model.tenThuCung,
                    "@MaLoai", model.maLoai,
                    "@SoLuong", model.soLuong,
                    "@GiaNhap", model.giaNhap,
                    "@GiaBan", model.giaBan,
                   "@Anh", model.anh,
                    "@MoTa", model.moTa
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
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "Xoa_ThuCung", "@MaThuCung", id);
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
