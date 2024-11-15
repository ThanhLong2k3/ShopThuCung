using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interface
{
    public partial interface IKhachHangRepository
    {
        public List<KhachHang_DTO> GetAll();
        public List<KhachHang_DTO> GetById(int id);
        public List<KhachHang_DTO> GetByTK(string id);

        int Create(KhachHang_DTO model);
        bool Update(KhachHang_DTO model);
        bool Delete(int id);
    }

}
