let cartItems = [];
let products = [];
let List_DonNhap = [];
let DN_ID=[];
let CT_DN_ID=[];


let Search_DN = [];
let searchTimeoutDN;

async function searchDN() {
    const NgayNhapStart=document.getElementById("Search_NgayNhapStart").value;
    const NgayNhapEnd=document.getElementById("Search_NgayNhapEnd").value;
    const MaNCC = document.getElementById("Search_TenNCC_select").value.trim();
    const TrangThai = document.getElementById("Search_TrangThaiNhap").value;

    let url = apiEndpoints.DONNHAP.Search_DN;
    if (NgayNhapStart) url += `ngaynhapstar=${encodeURIComponent(NgayNhapStart)}&`;
    if (NgayNhapEnd) url += `ngayNhapEnd=${encodeURIComponent(NgayNhapEnd)}&`;
    if (MaNCC) url += `maNhaCungCap=${encodeURIComponent(MaNCC)}&`;

    if (TrangThai) url += `trangThai=${encodeURIComponent(TrangThai)}&`;

    debugger
    url = url.slice(0, -1);

    try {
        Search_DN = await getDaTa(url);
        Show_List_DN();
    } catch (error) {
        console.error("Lỗi DNi tìm kiếm:", error);
        renderError("Lỗi DNi tìm kiếm: " + error.message);
    }
}

function handlesearchDN() {
    if (searchTimeoutDN) {
        clearTimeout(searchTimeoutDN);
    }
    searchTimeoutDN = setTimeout(searchDN, 1000);
}

document.getElementById("Search_NgayNhapStart").addEventListener("input", handlesearchDN);
document.getElementById("Search_NgayNhapEnd").addEventListener("input", handlesearchDN);
document.getElementById("Search_TenNCC_select").addEventListener("change", handlesearchDN);
document.getElementById("Search_TrangThaiNhap").addEventListener("change", handlesearchDN);



get_all_ncc();
function setcart() {
    cartItems = [];
    renderCart();
}

