using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ChiTietDonBan_DTO
    {
        public int maDonBan { get; set; }
        public int maThuCung { get; set; }  
        public string tenThuCung { get; set; }

        public int soLuong { get; set; }
        public decimal giaBan { get; set; }
    }

}
