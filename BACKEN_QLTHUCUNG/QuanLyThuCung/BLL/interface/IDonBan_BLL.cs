using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interface
{
    public partial interface IDonBan_BLL
    {
        public List<V_DonBan_DTO> GetAll();
        public List<V_DonBan_DTO> GetById(int id);
        public List<DonBan_DTO> GetByTK(string tk);
        public List<V_DonBan_DTO> GetByMaDonBan(int id);

        int Create(DonBan_DTO model);
        bool Update(DonBan_DTO model);
        bool Delete(int id);
    }
}
