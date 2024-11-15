using System.Collections.Generic;

namespace BLL.Interface
{
    public interface IBLL<T>
    {
        List<T> GetAll();
        List<T> GetById(int id);
        int Create(T model);
        bool Update(T model);
        bool Delete(int id);
    }
}
