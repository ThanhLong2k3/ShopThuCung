let Search_KH = [];
let searchTimeoutKH;

async function searchKH() {
    const name = document.getElementById("Search_TenKH").value.trim();
    const sdt = document.getElementById("Search_SDT_KH").value;

    let url = apiEndpoints.KHACHHANG.Search_KH;
    if (name) url += `tenkh=${encodeURIComponent(name)}&`;
    if (sdt) url += `sdt=${encodeURIComponent(sdt)}&`;
    debugger
    url = url.slice(0, -1);

    try {
        Search_KH = await getDaTa(url);
        loadkhachhang();
    } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        renderError("Lỗi khi tìm kiếm: " + error.message);
    }
}

function handlesearchKH() {
    if (searchTimeoutKH) {
        clearTimeout(searchTimeoutKH);
    }
    searchTimeoutKH = setTimeout(searchKH, 1000);
}

document.getElementById("Search_TenKH").addEventListener("input", handlesearchKH);
document.getElementById("Search_SDT_KH").addEventListener("input", handlesearchKH);


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

async function loadkhachhang() {
    const tableBody = $('.dskh');
    tableBody.html('<tr><td colspan="4">Đang tải dữ liệu...</td></tr>');
    let data;
    if (!Array.isArray(Search_KH) || Search_KH.length === 0) {
        const get_all_KH = await getDaTa(apiEndpoints.KHACHHANG.getAll);
        data = get_all_KH;
    } else {
        data = Search_KH;
    }
    if (data) {
        let listKhachHang = data;
        let htmlArray = '';
        for (let i = 0; i < listKhachHang.length; i++) {
                htmlArray += `
                <tr>
                    <td>${listKhachHang[i].tenKhachHang}</td>
                    <td>${listKhachHang[i].diaChi_KH}</td>
                    <td>${listKhachHang[i].soDienThoai_KH}</td>
                    <td><button onclick="suakhachhang('${listKhachHang[i].maKhachHang}')">Sửa</button></td>
                    <td><button onclick="xoakhachhang('${listKhachHang[i].maKhachHang}')">Xóa</button></td>
                </tr>`;
        }
        tableBody.html(htmlArray || '<tr><td colspan="4">Không có dữ liệu</td></tr>');
    }
}

async function themkhachhang() {
    let ten = document.getElementById("tenkhachhang").value.trim();
    let diachi_KH = document.getElementById("diachi_KH").value.trim();
    let sodienthoai_KH = document.getElementById("sodienthoai_KH").value.trim();
    if (!ten || !diachi_KH || !sodienthoai_KH) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    let newKhachHang = {
        taiKhoan:"aa",
        tenKhachHang: ten,
        diaChi_KH: diachi_KH,
        soDienThoai_KH: sodienthoai_KH,
    };
    await addData(apiEndpoints.KHACHHANG.add,newKhachHang,loadkhachhang)
    resetForm_KH();
}
let taikhoan;
async function suakhachhang(ma) {
   let data= await getDaTa(apiEndpoints.KHACHHANG.getById(ma));
    document.getElementById("Modal_KhachHang").style.display = 'block';
    document.getElementById("btnadd_KH").style.display = 'none';
    document.getElementById("btnupdate_KH").style.display = 'block';
    document.getElementById('makhachhang').setAttribute('readonly', 'true');
    taikhoan = data[0].taiKhoan;
    document.getElementById('makhachhang').value = data[0].maKhachHang;
    document.getElementById('tenkhachhang').value = data[0].tenKhachHang;
    document.getElementById('diachi_KH').value = data[0].diaChi_KH;
    document.getElementById('sodienthoai_KH').value = data[0].soDienThoai_KH;
}

async function capnhatkhachhang() {
    let ma = document.getElementById("makhachhang").value.trim();
    let ten = document.getElementById("tenkhachhang").value.trim();
    let diachi_KH = document.getElementById("diachi_KH").value.trim();
    let sodienthoai_KH = document.getElementById("sodienthoai_KH").value.trim();

    if (!ma || !ten || !diachi_KH || !sodienthoai_KH) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }
    debugger;
    let data={
            maKhachHang:ma,
            taiKhoan: taikhoan,
            tenKhachHang: ten,
            diachi_KH: diachi_KH,
            sodienthoai_KH: sodienthoai_KH,
    }
    await updateData(apiEndpoints.KHACHHANG.update,data,loadkhachhang);
    resetForm_KH();
}

async function xoakhachhang(ma) {
    await deleteData(apiEndpoints.KHACHHANG.delete(ma),loadkhachhang);
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



function show_KhachHang()
{
    showSection('QL_KhachHang');
    loadkhachhang();
}


