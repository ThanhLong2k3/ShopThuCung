
checkmenu();
function checkmenu()
{
    const menuLinks = document.querySelectorAll('nav ul li a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    let sections = document.querySelectorAll(".content-section");
    sections.forEach(section => section.style.display = "none");
    if (sections.length > 0) {
        sections[0].style.display = "block";
    }
});

function showSection(sectionId) {
    let sections = document.querySelectorAll(".content-section");
    sections.forEach(section => section.style.display = "none");
    
    let sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = "block";
    }
}

checkloign();
async function checkloign(){
  let tt=JSON.parse(  localStorage.getItem('thongtindangnhap'));
  
  if(tt)
  {
    let data= await getDaTa(apiEndpoints.NhanVien.getByTK(tt));
    document.getElementById('anh_loign').src=data[0].anhThe;
    document.getElementById('ten_loign').innerText=data[0].tenNhanVien;
    localStorage.setItem('maNhanVien',data[0].maNhanVien);
    localStorage.setItem('tenNhanVien',data[0].tenNhanVien);

  }
}

function showdangxuat(){
   if( document.getElementById('ul_item').style.display=="block"){
    document.getElementById('ul_item').style.display="none";
   }
   else{
    document.getElementById('ul_item').style.display="block"
   }
}
function dangxuat() {
    localStorage.removeItem('currentUser');
    alert("Đăng xuất thành công!");
    window.location.href = 'http://127.0.0.1:5501/html/Home.html'; 
}
let ThongKe = async () => {
    let data = await getDaTa(apiEndpoints.THONGKE.getDaTa);
    let top5 = await getDaTa(apiEndpoints.ThuCung.get_Top5_ThuCung);
    let htmlArray = top5.map(sp => `
        <div class="san_pham_da_ban_item">
            <h3>${sp.tenThuCung}</h3>
            <span>Số lượng: <strong>${sp.soLuong}</strong></span>
        </div>
    `).join('');
    
    document.getElementsByClassName('san_pham_da_ban')[0].innerHTML = htmlArray;
    
    if(data) {
        document.getElementById('DoanhThu').innerText = data.doanhThu.toLocaleString('vi-VN') + " Vnđ";
        document.getElementById('LaiXuat').innerText = data.laiXuat.toLocaleString('vi-VN') + "%";
        document.getElementById('TienNhap').innerText = data.tongTienNhap.toLocaleString('vi-VN') + " Vnđ";
        document.getElementById('TienBan').innerText = data.tongTienBan.toLocaleString('vi-VN') + " Vnđ";
    }
}
ThongKe();
window.showSection=showSection;

