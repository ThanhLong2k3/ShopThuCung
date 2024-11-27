using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interface
{
    public interface ICTDonBan_BLL
    {
        List<ChiTietDonBan_DTO> GetAll();
        List<V_ChiTietDonBan_DTO> GetById(int id);
        int Create(ChiTietDonBan_DTO model);
        bool Update(ChiTietDonBan_DTO model);
        bool Delete(int id);
    }
}
