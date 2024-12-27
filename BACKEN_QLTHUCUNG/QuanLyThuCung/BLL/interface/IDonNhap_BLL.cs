using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interface
{
    public partial interface IDonNhap_BLL
    {
        List<V_DonNhap_DTO> GetAll();
        public List<V_DonNhap_DTO> PhanTrang(int PageIndex, int PageSize);

        public List<V_DonNhap_DTO> Search_DonNhap(DateTime? ngaynhapstar, DateTime? ngayNhapEnd, int? maNhaCungCap, string? trangThai);

        List<V_DonNhap_DTO> GetById(int id);
        int Create(DonNhap_DTO model);
        bool Update(DonNhap_DTO model);
        bool Delete(int id);
    }
}
