using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class GioHang_DTO
    {
        public string taiKhoan {  get; set; }
        public int maThuCung {  get; set; }
        public int soLuong {  get; set; }
    }
    public class V_GioHang_DTO
    {
        public string maThuCung { get; set; }
        public string tenThuCung { get; set; }
        public int soLuong { get; set; }
        public string tenLoai { get; set; }
        public float giaBan { get; set; }
        public string anh { get; set; }
    }

}
