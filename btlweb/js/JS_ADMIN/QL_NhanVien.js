function openmodal(id){
    var modal = document.getElementById(id);    
    modal.style.display = "block";

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("taikhoan").value = '';
            document.getElementById("tennhanvien").value = '';
            document.getElementById("matkhau").value = '';
            document.getElementById("diachi").value = '';
            document.getElementById("sodienthoai").value = '';
            document.getElementById("chucvu").value = '';
            document.getElementById('preview').src = '#';
            document.getElementById('preview').style.display = 'none';
            document.getElementById("anhthe").value = '';
            document.getElementById("btnadd").style.display = 'block';
            document.getElementById("btnupdate").style.display = 'none';
            document.getElementById('taikhoan').removeAttribute('readonly');
        }
    }
}

function close_Modal_NhanVien(id) {
    document.getElementById(id).style.display = 'none';
            document.getElementById("taikhoan").value = '';
            document.getElementById("tennhanvien").value = '';
            document.getElementById("matkhau").value = '';
            document.getElementById("diachi").value = '';
            document.getElementById("sodienthoai").value = '';
            document.getElementById("chucvu").value = '';
            document.getElementById('preview').src = '#';
            document.getElementById('preview').style.display = 'none';
            document.getElementById("anhthe").value = '';
            document.getElementById("btnadd").style.display = 'block';
            document.getElementById("btnupdate").style.display = 'none';
            document.getElementById('taikhoan').removeAttribute('readonly');
}

function loadnhanvien() {
    let data = localStorage.getItem('ListNhanVien');
    if(data) {
        let listNhanVien = JSON.parse(data);
        let htmlArray = '';
        for(let i = 0; i < listNhanVien.length; i++) {
            if(listNhanVien[i].trangthai==1)
            {
                htmlArray += `
            <tr>
                <td>${listNhanVien[i].taikhoan}</td>
                <td>${listNhanVien[i].matkhau}</td>
                <td><img src="${listNhanVien[i].anhthe}" style="max-width: 100px; max-height: 100px;"></td>
                <td>${listNhanVien[i].tennhanvien}</td>
                <td>${listNhanVien[i].diachi}</td>
                <td>${listNhanVien[i].sodienthoai}</td>
                <td>${listNhanVien[i].chucvu}</td>
                <td><button onclick="suanhanvien('${listNhanVien[i].taikhoan}')">Sửa</button></td>
                <td><button onclick="xoanhanvien('${listNhanVien[i].taikhoan}')">Xóa</button></td>
            </tr>`;
            }
            
        }
        $('.dsnhanvien').html(htmlArray);
    }
}

loadnhanvien();

