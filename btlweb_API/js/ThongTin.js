let TT_KhachHang = [];
let TT_DonHang = [];
let taiKhoan = JSON.parse(localStorage.getItem('thongtindangnhap'));

let duLieuMoi = [];
async function Get_DonHang() {
    try {
        let ma = TT_KhachHang.length > 0 ? TT_KhachHang[0].maKhachHang : null;
        if (ma) {
            duLieuMoi = await getDaTa(apiEndpoints.DONBAN.getById(ma));
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
}
function renderOrders(orderData) {
    console.log(orderData);
    debugger
    const orderListContainer = document.getElementById("orderList");
    orderListContainer.innerHTML = ""; // Xóa nội dung cũ nếu có
    orderData.forEach((order, index) => {
        // Tạo HTML cho từng đơn hàng
        const orderHTML = `
            <div class="order-item">
                <div class="order-header" onclick="toggleOrderDetails(${index + 1})">
                    <span class="order-id">Đơn hàng #${order.maDonBan}</span>

                    <span class="order-date">${new Date(order.ngayBan).toISOString().split('T')[0]}</span>
                <div class="order-status" style="    margin-top: -5px;;">Hủy</div>

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
function toggleOrderDetails(orderId) {
    debugger;
    const details = document.getElementById(`order-${orderId}`);
    details.classList.toggle('active');
}

async function checkLogin() {
    try {
        let tt = JSON.parse(localStorage.getItem('thongtindangnhap'));

        if (tt) {
            let data = await getDaTa(apiEndpoints.KHACHHANG.getByTK(tt));
            if (data && data.length > 0) {
                localStorage.setItem('username', data[0].tenKhachHang);
                localStorage.setItem('isLoggedIn', "true");
                updateHeader('true', data[0].tenKhachHang);
            } else {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                localStorage.removeItem('thongtindangnhap');
                updateHeader(false, null);
            }
        } else {
            updateHeader(false, null);
        }
    } catch (error) {
        console.error('Error in checkLogin:', error);
        updateHeader(false, null);
    }
}
function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('thongtindangnhap');
    updateHeader(false, null);
    window.location.href = './Home.html';
}
// Cập nhật giao diện header
function updateHeader(isLoggedIn, username) {
    const loginBtn = document.getElementById('loginBtn');
    const userDropdown = document.getElementById('userDropdown');
    const profileLink = document.getElementById('profileLink');
    const userName = document.getElementById('userName');
    const cartLink = document.getElementById('cartLink'); // Thêm giỏ hàng

    if (!loginBtn || !userDropdown || !profileLink || !userName || !cartLink) {
        console.error('One or more elements not found');
        return;
    }

    if (isLoggedIn === 'true' && username) {
        loginBtn.style.display = 'none';
        userDropdown.style.display = 'flex';
        profileLink.style.display = 'flex';
        cartLink.style.display = 'flex'; // Hiển thị giỏ hàng
        userName.textContent = `Xin chào, ${username}`;
    } else {
        loginBtn.style.display = 'flex';
        userDropdown.style.display = 'none';
        profileLink.style.display = 'none';
        cartLink.style.display = 'none'; // Ẩn giỏ hàng
    }
}

// Xử lý click vào các link yêu cầu đăng nhập
function handleProtectedLink(e, linkType) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn !== 'true') {
        e.preventDefault();
        alert(`Bạn cần đăng nhập để truy cập ${linkType}`);
        window.location.href = './dangnhap.html';
    }
}

// Khởi tạo các event listener khi trang đã load
document.addEventListener('DOMContentLoaded', function () {
    // Gọi checkLogin ngay khi trang load
    checkLogin();

    // Thêm event listener cho các link được bảo vệ
    const cartLink = document.getElementById('cartLink');
    const profileLink = document.getElementById('profileLink');

    if (cartLink) {
        cartLink.addEventListener('click', (e) => handleProtectedLink(e, 'giỏ hàng'));
    }

    if (profileLink) {
        profileLink.addEventListener('click', (e) => handleProtectedLink(e, 'thông tin cá nhân'));
    }

    // Thêm event listener cho nút đăng xuất
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            handleLogout();
        });
    }

    // Xử lý dropdown menu
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) {
        userDropdown.addEventListener('click', function (e) {
            const dropdownContent = this.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.classList.toggle('show');
            }
        });
    }

    // Đóng dropdown khi click ra ngoài
    window.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-item')) {
            const dropdowns = document.getElementsByClassName('dropdown-content');
            Array.from(dropdowns).forEach(dropdown => {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            });
        }
    });
});
checkLogin();
async function main() {
    await dienThongTinNguoiDung();
    await Get_DonHang();   
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
main();
