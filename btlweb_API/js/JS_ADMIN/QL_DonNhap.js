let cartItems = [];
let products = [];
function setcart(){
    cartItems = [];
    renderCart();
}
function closemodal_CT_DN(){
    var modal = document.getElementById("Modal_CT_DonNhap");    
    modal.style.display = "none";
}
function openmodal_CT_DN(){
    var modal = document.getElementById("Modal_CT_DonNhap");    
    modal.style.display = "block";
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

document.getElementById('searchInput').addEventListener('input', function() {
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
function show_ui_item(id){
    if (document.getElementById(id).style.display == "block") {
        document.getElementById(id).style.display = "none";
    } else {
        document.getElementById(id).style.display = "block";
    }
}
function show_DonNhap() {
   let ten= localStorage.getItem('tenNhanVien');
   document.getElementById('TenNV').value=ten;
    get_all_ncc();
    showSection('QL_DonNhap');
    
}

async function Show_List_DN() {
    try {
        showSection('List_DonNhap');

        let data = await getDaTa(apiEndpoints.DONNHAP.getAll);

        if (!Array.isArray(data) || data.length === 0) {
            console.log("No data found.");
            $('.DsDonNhap').html("<tr><td colspan='8'>No data available</td></tr>"); 
            return;
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
        let htmlArray = [];
        for (let i = 0; i < data.length; i++) {
            htmlArray.push(`
                <tr>
                    <td>${data[i].tenNhanVien || 'N/A'}</td>
                    <td>${formatDate(data[i].ngayNhap || 'N/A')}</td>
                    <td>${data[i].tenNhaCungCap || 'N/A'}</td>
                    <td>${data[i].diaChi || 'N/A'}</td>
                    <td>${data[i].soDienThoai || 'N/A'}</td>
                    <td>${data[i].tongTien.toLocaleString() || 'N/A'}</td> 
                    <td>
                        <select>
                             ${getStatusDropdown(data[i].trangThai)}
                        </select>
                    </td>
                    <td colspan="2">
                        <button onClick="openmodal_CT_DN()">Chi Tiết</button>
                        <button>Hủy</button>
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

document.addEventListener('DOMContentLoaded', function() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById('NgayNhap').value = today;
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