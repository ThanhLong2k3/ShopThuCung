

let dataTrang=[];

async function loadloai(page = 1) {
    const tableBody = $('.dsloai');
    tableBody.html('<tr><td colspan="4">Đang tải dữ liệu...</td></tr>');
  
    try {
      let ListLoai = [];
  
      if (dataTrang.length > 0) {
        ListLoai = dataTrang;
      } else {
        let data = await getDaTa(apiEndpoints.Loai.PhanTrang(page));
        ListLoai = data;
      }
  
      // Tạo HTML cho bảng
      if (ListLoai.length > 0) {
        const htmlArray = ListLoai.map(
          (item) => `
            <tr>
                <td>${item.maLoai}</td>
                <td>${item.tenLoai}</td>
                <td><button onclick="sualoaicho('${item.maLoai}')">Sửa</button></td>
                <td><button onclick="xoaloaicho('${item.maLoai}')">Xóa</button></td>
            </tr>
          `
        ).join('');
        tableBody.html(htmlArray);
      } else {
        tableBody.html('<tr><td colspan="4">Không có dữ liệu</td></tr>');
      }
    } catch (error) {
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
document.getElementById('pagination_Loai').addEventListener('click', function (event) {
    if (event.target.classList.contains('page-item')) {

      document.querySelectorAll('.page-item').forEach(function (item) {
        item.classList.remove('active');
      });
  

      event.target.classList.add('active');
  

      const activeValue = parseInt(event.target.textContent);
      if(activeValue)
      {
        loadloai(activeValue);
      } 
    }
  });



function show_Loai()
{
    showSection('Loai');
    loadloai();
}


