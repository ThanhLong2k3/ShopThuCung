let Listsp=[];
let TT_KhachHang=[];
let tt = JSON.parse(localStorage.getItem('thongtindangnhap'));
let TongThanhToan=0;
async function displayProductList() {
    try {
        const Listsp = await getDaTa(apiEndpoints.GIOHANG.GETBYTK(tt));
        const productListElement = document.getElementById('productList');
        productListElement.innerHTML = '';

        if (!Array.isArray(Listsp) || Listsp.length === 0) {
            productListElement.innerHTML = '<p>Không có sản phẩm trong giỏ hàng</p>';
            return;
        }

        let Gia = 0;

        Listsp.forEach(item => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${item.anh}" alt="${item.tenThuCung}">
                <div class="product-info">
                    <div class="product-name">${item.tenThuCung}</div>
                    <div>Số lượng: ${item.soLuong}</div>
                <div class="product-price">${item.giaBan.toLocaleString()}đ</div>
                </div>
                <div class="product-price">${(item.giaBan * item.soLuong).toLocaleString()}đ</div>

            `;
            productListElement.appendChild(productItem);

            Gia += item.giaBan * item.soLuong;
        });

        const TongTien = document.getElementById('subtotal');
        TongTien.textContent = Gia.toLocaleString() + 'đ';
        TongThanhToan=(Gia+20000);
        const TongChiPhi = document.getElementById('total');
        TongChiPhi.textContent = TongThanhToan.toLocaleString() + 'đ';

    } catch (error) {
        console.error('Lỗi khi hiển thị danh sách sản phẩm:', error);
    }
}
async function dataKhachHang() {
    try{
        TT_KhachHang= await getDaTa(apiEndpoints.KHACHHANG.getByTK(tt));
        if(TT_KhachHang.length>0)
        {
            document.getElementById('fullName').value=TT_KhachHang[0].tenKhachHang;
            document.getElementById('phone').value=TT_KhachHang[0].soDienThoai_KH;
            document.getElementById('address').value=TT_KhachHang[0].diaChi_KH;
        }
    }
    catch{

    }
}

async function Add_DonHang() {
    let ngayban = new Date().toISOString().split('T')[0];
    let DonHang = {
        ngayBan: ngayban,
        maNhanVien: null,
        maKhachHang: TT_KhachHang[0].maKhachHang,
        tongTien: TongThanhToan,
        trangThai: "ok"
    };

    let Ma = await addDonHang(apiEndpoints.DONBAN.create, DonHang);
    
    let promises = Listsp.map(item => {
        let CT_DonHang = {
            maDonBan: Ma,
            maThuCung: item.maThuCung,
            soLuong: item.soLuong,
            giaBan: item.giaBan
        };
        return Add_ChiTietDonHang(apiEndpoints.CTDONBAN.create, CT_DonHang);
    });

    await Promise.all(promises);

    alert("Thanh Toán thành công!");
    await deleteData_NO_ALER(apiEndpoints.GIOHANG.DELETE_TK(tt));
    window.location.href = "./Home.html"; 
}


document.addEventListener('DOMContentLoaded', displayProductList);
document.addEventListener('DOMContentLoaded', dataKhachHang);

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
function updateHeader(isLoggedIn, username) {
    const loginBtn = document.getElementById('loginBtn');
    const userDropdown = document.getElementById('userDropdown');
    const profileLink = document.getElementById('profileLink');
    const userName = document.getElementById('userName');
    const cartLink = document.getElementById('cartLink');
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

function handleProtectedLink(e, linkType) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn !== 'true') {
        e.preventDefault();
        alert(`Bạn cần đăng nhập để truy cập ${linkType}`);
        window.location.href = './dangnhap.html';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    checkLogin();

    const cartLink = document.getElementById('cartLink');
    const profileLink = document.getElementById('profileLink');

    if (cartLink) {
        cartLink.addEventListener('click', (e) => handleProtectedLink(e, 'giỏ hàng'));
    }

    if (profileLink) {
        profileLink.addEventListener('click', (e) => handleProtectedLink(e, 'thông tin cá nhân'));
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            handleLogout();
        });
    }

    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) {
        userDropdown.addEventListener('click', function (e) {
            const dropdownContent = this.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.classList.toggle('show');
            }
        });
    }

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
displayProductList();