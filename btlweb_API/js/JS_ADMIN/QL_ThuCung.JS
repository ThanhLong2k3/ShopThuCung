
let Data_Search_ThuCung = [];
function openmodal() {
    var modal = document.getElementById("Modal_ThuCung");
    modal.style.display = "block";
    dotenloaira();
}

let searchTimeout;

async function searchPets() {
    const name = document.getElementById("Search_name").value.trim();
    const loai = document.getElementById("Search_Loai").value;
    const giaMin = document.getElementById("Search_GiaMin").value;
    const giaMax = document.getElementById("Search_GiaMax").value;

    let url = apiEndpoints.ThuCung.Search_ThuCung;
    if (name) url += `ten=${encodeURIComponent(name)}&`;
    if (loai) url += `ma=${encodeURIComponent(loai)}&`;
    if (giaMin) url += `giaMin=${giaMin}&`;
    if (giaMax) url += `giaMax=${giaMax}&`;

    url = url.slice(0, -1);
    Data_Search_ThuCung = await getDaTa(url);
    loadthucung();
}

function handleSearch() {
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(searchPets,1000);
}

document.getElementById("Search_name").addEventListener("input", handleSearch);
document.getElementById("Search_Loai").addEventListener("change", handleSearch);
document.getElementById("Search_GiaMin").addEventListener("input", handleSearch);
document.getElementById("Search_GiaMax").addEventListener("input", handleSearch);


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


async function dotenloaira() {
    const data = await apiEndpoints.fetchWithError(apiEndpoints.Loai.getAll);
    let htmlArray = [];
    
    htmlArray.push(`
        <option value="">Chọn loại thú cưng</option>
    `);

    if (data) {
        for (const item of data) {
            htmlArray.push(`
                <option value="${item.maLoai}">${item.tenLoai}</option>
            `);
        }
    }

    $('#loai').html(htmlArray.join(''));
    $('#Search_Loai').html(htmlArray.join(''));
}

async function loadthucung(page=1) {
    try {
        let data;
        if (!Array.isArray(Data_Search_ThuCung) || Data_Search_ThuCung.length === 0) {
            const get_all_ThuCung = await getDaTa(apiEndpoints.ThuCung.PhanTrang(page));
            data = get_all_ThuCung;
        } else {
            data = Data_Search_ThuCung;
        }

        if (data && Array.isArray(data)) {
            let htmlArray = data.map(thuCung => `
                <tr>
                    <td><img src="${thuCung.anh}" alt="${thuCung.tenThuCung}" style="max-width: 100px; max-height: 100px; object-fit: cover;"></td>
                    <td>${thuCung.tenThuCung}</td>
                    <td>${thuCung.tenLoai}</td>
                    <td>${thuCung.soLuong}</td>
                    <td>${thuCung.giaBan.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                    <td>${thuCung.giaNhap.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                    <td>${thuCung.moTa}</td>
                    <td><button onclick="suathucung('${thuCung.maThuCung}')">Sửa</button></td>
                    <td><button onclick="xoathucung('${thuCung.maThuCung}')">Xóa</button></td>
                </tr>
            `).join('');
            $('.dsthucung').html(htmlArray);
        } else {
            $('.dsthucung').html('<tr><td colspan="9">Không có dữ liệu để hiển thị.</td></tr>');
        }
    } catch (error) {
        console.error('Error:', error);
        $('.dsthucung').html('<tr><td colspan="9">Lỗi khi tải dữ liệu: ' + error.message + '</td></tr>');
    }
}

const validateAndFormatPetData=(data) => {
    const formattedData = {
        maThuCung: data.maThuCung ? parseInt(data.maThuCung) : 0,
        tenThuCung: data.tenThuCung || "",
        maLoai: parseInt(data.maLoai) || 0,
        soLuong: parseInt(data.soLuong) || 0,
        giaNhap: parseFloat(data.giaNhap) || 0,
        giaBan: parseFloat(data.giaBan) || 0,
        anh: data.anh || "",
        moTa: data.moTa || ""
    };

    if (!formattedData.tenThuCung) {
        throw new Error("Tên thú cưng không được để trống");
    }
    if (formattedData.soLuong < 0) {
        throw new Error("Số lượng không được âm");
    }
    if (formattedData.giaNhap < 0 || formattedData.giaBan < 0) {
        throw new Error("Giá không được âm");
    }

    return formattedData;
}

