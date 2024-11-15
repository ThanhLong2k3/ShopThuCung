function tang() {
    let soluong = parseInt(document.getElementById('soluong').value);
    if (soluong >= 0) {
        soluong++;
        document.getElementById('soluong').value = soluong;
    } 
}

function giam() {
    let soluong = parseInt(document.getElementById('soluong').value);
    if (soluong > 1) { 
        soluong--;
        document.getElementById('soluong').value = soluong;
    } 
}
async function getdulieu(){
    const data= localStorage.getItem('masp');
    if(data){
        const data1 = await getDaTa(apiEndpoints.ThuCung.getById(JSON.parse(data)));
        console.log(data1)
        $('#tensp').text(data1[0].tenThuCung); 
        $('#tenspsau').text(data1[0].tenThuCung); 
        $('#maSp').text(data1[0].maThuCung);
        $('#soLuongSp').text(data1[0].soLuong);
        $('#moTa').text(data1[0].moTa);
        $('#anh').attr('src', data1[0].anh);
        $('#giacu').text(data1[0].giaBan.toLocaleString('vi-VN'));
        $('#giamoi').text(data1[0].giaBan.toLocaleString('vi-VN'));
    }
}
getdulieu();


async function addgh() {
    let taiKhoan = JSON.parse(localStorage.getItem('thongtindangnhap'));
    const maThuCung=parseInt(localStorage.getItem('masp'));
    let soluong = parseInt(document.getElementById('soluong').value); 
    let giohang_ID =await  getDaTa(apiEndpoints.GIOHANG.GETBYID_TK(maThuCung,taiKhoan));
    debugger;
    if(giohang_ID.length>0)
    {
        await updateData_gh(apiEndpoints.GIOHANG.UPDATE_SL_1(taiKhoan,maThuCung,0));
        alert("Đã thêm sản phẩm vào giỏ hàng!");
    }
    else{
        let Hang={
            taiKhoan: taiKhoan,
            maThuCung: maThuCung,
            soLuong: soluong
          }
        await addDonHang(apiEndpoints.GIOHANG.ADD,Hang);
        alert("Đã thêm sản phẩm vào giỏ hàng!");
    }
    
}
