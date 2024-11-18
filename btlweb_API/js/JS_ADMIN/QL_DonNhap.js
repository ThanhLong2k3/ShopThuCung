let cartItems = [];
let products = [];
let List_DonNhap = [];
let DN_ID=[];
let CT_DN_ID=[];
function setcart() {
    cartItems = [];
    renderCart();
}

async function renderProducts() {
    products = await getDaTa(apiEndpoints.ThuCung.getAll);
}
async function get_all_ncc() {
    try {
        const ncc = await getDaTa(apiEndpoints.NCC.getAll);
        const htmlArray = ncc.map(ncc =>
            `<option value="${ncc.maNhaCungCap}">${ncc.tenNhaCungCap}</option>`
        );
        document.getElementById('TenNCC').innerHTML = htmlArray.join('');
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
function getStatusDropdown(selectedStatus) {
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
async function Show_List_DN() {
    try {
        showSection('List_DonNhap');

        List_DonNhap = await getDaTa(apiEndpoints.DONNHAP.getAll);

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
        setcart();

    } catch (error) {
        console.error('Error adding data:', error);
        alert("Có lỗi xảy ra khi thêm đơn nhập!");
    }
}


renderProducts();
renderCart();
// LIST DN
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
                   <select onchange="UpTrangThai()" style="color: rgb(248, 31, 103);border: 1px solid rgb(248, 31, 103);">
    ${getStatusDropdown(DN_ID[0].trangThai)}
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
    if (tt == "Chờ xử lý") {
        await deleteData(apiEndpoints.DONNHAP.delete(id), Show_List_DN);
        closemodal_CT_DN();
    }
    else {
        alert(`Đơn hàng ${tt}, Vui lòng liên hệ: ${sdt}`);
    }
}
async function UpTrangThai() {
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