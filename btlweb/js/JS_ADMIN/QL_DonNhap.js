let nhanVienList = [
    { id: 1, ten: "Nguyễn Văn A" },
    { id: 2, ten: "Trần Thị B" }
];

let nhaCungCapList = [
    { id: 1, ten: "Công ty X" },
    { id: 2, ten: "Công ty Y" }
];

let thuCungList = [
    { id: 1, ten: "Mèo Anh Lông Ngắn", giaNhap: 1000000 },
    { id: 2, ten: "Chó Corgi", giaNhap: 2000000 },
    { id: 3, ten: "Hamster Bear", giaNhap: 500000 },
    { id: 4, ten: "Thỏ Hà Lan", giaNhap: 800000 }
];

let cart = [];
let donNhapList = [];
let currentEditingDonNhap = null;

function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function loadData() {
    let nhanVienSelect = document.getElementById("nhanVien");
    nhanVienList.forEach(nv => {
        let option = document.createElement("option");
        option.value = nv.id;
        option.textContent = nv.ten;
        nhanVienSelect.appendChild(option);
    });

    let nhaCungCapSelect = document.getElementById("nhaCungCap");
    nhaCungCapList.forEach(ncc => {
        let option = document.createElement("option");
        option.value = ncc.id;
        option.textContent = ncc.ten;
        nhaCungCapSelect.appendChild(option);
    });

    let productList = document.getElementById("productList");
    thuCungList.forEach(tc => {
        let div = document.createElement("div");
        div.className = "product-item";
        div.innerHTML = `
            <span>${tc.ten} - ${formatCurrency(tc.giaNhap)} VNĐ</span>
            <button onclick="addToCart(${tc.id})">Thêm</button>
        `;
        productList.appendChild(div);
    });
}

function addToCart(productId) {
    let product = thuCungList.find(p => p.id === productId);
    let cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(productId) {
    let index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
    }
    updateCart();
}

