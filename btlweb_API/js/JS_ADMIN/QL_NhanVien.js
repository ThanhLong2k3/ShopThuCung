function openmodal(id){
    var modal = document.getElementById(id);    
    modal.style.display = "block";

}
let Search_NhanVien=[];
let searchTimeoutNV; 


async function searchNhanVien() {
    const name = document.getElementById("Search_nameNV").value.trim();
    const chucVu = document.getElementById("Search_ChucVu").value;

    let url = apiEndpoints.NhanVien.Search_NhanVien;
    if (name) url += `tennv=${encodeURIComponent(name)}&`;
    if (chucVu) url += `chucvu=${encodeURIComponent(chucVu)}&`;
    url = url.slice(0, -1);

    try {
        Search_NhanVien = await getDaTa(url); 
        loadnhanvien(); 
    } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        renderError("Lỗi khi tìm kiếm: " + error.message); 
    }
}

function handleSearchNhanVien() {
    if (searchTimeoutNV) {
        clearTimeout(searchTimeoutNV);
    }
    searchTimeoutNV = setTimeout(searchNhanVien, 1000); 
}

document.getElementById("Search_nameNV").addEventListener("input", handleSearchNhanVien);
document.getElementById("Search_ChucVu").addEventListener("change", handleSearchNhanVien);


function close_Modal_NhanVien(id) {
    document.getElementById(id).style.display = 'none';
            document.getElementById("taikhoan").value = '';
            document.getElementById("tennhanvien").value = '';
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
async function loadnhanvien(page=1) {
    $('.dsnhanvien').html('<tr><td colspan="8">Loading...</td></tr>'); 
    try {
        let data;
        if (!Array.isArray(Search_NhanVien) || Search_NhanVien.length === 0) {
            const get_all_NhanVien = await getDaTa(apiEndpoints.NhanVien.PhanTrang(page));
            data = get_all_NhanVien;
        } else {
            data = Search_NhanVien;
        }
        if (data) {
            let listNhanVien = data;
            let htmlArray = '';
            for (let i = 0; i < listNhanVien.length; i++) {
                htmlArray += `
                <tr>
                    <td><img src="${listNhanVien[i].anhThe}" style="max-width: 100px; max-height: 100px;"></td>
                    <td>${listNhanVien[i].tenNhanVien}</td>
                    <td>${listNhanVien[i].diaChi}</td>
                    <td>${listNhanVien[i].soDienThoai}</td>
                    <td>${listNhanVien[i].chucVu}</td>
                    <td><button onclick="suanhanvien('${listNhanVien[i].maNhanVien}')">Sửa</button></td>
                    <td><button onclick="xoanhanvien('${listNhanVien[i].maNhanVien}')">Xóa</button></td>
                </tr>`;
            }
            $('.dsnhanvien').html(htmlArray);
        }
    } catch (error) {
        console.error("Error fetching employee data:", error);
        alert("Could not load employee data. Please try again later.");
    }
}
function show_NV()
{
    debugger;
    showSection('QL_Nhanvien');
    loadnhanvien();
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
        resetForm_NhanVien();
        loadnhanvien();
    };
    reader.readAsDataURL(anhthe);
}
var manv = undefined;
async function suanhanvien(ma) {
    let data = await getDaTa(apiEndpoints.NhanVien.getById(ma)); 
    const modal = document.getElementById("Modal_NhanVien");
    modal.style.display = "block";
    let nhanvienList = data;
    document.getElementById("btnadd1").style.display = 'none';
    document.getElementById("btnupdate1").style.display = 'block';
    document.getElementById('taikhoan').setAttribute('readonly', 'true');
    manv=nhanvienList[0].maNhanVien;
    debugger;
    
            document.getElementById('taikhoan').value = nhanvienList[0].taiKhoan;
            document.getElementById('tennhanvien').value = nhanvienList[0].tenNhanVien;
            document.getElementById('diachi').value = nhanvienList[0].diaChi;
            document.getElementById('sodienthoai').value = nhanvienList[0].soDienThoai;
            document.getElementById('chucvu').value = nhanvienList[0].chucVu;
            document.getElementById('preview').src = nhanvienList[0].anhThe;
            document.getElementById('preview').style.display = 'block';
    
}

const resetForm_NhanVien =() => {
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

async function capnhatnhanvien() {
    let ma=manv;
    let taik = document.getElementById("taikhoan").value.trim();
    let ten = document.getElementById("tennhanvien").value.trim();
    let diachi = document.getElementById("diachi").value.trim();
    let sodienthoai = document.getElementById("sodienthoai").value.trim();
    let chucvu = document.getElementById("chucvu").value.trim();
    let anhFile = document.getElementById("anhthe").files[0];

    if ( !ten  || !diachi || !sodienthoai || !chucvu) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    const phonePattern = /^[0-9]{10,11}$/; 
    if (!phonePattern.test(sodienthoai)) {
        alert("Số điện thoại không hợp lệ.");
        return;
    }
 
    let anhData;
    if (anhFile) {
        try {
            const base64String = await readFileAsBase64(anhFile);
            anhData = base64String;
        } catch (error) {
            alert("Lỗi khi xử lý ảnh: " + error.message);
            return;
        }
    } else {
        anhData = document.getElementById('preview').src;

        if (!anhData || anhData === '') {
            alert("Vui lòng chọn ảnh.");
            return;
        }
    }
    
    const NV = {
        maNhanVien: parseInt(ma),
        taiKhoan: taik,
        tenNhanVien: ten,
        diaChi: diachi,
        soDienThoai: sodienthoai,
        chucVu: chucvu,
        anhThe: anhData
    };

        await updateData(apiEndpoints.NhanVien.update, NV, loadnhanvien);
        let element = document.getElementById("Modal_NhanVien");
        element.style.display = "none";
     
}


async function xoanhanvien(ma) {
   await deleteData(apiEndpoints.NhanVien.delete(ma),loadnhanvien);
 }


 document.getElementById('pagination_NhanVien').addEventListener('click', function (event) {
    if (event.target.classList.contains('page-item')) {
      document.querySelectorAll('.page-item').forEach(function (item) {
        item.classList.remove('active');
      });
  
      event.target.classList.add('active');
      const activeValue = parseInt(event.target.textContent);
      if(activeValue)
      {
        loadnhanvien(activeValue);
      } 
    }
  });

