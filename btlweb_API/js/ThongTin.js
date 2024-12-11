let TT_KhachHang = [];
let TT_DonHang = [];
let taiKhoan = JSON.parse(localStorage.getItem('thongtindangnhap'));

let duLieuMoi = [];
async function Get_DonHang() {
    try {
        let ma = TT_KhachHang.length > 0 ? TT_KhachHang[0].maKhachHang : null;
        if (ma) {
            duLieuMoi = await getDaTa(apiEndpoints.DONBAN.getById(ma));
            console.log(duLieuMoi);
            debugger;
            if(duLieuMoi===1)
            {
                $('#orderList').html('<tr><td colspan="9">Bạn chưa có đơn hàng nào !</td></tr>');
            }
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
    }
}

async function dienThongTinNguoiDung() {
    try {
        TT_KhachHang = await getDaTa(apiEndpoints.KHACHHANG.getByTK(taiKhoan));
        if (TT_KhachHang.length > 0) {
            document.getElementById('add').style.display = 'none';
            let duLieuNguoiDung = TT_KhachHang[0];
            document.getElementById("hoTen").value = duLieuNguoiDung.tenKhachHang;
            document.getElementById("soDienThoai").value = duLieuNguoiDung.soDienThoai_KH;
            document.getElementById("diaChi").value = duLieuNguoiDung.diaChi_KH;
        } else {
            document.getElementById('update').style.display = 'none';
        }
    } catch (error) {
        console.error("Lỗi khi điền thông tin người dùng:", error);
    }
}



async function capNhatThongTinNguoiDung() {
    try {
        let nguoiDung = {
            maKhachHang: TT_KhachHang[0]?.maKhachHang,
            taiKhoan: TT_KhachHang[0]?.taiKhoan,
            tenKhachHang: TT_KhachHang[0]?.tenKhachHang,
            diaChi_KH: TT_KhachHang[0]?.diaChi_KH,
            soDienThoai_KH: TT_KhachHang[0]?.soDienThoai_KH
        };
        await updateData(apiEndpoints.KHACHHANG.update, nguoiDung, dienThongTinNguoiDung);
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    }
}

async function themThongTin() {
    let ten = document.getElementById("hoTen").value;
    let sdt = document.getElementById("soDienThoai").value;
    let dc = document.getElementById("diaChi").value;
    let thongtin = {
        taiKhoan: taiKhoan,
        tenKhachHang: ten,
        diaChi_KH: dc,
        soDienThoai_KH: sdt
    };
    await addData(apiEndpoints.KHACHHANG.add,thongtin,dienThongTinNguoiDung);
    document.getElementById('add').style.display = 'none';
    document.getElementById('update').style.display = 'block';


}
function renderOrders(orderData) {
    const orderListContainer = document.getElementById("orderList");
    orderListContainer.innerHTML = ""; 
    orderData.forEach((order, index) => {
        const formattedDate = new Date(order.ngayBan).toLocaleDateString('vi-VN');
        const orderHTML = `
            <div class="order-item">
                <div class="order-header" onclick="toggleOrderDetails(${index + 1})">
                    <span class="order-id">Đơn hàng #${order.maDonBan}</span>

                    <span class="order-date">${formattedDate}</span>
                <div class="order-status" style="margin-top: -5px;" onclick="HuyDonBan('${order.maDonBan}', '${order.trangThai}')">Hủy</div>

                </div>
                <div class="order-status">${order.trangThai}</div>
                <div class="order-details" id="order-${index + 1}" ">
                    <table>
                        <thead>
                            <tr>
                                <th>Thú Cưng</th>
                                <th>Số Lượng</th>
                                <th>Đơn Giá</th>
                                <th>Thành Tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.chiTiet.map(sp => `
                                <tr>
                                    <td>${sp.tenThuCung}</td>
                                    <td>${sp.soLuong}</td>
                                    <td>${sp.giaBan.toLocaleString()} ₫</td>
                                    <td>${(sp.soLuong * sp.giaBan).toLocaleString()} ₫</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="detail-row">
                        <span>Địa chỉ giao hàng:</span>
                        <span>${order.diaChi_KH}</span>
                    </div>
                    <div class="detail-row">
                        <span>Số điện thoại:</span>
                        <span>${order.soDienThoai_KH}</span>
                    </div>
                </div>
                <div class="order-total">Tổng tiền: ${order.tongTien.toLocaleString()} ₫</div>
            </div>
        `;
        
        orderListContainer.innerHTML += orderHTML;
    });
}

async function HuyDonBan(maDonBan, trangThai) {
    if(trangThai === "Chờ xác nhận") {
        await deleteData(apiEndpoints.DONBAN.delete(maDonBan), main);
    } else {
        alert(`Đơn hàng  ${trangThai}! Vui lòng liên hệ với người bán\nSDT: 01236315459`);
    }
}
function toggleOrderDetails(orderId) {
    const details = document.getElementById(`order-${orderId}`);
    details.classList.toggle('active');
}

async function main() {
    await dienThongTinNguoiDung();
    await Get_DonHang();   
    if(duLieuMoi!=1)
    {
        let duLieuDonHang =await duLieuMoi.reduce((acc, item) => {
            let donHang = acc.find(dh => dh.maDonBan === item.maDonBan);
            if (!donHang) {
                donHang = {
                    maDonBan: item.maDonBan,
                    ngayBan: item.ngayBan,
                    tongTien: item.tongTien,
                    trangThai: item.trangThai,
                    tenKhachHang: item.tenKhachHang,
                    diaChi_KH: item.diaChi_KH,
                    soDienThoai_KH: item.soDienThoai_KH,
                    chiTiet: []
                };
                acc.push(donHang);
            }
            donHang.chiTiet.push({
                tenThuCung: item.tenThuCung,
                soLuong: item.soLuong,
                giaBan: item.giaBan
            });
            return acc;
        }, []);
        await renderOrders(duLieuDonHang);
    }
 
}
main();
