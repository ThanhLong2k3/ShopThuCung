using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interface
{
    public partial interface IGioHangRepository
    {
        List<V_GioHang_DTO> getGioHang_TK(string tk);
        List<GioHang_DTO> get_gh_tk_id(string tk,int ma);

        int Create(GioHang_DTO model);
        bool Update(string tk, string matc, int ac);
        bool Update_gh(GioHang_DTO model);

        bool Delete(string tk,int mathucung);
        bool Delete_TK(string tk);

    }
}
