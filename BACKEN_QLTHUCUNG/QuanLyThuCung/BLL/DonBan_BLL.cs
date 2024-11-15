﻿using System.Collections.Generic;
using BLL.Interface;
using DAL.Interface;
using DTO;

namespace BLL
{
    public class DonBan_BLL : IDonBan_BLL
    {
        private IDonBanRepository _res;

        public DonBan_BLL(IDonBanRepository res)
        {
            _res = res;
        }

        public List<DonBan_DTO> GetAll()
        {
            return _res.GetAll();
        }

        public List<DonBan_DTO> GetById(int id)
        {
            return _res.GetById(id);
        }
        public List<DonBan_DTO> GetByTK(string id)
        {
            return _res.GetByTK(id);
        }

        public int Create(DonBan_DTO model)
        {
            return _res.Create(model);
        }

        public bool Update(DonBan_DTO model)
        {
            return _res.Update(model);
        }

        public bool Delete(int id)
        {
            return _res.Delete(id);
        }
    }
}
