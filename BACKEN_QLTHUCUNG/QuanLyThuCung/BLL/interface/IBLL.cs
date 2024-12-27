using DTO;
using System.Collections.Generic;

namespace BLL.Interface
{
    public interface IBLL<T>
    {
        List<T> GetAll();
        List<T> Search(string? ten,string? sdt);
        List<T> GetById(int id);
        public List<T> PhanTrang(int PageIndex, int PageSize);

        int Create(T model);
        bool Update(T model);
        bool Delete(int id);
    }
}
