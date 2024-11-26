let Count=0;
async function tang(index) {
    let taiKhoan = JSON.parse(localStorage.getItem('thongtindangnhap'));
    const gioHangData = await getDaTa(apiEndpoints.GIOHANG.GETBYTK(taiKhoan));
    
    if (gioHangData && gioHangData[index]) {
        let matc = parseInt(gioHangData[index].maThuCung);
        
        const thuCungData = await getDaTa(apiEndpoints.ThuCung.getById(matc));
        
        if (thuCungData && thuCungData[0].soLuong > gioHangData[index].soLuong) {
            await updateData_gh(apiEndpoints.GIOHANG.UPDATE_SL_1(taiKhoan, matc, 0));
            getdl();
            TongTien();
        } else {
            alert(`Chỉ còn ${thuCungData[0].soLuong} thú cưng trong kho`);
        }
    }
}
async function giam(index) {
    let taiKhoan = JSON.parse(localStorage.getItem('thongtindangnhap'));
    const data = await getDaTa(apiEndpoints.GIOHANG.GETBYTK(taiKhoan));
    
    if (data && data[index]) {
        if (data[index].soLuong > 1) {
            let matc = parseInt(data[index].maThuCung);
            await updateData_gh(apiEndpoints.GIOHANG.UPDATE_SL_1(taiKhoan, matc, 1));
            getdl();
            TongTien();
        } else {
            alert("Số lượng không thể nhỏ hơn 1");
        }
    }
}
async function getdl() {

    let taiKhoan = JSON.parse(localStorage.getItem('thongtindangnhap'));
    const data =await getDaTa(apiEndpoints.GIOHANG.GETBYTK(taiKhoan));
    console.log(data);
    const htmlarr = [];
    let tongtien = 0;
    if (data.length>=0) {
        Count=1;
        const data1 = data;
        data1.forEach((sp, index) => {
            tongtien += parseFloat(sp.giaBan) * parseFloat(sp.soLuong);
            htmlarr.push(`
                <div id="sanpham">
                    <img id="anh" src=${sp.anh} alt="Ảnh sản phẩm" style="width: 60px;height: 60px;"/>
                    <div id="thongtin">
                        <p id="tensanpham">${sp.tenThuCung}</p>
                        
                    </div>
                    <div id="gia">
                        <span id="giaban"><strong> ${sp.giaBan.toLocaleString()}<strong></span>
                        <br/><br/>
                        <input onclick="giam(${index})" style="background-color: #f9758f;" type="button" id="giam" value="-"/>
                        <input type="number" id="soluong" value=${sp.soLuong}>
                        <input onclick="tang(${index})" style="background-color: #f9758f;" type="button" id="tang" value="+"/>
                        <button style="background-color: #f9758f;color:white;  border: 1px solid #CCC;border-radius: 3px;" onclick="Xoagiohang(${sp.maThuCung})" >Xóa</button>
                    </div>
                </div>

            `);
        });
        $('.listsp').html(htmlarr.join(''));
        document.getElementById('tongsp').innerText = `Bạn đang có ${data1.length} sản phẩm trong giỏ hàng`;
    document.getElementById('soluong').setAttribute('readonly', 'true');
        

    }
}
getdl();

TongTien();
async function TongTien(){
    let taiKhoan = JSON.parse(localStorage.getItem('thongtindangnhap'));
    const data =await getDaTa(apiEndpoints.GIOHANG.GETBYTK(taiKhoan));
    let  Tong=0;
    for(let i=0;i<data.length;i++)
    {
        Tong=Tong+(data[i].giaBan*data[i].soLuong);
    }
    document.getElementById('tongtien').innerText = ` ${Tong.toLocaleString()} Vnđ`;
}

async function Xoagiohang(ma)
{
    let taiKhoan = JSON.parse(localStorage.getItem('thongtindangnhap'));
    await deleteData(apiEndpoints.GIOHANG.DELETE(taiKhoan,ma),getdl);
    TongTien();
}
let TT= ()=>{
    debugger;
    if(Count==0)
    {
        alert("giỏ hàng của bạn đang rỗng!!");
    }
    else{
        window.location.href="./ThanhToan.html";
    }
}