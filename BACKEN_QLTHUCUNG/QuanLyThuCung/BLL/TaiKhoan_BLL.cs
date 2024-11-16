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
  
    public class TaiKhoan_BLL : ITaiKhoanBLL
    {
        private ITaiKhoanRepository _res;

        public TaiKhoan_BLL(ITaiKhoanRepository res)
        {
            _res = res;
        }
        public List<TaiKhoan_DTO> GetAll()
        {
            return _res.GetAll();
        }
        public List<TaiKhoan_DTO> GetByTk(string tk)
        {
            return _res.GetByTk(tk);
        }
        public TaiKhoan_DTO DangNhap(string tk,string mk)
        {
            return _res.DangNhap(tk,mk);
        }
        public int DangKy(TaiKhoan_DTO model)
        {
            return _res.DangKy(model);
        }

        public bool DoiMK(string tk,string mkm)
        {
            return _res.DoiMK(tk,mkm);
        }
        public bool Delete(string id)
        {
            return _res.Delete(id);
        }
    }
    }
