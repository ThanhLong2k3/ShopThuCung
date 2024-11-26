using System.Collections.Generic;
using BLL.Interface;
using DAL.Interface;
using DTO;

namespace BLL
{
    public class ChiTietDonBan_BLL : ICTDonBan_BLL
    {
        private IChiTietDonBanRepository _res;

        public ChiTietDonBan_BLL(IChiTietDonBanRepository res)
        {
            _res = res;
        }

        public List<ChiTietDonBan_DTO> GetAll()
        {
            return _res.GetAll();
        }

        public List<V_ChiTietDonBan_DTO> GetById(int id)
        {
            return _res.GetById(id);
        }

        public int Create(ChiTietDonBan_DTO model)
        {
            return _res.Create(model);
        }

        public bool Update(ChiTietDonBan_DTO model)
        {
            return _res.Update(model);
        }

        public bool Delete(int id)
        {
            return _res.Delete(id);
        }
    }
}
