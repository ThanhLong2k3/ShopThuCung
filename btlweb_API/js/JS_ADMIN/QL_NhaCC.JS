function openmodal() {
    var modal = document.getElementById("Modal_NhaCungCap");
    modal.style.display = "block";

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            resetForm_NCC();
        }
    }
}

function close_Modal_NhaCungCap() {
    document.getElementById("Modal_NhaCungCap").style.display = "none";
    resetForm_NCC();
}

async function loadnhacungcap() {
    let data =await getDaTa(apiEndpoints.NCC.getAll);
    if (data) {
        let listNhaCungCap = data;
        let htmlArray = '';
        for (let i = 0; i < listNhaCungCap.length; i++) {
            
                htmlArray += `
                <tr>
                    <td>${listNhaCungCap[i].tenNhaCungCap}</td>
                    <td>${listNhaCungCap[i].soDienThoai}</td>
                    <td>${listNhaCungCap[i].diaChi}</td>
                    <td><button onclick="suanhacungcap('${listNhaCungCap[i].maNhaCungCap}')">Sửa</button></td>
                    <td><button onclick="xoanhacungcap('${listNhaCungCap[i].maNhaCungCap}')">Xóa</button></td>
                </tr>`;
        }
        document.querySelector('.dsncc').innerHTML = htmlArray;
    }
}

async function themnhacungcap() {
    let ma = document.getElementById("manhacungcap").value.trim();
    let ten = document.getElementById("tennhacungcap").value.trim();
    let sodienthoai=document.getElementById("SDT").value;
    let diachi=document.getElementById("DCNCC").value;
    if (  !ten || !sodienthoai || !diachi) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }
    let newNhaCungCap = {
        tenNhaCungCap: ten,
        soDienThoai: sodienthoai,
        diaChi: diachi
    };
   await addData(apiEndpoints.NCC.add,newNhaCungCap,loadnhacungcap);
    document.getElementById("Modal_NhaCungCap").style.display = "none";
    resetForm_NCC();
}

async function suanhacungcap(ma) {
    let nhacungcapList = await getDaTa(apiEndpoints.NCC.getById(ma));
    
    document.getElementById("Modal_NhaCungCap").style.display="block";
    document.getElementById("btnadd2").style.display = 'none';
    document.getElementById("btnupdate2").style.display = 'block';
    document.getElementById('manhacungcap').setAttribute('readonly', 'true');
    document.getElementById('manhacungcap').value = nhacungcapList[0].maNhaCungCap;
    document.getElementById('tennhacungcap').value = nhacungcapList[0].tenNhaCungCap;
    document.getElementById('SDT').value = nhacungcapList[0].soDienThoai;
    document.getElementById('DCNCC').value = nhacungcapList[0].diaChi;
   
}

async function capnhatnhacungcap() {
    let ma = document.getElementById("manhacungcap").value.trim();
    let ten = document.getElementById("tennhacungcap").value.trim();
    let sodienthoai = document.getElementById("SDT").value.trim();
    let diachi = document.getElementById("DCNCC").value.trim();

    if (!ma || !ten || !sodienthoai || !diachi) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }
    let newNhaCungCap = {
        maNhaCungCap:ma,
        tenNhaCungCap: ten,
        soDienThoai: sodienthoai,
        diaChi: diachi
    };
    await updateData(apiEndpoints.NCC.update,newNhaCungCap,loadnhacungcap);
    document.getElementById("Modal_NhaCungCap").style.display = "none";
    resetForm_NCC();
}

async function xoanhacungcap(ma) {
    if (confirm('Bạn có chắc chắn muốn xóa ?')) {
       await deleteData(apiEndpoints.NCC.delete(ma),loadnhacungcap);
    }
}

function resetForm_NCC() {
    document.getElementById("manhacungcap").value = '';
    document.getElementById("tennhacungcap").value = '';
    document.getElementById("SDT").value = '';
    document.getElementById("DCNCC").value = '';
    document.getElementById("btnadd2").style.display = 'block';
    document.getElementById("btnupdate2").style.display = 'none';
    document.getElementById('manhacungcap').removeAttribute('readonly');
}

function show_NCC()
{
    showSection('QL_NhaCungCap');
    loadnhacungcap();
}
