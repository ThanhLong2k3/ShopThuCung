

function loadloai() {
    let data = localStorage.getItem('ListLoai');
    document.getElementById('maloai').readOnly = false;
    
    if (data) {
        let loai = JSON.parse(data);
        let htmlArray = '';
        for (let i = 0; i < loai.length; i++) {
            if (loai[i].trangthai == 1) {
                htmlArray += `
                <tr>
                    <td>${loai[i].maloai}</td>
                    <td>${loai[i].tenloai}</td>
                    <td><button onclick="sualoaicho('${loai[i].maloai}')">Sửa</button></td>
                    <td><button onclick="xoaloaicho('${loai[i].maloai}')">Xóa</button></td>
                </tr>
                `;
            }
        }
        $('.dsloai').html(htmlArray);
    }
}

loadloai();





function setloai(){
    let ma=document.getElementById("maloai").value;
    let ten=document.getElementById("tenloai").value;
    let datacu=localStorage.getItem('ListLoai');
    let listloai=datacu?JSON.parse(datacu):[];
    let trangthai=1;
    let modal=document.getElementById("Modal_Loai");

    let checkma=listloai.some(l=>l.maloai=== ma);
    if(checkma)
    {
        alert("mã  loại đã tồn tại !");
    }
    else{
        let Loai={
            maloai:ma,
            tenloai:ten,
            trangthai:trangthai
        }
        listloai.push(Loai);
        localStorage.setItem('ListLoai',JSON.stringify(listloai));
        alert("Thêm Loại sp thành công !");
        modal.style.display = "none";
        loadloai();
        document.getElementById("maloai").value='';
        document.getElementById("tenloai").value='';   
    }
}





function xoaloaicho(ma)
{
    
    let data=localStorage.getItem("ListLoai");
        let loai=JSON.parse(data);
      let acce=  confirm ("Bạn có chắc chắn muốn xóa loại ?");
        if(acce){
            for(let i=0; i<loai.length;i++)
                {
                    if(loai[i].maloai===ma)
                    {
                        loai[i].trangthai=0;
                        localStorage.setItem("ListLoai",JSON.stringify(loai));
                alert("bạn đã xóa thành công !");
                        loadloai();
                        break;
                        
                    }
                }
        }
        
}

function sualoaicho(ma){
    let data1=localStorage.getItem('ListLoai');
    let loai1=JSON.parse(data1);
    let modal=document.getElementById("Modal_Loai");
    modal.style.display="block";
    document.getElementById("btn_add").style.display='none';
    document.getElementById("btn_up").style.display='block';

    document.getElementById('maloai').setAttribute('readonly', 'true');
    for(let i=0;i<loai1.length;i++)
    {
        if(loai1[i].maloai===ma)
        {
            document.getElementById('maloai').value=loai1[i].maloai;
            document.getElementById('tenloai').value=loai1[i].tenloai;
            return;
        }
    }
    
}

function UpdateL()
{
    let ma=document.getElementById("maloai").value;
    let ten=document.getElementById("tenloai").value;
    let data=localStorage.getItem("ListLoai");
    let modal=document.getElementById("Modal_Loai");

    if (data) {
        const ttl = JSON.parse(data);
        const loai = ttl.find(l => l.maloai === ma);

        if (loai) {
            loai.tenloai = ten;
            localStorage.setItem("ListLoai", JSON.stringify(ttl));
            alert("Sửa dữ liệu thành công!");
            modal.style.display = "none";
            loadloai();
            document.getElementById("maloai").value = '';
            document.getElementById("tenloai").value = '';
            document.getElementById("btn_add").style.display='block';
            document.getElementById("btn_up").style.display='none';
            document.getElementById('maloai').removeAttribute('readonly');

        } else {
            alert("Không tìm thấy mã loại cần sửa!");
        }
    }

}



function close_Modal_Loai( id) {
    document.getElementById(id).style.display = "none";
    document.getElementById("maloai").value='';
    document.getElementById("tenloai").value='';   
    document.getElementById("btn_add").style.display='block';
    document.getElementById("btn_up").style.display='none';
    document.getElementById('maloai').removeAttribute('readonly');

}

let modal=document.getElementById("Modal_Loai");

window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById("maloai").value='';
    document.getElementById("tenloai").value='';  
    document.getElementById("btn_add").style.display='block';
    document.getElementById("btn_up").style.display='none'; 
    document.getElementById('maloai').removeAttribute('readonly');

}
}
