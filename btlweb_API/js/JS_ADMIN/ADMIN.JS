
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



window.showSection=showSection;

