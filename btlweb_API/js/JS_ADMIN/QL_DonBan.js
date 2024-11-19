let list_DonBan=[];
let DonBan=[];
let CT_DonBan=[];
function show_DonBan()
{
    showSection('List_DonBan');
    Show_List_DB();
}
function closemodal_CT_DB() {
    var modal = document.getElementById("Modal_CT_DonBan");
    modal.style.display = "none";
}
function openmodal_CT_DB(id) {
    var modal = document.getElementById("Modal_CT_DonBan");
    modal.style.display = "block";
    Get_DonBan_ID(id);
}



function getStatusDropdown(selectedStatus) {
    const statuses = ['Chờ xác nhận', 'Đang xử lý', 'Đang giao hàng', 'Đã giao hàng'];
    let options = statuses.map(status => {
        let selected = (status === selectedStatus) ? 'selected' : '';
        return `<option value="${status}" ${selected}>${status}</option>`;
    });
    return options.join('');
}
function formatDate(date) {
    if (!date) return 'N/A';
    let d = new Date(date);
    let day = d.getDate().toString().padStart(2, '0');
    let month = (d.getMonth() + 1).toString().padStart(2, '0');
    let year = d.getFullYear();
    return `${day}/${month}/${year}`;
}
async function Show_List_DB() {
    try {

        list_DonBan = await getDaTa(apiEndpoints.DONBAN.getAll);
       

        if (!Array.isArray(list_DonBan) || list_DonBan.length === 0) {
            $('.DsDonBan').html("<tr><td colspan='8'>No data available</td></tr>");
            return;
        }
        let htmlArray = [];
        for (let i = 0; i < list_DonBan.length; i++) {
            htmlArray.push(`
               <tr>
          <td>${list_DonBan[i].tenKhachHang || 'N/A'}</td>
          <td>${formatDate(list_DonBan[i].ngayBan) || 'N/A'}</td>
          <td>${list_DonBan[i].diaChi_KH || 'N/A'}</td>
          <td>${list_DonBan[i].soDienThoai_KH || 'N/A'}</td>
          <td>${list_DonBan[i].tongTien.toLocaleString() || 'N/A'}</td>
          <td>${list_DonBan[i].trangThai || 'N/A'}</td>
          <td colspan="2">
            <button class="add-to-cart" onClick="openmodal_CT_DB(${list_DonBan[i].maDonBan})">Chi Tiết</button>
            <button class="add-to-cart" onclick="HuyDonBan_QL(${list_DonBan[i].maDonBan},'${list_DonBan[i].trangThai}')">Hủy</button>
          </td>
        </tr>
            `);
        }

        $('.DsDonBan').html(htmlArray.join(''));

    } catch (error) {
        console.error("Error fetching or rendering data: ", error);
        $('.DsDonBan').html("<tr><td colspan='8'>Error loading data</td></tr>");
    }
}