async function renderProducts() {
    products = await getDaTa(apiEndpoints.ThuCung.getAll);
}
async function get_all_ncc() {
    try {
        const htmlArray =[];
        const ncc = await getDaTa(apiEndpoints.NCC.getAll);
        htmlArray.push(`
            <option value="">Chọn nhà cung cấp</option>
        `);
    
        if (ncc) {
            for (const item of ncc) {
                htmlArray.push(`
                    <option value="${item.maNhaCungCap}">${item.tenNhaCungCap}</option>
                `);
            }
        }
        
        document.getElementById('TenNCC').innerHTML = htmlArray.join('');
        document.getElementById('Search_TenNCC_select').innerHTML = htmlArray.join('');        
    } catch (error) {
        console.error('Error fetching NCC data:', error);
    }
}
function renderCart() {
    const cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = '';
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div>
                <h3>${item.tenThuCung}</h3>
                <p>${item.giaNhap.toLocaleString()} VND</p>
            </div>
            <div class="quantity-control">
                <button onclick="updateQuantity(${item.maThuCung}, ${item.quantity - 1})" class="quantity-btn">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.maThuCung}, ${item.quantity + 1})" class="quantity-btn">+</button>
            </div>
        `;
        cartItemsElement.appendChild(itemElement);
    });
    updateTotalValue();
}

function addToCart(productId) {
    const product = products.find(p => p.maThuCung === productId);
    const existingItem = cartItems.find(item => item.maThuCung === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }
    renderCart();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity === 0) {
        cartItems = cartItems.filter(item => item.maThuCung !== productId);
    } else {
        const item = cartItems.find(item => item.maThuCung === productId);
        if (item) {
            item.quantity = newQuantity;
        }
    }
    renderCart();
}

function updateTotalValue() {
    const totalValue = cartItems.reduce((total, item) => total + item.giaNhap * item.quantity, 0);
    document.getElementById('totalValue').textContent = ` ${totalValue.toLocaleString()} `;
}

document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.tenThuCung.toLowerCase().includes(searchTerm)
    );
    renderFilteredProducts(filteredProducts);
});

function renderFilteredProducts(filteredProducts) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.innerHTML = `
            <img src="${product.anh}" alt="${product.tenThuCung}">
            <div class="product-info">
                <h3>${product.tenThuCung}</h3>
                <p>${product.giaNhap.toLocaleString()} VND</p>
                <button onclick="addToCart(${product.maThuCung})" class="add-to-cart">
                    Thêm vào giỏ
                </button>
            </div>
        `;
        productList.appendChild(productElement);
    });
}
function show_ui_item(id) {
    if (document.getElementById(id).style.display == "block") {
        document.getElementById(id).style.display = "none";
    } else {
        document.getElementById(id).style.display = "block";
    }
}
function show_DonNhap() {
    let ten = localStorage.getItem('tenNhanVien');
    document.getElementById('TenNV').value = ten;
    get_all_ncc();
    showSection('QL_DonNhap');

}
function getStatusDropdown_DN(selectedStatus) {
    const statuses = ['Chờ xử lý', 'Đang xử lý', 'Đã nhập'];
    let options = statuses.map(status => {
        let selected = (status === selectedStatus) ? 'selected' : '';
        return `<option value="${status}" ${selected}>${status}</option>`;
    });
    return options.join('');
}
function formatDate(date) {
    if (!date) return 'N/A';
    let d = new Date(date);
    let day = d.getDate().toString().padStart(2, '0');
    let month = (d.getMonth() + 1).toString().padStart(2, '0');
    let year = d.getFullYear();
    return `${day}/${month}/${year}`;
}
async function Show_List_DN(page=1) {
    try {
        showSection('List_DonNhap');
        if (!Array.isArray(Search_DN) || Search_DN.length === 0) {
            const get_all_DN = await getDaTa(apiEndpoints.DONNHAP.PhanTrang(page));
            List_DonNhap = get_all_DN;
        } else {
            List_DonNhap = Search_DN;
        }
        if (!Array.isArray(List_DonNhap) || List_DonNhap.length === 0) {
            console.log("No data found.");
            $('.DsDonNhap').html("<tr><td colspan='8'>No data available</td></tr>");
            return;
        }
        let htmlArray = [];
        for (let i = 0; i < List_DonNhap.length; i++) {
            htmlArray.push(`
                <tr>
                    <td>${List_DonNhap[i].tenNhanVien || 'N/A'}</td>
                    <td>${formatDate(List_DonNhap[i].ngayNhap || 'N/A')}</td>
                    <td>${List_DonNhap[i].tenNhaCungCap || 'N/A'}</td>
                    <td>${List_DonNhap[i].diaChi || 'N/A'}</td>
                    <td>${List_DonNhap[i].soDienThoai || 'N/A'}</td>
                    <td>${List_DonNhap[i].tongTien.toLocaleString() || 'N/A'}</td> 
                   
                    <td colspan="2">
                        <button class="add-to-cart" onClick="openmodal_CT_DN(${List_DonNhap[i].maDonNhap})">Chi Tiết</button>
                        
                        <button  class=" add-to-cart" 
                             onclick="HuyDonNhap(${List_DonNhap[i].maDonNhap},'${List_DonNhap[i].trangThai}','${List_DonNhap[i].soDienThoai}')">
                            Hủy
                        </button>
                    </td>
                </tr>
            `);
        }

        $('.DsDonNhap').html(htmlArray.join(''));

    } catch (error) {
        console.error("Error fetching or rendering data: ", error);
        $('.DsDonNhap').html("<tr><td colspan='8'>Error loading data</td></tr>");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById('NgayNhap').value = today;
    document.getElementById('NgayNhap').setAttribute('readonly', 'true');

});


async function exportInvoice(donNhap, chiTietDonNhap) {
    if (typeof window.jspdf === 'undefined') {
        console.error('jsPDF library not loaded');
        alert('Không thể xuất hóa đơn. Vui lòng kiểm tra kết nối mạng.');
        return;
    }

    const { jsPDF } = window.jspdf;

    try {
        const doc = new jsPDF();

        doc.addFont('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf', 'Roboto', 'normal');
        doc.setFont('Roboto');

        function addText(text, x, y, options = {}) {
            const defaultOptions = { align: 'left', maxWidth: 180 };
            doc.text(text, x, y, { ...defaultOptions, ...options });
        }

        doc.setFontSize(18);
        addText('HÓA ĐƠN NHẬP HÀNG', 105, 20, { align: 'center' });

        doc.setFontSize(12);
        addText(`Mã Đơn Nhập: ${donNhap.maDonNhap}`, 20, 40);
        addText(`Ngày Nhập: ${formatDate(donNhap.ngayNhap)}`, 20, 50);
        addText(`Nhân Viên: ${donNhap.tenNhanVien}`, 20, 60);
        addText(`Nhà Cung Cấp: ${donNhap.tenNhaCungCap}`, 20, 70);
        addText(`Trạng Thái: ${donNhap.trangThai}`, 20, 80);

        const tableColumn = ["STT", "Tên Thú Cưng", "Số Lượng", "Đơn Giá", "Thành Tiền"];
        const tableRows = chiTietDonNhap.map((item, index) => [
            (index + 1).toString(),
            item.tenThuCung,
            item.soLuong.toString(),
            `${item.giaNhap.toLocaleString()} ₫`,
            `${(item.soLuong * item.giaNhap).toLocaleString()} ₫`
        ]);

        doc.autoTable({
            startY: 90,
            head: [tableColumn],
            body: tableRows,
            theme: 'grid',
            styles: { 
                font: 'Roboto',
                fontSize: 10,
                cellPadding: 3,
                overflow: 'linebreak',
                halign: 'center'
            },
            columnStyles: { 
                0: { cellWidth: 30 },
                1: { cellWidth: 80 },
                2: { cellWidth: 20 },
                3: { cellWidth: 30 },
                4: { cellWidth: 30 }
            }
        });

        const finalY = doc.lastAutoTable.finalY || 90;
        addText(`Tổng Tiền: ${donNhap.tongTien.toLocaleString()} ₫`, 150, finalY + 15, { align: 'right' });
        addText('Cảm ơn quý khách!', 105, finalY + 30, { align: 'center' });

        doc.save(`HoaDonNhap_${donNhap.maDonNhap}_${new Date().toLocaleDateString('vi-VN')}.pdf`);
    } catch (error) {
        console.error('Error creating PDF:', error);
        alert('Có lỗi xảy ra khi tạo file PDF. Vui lòng thử lại sau.');
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}






async function muahang() {
    const tenNhanVien = localStorage.getItem('maNhanVien');
    const tenNCC = document.getElementById('TenNCC').value;
    const ngayNhap = document.getElementById('NgayNhap').value;
    const trangThai = document.getElementById('status_item').value;
    const tongTienElement = document.getElementById('totalValue').innerHTML;

    const tongTien = parseFloat(tongTienElement.replace(/[^0-9-]+/g, ''));

    if (isNaN(tongTien)) {
        console.error("TongTien is not a valid number");
        alert("Tổng tiền không hợp lệ. Vui lòng kiểm tra lại.");
        return;
    }

    let donNhap = {
        maDonNhap: 0,
        ngayNhap: ngayNhap,
        maNhaCungCap: parseInt(tenNCC, 10),
        maNhanVien: tenNhanVien,
        tongTien: tongTien,
        trangThai: trangThai
    };

    try {
        const maDN = await addDonHang(apiEndpoints.DONNHAP.add, donNhap);

        const chiTietPromises = cartItems.map(item => {
            const chiTiet = {
                maDonNhap: maDN,
                maThuCung: item.maThuCung,
                soLuong: item.quantity,
                giaNhap: item.giaNhap
            };
            return addDonHang(apiEndpoints.CTDONNHAP.add, chiTiet);
        });

        await Promise.all(chiTietPromises);

        alert("Thêm đơn nhập thành công!");
        
        const xuatHoaDon = confirm("Bạn có muốn xuất hóa đơn không?");
        if (xuatHoaDon) {
            const newDonNhap = await getDaTa(apiEndpoints.DONNHAP.getById(maDN));
            const newChiTietDonNhap = await getDaTa(apiEndpoints.CTDONNHAP.getById(maDN));
            
            exportInvoice(newDonNhap[0], newChiTietDonNhap);
        }

        setcart();

    } catch (error) {
        console.error('Error adding data:', error);
        alert("Có lỗi xảy ra khi thêm đơn nhập!");
    }
}

renderProducts();
renderCart();
function closemodal_CT_DN() {
    var modal = document.getElementById("Modal_CT_DonNhap");
    modal.style.display = "none";
}
function openmodal_CT_DN(id) {
    var modal = document.getElementById("Modal_CT_DonNhap");
    modal.style.display = "block";
    Get_DonNhap_ID(id)
}

async function Get_DonNhap_ID(id) {
    try {
        CT_DN_ID = await getDaTa(apiEndpoints.CTDONNHAP.getById(id));
        DN_ID = await getDaTa(apiEndpoints.DONNHAP.getById(id));

        if (!DN_ID || !DN_ID[0]) {
            console.error('Không tìm thấy đơn nhập');
            return;
        }

        const formattedDate = new Date(DN_ID[0].ngayNhap).toLocaleDateString('vi-VN');

        const html = `
            <div class="order-item">
                <div class="order-header" >
                    <span class="order-id">Đơn hàng #${DN_ID[0].maDonNhap}</span>
                    <span class="order-date">${formattedDate}</span>
                    ${DN_ID[0].trangThai !== 'Đã hủy' ? `
                        <div  class="order-status add-to-cart" 
                             onclick="HuyDonNhap(${DN_ID[0].maDonNhap},'${DN_ID[0].trangThai}','${DN_ID[0].soDienThoai}')">
                            Hủy
                        </div>
                    ` : ''}
                </div>
                
                <div class="order-status" style="display:flex;justify-content: space-between;">
                    <div class="detail-row">
                        <span class="detail-label">Tên Nhân Viên:</span>
                        <span class="detail-value" title="${DN_ID[0].tenNhanVien}">${DN_ID[0].tenNhanVien}</span>
                    </div>
                     <div class="detail-row">
                        <span class="detail-label">Tên Nhà Cung Cấp:</span>
                        <span class="detail-value" title="${DN_ID[0].tenNhaCungCap}">${DN_ID[0].tenNhaCungCap}</span>
                    </div>
                   <select onchange="UpTrangThai_DN()" style="color: rgb(248, 31, 103);border: 1px solid rgb(248, 31, 103);">
    ${getStatusDropdown_DN(DN_ID[0].trangThai)}
