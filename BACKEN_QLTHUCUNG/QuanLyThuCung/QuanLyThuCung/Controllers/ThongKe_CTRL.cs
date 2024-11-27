using BLL.Interface;
using DTO;
using Microsoft.AspNetCore.Mvc;

namespace QuanLyThuCung.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ThongKe_CTRL : Controller
    {
        private readonly IThongKe_BLL _TKBLL;

        public ThongKe_CTRL(IThongKe_BLL TKBLL)
        {
            _TKBLL = TKBLL;
        }

        [Route("getThongKe")]
        [HttpGet]
        public ActionResult <ThongKe_DTO> getThongKe()
        {
            var kq=_TKBLL.getThongKe();
            return Ok(kq);
        }
    }
}
