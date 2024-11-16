using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interface
{
    public partial interface  ITaiKhoanRepository
    {
         public List<TaiKhoan_DTO> GetAll();
         public List<TaiKhoan_DTO> GetByTk(string tk);
         TaiKhoan_DTO DangNhap(string taiKhoan, string MatKhau);
         int DangKy(TaiKhoan_DTO dto);
         bool DoiMK(string taiKhoan, string matkhaumoi);
         bool Delete(string id);

    }
}
