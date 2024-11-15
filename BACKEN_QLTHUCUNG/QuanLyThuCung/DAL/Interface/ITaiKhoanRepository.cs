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
         TaiKhoan_DTO DangNhap(string taiKhoan, string MatKhau);
         int DangKy(TaiKhoan_DTO dto);
         bool DoiMK(string taiKhoan, string matkhaumoi);
    }
}
