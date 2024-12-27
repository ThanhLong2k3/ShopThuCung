using System.Collections.Generic;
using BLL.Interface;
using DAL.Interface;
using DTO;

namespace BLL
{
    public class QL_LoaiThuCung_BLL : ILoai_BLL
    {
        private ILoaiThuCungRepository _res;

        public QL_LoaiThuCung_BLL(ILoaiThuCungRepository res)
        {
            _res = res;
        }

        public List<QL_LoaiThuCung_DTO> GetAll()
        {
            return _res.GetAll();
        }
        public List<QL_LoaiThuCung_DTO> Get_Top5_Loai()
        {
            return _res.Get_Top5_Loai();
        }
        public List<QL_LoaiThuCung_DTO> Get_Top10_Loai()
        {
            return _res.Get_Top10_Loai();
        }

        public List<QL_LoaiThuCung_DTO> GetById(int id)
        {
            return _res.GetById(id);
        }

        public int Create(QL_LoaiThuCung_DTO model)
        {
            return _res.Create(model);
        }

        public bool Update(QL_LoaiThuCung_DTO model)
        {
            return _res.Update(model);
        }

        public bool Delete(int id)
        {
            return _res.Delete(id);
        }
        public List<QL_LoaiThuCung_DTO> PhanTrang(int PageIndex, int PageSize)
        {
            return _res.PhanTrang(PageIndex, PageSize);
        }
    }
}
