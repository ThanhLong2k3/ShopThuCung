using BLL.Interface;
using DTO;
using Microsoft.AspNetCore.Mvc;

namespace QuanLyThuCung.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaiKhoan_CTRL : Controller
    {
        private readonly ITaiKhoanBLL _taiKhoanBLL;

        public TaiKhoan_CTRL(ITaiKhoanBLL taiKhoanBLL)
        {
            _taiKhoanBLL = taiKhoanBLL;
        }

        [Route("Dangnhap")]
        [HttpGet]
        public ActionResult<TaiKhoan_DTO> DangNhap(string tk, string mk)
        {
            var result = _taiKhoanBLL.DangNhap(tk, mk);
            if (result == null)
            {
                return NotFound("Không tìm thấy tài khoản");
            }
            return Ok(result);
        }

        [Route("dangky")]
        [HttpPost]
        public IActionResult CreateItem([FromBody] TaiKhoan_DTO model)
        {
            if (model == null)
            {
                return BadRequest("Dữ liệu đầu vào không hợp lệ.");
            }

            var result = _taiKhoanBLL.DangKy(model);
            if (result > 0)
            {
                return Ok("Đăng ký thành công.");
            }
            return StatusCode(500, "Đăng ký không thành công.");
        }

        [Route("doimatkhau")]
        [HttpPut]
        public IActionResult DoiMatKhau(string tk, string mkm)
        {
            var result = _taiKhoanBLL.DoiMK(tk, mkm);
            if (result)
            {
                return Ok("Đổi mật khẩu thành công.");
            }
            return StatusCode(500, "Đổi mật khẩu không thành công.");
        }
    }
}
