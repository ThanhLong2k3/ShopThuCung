function openmodal(id) {
    var modal = document.getElementById(id);
    modal.style.display = "block";

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            resetForm_KH();
        }
    }
}

function close_Modal_KhachHang(id) {
    document.getElementById(id).style.display = "none";
    resetForm_KH();
}

function loadkhachhang() {
    let data = localStorage.getItem('ListKhachHang');
    if (data) {
        let listKhachHang = JSON.parse(data);
        let htmlArray = '';
        for (let i = 0; i < listKhachHang.length; i++) {
            if(listKhachHang[i].trangthai==1)
            {
                htmlArray += `
                <tr>
                    <td>${listKhachHang[i].tenkhachhang}</td>
                    <td>${listKhachHang[i].diachi_KH}</td>
                    <td>${listKhachHang[i].sodienthoai_KH}</td>
                    <td><button onclick="suakhachhang('${listKhachHang[i].makhachhang}')">Sửa</button></td>
                    <td><button onclick="xoakhachhang('${listKhachHang[i].makhachhang}')">Xóa</button></td>
                </tr>`;
            }
        }
        document.querySelector('.dskh').innerHTML = htmlArray;
    }
}

function themkhachhang() {
    let ma = document.getElementById("makhachhang").value.trim();
    let ten = document.getElementById("tenkhachhang").value.trim();
    let diachi_KH = document.getElementById("diachi_KH").value.trim();
    let sodienthoai_KH = document.getElementById("sodienthoai_KH").value.trim();
    let trangthai=1;
    if (!ma || !ten || !diachi_KH || !sodienthoai_KH) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    let newKhachHang = {
        makhachhang: ma,
        tenkhachhang: ten,
        diachi_KH: diachi_KH,
        sodienthoai_KH: sodienthoai_KH,
        trangthai:trangthai
    };

    let listKhachHang = localStorage.getItem('ListKhachHang');
    if (!listKhachHang) {
        listKhachHang = [];
    } else {
        listKhachHang = JSON.parse(listKhachHang);
    }

    listKhachHang.push(newKhachHang);
    localStorage.setItem('ListKhachHang', JSON.stringify(listKhachHang));
    alert("Thêm khách hàng thành công!");
    resetForm_KH();
    loadkhachhang();
}

function suakhachhang(ma) {
    let data = localStorage.getItem('ListKhachHang');
    let khachhangList = JSON.parse(data);
    document.getElementById("Modal_KhachHang").style.display = 'block';

    document.getElementById("btnadd_KH").style.display = 'none';
    document.getElementById("btnupdate_KH").style.display = 'block';
    document.getElementById('makhachhang').setAttribute('readonly', 'true');
    for (let i = 0; i < khachhangList.length; i++) {
        if (khachhangList[i].makhachhang === ma) {
            document.getElementById('makhachhang').value = khachhangList[i].makhachhang;
            document.getElementById('tenkhachhang').value = khachhangList[i].tenkhachhang;
            document.getElementById('diachi_KH').value = khachhangList[i].diachi_KH;
            document.getElementById('sodienthoai_KH').value = khachhangList[i].sodienthoai_KH;
        }
    }
}

function capnhatkhachhang() {
    let data = localStorage.getItem('ListKhachHang');
    let khachhangList = JSON.parse(data);
    let ma = document.getElementById("makhachhang").value.trim();
    let ten = document.getElementById("tenkhachhang").value.trim();
    let diachi_KH = document.getElementById("diachi_KH").value.trim();
    let sodienthoai_KH = document.getElementById("sodienthoai_KH").value.trim();

    if (!ma || !ten || !diachi_KH || !sodienthoai_KH) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    for (let i = 0; i < khachhangList.length; i++) {
        if (khachhangList[i].makhachhang === ma) {
            khachhangList[i].tenkhachhang = ten;
            khachhangList[i].diachi_KH = diachi_KH;
            khachhangList[i].sodienthoai_KH = sodienthoai_KH;
            break;
        }
    }
    localStorage.setItem('ListKhachHang', JSON.stringify(khachhangList));
    alert("Cập nhật khách hàng thành công!");
    resetForm_KH();
    loadkhachhang();
}

function xoakhachhang(ma) {
    let data = localStorage.getItem('ListKhachHang');
    let khachhangList = JSON.parse(data);
    let acce=confirm("Bnạ có chắc mốn xóa khách hàng ?");
    if(acce){
        for (let i = 0; i < khachhangList.length; i++) {
            if (khachhangList[i].makhachhang === ma) {
                khachhangList[i].trangthai = 0;
                break;
            }
        }
    
        localStorage.setItem('ListKhachHang', JSON.stringify(khachhangList));
        alert("Xóa khách hàng thành công!");
        loadkhachhang();
    }
    
}

function resetForm_KH() {
    document.getElementById("makhachhang").value = '';
    document.getElementById("tenkhachhang").value = '';
    document.getElementById("diachi_KH").value = '';
    document.getElementById("sodienthoai_KH").value = '';
    document.getElementById("btnadd_KH").style.display = 'block';
    document.getElementById("Modal_KhachHang").style.display = 'none';
    document.getElementById("btnupdate_KH").style.display = 'none';
    document.getElementById('makhachhang').removeAttribute('readonly');
}

loadkhachhang();
