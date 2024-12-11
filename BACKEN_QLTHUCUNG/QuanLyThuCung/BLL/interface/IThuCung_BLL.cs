using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interface
{
    public partial  interface IThuCung_BLL
    {
        public List<V_ThuCung_DTO> Get_Top5_ThuCung();
        List<V_ThuCung_DTO> GetAll();
        public List<V_ThuCung_DTO> Search_ThuCung(string? tenthucung, int? maloai, decimal? giabanmin, decimal? giabanmax);
        List<ThuCung_DTO> GetById(int id);
        List<V_ThuCung_DTO> Get_MaLoai(int id);
        int Create(ThuCung_DTO model);
        bool Update(ThuCung_DTO model);
        bool Delete(int id);
    }
}
