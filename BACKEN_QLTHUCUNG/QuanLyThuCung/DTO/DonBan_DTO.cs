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
        public string taiKhoan_nv { get; set; }
        public string taiKhoan_kh { get; set; }
        public decimal tongTien { get; set; }
        public string trangThai { get; set; }
    }

}
