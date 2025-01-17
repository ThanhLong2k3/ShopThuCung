﻿using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interface
{
    public partial interface IKhachHang_BLL
    {
        List<KhachHang_DTO> GetAll();
        public List<KhachHang_DTO> PhanTrang(int PageIndex, int PageSize);

        List<KhachHang_DTO> GetById(int id);
        List<KhachHang_DTO> GetByTK(string id);
        public List<KhachHang_DTO> Search_KH(string? tenkh, string? sdt);
        int Create(KhachHang_DTO model);
        bool Update(KhachHang_DTO model);
        bool Delete(int id);
    }
}
