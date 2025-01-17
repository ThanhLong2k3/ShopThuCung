const localHot_AD = "http://localhost:5068/";
const localHot_ND = "https://localhost:7299";
const apiEndpoints = {
    Loai: {
        getAll: `${localHot_AD}api/LoaiThuCung_CTRL/get_all`,
        getById: (MA) => `${localHot_AD}api/LoaiThuCung_CTRL/get_by_id?id=${MA}`,
        add: `${localHot_AD}api/LoaiThuCung_CTRL/create`,
        update: `${localHot_AD}api/LoaiThuCung_CTRL/update`,
        delete: (MA) => `${localHot_AD}api/LoaiThuCung_CTRL/delete/${MA}`,
        getTop5:`${localHot_AD}api/LoaiThuCung_CTRL/get_top5`,
        getTop10:`${localHot_AD}api/LoaiThuCung_CTRL/get_top10`,
        PhanTrang:(PageIndex)=>`${localHot_AD}api/LoaiThuCung_CTRL/PhanTrang?PageIndex=${PageIndex}&PageSize=${10}`

    },
    ThuCung: {
        Search_ThuCung:`${localHot_AD}api/ThuCung_CTRL/Search_ThuCung?`,
        getAll: `${localHot_AD}api/ThuCung_CTRL/get_all`,
        getById: (MA) => `${localHot_AD}api/ThuCung_CTRL/get_by_id?id=${MA}`,
        getByMa: (MA)=> `${localHot_AD}api/ThuCung_CTRL/get_by_ma?id=${MA}`,
        get_Top5_ThuCung:`${localHot_AD}api/ThuCung_CTRL/get_top5_thucung`,
        add: `${localHot_AD}api/ThuCung_CTRL/create`,
        update: `${localHot_AD}api/ThuCung_CTRL/update`,
        delete: (MA) => `${localHot_AD}api/ThuCung_CTRL/delete/${MA}`,
        PhanTrang:(PageIndex)=>`${localHot_AD}api/ThuCung_CTRL/PhanTrang?PageIndex=${PageIndex}&PageSize=${10}`
    },
    NhanVien: {
        Search_NhanVien:`${localHot_AD}api/NhanVien_CTRL/Search_NV?`,
        getAll: `${localHot_AD}api/NhanVien_CTRL/get_all`,
        getById: (MA) => `${localHot_AD}api/NhanVien_CTRL/get_by_id?id=${MA}`,
        getByTK: (TK) => `${localHot_AD}api/NhanVien_CTRL/get_by_tk?id=${TK}`,
        add: `${localHot_AD}api/NhanVien_CTRL/create`,
        update: `${localHot_AD}api/NhanVien_CTRL/update`,
        delete: (MA) => `${localHot_AD}api/NhanVien_CTRL/delete/${MA}`,
        PhanTrang:(PageIndex)=>`${localHot_AD}api/NhanVien_CTRL/PhanTrang?PageIndex=${PageIndex}&PageSize=${10}`

    },
    NCC: {
        Search_NCC:`${localHot_AD}api/NhaCungCap_CTRL/Search_NCC?`,
        getAll: `${localHot_AD}api/NhaCungCap_CTRL/get_all`,
        getById: (MA) => `${localHot_AD}api/NhaCungCap_CTRL/get_by_id?id=${MA}`,
        add: `${localHot_AD}api/NhaCungCap_CTRL/create`,
        update: `${localHot_AD}api/NhaCungCap_CTRL/update`,
        delete: (MA) => `${localHot_AD}api/NhaCungCap_CTRL/delete/${MA}`,
        PhanTrang:(PageIndex)=>`${localHot_AD}api/NhaCungCap_CTRL/PhanTrang?PageIndex=${PageIndex}&PageSize=${10}`

    },
    KHACHHANG: {
        Search_KH:`${localHot_AD}api/KhachHang_CTRL/Search_KH?`,
        getAll: `${localHot_AD}api/KhachHang_CTRL/get_all`,
        getById: (MA) => `${localHot_AD}api/KhachHang_CTRL/get_by_id?id=${MA}`,
        getByTK: (TK) => `${localHot_AD}api/KhachHang_CTRL/get_by_TK?id=${TK}`,

        add: `${localHot_AD}api/KhachHang_CTRL/create`,
        update: `${localHot_AD}api/KhachHang_CTRL/update`,
        delete: (MA) => `${localHot_AD}api/KhachHang_CTRL/delete/${MA}`,
        PhanTrang:(PageIndex)=>`${localHot_AD}api/KhachHang_CTRL/PhanTrang?PageIndex=${PageIndex}&PageSize=${10}`

    },
    DONNHAP: {
        Search_DN:`${localHot_AD}api/DonNhap_CTRL/Search_DonNhap?`,
        getAll: `${localHot_AD}api/DonNhap_CTRL/get_all`,
        getById: (MA) => `${localHot_AD}api/DonNhap_CTRL/get_by_id?id=${MA}`,
        add: `${localHot_AD}api/DonNhap_CTRL/create`,
        update: `${localHot_AD}api/DonNhap_CTRL/update`,
        delete: (MA) => `${localHot_AD}api/DonNhap_CTRL/delete/${MA}`,
        PhanTrang:(PageIndex)=>`${localHot_AD}api/DonNhap_CTRL/PhanTrang?PageIndex=${PageIndex}&PageSize=${10}`

    },
    DONBAN:{
        Search_DonBan:`${localHot_AD}'api/DonBan_CTRL/SEARCH_DONBAN'`,
        Search_DonBan2:`${localHot_AD}api/DonBan_CTRL/Search_DonBan2?`,
        create:`${localHot_ND}/api/DonBan_CTRL/create`,
        getAll: `${localHot_AD}api/DonBan_CTRL/get_all`,
        getById: (MA) => `${localHot_AD}api/DonBan_CTRL/get_by_id?id=${MA}`,
        getByID_DonBan:(MA)=>`${localHot_AD}api/DonBan_CTRL/GetByMaDonBan?id=${MA}`,
        delete: (MA) => `${localHot_AD}api/DonBan_CTRL/delete/${MA}`,    
        update:`${localHot_AD}api/DonBan_CTRL/update`,
        PhanTrang:(PageIndex)=>`${localHot_AD}api/DonBan_CTRL/PhanTrang?PageIndex=${PageIndex}&PageSize=${10}`

    },
    CTDONNHAP:{
        getAll: `${localHot_AD}api/CTDonNhap_CTRL/get_all`,
        getById: (MA) => `${localHot_AD}api/CTDonNhap_CTRL/get_by_id?id=${MA}`,
        add: `${localHot_AD}api/CTDonNhap_CTRL/create`,
        update: `${localHot_AD}api/CTDonNhap_CTRL/update`,
        delete: (MA) => `${localHot_AD}api/CTDonNhap_CTRL/delete/${MA}`,
    },
    CTDONBAN:{
        create:`${localHot_ND}/api/CTDonBan_CTRL/create`,
        getAll: `${localHot_AD}api/CTDonBan_CTRL/get_all`,
        getById: (MA) => `${localHot_AD}api/CTDonBan_CTRL/get_by_id?id=${MA}`,
        delete: (MA) => `${localHot_AD}api/CTDonBan_CTRL/delete/${MA}`,    
    },
    TAIKHOAN:{
        DANGNHAP:(TK,MK)=>`${localHot_AD}api/TaiKhoan_CTRL/Dangnhap?tk=${TK}&mk=${MK}`,
        DANGKY:`${localHot_AD}api/TaiKhoan_CTRL/dangky`,
        DOIMK: (TK,MK)=>`${localHot_AD}api/TaiKhoan_CTRL/doimatkhau?tk=${TK}&mkm=${MK}`,
    },
    GIOHANG:{
        GETBYID_TK:(ID,TK)=>`${localHot_ND}/api/GioHang_CTRL/get_gh_tk_id?tk=${TK}&ma=${ID}`,
        GETBYTK:(TK)=>`${localHot_ND}/api/GioHang_CTRL/get_by_tk?tk=${TK}`,
        ADD:`${localHot_ND}/api/GioHang_CTRL/create`,
        UPDATE_SL_1:(TK,MATK,GT)=>`${localHot_ND}/api/GioHang_CTRL/update?tk=${TK}&matc=${MATK}&ac=${GT}`, /* ac= 0 TĂNG SỐ LƯỢNG, 1 GIẢM SỐ LƯỢNG*/
        DELETE:(MAKH,MATC)=> `${localHot_ND}/api/GioHang_CTRL/delete?tk=${MAKH}&mathucung=${MATC}`,
        DELETE_TK:(TK)=> `${localHot_ND}/api/GioHang_CTRL/delete_TK?tk=${TK}`,

    },
    THONGKE:{
        getDaTa:`${localHot_AD}api/ThongKe_CTRL/getThongKe`,
    },
    async fetchWithError(url, options = {}) {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorDetails = await response.text();
            console.error('Response Error Details:', errorDetails);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
};

const getDaTa = async (url) => {
    const data = await apiEndpoints.fetchWithError(url);
    debugger
    return data;
}
const addData = async (url, data = {}, callBack) => {
    try {
        await apiEndpoints.fetchWithError(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        alert(MESSAGES.ADD_SUCCESS); 
        if (typeof callBack === 'function') {
            callBack(); 
        }
    }
    catch (error) {
        console.error('Error:', error);
        alert(MESSAGES.ERROR);
    }
}
const updateData = async (url, data = {}, callBack) => {
    if (!confirm(MESSAGES.UPDATE_CONFIRM)) {
        return;
    }
    try {
        await apiEndpoints.fetchWithError(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        alert(MESSAGES.UPDATE_SUCCESS);
        callBack();
    }
    catch (error) {
        console.error('Error:', error);
        alert(MESSAGES.ERROR);
    }
}

const deleteData = async (url, callBack) => {
    if (!confirm(MESSAGES.DELETE_CONFIRM)) {
        return;
    }
    try {
      let a =  await apiEndpoints.fetchWithError(url, {
            method: 'DELETE'
        });
        if(Boolean(a)===true)
        {
            alert(MESSAGES.DELETE_SUCCESS);
            callBack();
        }
        else{
            alert("Có ràng buộc, Không thể xóa!")
        }
        
    } catch (error) {
        alert(MESSAGES.ERROR);
        console.error('Error deleting data:', error);
    }
};
const MESSAGES = {
    DELETE_CONFIRM: "Bạn có chắc chắn muốn xóa ?",
    UPDATE_CONFIRM: "Bạn có chắc chắn muốn cập nhật thông tin này?",
    ADD_SUCCESS: "Thêm dữ liệu thành công!",
    UPDATE_SUCCESS: "Sửa dữ liệu thành công!",
    DELETE_SUCCESS: "Bạn đã xóa thành công!",
    ERROR: "Có lỗi xảy ra khi thực hiện thao tác",
    VALIDATION_ERROR: "Bạn hãy điền đầy đủ thông tin!"
};
const addDonHang = async (url, data = {}) => {
    try {
        let ma= await apiEndpoints.fetchWithError(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return ma; 
    }
    catch (error) {
        console.error('Error:', error);
        alert(MESSAGES.ERROR);
    }
}
const updateData_gh = async (url, data = {}) => {
    try {
        await apiEndpoints.fetchWithError(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }
    catch (error) {
        console.error('Error:', error);
        alert(MESSAGES.ERROR);
    }
}
const deleteData_NO_ALER = async (url) => {
    try {
      let a =  await apiEndpoints.fetchWithError(url, {
            method: 'DELETE'
        });
        
    } catch (error) {
        alert(MESSAGES.ERROR);
        console.error('Error deleting data:', error);
    }
};
window.apiEndpoints = apiEndpoints;
window.getDaTa = getDaTa;
window.addData = addData;
window.updateData = updateData;
window.deleteData = deleteData;
window.addDonHang=addDonHang;
window.updateData_gh=updateData_gh;
window.deleteData_NO_ALER=deleteData_NO_ALER;
window.MESSAGES = MESSAGES;