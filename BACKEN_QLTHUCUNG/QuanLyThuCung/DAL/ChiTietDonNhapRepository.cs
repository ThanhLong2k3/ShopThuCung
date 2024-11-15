using DAL.Interface;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL
{
    public class ChiTietDonNhapRepository : IChiTietDonNhapRepository
    {
        private IDatabaseHelper _dbHelper;

        public ChiTietDonNhapRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<ChiTietDonNhap_DTO> GetAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_All_ChiTietDonNhap");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ChiTietDonNhap_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ChiTietDonNhap_DTO> GetById(int id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_ChiTietDonNhap_ById", "@MaDonNhap", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ChiTietDonNhap_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Create(ChiTietDonNhap_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Them_ChiTietDonNhap",
                    "@MaDonNhap", model.maDonNhap,
                    "@MaThuCung", model.maThuCung,
                    "@SoLuong", model.soLuong,
                    "@GiaNhap", model.giaNhap
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

        public bool Update(ChiTietDonNhap_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Sua_ChiTietDonNhap",
                   "@MaDonNhap", model.maDonNhap,
                    "@MaThuCung", model.maThuCung,
                    "@SoLuong", model.soLuong,
                    "@GiaNhap", model.giaNhap
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
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "Xoa_ChiTietDonNhap", "@MaDonNhap", id);
                return Convert.ToInt32(result) > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
