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