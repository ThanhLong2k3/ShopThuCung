async function tang(index) {
    let taiKhoan = JSON.parse(localStorage.getItem('thongtindangnhap'));
    const data =await getDaTa(apiEndpoints.GIOHANG.GETBYTK(taiKhoan));
    if (data) {
        
        let matc = parseInt(data[index].maThuCung);
        await updateData_gh(apiEndpoints.GIOHANG.UPDATE_SL_1(taiKhoan,matc,0));
            getdl();
            TongTien();
         
    }
}

async function giam(index) {
    let taiKhoan = JSON.parse(localStorage.getItem('thongtindangnhap'));
    const data =await getDaTa(apiEndpoints.GIOHANG.GETBYTK(taiKhoan));
    if (data) {
        
        let matc = parseInt(data[index].maThuCung);
        await updateData_gh(apiEndpoints.GIOHANG.UPDATE_SL_1(taiKhoan,matc,1));
            getdl();
            TongTien();
         
    }
}
async function getdl() {
    let taiKhoan = JSON.parse(localStorage.getItem('thongtindangnhap'));
    const data =await getDaTa(apiEndpoints.GIOHANG.GETBYTK(taiKhoan));
    console.log(data);
    debugger;
    const htmlarr = [];
    let tongtien = 0;
    if (data) {
        const data1 = data;
        
        data1.forEach((sp, index) => {
            tongtien += parseFloat(sp.giaBan) * parseFloat(sp.soLuong);
            htmlarr.push(`
                <div id="sanpham">
                    <img id="anh" src=${sp.anh} alt="Ảnh sản phẩm" style="width: 60px;height: 60px;"/>
                    <div id="thongtin">
                        <p id="tensanpham">${sp.tenThuCung}</p>
                        
                    </div>
                    <div id="gia">
                        <span id="giaban"><strong> ${sp.giaBan.toLocaleString()}<strong></span>
                        <br/><br/>
                        <input onclick="giam(${index})" style="background-color: #f9758f;" type="button" id="giam" value="-"/>
                        <input type="number" id="soluong" value=${sp.soLuong}>
                        <input onclick="tang(${index})" style="background-color: #f9758f;" type="button" id="tang" value="+"/>
                        <button style="background-color: #f9758f;color:white;  border: 1px solid #CCC;border-radius: 3px;" onclick="Xoagiohang(${sp.maThuCung})" >Xóa</button>
                    </div>
                </div>

            `);
        });
        $('.listsp').html(htmlarr.join(''));
        document.getElementById('tongsp').innerText = `Bạn đang có ${data1.length} sản phẩm trong giỏ hàng`;
        

    }
}
getdl();

TongTien();
async function TongTien(){
    let taiKhoan = JSON.parse(localStorage.getItem('thongtindangnhap'));
    const data =await getDaTa(apiEndpoints.GIOHANG.GETBYTK(taiKhoan));
    let  Tong=0;
    for(let i=0;i<data.length;i++)
    {
        Tong=Tong+(data[i].giaBan*data[i].soLuong);
    }
    document.getElementById('tongtien').innerText = ` ${Tong.toLocaleString()} Vnđ`;
}

async function Xoagiohang(ma)
{
    debugger
    let taiKhoan = JSON.parse(localStorage.getItem('thongtindangnhap'));
    await deleteData(apiEndpoints.GIOHANG.DELETE(taiKhoan,ma),getdl);
    TongTien();
}
checkLogin();
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
                // Nếu không tìm thấy dữ liệu khách hàng, xóa thông tin đăng nhập
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
    localStorage.removeItem('thongtindangnhap'); // Thêm dòng này
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
document.addEventListener('DOMContentLoaded', function() {
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
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }

    // Xử lý dropdown menu
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) {
        userDropdown.addEventListener('click', function(e) {
            const dropdownContent = this.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.classList.toggle('show');
            }
        });
    }

    // Đóng dropdown khi click ra ngoài
    window.addEventListener('click', function(e) {
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

