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
            return NotFound($"Không tìm thấy đơn bán với ID: {id}");
        }
        return Ok(result);
    }
   

    [Route("get_all")]
    [HttpGet]
    public ActionResult<List<DonBan_DTO>> GetAll()
    {
        var result = _donBanBLL.GetAll();
        return Ok(result);
    }

    

    [Route("delete/{id}")]
    [HttpDelete]
    public IActionResult DeleteItem(int id)
    {

      bool kq=  _donBanBLL.Delete(id);
        return Ok(kq);
    }
}
