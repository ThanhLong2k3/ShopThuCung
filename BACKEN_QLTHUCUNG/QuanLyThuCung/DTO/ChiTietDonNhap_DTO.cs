using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ChiTietDonNhap_DTO
    {
        public int maDonNhap { get; set; }
        public int maThuCung { get; set; }
        public int soLuong { get; set; }
        public decimal giaNhap { get; set; }
    }
    public class V_ChiTietDonNhap_DTO
    {
        public string tenThuCung { get; set; }
        public int maDonNhap { get; set; }
    


        public int maThuCung { get; set; }
        public int soLuong { get; set; }
        public decimal giaNhap { get; set; }
    }

}
