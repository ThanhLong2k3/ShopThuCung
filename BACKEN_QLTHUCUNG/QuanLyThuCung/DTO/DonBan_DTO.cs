using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DonBan_DTO
    {
        public int maDonBan { get; set; }
        public DateTime ngayBan { get; set; }
        public int? maNhanVien { get; set; }
        public int maKhachHang { get; set; }
        public decimal tongTien { get; set; }
        public string trangThai { get; set; }
    }
    public class V_DonBan_DTO
    {
        public int maDonBan { get; set; }
        public DateTime ngayBan { get; set; }
        public float tongTien { get; set; }
        public string trangThai { get; set; }
        public string tenKhachHang { get; set; }
        public string diaChi_KH { get; set; }
        public string soDienThoai_KH { get; set; }
        public string tenThuCung { get; set; }
        public int soLuong { get; set; }
        public float giaBan { get; set; }
    }

}
