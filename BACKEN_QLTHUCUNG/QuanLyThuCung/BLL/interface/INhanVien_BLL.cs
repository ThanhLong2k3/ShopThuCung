using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interface
{
    public partial interface INhanVien_BLL
    {
        List<NhanVien_DTO> GetAll();
        public List<NhanVien_DTO> PhanTrang(int PageIndex, int PageSize);

        List<NhanVien_DTO> GetById(int id);
        List<NhanVien_DTO> GetByTK(string id);
        List<NhanVien_DTO> Search_NV(string? tennv, string? chucvu);
        int Create(NhanVien_DTO model);
        bool Update(NhanVien_DTO model);
        bool Delete(int id);
    }
}
