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
        public ActionResult<List<V_ChiTietDonBan_DTO>> GetById(int id)
        {
            var result = _donBanBLL.GetById(id);
            if (result == null || result.Count == 0)
            {
                return NotFound($"Không tìm CT đơn bán với ID: {id}");
            }
            return Ok(result);
        }
       

        [Route("create")]
        [HttpPost]
        public ActionResult<ChiTietDonBan_DTO> CreateItem([FromBody] ChiTietDonBan_DTO model)
        {
            if (model == null)
            {
                return BadRequest("Dữ liệu đầu vào không hợp lệ.");
            }

            _donBanBLL.Create(model);
            return CreatedAtAction(nameof(GetById), new { id = model.maDonBan }, model);
        }

    }
}
