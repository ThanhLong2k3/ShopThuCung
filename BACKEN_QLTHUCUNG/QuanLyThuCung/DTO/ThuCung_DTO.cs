using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ThuCung_DTO
    {
        public int maThuCung { get; set; }
        public string tenThuCung { get; set; }
        public int maLoai { get; set; }
        public int soLuong { get; set; }
        public decimal giaNhap { get; set; }
        public decimal giaBan { get; set; }
        public string anh { get; set; }
        public string moTa {  get; set; }
    }
    public class V_ThuCung_DTO
    {
        public int maThuCung { get; set; }
        public string tenThuCung { get; set; }
        public string tenLoai { get; set; }

        public int maLoai { get; set; }
        public int soLuong { get; set; }
        public decimal giaNhap { get; set; }
        public decimal giaBan { get; set; }
        public string anh { get; set; }
        public string moTa { get; set; }
    }
}
