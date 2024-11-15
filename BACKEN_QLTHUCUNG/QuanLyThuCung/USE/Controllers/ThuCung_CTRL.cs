using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BLL.Interface; 
using DTO; 

[ApiController]
[Route("api/[controller]")]
public class ThuCung_CTRL : ControllerBase
{
    private readonly IBLL<ThuCung_DTO> _thuCungBLL;

    public ThuCung_CTRL(IBLL<ThuCung_DTO> thuCungBLL)
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

    [Route("get_all")]
    [HttpGet]
    public ActionResult<List<ThuCung_DTO>> GetAll()
    {
        var result = _thuCungBLL.GetAll();
        return Ok(result);
    }

}
