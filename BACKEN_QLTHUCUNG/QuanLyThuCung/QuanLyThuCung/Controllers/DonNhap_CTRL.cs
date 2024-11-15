using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BLL.Interface; // Đảm bảo rằng đường dẫn đúng
using DTO; // Đảm bảo rằng đường dẫn đúng

[ApiController]
[Route("api/[controller]")]
public class DonNhap_CTRL : ControllerBase
{
    private readonly IDonNhap_BLL _donNhapBLL;

    public DonNhap_CTRL(IDonNhap_BLL donNhapBLL)
    {
        _donNhapBLL = donNhapBLL;
    }

    [Route("get_by_id")]
    [HttpGet]
    public ActionResult<List<V_DonNhap_DTO>> GetById(int id)
    {
        var result = _donNhapBLL.GetById(id);
        if (result == null || result.Count == 0)
        {
            return NotFound($"Không tìm thấy đơn nhập với ID: {id}");
        }
        return Ok(result);
    }

    [Route("get_all")]
    [HttpGet]
    public ActionResult<List<V_DonNhap_DTO>> GetAll()
    {
        var result = _donNhapBLL.GetAll();
        return Ok(result);
    }

    [Route("create")]
    [HttpPost]
    public ActionResult<DonNhap_DTO> CreateItem([FromBody] DonNhap_DTO model)
    {
        if (model == null)
        {
            return BadRequest("Dữ liệu đầu vào không hợp lệ.");
        }

      int ma=  _donNhapBLL.Create(model);
        return Ok(ma);
    }

    [Route("update")]
    [HttpPut]
    public ActionResult<DonNhap_DTO> UpdateItem([FromBody] DonNhap_DTO model)
    {
        if (model == null)
        {
            return BadRequest("Dữ liệu đầu vào không hợp lệ.");
        }

        var existingItem = _donNhapBLL.GetById(model.maDonNhap);
        if (existingItem == null || existingItem.Count == 0)
        {
            return NotFound($"Không tìm thấy đơn nhập với ID: {model.maDonNhap}");
        }

        _donNhapBLL.Update(model);
        return Ok(model);
    }

    [Route("delete/{id}")]
    [HttpDelete]
    public IActionResult DeleteItem(int id)
    {
        var existingItem = _donNhapBLL.GetById(id);
        if (existingItem == null || existingItem.Count == 0)
        {
            return NotFound($"Không tìm thấy đơn nhập với ID: {id}");
        }

       bool kq= _donNhapBLL.Delete(id);
        return Ok(kq);
    }
}
