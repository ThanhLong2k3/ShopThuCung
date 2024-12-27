using DTO;

namespace DAL.Interface
{
    public partial interface IKhachHangRepository
    {
        public List<KhachHang_DTO> GetAll();
        public List<KhachHang_DTO> GetById(int id);
        public List<KhachHang_DTO> Search_KH(string ? tenkh,string ? sdt);
        public List<KhachHang_DTO> PhanTrang(int PageIndex, int PageSize);

        public List<KhachHang_DTO> GetByTK(string id);

        int Create(KhachHang_DTO model);
        bool Update(KhachHang_DTO model);
        bool Delete(int id);
    }

}
