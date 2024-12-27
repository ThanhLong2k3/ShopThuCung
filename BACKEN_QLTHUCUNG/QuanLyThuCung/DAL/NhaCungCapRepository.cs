using DAL.Interface;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class NhaCungCapRepository : INhaCungCapRepository
    {
        private IDatabaseHelper _dbHelper;
        public NhaCungCapRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<NhaCungCap_DTO> GetAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_All_NhaCungCap");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<NhaCungCap_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<NhaCungCap_DTO> PhanTrang(int PageIndex, int PageSize)
        {

            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_NhaCungCap_Pagination",
                    "@PageNumber", PageIndex,
                    "@PageSize", PageSize);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<NhaCungCap_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<NhaCungCap_DTO> Search_NCC(string? ten, string ?sdt)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "SearchNhaCungCap", "@TenNhaCungCap",ten, "@SoDienThoai",sdt);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<NhaCungCap_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<NhaCungCap_DTO> GetById(int id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_NhaCungCap_ById", "@MaNhaCungCap", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<NhaCungCap_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Create(NhaCungCap_DTO model)
        {
            string msgError = "";
           
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Them_NhaCungCap",
                    "@TenNhaCungCap", model.tenNhaCungCap, 
                    "@SoDienThoai", model.soDienThoai,
                    "@DiaChi", model.diaChi
                );

               
                return Convert.ToInt32(result);
            
        }


        public bool Update(NhaCungCap_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Sua_NhaCungCap",
                    "@MaNhaCungCap", model.MaNhaCungCap,
                    "@TenNhaCungCap", model.tenNhaCungCap,
                    "@SoDienThoai", model.soDienThoai,
                    "@DiaChi", model.diaChi
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
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "Xoa_NhaCungCap", "@MaNhaCungCap", id);
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
