using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interface
{
    public partial interface IDonBanRepository
    {
        public List<DonBan_DTO> GetAll();
        public List<V_DonBan_DTO> GetById(int id);
        public List<DonBan_DTO> GetByTK(string tk);

        int Create(DonBan_DTO model);
        bool Update(DonBan_DTO model);
        bool Delete(int id);
    }

}
