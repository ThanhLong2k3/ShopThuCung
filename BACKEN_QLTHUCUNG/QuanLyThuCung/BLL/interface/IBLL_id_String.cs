using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interface
{
    public interface IBLL_id_String<T>
    {
        List<T> GetAll();
        List<T> GetById(string id);
        int Create(T model);
        bool Update(T model);
        bool Delete(string id);
    }
}
