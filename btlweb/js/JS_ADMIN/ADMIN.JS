document.addEventListener("DOMContentLoaded", function() {
    // Ẩn tất cả các section khi tải trang
    let sections = document.querySelectorAll(".content-section");
    sections.forEach(section => section.style.display = "none");

    // Hiển thị section đầu tiên (hoặc bất kỳ section nào bạn muốn mặc định hiển thị)
    if (sections.length > 0) {
        sections[7].style.display = "block";
    }
});

function showSection(sectionId) {
    // Ẩn tất cả các section
    let sections = document.querySelectorAll(".content-section");
    sections.forEach(section => section.style.display = "none");
    
    // Hiển thị section được chọn
    let sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = "block";
    }
}

checkloign();
function checkloign(){
  let tt=  localStorage.getItem('thongtindangnhap');
  if(tt)
  {
    let thongtin=JSON.parse(tt);
    document.getElementById('anh_loign').src=thongtin.anh;
    document.getElementById('ten_loign').innerText=thongtin.ten;

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





