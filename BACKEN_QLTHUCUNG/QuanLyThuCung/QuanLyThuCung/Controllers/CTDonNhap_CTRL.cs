using BLL.Interface;
using DTO;
using Microsoft.AspNetCore.Mvc;

namespace QuanLyThuCung.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CTDonNhap_CTRL : Controller
    {
        private readonly ICTDonNhap_BLL _donNhapBLL;

        public CTDonNhap_CTRL(ICTDonNhap_BLL donNhapBLL)
        {
            _donNhapBLL = donNhapBLL;
        }

        [Route("get_by_id")]
        [HttpGet]
        public ActionResult<List<V_ChiTietDonNhap_DTO>> GetById(int id)
        {
            var result = _donNhapBLL.GetById(id);
            if (result == null || result.Count == 0)
            {
                return NotFound($"Không tìm CT đơn nhập với ID: {id}");
            }
            return Ok(result);
        }

        [Route("get_all")]
        [HttpGet]
        public ActionResult<List<ChiTietDonNhap_DTO>> GetAll()
        {
            var result = _donNhapBLL.GetAll();
            return Ok(result);
        }

        [Route("create")]
        [HttpPost]
        public ActionResult<ChiTietDonNhap_DTO> CreateItem([FromBody] ChiTietDonNhap_DTO model)
        {
            if (model == null)
            {
                return BadRequest("Dữ liệu đầu vào không hợp lệ.");
            }

            _donNhapBLL.Create(model);
            return CreatedAtAction(nameof(GetById), new { id = model.maDonNhap }, model);
        }

        [Route("update")]
        [HttpPut]
        public ActionResult<ChiTietDonNhap_DTO> UpdateItem([FromBody] ChiTietDonNhap_DTO model)
        {
            if (model == null)
            {
                return BadRequest("Dữ liệu đầu vào không hợp lệ.");
            }

            var existingItem = _donNhapBLL.GetById(model.maDonNhap);
            if (existingItem == null || existingItem.Count == 0)
            {
                return NotFound($"Không tìm thấy CT đơn nhập với ID: {model.maDonNhap}");
            }

            _donNhapBLL.Update(model);
            return Ok(model);
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public IActionResult DeleteItem(int id)
        {
            var existingItem = _donNhapBLL.GetById(id);
            if (existingItem == null)
            {
                return NotFound($"Không tìm thấy CT đơn nhập với ID: {id}");
            }

            _donNhapBLL.Delete(id);
            return NoContent();
        }
    }
}
