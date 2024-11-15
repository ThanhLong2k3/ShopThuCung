using BLL.Interface;
using DTO;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;


namespace QuanLyThuCung.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoaiThuCung_CTRL : Controller
    {
        private readonly ILoai_BLL _thuCungBLL;

        public LoaiThuCung_CTRL(ILoai_BLL thuCungBLL)
        {
            _thuCungBLL = thuCungBLL;
        }

        [Route("get_by_id")]
        [HttpGet]
        public ActionResult<List<QL_LoaiThuCung_DTO>> GetById(int id)
        {
            var result = _thuCungBLL.GetById(id);
            if (result == null || result.Count == 0)
            {
                return NotFound($"Không tìm thấy thú cưng với ID: {id}");
            }
            return Ok(result);
        }

        [Route("get_all")]
        [HttpGet]
        public ActionResult<List<QL_LoaiThuCung_DTO>> GetAll()
        {
            var result = _thuCungBLL.GetAll();
            return Ok(result);
        }

        [Route("get_top10")]
        [HttpGet]
        public ActionResult<List<QL_LoaiThuCung_DTO>> Get_Top10_Loai()
        {
            var result = _thuCungBLL.Get_Top10_Loai();
            return Ok(result);
        }

        [Route("get_top5")]
        [HttpGet]
        public ActionResult<List<QL_LoaiThuCung_DTO>> Get_Top5_Loai()
        {
            var result = _thuCungBLL.Get_Top5_Loai();
            return Ok(result);
        }

        [Route("create")]
        [HttpPost]
        public ActionResult<QL_LoaiThuCung_DTO> CreateItem([FromBody] QL_LoaiThuCung_DTO model)
        {
            if (model == null)
            {
                return BadRequest("Dữ liệu đầu vào không hợp lệ.");
            }

            _thuCungBLL.Create(model);
            return CreatedAtAction(nameof(GetById), new { id = model.maLoai }, model);
        }

        [Route("update")]
        [HttpPut]
        public ActionResult<QL_LoaiThuCung_DTO> UpdateItem([FromBody] QL_LoaiThuCung_DTO model)
        {
            if (model == null)
            {
                return BadRequest("Dữ liệu đầu vào không hợp lệ.");
            }

            var existingItem = _thuCungBLL.GetById(model.maLoai);
            if (existingItem == null || existingItem.Count == 0)
            {
                return NotFound($"Không tìm thấy thú cưng với ID: {model.maLoai}");
            }

            _thuCungBLL.Update(model);
            return Ok(model);
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public IActionResult DeleteItem(int id)
        {
            var existingItem = _thuCungBLL.GetById(id);
            if (existingItem == null)
            {
                return NotFound($"Không tìm thấy thú cưng với ID: {id}");
            }

          bool kq= _thuCungBLL.Delete(id);
            return Ok(kq);
        }
    }
}
