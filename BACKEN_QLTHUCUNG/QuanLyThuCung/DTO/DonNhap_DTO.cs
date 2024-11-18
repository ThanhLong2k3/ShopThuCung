using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DonNhap_DTO
    {
        public int maDonNhap { get; set; }
        public DateTime ngayNhap { get; set; }
        public int maNhaCungCap { get; set; }
        public int  maNhanVien { get; set; }
        public decimal tongTien { get; set; }
        public string trangThai {  get; set; }
    }
    public class V_DonNhap_DTO
    {
        public int maDonNhap { get; set; }
        public DateTime ngayNhap { get; set; }

        public string tenNhanVien { get; set; }
        public string trangThai { get; set; }
        public decimal tongTien { get; set; }
        public string tenNhaCungCap { get; set; }
        public int maNhanVien { get; set; }
        public int maNhaCungCap { get; set; }
        public string diaChi { get; set; }
        public string soDienThoai { get; set; }
    }
}
