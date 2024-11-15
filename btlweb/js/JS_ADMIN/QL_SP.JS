
function openmodal(){
    var modal = document.getElementById("Modal_ThuCung");    
    modal.style.display = "block";
    dotenloaira();

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("mathucung").value = '';
            document.getElementById("tenthucung").value = '';
            document.getElementById("loai").value = '';
            document.getElementById("soluong").value = '';
            document.getElementById("gianhap").value = '';
            document.getElementById("giaban").value = '';
            CKEDITOR.instances.description.setData('');
            document.getElementById("anh").value = '';
            document.getElementById('preview').style.display = 'none';
            document.getElementById("btnadd").style.display = 'block';
            document.getElementById("btnupdate").style.display = 'none';
            document.getElementById('mathucung').removeAttribute('readonly');
        }
    }

}


function close_Modal_SP() {
        document.getElementById("Modal_ThuCung").style.display = "none";
        document.getElementById("mathucung").value = '';
        document.getElementById("tenthucung").value = '';
        document.getElementById("loai").value = '';
        document.getElementById("soluong").value = '';
        document.getElementById("gianhap").value = '';
        document.getElementById("giaban").value = '';
        CKEDITOR.instances.description.setData('');
        document.getElementById("anh").value = '';
        document.getElementById('preview').style.display = 'none';
        document.getElementById("btnadd").style.display = 'block';
        document.getElementById("btnupdate").style.display = 'none';
        document.getElementById('mathucung').removeAttribute('readonly');


}




function dotenloaira() {
    let data = localStorage.getItem('ListLoai');
    if (data) {
        let l = JSON.parse(data);
        let htmlArray = l.map(l => `
        <option value="${l.tenloai}">${l.tenloai}</option>
        `);
        $('#loai').html(htmlArray.join(''));
    }
}


function loadthucung() {
    let data = localStorage.getItem('ListThuCung');
    if(data) {
        let listThuCung= JSON.parse(data);
        let htmlArray='';
        for(let i=0;i<listThuCung.length;i++) {
            if(listThuCung[i].trangthai==1)
            {
                htmlArray+=`
                <tr>
                <td><img src="${listThuCung[i].anh}" style="max-width: 100px; max-height: 100px;"></td>
                <td>${listThuCung[i].tenthucung}</td>
                <td>${listThuCung[i].loaithucung}</td>
                <td>${listThuCung[i].soluong}</td>
                <td>${listThuCung[i].giaban}</td>
                <td>${listThuCung[i].gianhap}</td>
                <td>${listThuCung[i].mota}</td>
                <td><button onclick="suathucung('${listThuCung[i].mathucung}')">Sửa</button></td>
                <td><button onclick="xoathucung('${listThuCung[i].mathucung}')">Xóa</button></td>
            </tr>`;
            }
        }
        $('.dsthucung').html(htmlArray);
    }
}

loadthucung();
dotenloaira();







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

function themthucung() {
    let ma = document.getElementById("mathucung").value.trim();
    let ten = document.getElementById("tenthucung").value.trim();
    let Loai = document.getElementById('loai');
    let loaiValue = Loai.options[Loai.selectedIndex].text;
    let soluong = document.getElementById("soluong").value;
    let gianhap = document.getElementById("gianhap").value;
    let giaban = document.getElementById("giaban").value;
    let mota = CKEDITOR.instances.description.getData();

    let anh = document.getElementById("anh").files[0];
    let trangthai=1;

    if (!ma || !ten || !loaiValue || !soluong || !gianhap || !anh) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    let reader = new FileReader();
    reader.onload = function() {
        let newThuCung = {
            mathucung: ma,
            tenthucung: ten,
            loaithucung: loaiValue,
            soluong: soluong,
            gianhap: gianhap,
            giaban:giaban,
            anh: reader.result,
            trangthai: trangthai,
            mota:mota
        };

        let listThuCung = localStorage.getItem('ListThuCung');
        if (!listThuCung) {
            listThuCung = [];
        } else {
            listThuCung = JSON.parse(listThuCung);
        }

        listThuCung.push(newThuCung);
        localStorage.setItem('ListThuCung', JSON.stringify(listThuCung));
        alert("Thêm thú cưng thành công!");
        document.getElementById("Modal_ThuCung").style.display = "none";

       resetForm();
        loadthucung();
    };
    reader.readAsDataURL(anh);
}




function xoathucung(ma) {
    let data = localStorage.getItem("ListThuCung");
    let loai = JSON.parse(data);
    let accep=confirm("Bạn chắc chắn muốn xóa ?");
    if(accep) {
        for (let i = 0; i < loai.length; i++) {
            if (loai[i].mathucung === ma) {
                loai[i].trangthai =0;
                localStorage.setItem("ListThuCung", JSON.stringify(loai));
                alert("bạn đã xóa thành công !");
                loadthucung();
                break;
            }
        }
    }
    
}

