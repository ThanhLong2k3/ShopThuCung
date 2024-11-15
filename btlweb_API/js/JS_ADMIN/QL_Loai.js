
async function loadloai() {
    const tableBody = $('.dsloai');
    tableBody.html('<tr><td colspan="4">Đang tải dữ liệu...</td></tr>');
    debugger;
    try {
        const loai = await getDaTa(apiEndpoints.Loai.getAll);
        let htmlArray = '';
        
        for (let i = 0; i < loai.length; i++) {
                htmlArray += `
                <tr>
                    <td>${loai[i].maLoai}</td>
                    <td>${loai[i].tenLoai}</td>
                    <td><button onclick="sualoaicho('${loai[i].maLoai}')">Sửa</button></td>
                    <td><button onclick="xoaloaicho('${loai[i].maLoai}')">Xóa</button></td>
                </tr>
                `;
        }
        
        tableBody.html(htmlArray || '<tr><td colspan="4">Không có dữ liệu</td></tr>');
    } catch (error) {
        console.log(error);
        console.error('Error:', error);
        tableBody.html('<tr><td colspan="4">Lỗi tải dữ liệu</td></tr>');
    }
}




async function setloai() {
    let ten = document.getElementById("tenloai").value;
    let data={
        tenLoai:ten
    }
    await addData(apiEndpoints.Loai.add,data,loadloai);
    close_Modal_Loai('Modal_Loai');
}

async function xoaloaicho(ma) {
    await deleteData(apiEndpoints.Loai.delete(ma), loadloai);
}

async function sualoaicho(ma) {
    try {
        const loai = await getDaTa(apiEndpoints.Loai.getById(ma));
        openmodal('Modal_Loai');
        document.getElementById("btn_add").style.display = 'none';
        document.getElementById("btn_up").style.display = 'block';

        const maloaiInput = document.getElementById('maloai');
        maloaiInput.setAttribute('readonly', 'true');
        maloaiInput.value = loai[0].maLoai;
        document.getElementById('tenloai').value = loai[0].tenLoai;
    } catch (error) {
        console.error('Error:', error);
        alert(MESSAGES.ERROR);
    }
}

async function UpdateL() {    
    let ma = document.getElementById("maloai").value;
    let ten = document.getElementById("tenloai").value;
    let data={ maLoai: ma, tenLoai: ten }
    if (!ma || !ten) {
        alert(MESSAGES.VALIDATION_ERROR);
        return;
    }
    await updateData(apiEndpoints.Loai.update, data,loadloai);
    close_Modal_Loai('Modal_Loai');
}

function openmodal(id) {
    document.getElementById(id).style.display = "block";
}

function resetModalForm() {
    document.getElementById("maloai").value = '';
    document.getElementById("tenloai").value = '';
    document.getElementById("btn_add").style.display = 'block';
    document.getElementById("btn_up").style.display = 'none';
    document.getElementById('maloai').removeAttribute('readonly');
}

function close_Modal_Loai(id) {
    document.getElementById(id).style.display = "none";
    resetModalForm();
}


const modal = document.getElementById("Modal_Loai");
window.onclick = function(event) {
    if (event.target == modal) {
        close_Modal_Loai('Modal_Loai');
    }
};



function show_Loai()
{
    showSection('Loai');
    loadloai();
}


