using System.Collections.Generic;
using BLL.Interface;
using DAL.Interface;
using DTO;

namespace BLL
{
    public class DonNhap_BLL : IDonNhap_BLL
    {
        private IDonNhapRepository _res;

        public DonNhap_BLL(IDonNhapRepository res)
        {
            _res = res;
        }

        public List<V_DonNhap_DTO> GetAll()
        {
            return _res.GetAll();
        }

        public List<V_DonNhap_DTO> GetById(int id)
        {
            return _res.GetById(id);
        }

        public int Create(DonNhap_DTO model)
        {
            return _res.Create(model);
        }

        public bool Update(DonNhap_DTO model)
        {
            return _res.Update(model);
        }

        public bool Delete(int id)
        {
            return _res.Delete(id);
        }
    }
}
