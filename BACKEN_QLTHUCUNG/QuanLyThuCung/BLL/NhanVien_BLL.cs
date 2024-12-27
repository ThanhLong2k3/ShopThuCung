using System.Collections.Generic;
using BLL.Interface;
using DAL.Interface;
using DTO;

namespace BLL
{
    public class NhanVien_BLL : INhanVien_BLL
    {
        private INhanVienRepository _res;

        public NhanVien_BLL(INhanVienRepository res)
        {
            _res = res;
        }

        public List<NhanVien_DTO> GetAll()
        {
            return _res.GetAll();
        }
        public List<NhanVien_DTO> Search_NV(string? tennv, string? chucvu)
        {
            return _res.Search_NV(tennv, chucvu);
        }
        public List<NhanVien_DTO> GetById(int id)
        {
            return _res.GetById(id);
        }
        public List<NhanVien_DTO> GetByTK(string id)
        {
            return _res.GetByTK(id);
        }

        public int Create(NhanVien_DTO model)
        {
            return _res.Create(model);
        }

        public bool Update(NhanVien_DTO model)
        {
            return _res.Update(model);
        }

        public bool Delete(int id)
        {
            return _res.Delete(id);
        }
        public List<NhanVien_DTO> PhanTrang(int PageIndex, int PageSize)
        {
            return _res.PhanTrang(PageIndex, PageSize);
        }
    }
}
