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
    const statuses = ['Chờ xử lý', 'Đang xử lý', 'Đã nhập'];
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
        console.log(list_DonBan);
        debugger;

        if (!Array.isArray(list_DonBan) || list_DonBan.length === 0) {
            console.log("No data found.");
            $('.DsDonBan').html("<tr><td colspan='8'>No data available</td></tr>");
            return;
        }
        let htmlArray = [];
        for (let i = 0; i < list_DonBan.length; i++) {
            htmlArray.push(`
                <tr>
                    <td>${list_DonBan[i].tenKhachHang || 'N/A'}</td>
                    <td>${formatDate(list_DonBan[i].ngayBan || 'N/A')}</td>
                    <td>${list_DonBan[i].diaChi_KH || 'N/A'}</td>
                    <td>${list_DonBan[i].soDienThoai_KH || 'N/A'}</td>
                    <td>${list_DonBan[i].tongTien.toLocaleString() || 'N/A'}</td> 
                   
                    <td colspan="2">
                        <button class="add-to-cart" onClick="openmodal_CT_DB(${list_DonBan[i].maDonBan})">Chi Tiết</button>
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
        console.log(DonBan);
debugger
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
                             onclick="HuyDonNhap(${DonBan[0].maDonBan},'${DonBan[0].trangThai}'}')">
                            Hủy
                        </div>
                    ` : ''}
                </div>
                
                <div class="order-status" style="display:flex;justify-content: space-between;">
                    <div class="detail-row">
                        <span class="detail-label">Tên Nhân Viên:</span>
                        <span class="detail-value" title="${DonBan[0].tenNhanVien}">${DonBan[0].tenNhanVien}</span>
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
