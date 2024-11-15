async function SIGN_UP() {
    const ten = document.getElementById('ten').value;
    const mk = document.getElementById('mk').value;
    const confirmMk = document.getElementById('confirm-mk').value;

    if (!ten || !mk || !confirmMk) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return false;
    }
    if (mk !== confirmMk) {
        alert("Mật khẩu xác nhận không khớp.");
        return false;
    }

    else {
        const tk = {
            taiKhoan: ten,
            matKhau: mk,
            vaiTro: 0
        }

        await addData(apiEndpoints.TAIKHOAN.DANGKY, tk);
        alert("Đăng ký tài khoản thành công");
    }

    document.getElementById('ten').value = "";
    document.getElementById('mk').value = "";
    document.getElementById('confirm-mk').value = "";

    alert("Đăng ký thành công!");

}




async function dangnhap() {
    const tk = document.getElementById('tk').value;
    const mk = document.getElementById('mk').value;

    if (!tk || !mk) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return false;
    }
    try {
        let data = await getDaTa(apiEndpoints.TAIKHOAN.DANGNHAP(tk, mk));
        if (data) {
            alert("Đăng nhập thành công!");
            if (data.vaiTro === 0 || data.vaiTro === 1) {
                window.location.href = "admin/admin.html";
                localStorage.setItem('thongtindangnhap', JSON.stringify(tk));
            }
            else {
                window.location.href = "http://127.0.0.1:5501/html/Home.html";
                localStorage.setItem('thongtindangnhap', JSON.stringify(tk));
            }



        }
    }
    catch {
        alert("TÀI KHOẢN HOẶC MẬT KHẨU CỦA BẠN KHÔNG ĐÚNG VUI LÒNG NHẬP LẠI!")
    }
}
