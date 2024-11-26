using BLL.Interface;
using DTO;
using Microsoft.AspNetCore.Mvc;

namespace QuanLyThuCung.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CTDonBan_CTRL : Controller
    {
        private readonly ICTDonBan_BLL _donBanBLL;

        public CTDonBan_CTRL(ICTDonBan_BLL donBanBLL)
        {
            _donBanBLL = donBanBLL;
        }

        [Route("get_by_id")]
        [HttpGet]
        public ActionResult<List<V_ChiTietDonNhap_DTO>> GetById(int id)
        {
            var result = _donBanBLL.GetById(id);
            if (result == null || result.Count == 0)
            {
                return NotFound($"Không tìm CT đơn bán với ID: {id}");
            }
            return Ok(result);
        }

        [Route("get_all")]
        [HttpGet]
        public ActionResult<List<ChiTietDonNhap_DTO>> GetAll()
        {
            var result = _donBanBLL.GetAll();
            return Ok(result);
        }

   

        [Route("delete/{id}")]
        [HttpDelete]
        public IActionResult DeleteItem(int id)
        {
            var existingItem = _donBanBLL.GetById(id);
            if (existingItem == null)
            {
                return NotFound($"Không tìm thấy CT đơn bán với ID: {id}");
            }

            _donBanBLL.Delete(id);
            return NoContent();
        }
    }
}