function resetForm() {
    debugger;
    document.getElementById("mathucung").value = '';
    document.getElementById("tenthucung").value = '';
    document.getElementById("loai").value = '';
    document.getElementById("soluong").value = '';
    document.getElementById("gianhap").value = '';
    document.getElementById("giaban").value = '';
    CKEDITOR.instances.description.setData('');
    document.getElementById("anh").value = '';
    document.getElementById('preview').style.display = 'none';
    document.getElementById("btnadd").style.display = 'block';
    document.getElementById("btnupdate").style.display = 'none';
    document.getElementById('mathucung').removeAttribute('readonly');
}


function suathucung(ma) {
    let data = localStorage.getItem('ListThuCung');
    const modal=document.getElementById("Modal_ThuCung");
    let thucungList = JSON.parse(data);
    modal.style.display="block";
    document.getElementById("btnadd").style.display = 'none';
    document.getElementById("btnupdate").style.display = 'block';
    document.getElementById('mathucung').setAttribute('readonly', 'true');
    for (let i = 0; i < thucungList.length; i++) {
        if (thucungList[i].mathucung === ma) {
            document.getElementById('mathucung').value = thucungList[i].mathucung;
            document.getElementById('tenthucung').value = thucungList[i].tenthucung;
            let Loai = document.getElementById('loai');
            Loai.value = thucungList[i].loaithucung;
            document.getElementById('soluong').value = thucungList[i].soluong;
            document.getElementById('gianhap').value = thucungList[i].gianhap;
            document.getElementById('giaban').value = thucungList[i].giaban;
            CKEDITOR.instances.description.setData(thucungList[i].mota); 
            document.getElementById('anh').value = '';
            document.getElementById('preview').src = thucungList[i].anh;
            document.getElementById('preview').style.display = 'block';
            return;
        }
    }
}





function capnhatthucung() {
    debugger
    let ma = document.getElementById("mathucung").value.trim();
    let ten = document.getElementById("tenthucung").value.trim();
    let Loai = document.getElementById('loai');
    let loaiValue = Loai.options[Loai.selectedIndex].text;
    let soluong = document.getElementById("soluong").value;
    let gianhap = document.getElementById("gianhap").value;
    let giaban = document.getElementById("giaban").value;
    let anh = document.getElementById("anh").files[0];
    let mota = CKEDITOR.instances.description.getData();
    if (!ma || !ten || !loaiValue || !soluong || !giaban) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    let data = localStorage.getItem('ListThuCung');
    let thucungList = JSON.parse(data);

    if (anh) {
        let reader = new FileReader();
        reader.onload = function() {
            for (let i = 0; i < thucungList.length; i++) {
                if (thucungList[i].mathucung === ma) {
                    thucungList[i].tenthucung = ten;
                    thucungList[i].loaithucung = loaiValue;
                    thucungList[i].soluong = soluong;
                    thucungList[i].gianhap = gianhap;
                    thucungList[i].giaban = giaban;
                    thucungList[i].anh = reader.result;
                    thucungList[i].mota = mota;
                    break;
                }
            }
            localStorage.setItem('ListThuCung', JSON.stringify(thucungList));
            alert("Cập nhật thú cưng thành công!");
            document.getElementById("Modal_ThuCung").style.display = "none";

            resetForm();
            loadthucung();
        };
        reader.readAsDataURL(anh);
    } else {
        for (let i = 0; i < thucungList.length; i++) {
            if (thucungList[i].mathucung === ma) {
                thucungList[i].tenthucung = ten;
                    thucungList[i].loaithucung = loaiValue;
                    thucungList[i].soluong = soluong;
                    thucungList[i].gianhap = gianhap;
                    thucungList[i].giaban = giaban;
                    thucungList[i].mota = mota;
                break;
            }
        }
        localStorage.setItem('ListThuCung', JSON.stringify(thucungList));
        alert("Cập nhật thú cưng thành công!");
        document.getElementById("Modal_ThuCung").style.display = "none";

        resetForm();
        loadthucung();
    }
}



CKEDITOR.replace('description');
CKEDITOR.replace('description', {
    extraPlugins: 'autogrow',
    autoGrow_maxHeight: 600,
    removePlugins: 'resize',
    toolbar: [
        { name: 'document', items: ['Source', '-', 'Save', 'NewPage', 'Preview', '-', 'Templates'] },
        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
        '/',
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'] },
        { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar'] },
        { name: 'styles', items: ['Styles', 'Format'] }
    ]
});
