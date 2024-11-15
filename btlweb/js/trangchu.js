var stt = 0;
var images = [
    "/anhpaner/pn1.jpg",
    "/anhpaner/pn2.jpg",
    "/anhpaner/pn3.jpg"
];

var interval; // Variable to hold the interval ID

document.addEventListener('DOMContentLoaded', function() {
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



    window.addEventListener('scroll', function() {
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
    function setdulieu(event, link) {
        event.preventDefault();
        debugger;
        
        const giamgiaElement = $(link).find('.giamgia').text();
        const giaElement = $(link).find('#gia').text();
        const tensp = $(link).find('.chusp h2').text();
        const anh1 = $(link).find('.anh').attr('src');
        const anh2 = $(link).find('.anhcon').eq(0).attr('src');
        const anh3 = $(link).find('.anhcon').eq(1).attr('src');
        const anh4 = $(link).find('.anhcon').eq(2).attr('src');
    
        const gia = parseFloat(giaElement.replace(/[^0-9.-]+/g,""));
        const giamgia = parseFloat(giamgiaElement.replace(/[^0-9.-]+/g,""));
    
        const giakm = gia - (gia * giamgia / 100);
    
        const data = {
            tensp: tensp.trim(),
            gia: giaElement.trim(),
            giamgia: giamgiaElement.trim(),
            giakm: giakm.toFixed(3), 
            anh: anh1,
            anh2: anh2,
            anh3: anh3,
            anh4: anh4
        };
    
        localStorage.setItem('data', JSON.stringify(data));
        const url = './chitietssanpham.html?data=' + encodeURIComponent(JSON.stringify(data));
        window.location.href = url;
    }
    

