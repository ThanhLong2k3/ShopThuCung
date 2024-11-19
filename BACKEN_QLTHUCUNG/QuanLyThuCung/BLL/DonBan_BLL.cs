using System.Collections.Generic;
using BLL.Interface;
using DAL.Interface;
using DTO;

namespace BLL
{
    public class DonBan_BLL : IDonBan_BLL
    {
        private IDonBanRepository _res;

        public DonBan_BLL(IDonBanRepository res)
        {
            _res = res;
        }

        public List<V_DonBan_DTO> GetAll()
        {
            return _res.GetAll();
        }
        public List<V_DonBan_DTO> Search_DonBan(string? trangthai, string? tenkh, DateTime? ngayban)
        {
            return _res.Search_DonBan(trangthai,tenkh,ngayban);
        }
        public List<V_DonBan_DTO> GetById(int id)
        {
            return _res.GetById(id);
        }
        public List<V_DonBan_DTO> GetByMaDonBan(int id)
        {
            return _res.GetByMaDonBan(id);
        }
        public List<DonBan_DTO> GetByTK(string id)
        {
            return _res.GetByTK(id);
        }

        public int Create(DonBan_DTO model)
        {
            return _res.Create(model);
        }

        public bool Update(DonBan_DTO model)
        {
            return _res.Update(model);
        }

        public bool Delete(int id)
        {
            return _res.Delete(id);
        }
    }
}