function updateCart() {
    let cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        let div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <span>${item.ten} x ${item.quantity}</span>
            <span>${formatCurrency(item.giaNhap * item.quantity)} VNĐ</span>
            <button onclick="removeFromCart(${item.id})">Xóa</button>
        `;
        cartDiv.appendChild(div);
        total += item.giaNhap * item.quantity;
    });
    document.getElementById("tongTien").textContent = formatCurrency(total);
}

function createDonNhap() {
    let nhanVien = document.getElementById("nhanVien").value;
    let nhaCungCap = document.getElementById("nhaCungCap").value;
    let ngayNhap = document.getElementById("ngayNhap").value;
    let tongTien = document.getElementById("tongTien").textContent;
    let trangThai = document.getElementById("trangThai").value;
    let ghiChu = document.getElementById("ghiChu").value;

    if (!nhanVien || !nhaCungCap || !ngayNhap || cart.length === 0) {
        alert("Vui lòng điền đầy đủ thông tin và chọn ít nhất một sản phẩm");
        return;
    }

    let donNhap = {
        id: currentEditingDonNhap ? currentEditingDonNhap.id :  'DN' + Date.now(),
        nhanVien: nhanVienList.find(nv => nv.id == nhanVien).ten,
        nhaCungCap: nhaCungCapList.find(ncc => ncc.id == nhaCungCap).ten,
        ngayNhap,
        tongTien,
        soLuong: cart.reduce((total, item) => total + item.quantity, 0),
        trangThai,
        ghiChu,
        chiTiet: [...cart]
    };

    if (currentEditingDonNhap) {
        let index = donNhapList.findIndex(dn => dn.id === currentEditingDonNhap.id);
        donNhapList[index] = donNhap;
        currentEditingDonNhap = null;
    } else {
        donNhapList.push(donNhap);
    }

    updateDonNhapTable();
    closeModal('donNhapModal');
    resetForm();
}

function updateDonNhapTable() {
    let tbody = document.querySelector("#donNhapTable tbody");
    tbody.innerHTML = "";
    donNhapList.forEach(dn => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${dn.id}</td>
            <td>${dn.nhanVien}</td>
            <td>${dn.nhaCungCap}</td>
            <td>${dn.ngayNhap}</td>
            <td>${dn.tongTien} VNĐ</td>
            <td>${dn.soLuong}</td>
            <td><span class="status-${dn.trangThai === 'Đã thanh toán' ? 'paid' : 'unpaid'}">${dn.trangThai}</span></td>
            <td>
                <button class="detail-btn" onclick="showChiTiet('${dn.id}')">Chi Tiết</button>
                <button onclick="editDonNhap('${dn.id}')">Sửa</button>
                <button onclick="deleteDonNhap('${dn.id}')">Xóa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function showChiTiet(donNhapId) {
    let donNhap = donNhapList.find(dn => dn.id === donNhapId);
    if (donNhap) {
        let chiTietContent = document.getElementById("chiTietContent");
        chiTietContent.innerHTML = `
            <p><strong>Mã Đơn:</strong> ${donNhap.id}</p>
            <p><strong>Nhân Viên:</strong> ${donNhap.nhanVien}</p>
            <p><strong>Nhà Cung Cấp:</strong> ${donNhap.nhaCungCap}</p>
            <p><strong>Ngày Nhập:</strong> ${donNhap.ngayNhap}</p>
            <p><strong>Tổng Tiền:</strong> ${donNhap.tongTien} VNĐ</p>
            <p><strong>Số Lượng:</strong> ${donNhap.soLuong}</p>
            <p><strong>Trạng Thái:</strong> ${donNhap.trangThai}</p>
            <p><strong>Ghi Chú:</strong> ${donNhap.ghiChu}</p>
            <h3>Chi Tiết Sản Phẩm:</h3>
            <ul>
                ${donNhap.chiTiet.map(item => `
                    <li>${item.ten} - Số lượng: ${item.quantity} - Giá: ${formatCurrency(item.giaNhap * item.quantity)} VNĐ</li>
                `).join('')}
            </ul>
        `;
        openModal('chiTietModal');
    }
}

function editDonNhap(donNhapId) {
    let donNhap = donNhapList.find(dn => dn.id === donNhapId);
    if (donNhap) {
        currentEditingDonNhap = donNhap;
        document.getElementById("nhanVien").value = nhanVienList.find(nv => nv.ten === donNhap.nhanVien).id;
        document.getElementById("nhaCungCap").value = nhaCungCapList.find(ncc => ncc.ten === donNhap.nhaCungCap).id;
        document.getElementById("ngayNhap").value = donNhap.ngayNhap;
        document.getElementById("trangThai").value = donNhap.trangThai;
        document.getElementById("ghiChu").value = donNhap.ghiChu;
        cart = [...donNhap.chiTiet];
        updateCart();
        openModal('donNhapModal');
    }
}

function deleteDonNhap(donNhapId) {
    if (confirm("Bạn có chắc chắn muốn xóa đơn nhập này?")) {
        donNhapList = donNhapList.filter(dn => dn.id !== donNhapId);
        updateDonNhapTable();
    }
}

function resetForm() {
    document.getElementById("nhanVien").value = "";
    document.getElementById("nhaCungCap").value = "";
    document.getElementById("ngayNhap").value = "";
    document.getElementById("trangThai").value = "Chưa thanh toán";
    document.getElementById("ghiChu").value = "";
    cart = [];
    updateCart();
    currentEditingDonNhap = null;
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    if (modalId === 'donNhapModal') {
        resetForm();
    }
}

function searchAndFilterDonNhap() {
    let searchTerm = document.getElementById("searchInput").value.toLowerCase();
    let statusFilter = document.getElementById("statusFilter").value;
    let dateFilter = document.getElementById("dateFilter").value;

    let filteredList = donNhapList.filter(dn => {
        let matchSearch = dn.id.toLowerCase().includes(searchTerm) ||
                          dn.nhanVien.toLowerCase().includes(searchTerm) ||
                          dn.nhaCungCap.toLowerCase().includes(searchTerm);
        let matchStatus = statusFilter === "" || dn.trangThai === statusFilter;
        let matchDate = dateFilter === "" || dn.ngayNhap === dateFilter;
        return matchSearch && matchStatus && matchDate;
    });

    updateDonNhapTableWithFilter(filteredList);
}

function updateDonNhapTableWithFilter(filteredList) {
    let tbody = document.querySelector("#donNhapTable tbody");
    tbody.innerHTML = "";
    filteredList.forEach(dn => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${dn.id}</td>
            <td>${dn.nhanVien}</td>
            <td>${dn.nhaCungCap}</td>
            <td>${dn.ngayNhap}</td>
            <td>${dn.tongTien} VNĐ</td>
            <td>${dn.soLuong}</td>
            <td><span class="status-${dn.trangThai === 'Đã thanh toán' ? 'paid' : 'unpaid'}">${dn.trangThai}</span></td>
            <td>
                <button class="detail-btn" onclick="showChiTiet('${dn.id}')">Chi Tiết</button>
                <button onclick="editDonNhap('${dn.id}')">Sửa</button>
                <button onclick="deleteDonNhap('${dn.id}')">Xóa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function exportToPDF() {
    let donNhapId = document.querySelector("#chiTietContent p:first-child").textContent.split(":")[1].trim();
    let donNhap = donNhapList.find(dn => dn.id === donNhapId);
    
    if (donNhap) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFontSize(18);
        doc.text("Chi Tiết Đơn Nhập", 105, 15, null, null, "center");
        
        doc.setFontSize(12);
        doc.text(`Mã Đơn: ${donNhap.id}`, 20, 30);
        doc.text(`Nhân Viên: ${donNhap.nhanVien}`, 20, 40);
        doc.text(`Nhà Cung Cấp: ${donNhap.nhaCungCap}`, 20, 50);
        doc.text(`Ngày Nhập: ${donNhap.ngayNhap}`, 20, 60);
        doc.text(`Tổng Tiền: ${donNhap.tongTien} VNĐ`, 20, 70);
        doc.text(`Số Lượng: ${donNhap.soLuong}`, 20, 80);
        doc.text(`Trạng Thái: ${donNhap.trangThai}`, 20, 90);
        doc.text(`Ghi Chú: ${donNhap.ghiChu}`, 20, 100);
        
        doc.text("Chi Tiết Sản Phẩm:", 20, 120);
        let yPos = 130;
        donNhap.chiTiet.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.ten} - Số lượng: ${item.quantity} - Giá: ${formatCurrency(item.giaNhap * item.quantity)} VNĐ`, 30, yPos);
            yPos += 10;
        });
        
        doc.save(`DonNhap_${donNhap.id}.pdf`);
    }
}

window.onload = loadData;