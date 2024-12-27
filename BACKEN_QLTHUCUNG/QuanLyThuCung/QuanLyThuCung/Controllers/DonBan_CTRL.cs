using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BLL.Interface; // Đảm bảo rằng đường dẫn đúng
using DTO; // Đảm bảo rằng đường dẫn đúng

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
            return Ok(1);
        }
        return Ok(result);
    }
    [Route("PhanTrang")]
    [HttpGet]
    public ActionResult<List<V_DonBan_DTO>> PhanTrang(int PageIndex,int PageSize)
    {
        var result = _donBanBLL.PhanTrang(PageIndex,PageSize);
        return Ok(result);
    }

    [Route("get_all")]
    [HttpGet]
    public ActionResult<List<V_DonBan_DTO>> GetAll()
    {
        var result = _donBanBLL.GetAll();
        return Ok(result);
    }

    [Route("Search_DonBan2")]
    [HttpGet]
    public ActionResult<List<V_DonBan_DTO>> Search_DonBan2(DateTime ? NgayBanStart,DateTime? NgayBanEnd, string? Tenkhachhang, string? TrangThai)
    {
        var result = _donBanBLL.Search_DonBan2(NgayBanStart,NgayBanEnd, Tenkhachhang, TrangThai);
        return Ok(result);
    }
    [Route("GetByMaDonBan")]
    [HttpGet]
    public ActionResult<List<V_DonBan_DTO>> GetByMaDonBan(int id)
    {
        var result = _donBanBLL.GetByMaDonBan(id);
        if (result == null || result.Count == 0)
        {
            return NotFound($"Không tìm thấy đơn bán với ID: {id}");
        }
        return Ok(result);
    }
    [Route("SEARCH_DONBAN")]
    [HttpGet]
    public ActionResult<List<V_DonBan_DTO>> Search_DonBan(string?trangthai,string?tenkh,DateTime? ngayban)
    {
        var result = _donBanBLL.Search_DonBan(trangthai, tenkh, ngayban);   
        if (result == null || result.Count == 0)
        {
            return NotFound($"Không tìm thấy đon hàng !");
        }
        return Ok(result);
    }
    [Route("update")]
    [HttpPut]
    public ActionResult<DonBan_DTO> UpdateItem([FromBody] DonBan_DTO model)
    {
        if (model == null)
        {
            return BadRequest("Dữ liệu đầu vào không hợp lệ.");
        }

        var existingItem = _donBanBLL.GetByMaDonBan(model.maDonBan);
        if (existingItem == null || existingItem.Count == 0)
        {
            return NotFound($"Không tìm thấy đơn bán với ID: {model.maDonBan}");
        }

        _donBanBLL.Update(model);
        return Ok(model);
    }


    [Route("delete/{id}")]
    [HttpDelete]
    public IActionResult DeleteItem(int id)
    {

      bool kq=  _donBanBLL.Delete(id);
        return Ok(kq);
    }
}