async function themthucung() {
    try {
        const ten = document.getElementById("tenthucung").value.trim();
        const Loai = document.getElementById('loai');
        const loaiValue = Loai.options[Loai.selectedIndex].value;
        const soluong = document.getElementById("soluong").value;
        const gianhap = document.getElementById("gianhap").value;
        const giaban = document.getElementById("giaban").value;
        const mota = CKEDITOR.instances.description.getData();
        const anhFile = document.getElementById("anh").files[0];

        if (!ten || !loaiValue || !soluong || !gianhap || !giaban || !anhFile) {
            throw new Error("Vui lòng nhập đầy đủ thông tin và chọn ảnh.");
        }
        if (!anhFile) {
            throw new Error("Vui lòng chọn ảnh.");
        }
        const anhData = await handleImageUpload(anhFile);
        if (typeof anhData !== 'string') {
            throw new Error("Dữ liệu ảnh phải là một chuỗi Base64 hợp lệ.");
        }

        const filteredDescription = mota.replace(/<\/?p>|<br>|(\r\n|\n|\r)/g, '');

        const newThuCung = {
            maThuCung: 0,
            tenThuCung: ten,
            maLoai: parseInt(loaiValue),
            soLuong: parseInt(soluong),
            giaNhap: parseFloat(gianhap),
            giaBan: parseFloat(giaban),
            anh: anhData,
            moTa: filteredDescription
        };

        await addData(apiEndpoints.ThuCung.add, newThuCung, loadthucung);

        document.getElementById("Modal_ThuCung").style.display = "none";
        resetForm();
    } catch (error) {
        alert(error.message);
    }
}

async function xoathucung(ma) {
    await deleteData(apiEndpoints.ThuCung.delete(ma), loadthucung);
}

const resetForm=()=> {
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


async function suathucung(ma) {
    let data = await getDaTa(apiEndpoints.ThuCung.getById(ma));
    const modal = document.getElementById("Modal_ThuCung");
    modal.style.display = "block";
    document.getElementById("btnadd").style.display = 'none';
    document.getElementById("btnupdate").style.display = 'block';
    document.getElementById('mathucung').setAttribute('readonly', 'true');
    document.getElementById('mathucung').value = data[0].maThuCung;
    document.getElementById('tenthucung').value = data[0].tenThuCung;
    let Loai = document.getElementById('loai');
    Loai.value = data[0].maLoai;
    document.getElementById('soluong').value = data[0].soLuong;
    document.getElementById('gianhap').value = data[0].giaNhap;
    document.getElementById('giaban').value = data[0].giaBan;
    CKEDITOR.instances.description.setData(data[0].moTa);
    document.getElementById('anh').value = '';
    document.getElementById('preview').src = data[0].anh;
    document.getElementById('preview').style.display = 'block';
}


async function capnhatthucung() {
    try {
        let ma = document.getElementById("mathucung").value.trim();
        let ten = document.getElementById("tenthucung").value.trim();
        let Loai = document.getElementById('loai');
        let loaiValue = Loai.options[Loai.selectedIndex].value;
        let soluong = document.getElementById("soluong").value;
        let gianhap = document.getElementById("gianhap").value;
        let giaban = document.getElementById("giaban").value;
        let anhFile = document.getElementById("anh").files[0];
        let mota = CKEDITOR.instances.description.getData();

        if (!ma || !ten || !loaiValue || !soluong || !giaban || !gianhap) {
            throw new Error("Vui lòng nhập đầy đủ thông tin.");
        }

        let anhData;
        if (anhFile) {
            const base64String = await readFileAsBase64(anhFile);
            anhData = base64String;
        } else {
            anhData = document.getElementById('preview').src;
        }

        const updateData1 = {
            maThuCung: parseInt(ma),
            tenThuCung: ten,
            maLoai: parseInt(loaiValue),
            soLuong: parseInt(soluong),
            giaNhap: parseFloat(gianhap),
            giaBan: parseFloat(giaban),
            anh: anhData,
            moTa: mota
        };

        await updateData(apiEndpoints.ThuCung.update, updateData1, loadthucung);
        document.getElementById("Modal_ThuCung").style.display = "none";
        resetForm();
    } catch (error) {
        alert(error.message);
    }

}

function show_ThuCung() {
    debugger
    showSection('users');
    loadthucung();
    dotenloaira();
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



document.getElementById('pagination_ThuCung').addEventListener('click', function (event) {
    if (event.target.classList.contains('page-item')) {
      document.querySelectorAll('.page-item').forEach(function (item) {
        item.classList.remove('active');
      });
  
      event.target.classList.add('active');
      const activeValue = parseInt(event.target.textContent);
      if(activeValue)
      {
        loadthucung(activeValue);
      } 
    }
  });