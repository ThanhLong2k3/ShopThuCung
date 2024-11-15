using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interface
{
    public partial interface INhaCungCapRepository
    {
        public List<NhaCungCap_DTO> GetAll();
        public List<NhaCungCap_DTO> GetById(int id);
        int Create(NhaCungCap_DTO model);
        bool Update(NhaCungCap_DTO model);
        bool Delete(int id);
    }
}
