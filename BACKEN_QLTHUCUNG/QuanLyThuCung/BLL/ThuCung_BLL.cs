using System.Collections.Generic;
using BLL.Interface;
using DAL.Interface;
using DTO;

namespace BLL
{
    public class ThuCung_BLL : IThuCung_BLL
    {
        private IThuCungRepository _res;

        public ThuCung_BLL(IThuCungRepository res)
        {
            _res = res;
        }

        public List<V_ThuCung_DTO> GetAll()
        {
            return _res.GetAll();
        }
        public List<V_ThuCung_DTO> Get_Top5_ThuCung()
        {
            return _res.Get_Top5_ThuCung();
        }
        public List<ThuCung_DTO> GetById(int id)
        {
            return _res.GetById(id);
        }
        public List<V_ThuCung_DTO> Get_MaLoai(int id)
        {
            return _res.Get_MaLoai(id);
        }
        public int Create(ThuCung_DTO model)
        {
            return _res.Create(model);
        }

        public bool Update(ThuCung_DTO model)
        {
            return _res.Update(model);
        }

        public bool Delete(int id)
        {
            return _res.Delete(id);
        }
    }
}
