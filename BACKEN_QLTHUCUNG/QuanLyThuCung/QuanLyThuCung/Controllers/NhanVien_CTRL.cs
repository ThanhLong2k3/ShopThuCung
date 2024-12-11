using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BLL.Interface; // Đảm bảo rằng đường dẫn đúng
using DTO; // Đảm bảo rằng đường dẫn đúng

[ApiController]
[Route("api/[controller]")]
public class NhanVien_CTRL : ControllerBase
{
    private readonly INhanVien_BLL _nhanVienBLL;

    public NhanVien_CTRL(INhanVien_BLL nhanVienBLL)
    {
        _nhanVienBLL = nhanVienBLL;
    }

    [Route("get_by_id")]
    [HttpGet]
    public ActionResult<List<NhanVien_DTO>> GetById(int id)
    {
        var result = _nhanVienBLL.GetById(id);
        if (result == null || result.Count == 0)
        {
            return NotFound($"Không tìm thấy nhân viên với ID: {id}");
        }
        return Ok(result);
    }
    [Route("get_by_tk")]
    [HttpGet]
    public ActionResult<List<NhanVien_DTO>> GetByTK(string id)
    {
        var result = _nhanVienBLL.GetByTK(id);
        if (result == null || result.Count == 0)
        {
            return NotFound($"Không tìm thấy nhân viên với ID: {id}");
        }
        return Ok(result);
    }
    [Route("Search_NV")]
    [HttpGet]
    public ActionResult<List<NhanVien_DTO>> Search_NV(string? tennv, string? chucvu)
    {
        var result = _nhanVienBLL.Search_NV(tennv, chucvu);
        return Ok(result);
    }
    [Route("get_all")]
    [HttpGet]
    public ActionResult<List<NhanVien_DTO>> GetAll()
    {
        var result = _nhanVienBLL.GetAll();
        return Ok(result);
    }

    [Route("create")]
    [HttpPost]
    public ActionResult<NhanVien_DTO> CreateItem([FromBody] NhanVien_DTO model)
    {
        if (model == null)
        {
            return BadRequest("Dữ liệu đầu vào không hợp lệ.");
        }

        _nhanVienBLL.Create(model);
        return CreatedAtAction(nameof(GetById), new { id = model.taiKhoan }, model);
    }

    [Route("update")]
    [HttpPut]
    public ActionResult<NhanVien_DTO> UpdateItem([FromBody] NhanVien_DTO model)
    {
        if (model == null)
        {
            return BadRequest("Dữ liệu đầu vào không hợp lệ.");
        }

        var existingItem = _nhanVienBLL.GetById(model.maNhanVien);
        if (existingItem == null || existingItem.Count == 0)
        {
            return NotFound($"Không tìm thấy nhân viên với ID: {model.maNhanVien}");
        }

        _nhanVienBLL.Update(model);
        return Ok(model);
    }

    [Route("delete/{id}")]
    [HttpDelete]
    public IActionResult DeleteItem(int id)
    {
        var existingItem = _nhanVienBLL.GetById(id);
        if (existingItem == null || existingItem.Count == 0)
        {
            return NotFound($"Không tìm thấy nhân viên với ID: {id}");
        }

       bool kq= _nhanVienBLL.Delete(id);
        return Ok(kq);
    }

}
