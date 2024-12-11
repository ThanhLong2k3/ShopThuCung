using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BLL.Interface; 
using DTO; 

[ApiController]
[Route("api/[controller]")]
public class ThuCung_CTRL : ControllerBase
{
    private readonly IThuCung_BLL _thuCungBLL;

    public ThuCung_CTRL(IThuCung_BLL thuCungBLL)
    {
        _thuCungBLL = thuCungBLL;
    }

    [Route("get_by_id")]
    [HttpGet]
    public ActionResult<List<ThuCung_DTO>> GetById(int id)
    {
        var result = _thuCungBLL.GetById(id);
        if (result == null || result.Count == 0)
        {
            return NotFound($"Không tìm thấy thú cưng với ID: {id}");
        }
        return Ok(result);
    }
    [Route("get_by_ma")]
    [HttpGet]
    public ActionResult<List<V_ThuCung_DTO>> Get_MaLoai(int id)
    {
        var result = _thuCungBLL.Get_MaLoai(id);
        if (result == null || result.Count == 0)
        {
            return NotFound($"Không tìm thấy thú cưng với ID: {id}");
        }
        return Ok(result);
    }

    [Route("get_all")]
    [HttpGet]
    public ActionResult<List<V_ThuCung_DTO>> GetAll()
    {
        var result = _thuCungBLL.GetAll();
        return Ok(result);
    }

    [Route("Search_ThuCung")]
    [HttpGet]
    public ActionResult<List<V_ThuCung_DTO>> Search_ThuCung(string? ten, int ? ma, decimal? giamin, decimal? giamax)
    {
        var result = _thuCungBLL.Search_ThuCung(ten, ma, giamin, giamax);
        return Ok(result);
    }


    [Route("get_top5_thucung")]
    [HttpGet]
    public ActionResult<List<V_ThuCung_DTO>> Get_Top5_ThuCung()
    {
        var result = _thuCungBLL.Get_Top5_ThuCung();
        return Ok(result);
    }

    [Route("create")]
    [HttpPost]
    public ActionResult<ThuCung_DTO> CreateItem([FromBody] ThuCung_DTO model)
    {
        if (model == null)
        {
            return BadRequest("Dữ liệu đầu vào không hợp lệ.");
        }

        _thuCungBLL.Create(model);
        return CreatedAtAction(nameof(GetById), new { id = model.maThuCung }, model);
    }

    [Route("update")]
    [HttpPut]
    public ActionResult<ThuCung_DTO> UpdateItem([FromBody] ThuCung_DTO model)
    {
        if (model == null )
        {
            return BadRequest("Dữ liệu đầu vào không hợp lệ.");
        }

        var existingItem = _thuCungBLL.GetById(model.maThuCung);
        if (existingItem == null || existingItem.Count == 0)
        {
            return NotFound($"Không tìm thấy thú cưng với ID: {model.maThuCung}");
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

        bool kq = _thuCungBLL.Delete(id);
        return Ok(kq);
    }
}
