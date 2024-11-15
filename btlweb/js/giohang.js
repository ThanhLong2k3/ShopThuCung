function tang(index) {
    debugger;
    const data = localStorage.getItem('giohang');
    if (data) {
        const data1 = JSON.parse(data);
        let soluong = parseInt(data1[index].SL);
        if (soluong >= 0) {
            soluong++;
            data1[index].SL = soluong;
            localStorage.setItem('giohang', JSON.stringify(data1));
            getdl();
            TongTien();
        }
    }
}

function giam(index) {
    const data = localStorage.getItem('giohang');
    if (data) {
        const data1 = JSON.parse(data);
        let soluong = parseInt(data1[index].SL);
        if (soluong > 1) { 
            soluong--;
            data1[index].SL = soluong;
            localStorage.setItem('giohang', JSON.stringify(data1));
            getdl();
            TongTien();
        } 
    }
}
function getdl() {
    const data = localStorage.getItem('giohang');
    const htmlarr = [];
    let tongtien = 0;
    if (data) {
        const data1 = JSON.parse(data);
        
        data1.forEach((sp, index) => {
            tongtien += parseFloat(sp.Gia.replace(/[^0-9-]+/g, "")) * parseFloat(sp.SL);
            console.log(tongtien.toFixed(3));
            htmlarr.push(`
                <div id="sanpham">
                    <img id="anh" src=${sp.Anh} alt="Ảnh sản phẩm" style="width: 60px;height: 60px;"/>
                    <div id="thongtin">
                        <p id="tensanpham">${sp.Ten}</p>
                        
                    </div>
                    <div id="gia">
                        <span id="giaban">${sp.Gia}</span>
                        <br/><br/>
                        <input onclick="giam(${index})" style="background-color: #f9758f;" type="button" id="giam" value="-"/>
                        <input type="number" id="soluong" value=${sp.SL}>
                        <input onclick="tang(${index})" style="background-color: #f9758f;" type="button" id="tang" value="+"/>
                        <button style="margin-left: 50px;background-color: #f9758f;color:white;  border: 1px solid #CCC;border-radius: 3px;" onclick="Xoagiohang(${sp.MaGioHang})" >Xóa</button>
                    </div>
                </div>

            `);
        });
        $('.listsp').html(htmlarr.join(''));
        document.getElementById('tongsp').innerText = `Bạn đang có ${data1.length} sản phẩm trong giỏ hàng`;
        

    }
}
getdl();

TongTien();
function TongTien(){
    let DL=localStorage.getItem('giohang');
    let L=JSON.parse(DL);
    let  Tong=0;
    for(let i=0;i<L.length;i++)
    {
        Tong=Tong+(L[i].Gia.replace(/[^0-9-]+/g, "")*L[i].SL);
    }
    document.getElementById('tongtien').innerText = ` ${Tong.toLocaleString()} Vnđ`;
}

function Xoagiohang(ma)
{
    let listsp=localStorage.getItem('giohang');
    let sp=JSON.parse(listsp);
    for(let i=0;i<sp.length;i++){
        if(sp[i].MaGioHang===ma){
            sp.splice(i, 1);
            localStorage.setItem('giohang',JSON.stringify(sp));
            getdl();
            return;
        }
    }
    TongTien();
}