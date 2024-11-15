function validateForm() {
    const ten = document.getElementById('ten').value;
    const hoten = document.getElementById('hoten').value;
    const email = document.getElementById('email').value;
    const mk = document.getElementById('mk').value;
    const confirmMk = document.getElementById('confirm-mk').value;
    
    if (!ten || !hoten || !email || !mk || !confirmMk) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return false;
    }

    if (!validateEmail(email)) {
        alert("Email không hợp lệ.");
        return false;
    }

    if (mk !== confirmMk) {
        alert("Mật khẩu xác nhận không khớp.");
        return false;
    }

    let data= localStorage.getItem('listtk');
    let danhsach=data? JSON.parse(data):[];
    let tentk = danhsach.some((item) => item.ten === ten);
     if(tentk)
     {
         alert("tên tài khoản đã tồn tại !");
         return false;  
     }
     else{
            const tk = {
                ten: ten,
                hoten: hoten,
                email: email,
                mk: mk
            };
             danhsach.push(tk);
             localStorage.setItem("listtk",JSON.stringify(danhsach));
             alert("Đăng ký tài khoản thành công");   
     }

    document.getElementById('ten').value = "";
    document.getElementById('hoten').value = "";
    document.getElementById('email').value = "";
    document.getElementById('mk').value = "";
    document.getElementById('confirm-mk').value = "";

    alert("Đăng ký thành công!");

}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return re.test(email);
    }


function dangnhap(){
    debugger;
    const tk = document.getElementById('tk').value;
    const mk = document.getElementById('mk').value;
    const quyen = document.getElementById('quyen').value;
    
    if (!tk || !mk) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return false;
    }
    if (quyen === 'Admin') {
        let data= localStorage.getItem('ListNhanVien');
        if(data)
            {
                const danhsach= JSON.parse(data);
                let tkExist = danhsach.find((item) => item.taikhoan === tk && item.matkhau === mk);
                console.log(tkExist);
                debugger;
                if(tkExist)
                    {
                        alert("Đăng nhập thành công!");
                        localStorage.setItem('thongtindangnhap', JSON.stringify({
                            anh: tkExist.anhthe,
                            ten: tkExist.tennhanvien
                        }));
                        console.log(localStorage.getItem('thongtindangnhap'));
                        debugger;
                        window.location.href="admin/admin.html";
                    }
            }
    }
    else{
        let data= localStorage.getItem('listtk');
        if(data)
            {
                const danhsach= JSON.parse(data);
                let tkExist = danhsach.some((item) => item.ten === tk && item.mk === mk);
                
                if(tkExist)
                    {
                        alert("Đăng nhập thành công!");
                        window.location.href="home.html";
                    }
            }
    }

   

}