</select>

                </div>
                
                <div class="order-details" id="order-${DN_ID[0].maDonNhap}">
                    <table class="details-table">
                        <thead>
                            <tr>
                                <th>Thú Cưng</th>
                                <th>Số Lượng</th>
                                <th>Đơn Giá</th>
                                <th>Thành Tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${CT_DN_ID.map(sp => `
                                <tr>
                                    <td title="${sp.tenThuCung}">${sp.tenThuCung}</td>
                                    <td>${sp.soLuong}</td>
                                    <td>${sp.giaNhap.toLocaleString('vi-VN')} ₫</td>
                                    <td>${(sp.soLuong * sp.giaNhap).toLocaleString('vi-VN')} ₫</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    
                    <div class="detail-row">
                        <span class="detail-label">Địa chỉ giao hàng:</span>
                        <span class="detail-value" title="${DN_ID[0].diaChi}">${DN_ID[0].diaChi}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Số điện thoại:</span>
                        <span class="detail-value">${DN_ID[0].soDienThoai}</span>
                    </div>
                </div>
                
                <div class="order-total">
                    Tổng tiền: ${DN_ID[0].tongTien.toLocaleString('vi-VN')} ₫
                </div>
            </div>
        `;

        $('.CTDN').html(html);

    } catch (error) {
        console.error('Lỗi khi lấy chi tiết đơn nhập:', error);
        $('.CTDN').html('<div class="error-message">Có lỗi xảy ra khi tải chi tiết đơn hàng</div>');
    }
}
async function HuyDonNhap(id, tt, sdt) {
    if (tt == "Chờ xử lý"|| tt=='Đang xử lý') {
        await deleteData(apiEndpoints.DONNHAP.delete(id), Show_List_DN);
        closemodal_CT_DN();
    }
    else {
        alert(`Đơn hàng ${tt}, Vui lòng liên hệ: ${sdt}`);
    }
}
async function UpTrangThai_DN() {
    if(DN_ID[0].trangThai==="Đã nhập")
    {
        Show_List_DN();
        closemodal_CT_DN();
        alert("Đơn hàng đã nhận thành công không thể hủy !");
    }
    else{
        const newStatus = event.target.value;
        let data={
            maDonNhap: DN_ID[0].maDonNhap,
            ngayNhap: DN_ID[0].ngayNhap,
            maNhaCungCap: DN_ID[0].maNhaCungCap,
            maNhanVien: DN_ID[0].maNhanVien,
            tongTien: DN_ID[0].tongTien,
            trangThai: newStatus
          }
          await updateData(apiEndpoints.DONNHAP.update,data,Show_List_DN);
        
    }
}




document.getElementById('pagination_DonNhap').addEventListener('click', function (event) {
    if (event.target.classList.contains('page-item')) {
      document.querySelectorAll('.page-item').forEach(function (item) {
        item.classList.remove('active');
      });
  
      event.target.classList.add('active');

      const activeValue = parseInt(event.target.textContent);
      if(activeValue)
      {
        Show_List_DN(activeValue);
      } 
    }
  });