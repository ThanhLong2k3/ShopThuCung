using System.Collections.Generic;
using BLL.Interface;
using DAL.Interface;
using DTO;

namespace BLL
{
    public class ChiTietDonNhap_BLL : ICTDonNhap_BLL
    {
        private IChiTietDonNhapRepository _res;

        public ChiTietDonNhap_BLL(IChiTietDonNhapRepository res)
        {
            _res = res;
        }

        public List<ChiTietDonNhap_DTO> GetAll()
        {
            return _res.GetAll();
        }

        public List<V_ChiTietDonNhap_DTO> GetById(int id)
        {
            return _res.GetById(id);
        }

        public int Create(ChiTietDonNhap_DTO model)
        {
            return _res.Create(model);
        }

        public bool Update(ChiTietDonNhap_DTO model)
        {
            return _res.Update(model);
        }

        public bool Delete(int id)
        {
            return _res.Delete(id);
        }
    }
}
