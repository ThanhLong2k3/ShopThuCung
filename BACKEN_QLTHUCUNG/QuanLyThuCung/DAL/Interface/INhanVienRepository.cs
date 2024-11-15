using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interface
{
    public partial interface INhanVienRepository
    {
        public List<NhanVien_DTO> GetAll();
        public List<NhanVien_DTO> GetById(int id);
        public List<NhanVien_DTO> GetByTK(string id);
        int Create(NhanVien_DTO model);
        bool Update(NhanVien_DTO model);
        bool Delete(int id);
    }

}
