using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interface
{
    public partial interface IThuCungRepository
    {
        public List<V_ThuCung_DTO> GetAll();
        public List<V_ThuCung_DTO> Get_MaLoai(int ma);
        public List<V_ThuCung_DTO> Get_Top5_ThuCung();


        public List<ThuCung_DTO> GetById(int id);

        int Create(ThuCung_DTO model);

        bool Update(ThuCung_DTO model);

        bool Delete(int id);
    }

}
