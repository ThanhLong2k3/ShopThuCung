let Listsp=[];
let TT_KhachHang=[];
let tt = JSON.parse(localStorage.getItem('thongtindangnhap'));
let TongThanhToan=0;
async function displayProductList() {
    try {
         Listsp = await getDaTa(apiEndpoints.GIOHANG.GETBYTK(tt));
        const productListElement = document.getElementById('productList');
        productListElement.innerHTML = '';

        if (!Array.isArray(Listsp) || Listsp.length === 0) {
            productListElement.innerHTML = '<p>Không có sản phẩm trong giỏ hàng</p>';
            return;
        }

        let Gia = 0;

        Listsp.forEach(item => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${item.anh}" alt="${item.tenThuCung}">
                <div class="product-info">
                    <div class="product-name">${item.tenThuCung}</div>
                    <div>Số lượng: ${item.soLuong}</div>
                <div class="product-price">${item.giaBan.toLocaleString()}đ</div>
                </div>
                <div class="product-price">${(item.giaBan * item.soLuong).toLocaleString()}đ</div>

            `;
            productListElement.appendChild(productItem);

            Gia += item.giaBan * item.soLuong;
        });

        const TongTien = document.getElementById('subtotal');
        TongTien.textContent = Gia.toLocaleString() + 'đ';
        TongThanhToan=(Gia+20000);
        const TongChiPhi = document.getElementById('total');
        TongChiPhi.textContent = TongThanhToan.toLocaleString() + 'đ';

    } catch (error) {
        console.error('Lỗi khi hiển thị danh sách sản phẩm:', error);
    }
}
checkLogin();

async function dataKhachHang() {
    try{
        TT_KhachHang= await getDaTa(apiEndpoints.KHACHHANG.getByTK(tt));
        if(TT_KhachHang.length>0)
        {
            document.getElementById('fullName').value=TT_KhachHang[0].tenKhachHang;
            document.getElementById('phone').value=TT_KhachHang[0].soDienThoai_KH;
            document.getElementById('address').value=TT_KhachHang[0].diaChi_KH;
        }
        else{
            await displayProductList();
           let cf=  confirm("Bạn chưa điền thông tin cá nhân! vui lòng điền thông tin cá nhân!");
            if(cf)
            {
                window.location.href = "./ThongTin.html";
            }
        }
    }
    catch{

    }
}

async function Add_DonHang() {
    debugger;
    let ngayban = new Date().toISOString().split('T')[0];
    let DonHang = {
        ngayBan: ngayban,
        maNhanVien: null,
        maKhachHang: TT_KhachHang[0].maKhachHang,
        tongTien: TongThanhToan,
        trangThai: "ok"
    };

    let Ma = await addDonHang(apiEndpoints.DONBAN.create, DonHang);
    
    let promises = Listsp.map(item => {
        let CT_DonHang = {
            maDonBan: Ma,
            maThuCung:Number(item.maThuCung),
            soLuong: item.soLuong,
            giaBan: item.giaBan
        };
       
        return addDonHang(apiEndpoints.CTDONBAN.create, CT_DonHang);
    });
    console.log(promises);
    
debugger;
    await Promise.all(promises);

    alert("Thanh Toán thành công!");
    await deleteData_NO_ALER(apiEndpoints.GIOHANG.DELETE_TK(tt));
    window.location.href = "./Home.html"; 
}

async function Main() {
    await checkLogin();   
    await displayProductList();
    await dataKhachHang();
}
Main();