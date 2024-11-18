using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interface
{
    public partial interface IChiTietDonNhapRepository
    {
        public List<ChiTietDonNhap_DTO> GetAll();
        public List<V_ChiTietDonNhap_DTO> GetById(int id);
        int Create(ChiTietDonNhap_DTO model);
        bool Update(ChiTietDonNhap_DTO model);
        bool Delete(int id);
    }

}
