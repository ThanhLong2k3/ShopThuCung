var stt = 0;
var images = [
    "/anhpaner/pn1.jpg",
    "/anhpaner/pn2.jpg",
    "/anhpaner/pn3.jpg"
];

var interval; // Variable to hold the interval ID

document.addEventListener('DOMContentLoaded', function () {
    hienThiSlide();
    startAutoSlide();
});

function startAutoSlide() {
    interval = setInterval(slidesau, 3000);
}

function stopAutoSlide() {
    clearInterval(interval);
}
function slidetruoc() {
    stt = (stt - 1 + images.length) % images.length;
    hienThiSlide();
}

function slidesau() {
    stt = (stt + 1) % images.length;
    hienThiSlide();
}

function hienThiSlide() {
    var slideElement = document.getElementById("slides");
    if (slideElement) {
        slideElement.innerHTML = "<img src='" + images[stt] + "' width='100%' height='100%' />";
    }
}



window.addEventListener('scroll', function () {
    var menu = document.querySelector('.menucon');
    var top = document.querySelector('.btn_top');

    var scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Đặt vị trí cuộn bạn muốn phần tử hiện ra (ví dụ: 300px)
    var targetPosition = 300;

    if (scrollPosition >= targetPosition) {
        menu.style.display = 'block';
        top.style.display = 'block';

    } else {
        menu.style.display = 'none';
        top.style.display = 'none';

    }
});


function setdulieu(ma) {
    localStorage.setItem('masp', JSON.stringify(ma));
    const url = './chitietssanpham.html?data=' + encodeURIComponent(JSON.stringify(ma));
    window.location.href = url;
}
let Get_Top5_BanChay = async () => {
    try {
        let data = await getDaTa(apiEndpoints.ThuCung.get_Top5_ThuCung);
        console.log(data);
        let htmlarr = '';
        
        if (Array.isArray(data) && data.length > 0) {
            data.map(sp => htmlarr += `
                <a onclick="setdulieu(${sp.maThuCung})" class="link-reset">
                    <div class="sp-uathich">
                        <div class="sptren">
                            <span class="giamgia" id="giamgia">${sp.giamGia ? `-${sp.giamGia}%` : ''}</span>
                            <img src="${sp.anh || '/default.jpg'}" class="anh" id="anh">
                        </div>
                        <div class="chusp">
                            <h2 style="font-size: 14px; color: #f72585;" id="tensp">${sp.tenThuCung}</h2>
                            <span style="color: red;"><strong id="gia">${sp.giaBan.toLocaleString('vi-VN')}</strong> vnd</span>
                        </div>
                    </div>
                </a>
            `);
            
            document.getElementById('top_5').innerHTML = htmlarr;
        } else {
            console.log('Không có dữ liệu sản phẩm.');
        }
    } catch (error) {
        console.log('Lỗi khi lấy dữ liệu:', error);
    }
};
let Get_Top5_MaLoai = async (ma, id) => {
    try {
        let data = await getDaTa(apiEndpoints.ThuCung.getByMa(ma));
        console.log(data);
        let htmlarr = '';
        
        if (Array.isArray(data) && data.length > 0) {
            data.map(sp => htmlarr += `
                <a onclick="setdulieu(${sp.maThuCung})" class="link-reset">
                    <div class="sp-uathich">
                        <div class="sptren">
                            <span class="giamgia" id="giamgia">${sp.giamGia ? `-${sp.giamGia}%` : ''}</span>
                            <img src="${sp.anh || '/default.jpg'}" class="anh" id="anh">
                        </div>
                        <div class="chusp">
                            <h2 style="font-size: 14px; color: #f72585;" id="tensp">${sp.tenThuCung}</h2>
                            <span style="color: red;"><strong id="gia">${sp.giaBan.toLocaleString('vi-VN')}</strong> vnd</span>
                        </div>
                    </div>
                </a>
            `);
            
            document.getElementById(id).innerHTML = htmlarr;
        } else {
            console.log('Không có dữ liệu sản phẩm.');
        }
    } catch (error) {
        console.log('Lỗi khi lấy dữ liệu:', error);
    }
};

let Get_MeNu = async () => {
    try {
        let data = await getDaTa(apiEndpoints.Loai.getTop10);
        debugger
        console.log('Dữ liệu từ API:', data);
        if (Array.isArray(data) && data.length > 0) {
            for (let i = 0; i < Math.min(4, data.length); i++) {
                await Get_Top5_MaLoai(data[i].maLoai, `Loai${i + 1}`);
                document.getElementById(`titel_Loai${i + 1}`).innerHTML = data[i].tenLoai;
            }

            let htmlarr = '';
            data.map(sp => {
                htmlarr += `<li style="padding-left: 5px;" value=${sp.maLoai}> ${sp.tenLoai}</li>`;
            });
            document.getElementById('danhmuc_con').innerHTML = htmlarr;
        } else {
            console.log('Không có dữ liệu loại.');
        }
    } catch (error) {
        console.error('Lỗi trong quá trình lấy dữ liệu hoặc hiển thị:', error);
    }
};



Get_Top5_BanChay();

Get_MeNu();
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