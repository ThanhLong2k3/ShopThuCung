using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interface
{
    public partial interface IKhachHang_BLL
    {
        List<KhachHang_DTO> GetAll();
        List<KhachHang_DTO> GetById(int id);
        List<KhachHang_DTO> GetByTK(string id);

        int Create(KhachHang_DTO model);
        bool Update(KhachHang_DTO model);
        bool Delete(int id);
    }
}
