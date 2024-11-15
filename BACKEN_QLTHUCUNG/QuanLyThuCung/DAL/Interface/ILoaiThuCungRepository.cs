using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interface
{
    public partial interface ILoaiThuCungRepository
    {
        public List<QL_LoaiThuCung_DTO> GetAll();
        public List<QL_LoaiThuCung_DTO> Get_Top5_Loai();
        public List<QL_LoaiThuCung_DTO> Get_Top10_Loai();

        public List<QL_LoaiThuCung_DTO> GetById(int id);
        int Create(QL_LoaiThuCung_DTO model);
        bool Update(QL_LoaiThuCung_DTO model);
        bool Delete(int id);
    }
}
