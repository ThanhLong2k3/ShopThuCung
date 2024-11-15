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

function loadnhacungcap() {
    let data = localStorage.getItem('ListNhaCungCap');
    if (data) {
        let listNhaCungCap = JSON.parse(data);
        let htmlArray = '';
        for (let i = 0; i < listNhaCungCap.length; i++) {
            if(listNhaCungCap[i].trangthai==1)
            {
                htmlArray += `
                <tr>
                    <td>${listNhaCungCap[i].tennhacungcap}</td>
                    <td>${listNhaCungCap[i].sodienthoai}</td>
                    <td>${listNhaCungCap[i].diachi}</td>
                    <td><button onclick="suanhacungcap('${listNhaCungCap[i].manhacungcap}')">Sửa</button></td>
                    <td><button onclick="xoanhacungcap('${listNhaCungCap[i].manhacungcap}')">Xóa</button></td>
                </tr>`;
            }
        }
        document.querySelector('.dsncc').innerHTML = htmlArray;
    }
}

function themnhacungcap() {
    let ma = document.getElementById("manhacungcap").value.trim();
    let ten = document.getElementById("tennhacungcap").value.trim();
    let sodienthoai=document.getElementById("SDT").value;
    let diachi=document.getElementById("DCNCC").value;
    let trangthai=1;
    if (!ma || !ten || !sodienthoai || !diachi) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    let newNhaCungCap = {
        manhacungcap: ma,
        tennhacungcap: ten,
        sodienthoai: sodienthoai,
        diachi: diachi,
        trangthai: trangthai
    };

    let listNhaCungCap = localStorage.getItem('ListNhaCungCap');
    if (!listNhaCungCap) {
        listNhaCungCap = [];
    } else {
        listNhaCungCap = JSON.parse(listNhaCungCap);
    }

    listNhaCungCap.push(newNhaCungCap);
    localStorage.setItem('ListNhaCungCap', JSON.stringify(listNhaCungCap));
    alert("Thêm nhà cung cấp thành công!");
    document.getElementById("Modal_NhaCungCap").style.display = "none";
    resetForm_NCC();
    loadnhacungcap();
}

function suanhacungcap(ma) {
    let data = localStorage.getItem('ListNhaCungCap');
    let nhacungcapList = JSON.parse(data);
    document.getElementById("Modal_NhaCungCap").style.display="block";
    document.getElementById("btnadd2").style.display = 'none';
    document.getElementById("btnupdate2").style.display = 'block';
    document.getElementById('manhacungcap').setAttribute('readonly', 'true');
    for (let i = 0; i < nhacungcapList.length; i++) {
        if (nhacungcapList[i].manhacungcap === ma) {
            document.getElementById('manhacungcap').value = nhacungcapList[i].manhacungcap;
            document.getElementById('tennhacungcap').value = nhacungcapList[i].tennhacungcap;
            document.getElementById('SDT').value = nhacungcapList[i].sodienthoai;
            document.getElementById('DCNCC').value = nhacungcapList[i].diachi;
        }
    }
}

function capnhatnhacungcap() {
    let data = localStorage.getItem('ListNhaCungCap');
    let nhacungcapList = JSON.parse(data);
    let ma = document.getElementById("manhacungcap").value.trim();
    let ten = document.getElementById("tennhacungcap").value.trim();
    let sodienthoai = document.getElementById("SDT").value.trim();
    let diachi = document.getElementById("DCNCC").value.trim();

    if (!ma || !ten || !sodienthoai || !diachi) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    for (let i = 0; i < nhacungcapList.length; i++) {
        if (nhacungcapList[i].manhacungcap === ma) {
            nhacungcapList[i].tennhacungcap = ten;
            nhacungcapList[i].sodienthoai = sodienthoai;
            nhacungcapList[i].diachi = diachi;
            break;
        }
    }
    localStorage.setItem('ListNhaCungCap', JSON.stringify(nhacungcapList));
    alert("Cập nhật nhà cung cấp thành công!");
    document.getElementById("Modal_NhaCungCap").style.display = "none";

    resetForm_NCC();
    loadnhacungcap();
}

function xoanhacungcap(ma) {
    let data = localStorage.getItem('ListNhaCungCap');
    let nhacungcapList = JSON.parse(data);
    let accep=confirm("bạn có chăc muốn xóa nhà cung cấp ?");
    if (accep){
        for (let i = 0; i < nhacungcapList.length; i++) {
            if (nhacungcapList[i].manhacungcap === ma) {
                nhacungcapList[i].trangthai=0;
                break;
            }
        }
    
        localStorage.setItem('ListNhaCungCap', JSON.stringify(nhacungcapList));
        alert("Xóa nhà cung cấp thành công!");
        loadnhacungcap();
    }
   
}

function resetForm_NCC() {
    debugger;
    document.getElementById("manhacungcap").value = '';
    document.getElementById("tennhacungcap").value = '';
    document.getElementById("SDT").value = '';
    document.getElementById("DCNCC").value = '';
    document.getElementById("btnadd2").style.display = 'block';
    document.getElementById("btnupdate2").style.display = 'none';
    document.getElementById('manhacungcap').removeAttribute('readonly');
}

loadnhacungcap();