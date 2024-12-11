using System.Collections.Generic;
using BLL.Interface;
using DAL.Interface;
using DTO;

namespace BLL
{
    public class NhaCungCap_BLL : IBLL<NhaCungCap_DTO>
    {
        private INhaCungCapRepository _res;

        public NhaCungCap_BLL(INhaCungCapRepository res)
        {
            _res = res;
        }

        public List<NhaCungCap_DTO> GetAll()
        {
            return _res.GetAll();
        }
    

        public List<NhaCungCap_DTO> GetById(int id)
        {
            return _res.GetById(id);
        }

        public int Create(NhaCungCap_DTO model)
        {
            return _res.Create(model);
        }

        public bool Update(NhaCungCap_DTO model)
        {
            return _res.Update(model);
        }

        public bool Delete(int id)
        {
            return _res.Delete(id);
        }

        public List<NhaCungCap_DTO> Search(string? ten, string? sdt)
        {
           
                return _res.Search_NCC(ten, sdt);
            
        }
    }
}
