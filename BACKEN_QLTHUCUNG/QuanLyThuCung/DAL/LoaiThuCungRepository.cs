using DAL.Interface;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL
{
    public class LoaiThuCungRepository : ILoaiThuCungRepository
    {
        private IDatabaseHelper _dbHelper;

        public LoaiThuCungRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<QL_LoaiThuCung_DTO> GetAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_All_Loai");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<QL_LoaiThuCung_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<QL_LoaiThuCung_DTO> Get_Top5_Loai()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_Top5_Loai");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<QL_LoaiThuCung_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<QL_LoaiThuCung_DTO> Get_Top10_Loai()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_Top10_Loai");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<QL_LoaiThuCung_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<QL_LoaiThuCung_DTO> GetById(int id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_Loai_ById", "@MaLoai", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<QL_LoaiThuCung_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Create(QL_LoaiThuCung_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Them_Loai",
                    "@TenLoai", model.tenLoai
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

        public bool Update(QL_LoaiThuCung_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Sua_Loai",
                    "@MaLoai", model.maLoai,
                    "@TenLoai", model.tenLoai
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

        public bool Delete(int id)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "Xoa_Loai", "@MaLoai", id);
                if (result != null && Convert.ToInt32(result) > 0)
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
                throw; 
            }
        }

        public List<QL_LoaiThuCung_DTO> PhanTrang(int PageIndex, int PageSize)
        {

            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_Loai_Pagination",
                    "@PageNumber", PageIndex,
                    "@PageSize", PageSize);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<QL_LoaiThuCung_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
