function tang() {
    let soluong = parseInt(document.getElementById('soluong').value);
    if (soluong >= 0) {
        soluong++;
        document.getElementById('soluong').value = soluong;
    }
}

function giam() {
    let soluong = parseInt(document.getElementById('soluong').value);
    if (soluong > 1) { 
        soluong--;
        document.getElementById('soluong').value = soluong;
    } 
}
function getdulieu(){
    const data= localStorage.getItem('data');
    if(data){
        const data1 = JSON.parse(data);
        console.log(data1);
        $('#tensp').text(data1.tensp); 
        $('#tenspsau').text(data1.tensp); 

        $('#anh').attr('src', data1.anh);
        $('#anh1').attr('src', data1.anh);
        $('#anh2').attr('src', data1.anh2);
        $('#anh3').attr('src', data1.anh3);
        $('#anh4').attr('src', data1.anh4);

        $('#giacu').text(data1.giakm);
        $('#giamoi').text(data1.gia);
        debugger;
    }
}
getdulieu();


function addgh() {
    let ten = document.getElementById('tensp').innerText;
    let anh = document.getElementById('anh').src;
    let gia = document.getElementById('giamoi').innerText;
    let soluong = parseInt(document.getElementById('soluong').value); 
    let giohang = localStorage.getItem('giohang');
    let Giohang = giohang ? JSON.parse(giohang) : [];

    let maGioHang = localStorage.getItem('maGioHang') || 1;
    localStorage.setItem('maGioHang', ++maGioHang);

    let check = Giohang.some(item => item.Ten === ten);
    if (check) {
        Giohang.forEach(item => {
            if (item.Ten === ten) {
                item.SL += soluong;
            }
        });
    } else {
        const muahang = {
            MaGioHang: maGioHang,
            Anh: anh,
            Ten: ten,
            Gia: gia,
            SL: soluong
        };
        Giohang.push(muahang);
    }

    localStorage.setItem('giohang', JSON.stringify(Giohang));

    if (check) {
        alert("Sản phẩm đã tồn tại trong giỏ hàng. Số lượng đã được cập nhật!");
    } else {
        alert("Bạn đã thêm sản phẩm vào giỏ hàng!");
    }
}
