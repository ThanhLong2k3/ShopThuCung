using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interface
{
    public partial interface IDonNhapRepository
    {
        public List<V_DonNhap_DTO> GetAll();
        public List<V_DonNhap_DTO> Search_DonNhap(DateTime? ngaynhapstar,DateTime? ngayNhapEnd,int? maNhaCungCap,string ? trangThai);
        public List<V_DonNhap_DTO> GetById(int id);
        int Create(DonNhap_DTO model);
        bool Update(DonNhap_DTO model);
        bool Delete(int id);
    }

}
