using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BLL.Interface; // Đảm bảo rằng đường dẫn đúng
using DTO; // Đảm bảo rằng đường dẫn đúng

[ApiController]
[Route("api/[controller]")]
public class KhachHang_CTRL : ControllerBase
{
    private readonly IKhachHang_BLL _khachHangBLL;

    public KhachHang_CTRL(IKhachHang_BLL khachHangBLL)
    {
        _khachHangBLL = khachHangBLL;
    }

    [Route("get_by_id")]
    [HttpGet]
    public ActionResult<List<KhachHang_DTO>> GetById(int id)
    {
        var result = _khachHangBLL.GetById(id);
        if (result == null || result.Count == 0)
        {
            return NotFound($"Không tìm thấy khách hàng với ID: {id}");
        }
        return Ok(result);
    }
    [Route("get_by_TK")]
    [HttpGet]
    public ActionResult<List<KhachHang_DTO>> GetByTK(string id)
    {
        var result = _khachHangBLL.GetByTK(id);
        if (result == null || result.Count == 0)
        {
            return Ok(1);
        }
        return Ok(result);
    }
    [Route("get_all")]
    [HttpGet]
    public ActionResult<List<KhachHang_DTO>> GetAll()
    {
        var result = _khachHangBLL.GetAll();
        return Ok(result);
    }

    [Route("create")]
    [HttpPost]
    public ActionResult<KhachHang_DTO> CreateItem([FromBody] KhachHang_DTO model)
    {
        if (model == null)
        {
            return BadRequest("Dữ liệu đầu vào không hợp lệ.");
        }

        _khachHangBLL.Create(model);
        return CreatedAtAction(nameof(GetById), new { id = model.taiKhoan }, model);
    }

    [Route("update")]
    [HttpPut]
    public ActionResult<KhachHang_DTO> UpdateItem([FromBody] KhachHang_DTO model)
    {
        if (model == null)
        {
            return BadRequest("Dữ liệu đầu vào không hợp lệ.");
        }

        var existingItem = _khachHangBLL.GetById(model.maKhachHang);
        if (existingItem == null || existingItem.Count == 0)
        {
            return NotFound($"Không tìm thấy khách hàng với ID: {model.taiKhoan}");
        }

        _khachHangBLL.Update(model);
        return Ok(model);
    }

    [Route("delete/{id}")]
    [HttpDelete]
    public IActionResult DeleteItem(int id)
    {
        var existingItem = _khachHangBLL.GetById(id);
        if (existingItem == null || existingItem.Count == 0)
        {
            return NotFound($"Không tìm thấy khách hàng với ID: {id}");
        }

       bool kq= _khachHangBLL.Delete(id);
        return Ok(kq);
    }
}