async function Get_DonBan_ID(id) {
    try {
        DonBan = await getDaTa(apiEndpoints.DONBAN.getByID_DonBan(id));
        CT_DonBan=await getDaTa(apiEndpoints.CTDONBAN.getById(id));
        if (!DonBan || !DonBan[0]) {
            console.error('Không tìm thấy đơn bán');
            return;
        }

        const formattedDate = new Date(DonBan[0].ngayBan).toLocaleDateString('vi-VN');

        const html = `
            <div class="order-item">
                <div class="order-header" >
                    <span class="order-id">Đơn hàng #${DonBan[0].maDonBan}</span>
                    <span class="order-date">${formattedDate}</span>
                    ${DonBan[0].trangThai !== 'Đã hủy' ? `
                        <div  class="order-status add-to-cart" 
                             onclick="HuyDonBan_QL(${DonBan[0].maDonBan},'${DonBan[0].trangThai}')">
                            Hủy
                        </div>
                    ` : ''}
                </div>
                
                <div class="order-status" style="display:flex;justify-content: space-between;">
                    <div class="detail-row">
                        <span class="detail-label">Tên Nhân Viên:</span>
                        <span class="detail-value" title="${DonBan[0].tenNhanVien!= null ? DonBan[0].tenNhanVien : "Đơn hàng online" }">${DonBan[0].tenNhanVien!= null ? DonBan[0].tenNhanVien : "Đơn hàng online" }</span>
                    </div>
                     <div class="detail-row">
                        <span class="detail-label">Tên Khách Hàng:</span>
                        <span class="detail-value" title="${DonBan[0].tenKhachHang}">${DonBan[0].tenKhachHang}</span>
                    </div>
                   <select onchange="UpTrangThai()" style="color: rgb(248, 31, 103);border: 1px solid rgb(248, 31, 103);">
                        ${getStatusDropdown(DonBan[0].trangThai)}
                    </select>

                </div>
                
                <div class="order-details" id="order-${DonBan[0].maDonBan}">
                    <table class="details-table">
                        <thead>
                            <tr>
                                <th>Thú Cưng</th>
                                <th>Số Lượng</th>
                                <th>Đơn Giá</th>
                                <th>Thành Tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${CT_DonBan.map(sp => `
                                <tr>
                                    <td title="${sp.tenThuCung}">${sp.tenThuCung}</td>
                                    <td>${sp.soLuong}</td>
                                    <td>${sp.giaBan.toLocaleString('vi-VN')} ₫</td>
                                    <td>${(sp.soLuong * sp.giaBan).toLocaleString('vi-VN')} ₫</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    
                    <div class="detail-row">
                        <span class="detail-label">Địa chỉ giao hàng:</span>
                        <span class="detail-value" title="${DonBan[0].diaChi_KH}">${DonBan[0].diaChi_KH}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Số điện thoại:</span>
                        <span class="detail-value">${DonBan[0].soDienThoai_KH}</span>
                    </div>
                </div>
                
                <div class="order-total">
                    Tổng tiền: ${DonBan[0].tongTien.toLocaleString('vi-VN')} ₫
                </div>
            </div>
        `;

        $('.CTDB').html(html);

    } catch (error) {
        console.error('Lỗi khi lấy chi tiết đơn nhập:', error);
        $('.CTDB').html('<div class="error-message">Có lỗi xảy ra khi tải chi tiết đơn hàng</div>');
    }
}
async function HuyDonBan_QL(maDonBan, trangThai) {
    try{
        if(trangThai==="Chờ xử lý" || trangThai==="Đang xử lý")
        {
            await deleteData(apiEndpoints.DONBAN.delete(maDonBan), Show_List_DB);
            closemodal_CT_DB();
        }
        else{
            alert(`Đơn hàng ${trangThai} không thể hủy !`);
        }
        
    }
    catch{
        alert("Hủy đơn hàng thất bại!");
    }
}
async function UpTrangThai() {
    if(DonBan[0].trangThai==="Đang giao hàng" || DonBan[0].trangThai==="Đã giao hàng")
    {
        Show_List_DB();
        closemodal_CT_DB();
        alert("Đơn hàng không thể hủy!");
    }
    else{
        const newStatus = event.target.value;
        let data={
            maDonBan: DonBan[0].maDonBan,
            ngayBan: DonBan[0].ngayBan,
            maNhanVien: DonBan[0].maNhanVien===0 ? null :DonBan[0].maNhanVien,
            maKhachHang: DonBan[0].maKhachHang,
            tongTien: DonBan[0].tongTien,
            trangThai: newStatus
          }
          await updateData(apiEndpoints.DONBAN.update,data,Show_List_DB);
        
        }
}
// Hàm để mã hóa các tham số tìm kiếm
function encodeSearchParams(params) {
    return Object.keys(params)
      .filter(key => params[key] !== null && params[key] !== '')
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }
  
  // Hàm tìm kiếm đơn bán sử dụng API
  async function searchDonBan(trangThai, ngayBan, tenKhachHang) {
    const baseUrl = 'http://localhost:5068/api/DonBan_CTRL/SEARCH_DONBAN';
    const params = {};
    
    if (trangThai) params.trangthai = trangThai;
    if (ngayBan) params.ngayban = ngayBan;
    if (tenKhachHang) params.tenkhachhang = tenKhachHang;
  
    const url = `${baseUrl}?${encodeSearchParams(params)}`;
  
    let data=await getDaTa(url);
    return data;
  }
  
  // Hàm hiển thị kết quả tìm kiếm
  function displaySearchResults(results) {
    let htmlArray = [];
    for (let i = 0; i < results.length; i++) {
      htmlArray.push(`
        <tr>
          <td>${results[i].tenKhachHang || 'N/A'}</td>
          <td>${formatDate(results[i].ngayBan) || 'N/A'}</td>
          <td>${results[i].diaChi_KH || 'N/A'}</td>
          <td>${results[i].soDienThoai_KH || 'N/A'}</td>
          <td>${results[i].tongTien.toLocaleString() || 'N/A'}</td>
          <td>${results[i].trangThai || 'N/A'}</td>
          <td colspan="2">
            <button class="add-to-cart" onClick="openmodal_CT_DB(${results[i].maDonBan})">Chi Tiết</button>
            <button class="add-to-cart" onclick="HuyDonBan_QL(${results[i].maDonBan},'${results[i].trangThai}')">Hủy</button>
          </td>
        </tr>
      `);
    }
  
    $('.DsDonBan').html(htmlArray.join(''));
  }
  
  // Hàm xử lý sự kiện tìm kiếm
  async function handleSearch() {
    debugger
    const trangThai = document.getElementById('statusSearch').value;
    const ngayBan = document.getElementById('dateSearch').value;
    const tenKhachHang = document.getElementById('customerNameSearch').value;
  
    const searchResults = await searchDonBan(trangThai, ngayBan, tenKhachHang);
    displaySearchResults(searchResults);
  }
  
  // Thêm sự kiện lắng nghe cho các trường tìm kiếm
  document.addEventListener('DOMContentLoaded', function() {
    const statusSearch = document.getElementById('statusSearch');
    const dateSearch = document.getElementById('dateSearch');
    const customerNameSearch = document.getElementById('customerNameSearch');
  
    if (statusSearch) statusSearch.addEventListener('change', handleSearch);
    if (dateSearch) dateSearch.addEventListener('change', handleSearch);
    if (customerNameSearch) customerNameSearch.addEventListener('input', handleSearch);
  
    // Thực hiện tìm kiếm ban đầu để hiển thị tất cả đơn hàng
    handleSearch();
  });
  
  // Hàm định dạng ngày (nếu chưa được định nghĩa)
  function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }