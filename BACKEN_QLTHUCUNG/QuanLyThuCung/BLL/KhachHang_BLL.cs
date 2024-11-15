using System.Collections.Generic;
using BLL.Interface;
using DAL.Interface;
using DTO;

namespace BLL
{
    public class KhachHang_BLL : IKhachHang_BLL
    {
        private IKhachHangRepository _res;

        public KhachHang_BLL(IKhachHangRepository res)
        {
            _res = res;
        }

        public List<KhachHang_DTO> GetAll()
        {
            return _res.GetAll();
        }

        public List<KhachHang_DTO> GetById(int id)
        {
            return _res.GetById(id);
        }
        public List<KhachHang_DTO> GetByTK(string id)
        {
            return _res.GetByTK(id);
        }

        public int Create(KhachHang_DTO model)
        {
            return _res.Create(model);
        }

        public bool Update(KhachHang_DTO model)
        {
            return _res.Update(model);
        }

        public bool Delete(int id)
        {
            return _res.Delete(id);
        }
    }
}
