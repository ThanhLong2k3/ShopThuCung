async function searchname() {
    try {
        let NameThuCung = JSON.parse(localStorage.getItem("NameThuCung"));
        let url = `${apiEndpoints.ThuCung.Search_ThuCung}${NameThuCung ? `ten=${encodeURIComponent(NameThuCung)}` : ''}`;

        let data = await getDaTa(url);
        if (data && Array.isArray(data) && data.length > 0) {
            let htmlarr = data.map(sp => createProductHTML(sp)).join('');
            document.getElementById('Search_Loai').innerHTML = htmlarr;
            localStorage.removeItem("NameThuCung"); 
        } else {
            document.getElementById('Search_Loai').innerHTML = 'Không tìm thấy sản phẩm nào.';
        }
    } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        renderError("Lỗi khi tìm kiếm: " + error.message);
    }
}

async function Get_TC_Ma() {
    try {
        let MaLoai = JSON.parse(localStorage.getItem("MaLoai"));
        let data = await getDaTa(apiEndpoints.ThuCung.getByMa(MaLoai));

        if (Array.isArray(data) && data.length > 0) {
            let htmlarr = data.map(sp => createProductHTML(sp)).join('');
            document.getElementById('Search_Loai').innerHTML = htmlarr;
            localStorage.removeItem("MaLoai"); 
        } else {
            document.getElementById('Search_Loai').innerHTML = 'Không có dữ liệu sản phẩm.';
        }
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        renderError("Lỗi khi lấy dữ liệu: " + error.message);
    }
}

function createProductHTML(sp) {
    return `
        <a onclick="setdulieu(${sp.maThuCung})" class="link-reset">
            <div class="sp-uathich">
                <div class="sptren">
                    <span class="giamgia" id="giamgia">${sp.giamGia ? `-${sp.giamGia}%` : ''}</span>
                    <img src="${sp.anh || '/default.jpg'}" class="anh" id="anh" alt="${sp.tenThuCung}">
                </div>
                <div class="chusp">
                    <h2 style="font-size: 14px; color: #f72585;" id="tensp">${sp.tenThuCung}</h2>
                    <span style="color: red;"><strong id="gia">${sp.giaBan.toLocaleString('vi-VN')}</strong> vnd</span>
                </div>
            </div>
        </a>
    `;
}

function setdulieu(ma) {
    localStorage.setItem('masp', JSON.stringify(ma));
    window.location.href = `./chitietssanpham.html?data=${encodeURIComponent(JSON.stringify(ma))}`;
}

let searchTimeoutNameTC;

function searThuCungName() {
    const name = document.getElementById("Search_name").value.trim();
    localStorage.setItem("NameThuCung", JSON.stringify(name));
    window.location.href = "./Search_user.html";
}

function handleSearchNhaCC() {
    clearTimeout(searchTimeoutNameTC);
    searchTimeoutNameTC = setTimeout(searThuCungName, 1000);
}

document.getElementById("Search_name").addEventListener("input", handleSearchNhaCC);

window.onload = function() {
    let MaLoai = localStorage.getItem("MaLoai");
    if (MaLoai) {
        Get_TC_Ma();
    } else {
        searchname();
    }
};