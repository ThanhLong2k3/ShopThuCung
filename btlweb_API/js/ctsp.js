async function tang() {
    let soluong = parseInt(document.getElementById('soluong').value);
    const matc= localStorage.getItem('masp');

    const thuCungData = await getDaTa(apiEndpoints.ThuCung.getById(parseInt(matc)));
   
        
    if (thuCungData && thuCungData[0].soLuong > parseInt(soluong)) {
        soluong++;
        document.getElementById('soluong').value = soluong;
    } else {
        alert(`Chỉ còn ${thuCungData[0].soLuong} thú cưng trong kho`);
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
    document.getElementById('soluong').setAttribute('readonly', 'true');

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
    
    if(giohang_ID.length>0)
    {
        await updateData_gh(apiEndpoints.GIOHANG.UPDATE_SL_1(taiKhoan,maThuCung,0));
        alert("Đã thêm sản phẩm vào giỏ hàng!");
    }
    else if(giohang_ID.length==null && taiKhoan!=""){             
        let Hang={
            taiKhoan: taiKhoan,
            maThuCung: maThuCung,
            soLuong: soluong
          }
        await addDonHang(apiEndpoints.GIOHANG.ADD,Hang);
        alert("Đã thêm sản phẩm vào giỏ hàng!");
    }
    else{
        alert("Bạn chưa đăng nhập !");
    }
    
}
let searchTimeoutNameTC;

async function searThuCungName() {
    const name = document.getElementById("Search_name").value.trim();
    localStorage.setItem("NameThuCung",JSON.stringify(name));
    window.location.href="./Search_user.html";
}

function handleSearchNhaCC() {
    if (searchTimeoutNameTC) {
        clearTimeout(searchTimeoutNameTC);
    }
    searchTimeoutNameTC = setTimeout(searThuCungName, 1000);
}

document.getElementById("Search_name").addEventListener("input", handleSearchNhaCC);