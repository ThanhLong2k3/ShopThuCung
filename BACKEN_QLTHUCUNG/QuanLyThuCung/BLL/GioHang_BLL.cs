using BLL.Interface;
using DAL.Interface;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class GioHang_BLL: IGioHang_BLL
    {
        private IGioHangRepository _res;

        public GioHang_BLL(IGioHangRepository res)
        {
            _res = res;
        }

        public List<V_GioHang_DTO> getGioHang_TK(string TK)
        {
            return _res.getGioHang_TK(TK);
        }
        public List<GioHang_DTO> get_gh_tk_id(string tk, int ma)
        {
            return _res.get_gh_tk_id(tk,ma);
        }

        public int Create(GioHang_DTO model)
        {
            return _res.Create(model);
        }
        public bool Update(string tk, string matc, int ac)
        {
            return _res.Update(tk,matc,ac);
        }
        public bool Update_gh(GioHang_DTO md)
        {
            return _res.Update_gh(md);
        }

        public bool Delete(string tk, int mathucung)
        {
            return _res.Delete(tk,mathucung);
        }
        public bool Delete_TK(string tk)
        {
            return _res.Delete_TK(tk);
        }
    }
}
