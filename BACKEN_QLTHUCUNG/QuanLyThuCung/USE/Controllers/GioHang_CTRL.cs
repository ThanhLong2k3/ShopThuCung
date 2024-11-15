using BLL.Interface;
using DTO;
using Microsoft.AspNetCore.Mvc;

namespace QuanLyThuCung.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GioHang_CTRL : Controller
    {

        private readonly IGioHang_BLL _gioHangBLL;

        public GioHang_CTRL(IGioHang_BLL gioHangBLL)
        {
            _gioHangBLL = gioHangBLL;
        }

        [Route("get_by_tk")]
        [HttpGet]
        public ActionResult<List<V_GioHang_DTO>> getGioHang_TK(string tk)
        {
            var result = _gioHangBLL.getGioHang_TK(tk);
            return Ok(result);
        }
        [Route("get_gh_tk_id")]
        [HttpGet]
        public ActionResult<List<GioHang_DTO>> get_gh_tk_id(string tk,int ma)
        {
            var result = _gioHangBLL.get_gh_tk_id(tk,ma);
            return Ok(result);
        }
        [Route("create")]
        [HttpPost]
        public ActionResult<GioHang_DTO> CreateItem([FromBody] GioHang_DTO model)
        {
            if (model == null)
            {
                return BadRequest("Dữ liệu đầu vào không hợp lệ.");
            }

            _gioHangBLL.Create(model);
            return model;
        }

        [Route("update")]
        [HttpPut]
        public ActionResult<GioHang_DTO> UpdateItem(string tk, string matc, int ac)
        {
            bool result = _gioHangBLL.Update(tk, matc, ac);
            return Ok(result); 
        }
        [Route("update_gh")]
        [HttpPut]
        public ActionResult<GioHang_DTO> UpdateItem_gh(GioHang_DTO md)
        {
            bool result = _gioHangBLL.Update_gh(md);
            return Ok(result);
        }
        [Route("delete")]
        [HttpDelete]
        public IActionResult DeleteItem(string tk, int mathucung)
        {
            
         bool kq= _gioHangBLL.Delete(tk,mathucung);
           
            return Ok(kq);

        }

    }
}
