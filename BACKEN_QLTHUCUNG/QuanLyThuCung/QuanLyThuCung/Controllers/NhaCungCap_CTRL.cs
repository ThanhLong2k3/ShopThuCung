using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BLL.Interface; 
using DTO; 

[ApiController]
[Route("api/[controller]")]
public class NhaCungCap_CTRL : ControllerBase
{
    private readonly IBLL<NhaCungCap_DTO> _nhaCungCapBLL;

    public NhaCungCap_CTRL(IBLL<NhaCungCap_DTO> nhaCungCapBLL)
    {
        _nhaCungCapBLL = nhaCungCapBLL;
    }

    [Route("get_by_id")]
    [HttpGet]
    public ActionResult<List<NhaCungCap_DTO>> GetById(int id)
    {
        var result = _nhaCungCapBLL.GetById(id);
        if (result == null || result.Count == 0)
        {
            return NotFound($"Không tìm thấy nhà cung cấp với ID: {id}");
        }
        return Ok(result);
    }

    [Route("get_all")]
    [HttpGet]
    public ActionResult<List<NhaCungCap_DTO>> GetAll()
    {
        var result = _nhaCungCapBLL.GetAll();
        return Ok(result);
    }
    [Route("Search_NCC")]
    [HttpGet]
    public ActionResult<List<NhaCungCap_DTO>> Search_NCC(string? ten,string? sdt)
    {
        var result = _nhaCungCapBLL.Search(ten, sdt);
        return Ok(result);
    }
    [Route("create")]
    [HttpPost]
    public ActionResult<NhaCungCap_DTO> CreateItem([FromBody] NhaCungCap_DTO model)
    {
        if (model == null)
        {
            return BadRequest("Dữ liệu đầu vào không hợp lệ.");
        }

        _nhaCungCapBLL.Create(model);
        return CreatedAtAction(nameof(GetById), new { id = model.MaNhaCungCap }, model);
    }

    [Route("update")]
    [HttpPut]
    public ActionResult<NhaCungCap_DTO> UpdateItem([FromBody] NhaCungCap_DTO model)
    {
        if (model == null )
        {
            return BadRequest("Dữ liệu đầu vào không hợp lệ.");
        }

        var existingItem = _nhaCungCapBLL.GetById(model.MaNhaCungCap);
        if (existingItem == null || existingItem.Count == 0)
        {
            return NotFound($"Không tìm thấy nhà cung cấp với ID: {model.MaNhaCungCap}");
        }

        _nhaCungCapBLL.Update(model);
        return Ok(model);
    }

    [Route("delete/{id}")]
    [HttpDelete]
    public IActionResult DeleteItem(int id)
    {
        var existingItem = _nhaCungCapBLL.GetById(id);
        if (existingItem == null || existingItem.Count == 0)
        {
            return NotFound($"Không tìm thấy nhà cung cấp với ID: {id}");
        }

     bool kq= _nhaCungCapBLL.Delete(id);
        return Ok(kq);
    }
}