function previewImage(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function() {
        var preview = document.getElementById('preview');
        preview.src = reader.result;
        preview.style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
}

function themnhanvien() {
    let taikhoan = document.getElementById("taikhoan").value.trim();
    let ten = document.getElementById("tennhanvien").value.trim();
    let matkhau = document.getElementById("matkhau").value;
    let diachi = document.getElementById("diachi").value.trim();
    let sodienthoai = document.getElementById("sodienthoai").value.trim();
    let chucvu = document.getElementById("chucvu").value.trim();
    let anhthe = document.getElementById("anhthe").files[0];
    let trangthai=1;

    if (!taikhoan || !ten || !matkhau  || !diachi || !sodienthoai || !chucvu || !anhthe) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    let reader = new FileReader();
    reader.onload = function() {
        let newNhanVien = {
            taikhoan: taikhoan,
            tennhanvien: ten,
            matkhau: matkhau,
            diachi: diachi,
            sodienthoai: sodienthoai,
            chucvu: chucvu,
            anhthe: reader.result,
            trangthai: trangthai,
        };

        let listNhanVien = localStorage.getItem('ListNhanVien');
        if (!listNhanVien) {
            listNhanVien = [];
        } else {
            listNhanVien = JSON.parse(listNhanVien);
        }

        listNhanVien.push(newNhanVien);
        localStorage.setItem('ListNhanVien', JSON.stringify(listNhanVien));
        alert("Thêm nhân viên thành công!");
        document.getElementById("Modal_NhanVien").style.display = "none";
        resetForm();
        loadnhanvien();
    };
    reader.readAsDataURL(anhthe);
}

function suanhanvien(ma) {
    let data = localStorage.getItem('ListNhanVien');
    const modal = document.getElementById("Modal_NhanVien");
    modal.style.display = "block";
    let nhanvienList = JSON.parse(data);
    
    document.getElementById("btnadd1").style.display = 'none';
    document.getElementById("btnupdate1").style.display = 'block';
    document.getElementById('taikhoan').setAttribute('readonly', 'true');
    for (let i = 0; i < nhanvienList.length; i++) {
        if (nhanvienList[i].taikhoan === ma) {
            document.getElementById('taikhoan').value = nhanvienList[i].taikhoan;
            document.getElementById('tennhanvien').value = nhanvienList[i].tennhanvien;
            document.getElementById('matkhau').value = nhanvienList[i].matkhau;
            document.getElementById('diachi').value = nhanvienList[i].diachi;
            document.getElementById('sodienthoai').value = nhanvienList[i].sodienthoai;
            document.getElementById('chucvu').value = nhanvienList[i].chucvu;
            document.getElementById('preview').src = nhanvienList[i].anhthe;
            document.getElementById('preview').style.display = 'block';
        }
    }
}

function capnhatnhanvien() {
    let data = localStorage.getItem('ListNhanVien');
    let nhanvienList = JSON.parse(data);
    let ma = document.getElementById("taikhoan").value.trim();
    let ten = document.getElementById("tennhanvien").value.trim();
    let matkhau = document.getElementById("matkhau").value;
    let diachi = document.getElementById("diachi").value.trim();
    let sodienthoai = document.getElementById("sodienthoai").value.trim();
    let chucvu = document.getElementById("chucvu").value.trim();
    let anhthe = document.getElementById("anhthe").files[0];

    if (!ma || !ten || !matkhau  || !diachi || !sodienthoai || !chucvu) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }
    if(anhthe)
    {
        let reader = new FileReader();
    reader.onload = function() {
        for (let i = 0; i < nhanvienList.length; i++) {
            if (nhanvienList[i].taikhoan === ma) {
                nhanvienList[i].tennhanvien = ten;
                nhanvienList[i].matkhau = matkhau;
                nhanvienList[i].diachi = diachi;
                nhanvienList[i].sodienthoai = sodienthoai;
                nhanvienList[i].chucvu = chucvu;
                nhanvienList[i].anhthe = reader.result;
                break;
            }
        }
        localStorage.setItem('ListNhanVien', JSON.stringify(nhanvienList));
        alert("Cập nhật nhân viên thành công!");
        document.getElementById("Modal_NhanVien").style.display = "none";

        resetForm();
        loadnhanvien();
    };
    reader.readAsDataURL(anhthe);
    }
    else
    {
        for (let i = 0; i < nhanvienList.length; i++) {
            if (nhanvienList[i].taikhoan === ma) {
                nhanvienList[i].tennhanvien = ten;
                nhanvienList[i].matkhau = matkhau;
                nhanvienList[i].diachi = diachi;
                nhanvienList[i].sodienthoai = sodienthoai;
                nhanvienList[i].chucvu = chucvu;
                break;
            }
        }
        localStorage.setItem('ListNhanVien', JSON.stringify(nhanvienList));
        alert("Cập nhật nhân viên thành công!");
        document.getElementById("Modal_NhanVien").style.display = "none";

        resetForm();
        loadnhanvien();
    }
    
}

function resetForm() {
    document.getElementById("taikhoan").value = '';
    document.getElementById("tennhanvien").value = '';
    document.getElementById("matkhau").value = '';
    document.getElementById("diachi").value = '';
    document.getElementById("sodienthoai").value = '';
    document.getElementById("chucvu").value = '';
    document.getElementById('preview').src = '#';
    document.getElementById('preview').style.display = 'none';
    document.getElementById("anhthe").value = '';
    document.getElementById("btnadd").style.display = 'block';
    document.getElementById("btnupdate").style.display = 'none';
    document.getElementById('taikhoan').removeAttribute('readonly');
}

function xoanhanvien(ma) {
    let data = localStorage.getItem('ListNhanVien');
    let nhanvienList = JSON.parse(data);
    let accep=confirm("bạn có chắc chắn muốn xóa nhân viên này?  ");
    if(accep) {
        for (let i = 0; i < nhanvienList.length; i++) {
            if (nhanvienList[i].taikhoan === ma) {
                nhanvienList[i].trangthai=0;
                break;
            }
        }

        localStorage.setItem('ListNhanVien', JSON.stringify(nhanvienList));
        alert("Xóa nhân viên thành công!");
        loadnhanvien();

    }
 }
