using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BLL.Interface; // Đảm bảo rằng đường dẫn đúng
using DTO;
using System.Net; // Đảm bảo rằng đường dẫn đúng

[ApiController]
[Route("api/[controller]")]
public class DonBan_CTRL : ControllerBase
{
    private readonly IDonBan_BLL _donBanBLL;

    public DonBan_CTRL(IDonBan_BLL donBanBLL)
    {
        _donBanBLL = donBanBLL;
    }

    [Route("get_by_id")]
    [HttpGet]
    public ActionResult<List<V_DonBan_DTO>> GetById(int id)
    {
        var result = _donBanBLL.GetById(id);
        if (result == null || result.Count == 0)
        {
            return NotFound($"Không tìm thấy đơn bán với ID: {id}");
        }
        return Ok(result);
    }
    [Route("get_by_TK")]
    [HttpGet]
    public ActionResult<List<DonBan_DTO>> GetByTK(string id)
    {
        var result = _donBanBLL.GetByTK(id);
        if (result == null || result.Count == 0)
        {
            return NotFound($"Không tìm thấy đơn bán với ID: {id}");
        }
        return Ok(result);
    }

    [Route("create")]
    [HttpPost]
    public ActionResult<DonBan_DTO> CreateItem([FromBody] DonBan_DTO model)
    {
        if (model == null)
        {
            return BadRequest("Dữ liệu đầu vào không hợp lệ.");
        }

      int ma=  _donBanBLL.Create(model);
        return Ok(ma);
    }


    [Route("Huy_don_ban")]
    [HttpDelete]
    public IActionResult DeleteItem(int id)
    {
        bool kq= _donBanBLL.Delete(id);
        return Ok(kq);
    }
}
