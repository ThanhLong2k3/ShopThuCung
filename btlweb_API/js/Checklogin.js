// auth.js
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
        cartLink.style.display = 'flex';
        userName.textContent = `Xin chào, ${username}`;
    } else {
        loginBtn.style.display = 'flex';
        userDropdown.style.display = 'none';
        profileLink.style.display = 'none';
        cartLink.style.display = 'none';
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

// Hàm khởi tạo các event listeners
function initializeAuthEvents() {
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
}

// Khởi tạo khi DOM được load
document.addEventListener('DOMContentLoaded', function () {
    checkLogin();
    initializeAuthEvents();
});