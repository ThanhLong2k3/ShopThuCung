CREATE DATABASE Petshop;
GO
USE Petshop;
GO
CREATE TABLE TaiKhoan (
    taiKhoan NVARCHAR(50) PRIMARY KEY,
    matKhau NVARCHAR(50) NOT NULL,
    vaiTro INT NOT NULL
);

CREATE TABLE KhachHang (
	maKhachHang int identity(1,1) primary key,
    taiKhoan NVARCHAR(50),
    tenKhachHang NVARCHAR(100),
    diaChi_KH NVARCHAR(255),
    soDienThoai_KH VARCHAR(20)
);


CREATE TABLE NhanVien (
	maNhanVien int identity(1,1) primary key,
    taiKhoan NVARCHAR(50),
    tenNhanVien NVARCHAR(100),
    diaChi NVARCHAR(255),
    soDienThoai VARCHAR(20),
    chucVu NVARCHAR(50),
    anhThe NVARCHAR(MAX)
);

CREATE TABLE NhaCungCap (
    MaNhaCungCap INT PRIMARY KEY IDENTITY(1,1), 
    tenNhaCungCap NVARCHAR(100),
    soDienThoai VARCHAR(20),
    diaChi NVARCHAR(255)
);

CREATE TABLE Loai (
    maLoai INT PRIMARY KEY IDENTITY(1,1), 
    tenLoai NVARCHAR(100)
);

CREATE TABLE ThuCung (
    maThuCung INT PRIMARY KEY IDENTITY(1,1),
    tenThuCung NVARCHAR(100),
    maLoai INT, 
    soLuong INT,
    giaNhap DECIMAL(18, 2),
    giaBan DECIMAL(18, 2),
    anh NVARCHAR(MAX),
	moTa NVARCHAR(MAX)
    FOREIGN KEY (maLoai) REFERENCES Loai(maLoai)
);
CREATE TABLE GioHang (
    taiKhoan NVARCHAR(50),
    maThuCung INT,
    soLuong INT NOT NULL DEFAULT 1,
    PRIMARY KEY (taiKhoan, maThuCung),
    FOREIGN KEY (taiKhoan) REFERENCES TaiKhoan(taiKhoan) ON DELETE CASCADE,
    FOREIGN KEY (maThuCung) REFERENCES ThuCung(maThuCung) ON DELETE CASCADE
);
CREATE TABLE DonNhap (
    maDonNhap INT PRIMARY KEY IDENTITY(1,1),
    ngayNhap DATE,
    maNhaCungCap INT,
    maNhanVien int ,
    tongTien DECIMAL(18, 2),
	trangThai nvarchar(50),
    FOREIGN KEY (maNhaCungCap) REFERENCES NhaCungCap(MaNhaCungCap),
    FOREIGN KEY (maNhanVien) REFERENCES NhanVien(maNhanVien)
);

CREATE TABLE ChiTietDonNhap (
    maDonNhap INT,
    maThuCung INT,
    soLuong INT,
    giaNhap DECIMAL(18, 2),
    PRIMARY KEY (maDonNhap, maThuCung),
    FOREIGN KEY (maDonNhap) REFERENCES DonNhap(maDonNhap),
    FOREIGN KEY (maThuCung) REFERENCES ThuCung(maThuCung)
);

CREATE TABLE DonBan (
    maDonBan INT PRIMARY KEY IDENTITY(1,1), 
    ngayBan DATE,
    maNhanVien int null,
    maKhachHang int,
    tongTien DECIMAL(18, 2),
	trangThai nvarchar(50),
    FOREIGN KEY (maNhanVien) REFERENCES NhanVien(maNhanVien),
    FOREIGN KEY (maKhachHang) REFERENCES KhachHang(maKhachHang)
);

CREATE TABLE ChiTietDonBan (
    maDonBan INT,
    maThuCung INT,
    soLuong INT,
    giaBan DECIMAL(18, 2),
    PRIMARY KEY (maDonBan, maThuCung),
    FOREIGN KEY (maDonBan) REFERENCES DonBan(maDonBan),
    FOREIGN KEY (maThuCung) REFERENCES ThuCung(maThuCung)
);
GO
CREATE PROCEDURE DangNhap
    @taiKhoan NVARCHAR(50),
    @matKhau NVARCHAR(50)
AS
BEGIN
    SELECT taiKhoan, matKhau, vaiTro
    FROM TaiKhoan
    WHERE taiKhoan = @taiKhoan AND matKhau = @matKhau;
END;
go
CREATE PROCEDURE DangKy
    @taiKhoan NVARCHAR(50),
    @matKhau NVARCHAR(50),
    @vaiTro INT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM TaiKhoan WHERE taiKhoan = @taiKhoan)
    BEGIN
        -- Tài khoản đã tồn tại
        SELECT 0 AS Success;
    END
    ELSE
    BEGIN
        -- Thêm tài khoản mới
        INSERT INTO TaiKhoan (taiKhoan, matKhau, vaiTro)
        VALUES (@taiKhoan, @matKhau, @vaiTro);
        
        SELECT 1 AS Success;
    END
END;
go
CREATE PROCEDURE DoiMK
    @taiKhoan NVARCHAR(50),
    @matkhaumoi NVARCHAR(50)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM TaiKhoan WHERE taiKhoan = @taiKhoan)
    BEGIN
        -- Cập nhật mật khẩu mới
        UPDATE TaiKhoan
        SET matKhau = @matkhaumoi
        WHERE taiKhoan = @taiKhoan;

        SELECT 1 AS Success;
    END
    ELSE
    BEGIN
        -- Tài khoản không tồn tại
        SELECT 0 AS Success;
    END
END;
go
--===============================================KHACHHANG
-- Stored Procedure: Get_All_KhachHang
CREATE PROCEDURE Get_All_KhachHang
AS
BEGIN
    SELECT * FROM KhachHang;
END
GO

-- Stored Procedure: Get_KhachHang_ById
CREATE PROCEDURE Get_KhachHang_ById
    @maKhachHang int
AS
BEGIN
    SELECT * FROM KhachHang WHERE maKhachHang = @maKhachHang;
END
GO
 
-- Stored Procedure: Them_KhachHang
CREATE PROCEDURE Them_KhachHang
    @taiKhoan NVARCHAR(50) = NULL,
    @TenKhachHang NVARCHAR(100),
    @DiaChi_KH NVARCHAR(255),
    @SoDienThoai_KH VARCHAR(20)
AS
BEGIN
    INSERT INTO KhachHang (taiKhoan, tenKhachHang, diaChi_KH, soDienThoai_KH)
    VALUES (@taiKhoan, @TenKhachHang, @DiaChi_KH, @SoDienThoai_KH);
END
GO

-- Stored Procedure: Sua_KhachHang

CREATE PROCEDURE Sua_KhachHang
	@maKhachHang int ,
    @taiKhoan NVARCHAR(50) = null,
    @TenKhachHang NVARCHAR(100),
    @DiaChi_KH NVARCHAR(255),
    @SoDienThoai_KH VARCHAR(20)
AS
BEGIN
    UPDATE KhachHang
    SET tenKhachHang = @TenKhachHang,
        diaChi_KH = @DiaChi_KH,
        soDienThoai_KH = @SoDienThoai_KH,
		taiKhoan=@taiKhoan
    WHERE maKhachHang = @maKhachHang;
END
GO


CREATE PROCEDURE Xoa_KhachHang
    @maKhachHang int
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (SELECT 1 FROM DonBan WHERE maKhachHang = @maKhachHang)
    BEGIN
        SELECT 0; 
    END

    DELETE FROM KhachHang WHERE maKhachHang = @maKhachHang;
    
    IF @@ROWCOUNT > 0
        SELECT 1; 
    ELSE
        SELECT 0;
END
GO
--================================================NHAN VIEN
-- Stored Procedure để lấy tất cả nhân viên
CREATE PROCEDURE Get_All_NhanVien
AS
BEGIN
    SELECT * FROM NhanVien;
END
go
-- Stored Procedure để lấy nhân viên theo ID
CREATE PROCEDURE Get_NhanVien_ById
    @maNhanVien int
AS
BEGIN
    SELECT * FROM NhanVien WHERE maNhanVien=@maNhanVien;
END
-- Stored Procedure để thêm nhân viên
go
CREATE PROCEDURE Them_NhanVien
    @TaiKhoan NVARCHAR(50) = null,
    @TenNhanVien NVARCHAR(100),
    @DiaChi NVARCHAR(255),
    @SoDienThoai VARCHAR(20),
    @ChucVu NVARCHAR(50),
    @AnhThe NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO NhanVien (taiKhoan, tenNhanVien,  diaChi, soDienThoai, chucVu, anhThe)
    VALUES (@TaiKhoan, @TenNhanVien, @DiaChi, @SoDienThoai, @ChucVu, @AnhThe);
END

-- Stored Procedure để sửa thông tin nhân viên
go
CREATE PROCEDURE Sua_NhanVien
	@maNhanVien int,
    @TaiKhoan NVARCHAR(50)=null,
    @TenNhanVien NVARCHAR(100),
    @DiaChi NVARCHAR(255),
    @SoDienThoai VARCHAR(20),
    @ChucVu NVARCHAR(50),
    @AnhThe NVARCHAR(MAX)
AS
BEGIN
    UPDATE NhanVien
    SET tenNhanVien = @TenNhanVien,
        diaChi = @DiaChi,
        soDienThoai = @SoDienThoai,
        chucVu = @ChucVu,
        anhThe = @AnhThe,
		taiKhoan = @TaiKhoan
    WHERE maNhanVien = @maNhanVien;
END
GO

CREATE PROCEDURE Xoa_NhanVien
    @maNhanVien int
AS
BEGIN
   SET NOCOUNT ON;
    IF EXISTS (SELECT 1 FROM DonNhap WHERE maNhanVien = @maNhanVien)
       OR EXISTS (SELECT 1 FROM DonBan WHERE maNhanVien = @maNhanVien)
    BEGIN
        SELECT 0; 
    END

    DELETE FROM NhanVien WHERE maNhanVien = @maNhanVien;
    
    IF @@ROWCOUNT > 0
        SELECT 1;
    ELSE
        SELECT 0;
END
GO
--=============================================NHA CUNG CAP=========================
CREATE PROCEDURE Get_All_NhaCungCap
AS
BEGIN
    SELECT * FROM NhaCungCap;
END
GO
CREATE PROCEDURE Get_NhaCungCap_ById
    @MaNhaCungCap INT
AS
BEGIN
    SELECT * FROM NhaCungCap
    WHERE MaNhaCungCap = @MaNhaCungCap;
END
GO
CREATE PROCEDURE Them_NhaCungCap
	@TenNhaCungCap NVARCHAR(50),
    @SoDienThoai VARCHAR(20),
    @DiaChi NVARCHAR(255)
AS
BEGIN
    INSERT INTO NhaCungCap (TenNhaCungCap,SoDienThoai, DiaChi)
    VALUES (@TenNhaCungCap,@SoDienThoai, @DiaChi);
    -- Trả về ID của bản ghi vừa thêm
    SELECT SCOPE_IDENTITY() AS NewID;
END
GO
CREATE PROCEDURE Sua_NhaCungCap
    @MaNhaCungCap INT,
    @TenNhaCungCap NVARCHAR(100),
    @SoDienThoai VARCHAR(20),
    @DiaChi NVARCHAR(255)
AS
BEGIN
    UPDATE NhaCungCap
    SET TenNhaCungCap = @TenNhaCungCap,
        SoDienThoai = @SoDienThoai,
        DiaChi = @DiaChi
    WHERE MaNhaCungCap = @MaNhaCungCap;
END
GO
CREATE PROCEDURE Xoa_NhaCungCap
    @MaNhaCungCap INT
AS
BEGIN
    DELETE FROM NhaCungCap
    WHERE MaNhaCungCap = @MaNhaCungCap;
END
GO
--=====================================================LOAI THU CUNG
CREATE PROCEDURE Get_All_Loai
AS
BEGIN
    SELECT * FROM Loai; -- Giả định bảng tên là LoaiThuCung
END
GO
CREATE PROCEDURE Get_Loai_ById
    @MaLoai INT
AS
BEGIN
    SELECT * FROM Loai WHERE maLoai = @MaLoai; -- Giả định bảng tên là LoaiThuCung
END
go
CREATE PROCEDURE Them_Loai
    @TenLoai NVARCHAR(50) -- Thay đổi kích thước theo yêu cầu của bạn
AS
BEGIN
    INSERT INTO Loai (tenLoai) -- Giả định bảng tên là LoaiThuCung
    VALUES (@TenLoai);
END
go
CREATE PROCEDURE Sua_Loai
    @MaLoai INT,
    @TenLoai NVARCHAR(50) -- Thay đổi kích thước theo yêu cầu của bạn
AS
BEGIN
    UPDATE Loai
    SET tenLoai = @TenLoai
    WHERE maLoai = @MaLoai;
END
go

CREATE PROCEDURE Xoa_Loai
    @MaLoai INT
AS
BEGIN
     SET NOCOUNT ON;
    IF EXISTS (SELECT 1 FROM ThuCung WHERE maLoai = @MaLoai)
    BEGIN
        SELECT  0;
    END

    DELETE FROM Loai WHERE maLoai = @MaLoai;
    
    IF @@ROWCOUNT > 0
        SELECT  1; 
    ELSE
        SELECT  0;
END
GO


--==========================================THU CUNG

CREATE PROCEDURE Get_All_ThuCung
AS
BEGIN
    SELECT *,Loai.tenLoai FROM ThuCung inner join Loai on ThuCung.maLoai=Loai.maLoai; -- Thay thế ThuCung bằng tên bảng đúng nếu cần
END
GO
CREATE PROCEDURE Get_ThuCung_ById
    @MaThuCung INT
AS
BEGIN
    SELECT * FROM ThuCung WHERE MaThuCung = @MaThuCung; -- Thay thế ThuCung bằng tên bảng đúng nếu cần
END
GO
CREATE PROCEDURE Them_ThuCung
    @TenThuCung NVARCHAR(100),
    @MaLoai INT,
    @SoLuong INT,
    @GiaNhap DECIMAL(18, 2),
    @GiaBan DECIMAL(18, 2),
    @Anh NVARCHAR(MAX),
	@MoTa nvarchar(max)

AS
BEGIN
    INSERT INTO ThuCung (TenThuCung, MaLoai, SoLuong, GiaNhap, GiaBan, Anh,Mota)
    VALUES (@TenThuCung, @MaLoai, @SoLuong, @GiaNhap, @GiaBan, @Anh,@MoTa);
END
GO
CREATE PROCEDURE Sua_ThuCung
    @MaThuCung INT,
    @TenThuCung NVARCHAR(100),
    @MaLoai INT,
    @SoLuong INT,
    @GiaNhap DECIMAL(18, 2),
    @GiaBan DECIMAL(18, 2),
    @Anh NVARCHAR(MAX),
	@MoTa nvarchar(max)
AS
BEGIN
    UPDATE ThuCung
    SET TenThuCung = @TenThuCung,
        MaLoai = @MaLoai,
        SoLuong = @SoLuong,
        GiaNhap = @GiaNhap,
        GiaBan = @GiaBan,
        Anh = @Anh,
		moTa=@MoTa
    WHERE MaThuCung = @MaThuCung;
END
GO

CREATE PROCEDURE Xoa_ThuCung
    @MaThuCung INT
AS
BEGIN
   SET NOCOUNT ON;

    -- Check for related records in ChiTietDonNhap, ChiTietDonBan, and GioHang
    IF EXISTS (SELECT 1 FROM ChiTietDonNhap WHERE maThuCung = @MaThuCung)
       OR EXISTS (SELECT 1 FROM ChiTietDonBan WHERE maThuCung = @MaThuCung)
       OR EXISTS (SELECT 1 FROM GioHang WHERE maThuCung = @MaThuCung)
    BEGIN
        SELECT 0; -- Constraint violation
    END

    -- Attempt to delete
    DELETE FROM ThuCung WHERE MaThuCung = @MaThuCung;
    
    IF @@ROWCOUNT > 0
        SELECT 1; -- Deletion successful
    ELSE
        SELECT 0;
END
GO
--=================================DON NHAP ======================

CREATE PROCEDURE Get_All_DonNhap
AS
BEGIN
	select  dn.trangThai,nv.tenNhanVien,dn.ngayNhap,ncc.tenNhaCungCap,ncc.soDienThoai,ncc.diaChi,dn.tongTien,dn.maDonNhap from DonNhap dn inner join NhaCungCap ncc on dn.maNhaCungCap=ncc.MaNhaCungCap inner join NhanVien nv on dn.maNhanVien=nv.maNhanVien ORDER BY dn.maDonNhap DESC
END;
GO

CREATE PROCEDURE Get_DonNhap_ById
    @MaDonNhap INT
AS
BEGIN
	select dn.trangThai,nv.tenNhanVien,dn.ngayNhap,ncc.tenNhaCungCap,ncc.soDienThoai,ncc.diaChi,dn.tongTien,dn.maDonNhap,dn.maNhaCungCap,dn.maNhanVien from DonNhap dn inner join NhaCungCap ncc on dn.maNhaCungCap=ncc.MaNhaCungCap inner join NhanVien nv on dn.maNhanVien=nv.maNhanVien
    WHERE dn.maDonNhap = @MaDonNhap;
END;
GO

CREATE PROCEDURE Them_DonNhap
    @NgayNhap DATE,
    @MaNhaCungCap INT,
    @MaNhanVien INT,
    @TongTien DECIMAL(18, 2),
	@TrangThai nvarchar(50)
AS
BEGIN
    INSERT INTO DonNhap (NgayNhap, MaNhaCungCap, MaNhanVien, TongTien,trangthai)
    VALUES (@NgayNhap, @MaNhaCungCap, @MaNhanVien, @TongTien,@TrangThai);

	SELECT SCOPE_IDENTITY() ;
END;
GO

CREATE PROCEDURE Sua_DonNhap
    @MaDonNhap INT,
    @NgayNhap DATE,
    @MaNhaCungCap INT,
    @MaNhanVien INT,
    @TongTien DECIMAL(18, 2),
	@TrangThai nvarchar(50)
AS
BEGIN
    UPDATE DonNhap
    SET NgayNhap = @NgayNhap,
        MaNhaCungCap = @MaNhaCungCap,
        MaNhanVien = @MaNhanVien,
        TongTien = @TongTien,
		TrangThai=@TrangThai
    WHERE MaDonNhap = @MaDonNhap;
END;
GO

CREATE OR ALTER PROCEDURE Xoa_DonNhap
    @MaDonNhap INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    -- Update the quantity in ThuCung table
    UPDATE tc
    SET tc.soLuong = tc.soLuong - ctdn.soLuong
    FROM ThuCung tc
    INNER JOIN ChiTietDonNhap ctdn ON tc.maThuCung = ctdn.maThuCung
    WHERE ctdn.maDonNhap = @MaDonNhap;

    -- Check if any ThuCung now has negative quantity
    IF EXISTS (SELECT 1 FROM ThuCung WHERE soLuong < 0)
    BEGIN
        ROLLBACK;
        SELECT -1 AS Result; -- Deletion failed due to negative quantity
        RETURN;
    END

    -- Delete the related records in ChiTietDonNhap
    DELETE FROM ChiTietDonNhap WHERE maDonNhap = @MaDonNhap;

    -- Delete the DonNhap record
    DELETE FROM DonNhap WHERE MaDonNhap = @MaDonNhap;
    
    IF @@ERROR <> 0
    BEGIN
        ROLLBACK;
        SELECT 0 AS Result; -- Deletion failed
    END
    ELSE
    BEGIN
        COMMIT;
        SELECT 1 AS Result; -- Deletion successful
    END
END;
go
--===============================Don Ban ===================

CREATE PROCEDURE Get_All_DonBan
AS
BEGIN
    SELECT db.maDonBan,db.ngayBan,db.maNhanVien,db.maKhachHang,db.tongTien,db.trangThai,nv.tenNhanVien,kh.tenKhachHang,kh.soDienThoai_KH,kh.diaChi_KH FROM DonBan db full join NhanVien nv on db.maNhanVien=nv.maNhanVien inner join KhachHang kh on db.maKhachHang=KH.maKhachHang order by db.maDonBan DESC;
END;
go
drop proc Get_DonBan_ById
CREATE PROCEDURE Get_DonBan_ById
    @MaDonBan INT
AS
BEGIN
    SELECT 
        db.maDonBan,
        db.ngayBan,
        db.maNhanVien,
        db.maKhachHang,
        db.tongTien,
        db.trangThai,
        nv.tenNhanVien,
        kh.tenKhachHang,
        kh.soDienThoai_KH,
        kh.diaChi_KH
    FROM 
        DonBan db
    LEFT JOIN 
        NhanVien nv ON db.maNhanVien = nv.maNhanVien
    INNER JOIN 
        KhachHang kh ON db.maKhachHang = kh.maKhachHang
    WHERE 
        db.maDonBan = @MaDonBan;
END;
GO

CREATE PROCEDURE Them_DonBan
    @NgayBan DATE,
    @MaNhanVien int = null,
    @MaKhachHang int ,
    @TongTien DECIMAL(18, 2)
AS
BEGIN
    INSERT INTO DonBan (NgayBan, MaKhachHang, MaNhanVien, TongTien, TrangThai)
    VALUES (@NgayBan, @MaKhachHang, @MaNhanVien, @TongTien, N'Chờ xác nhận');
	SELECT SCOPE_IDENTITY() ;
END;
go
CREATE PROCEDURE Sua_DonBan
    @MaDonBan INT,
    @NgayBan DATE,
    @MaKhachHang int,
    @MaNhanVien int =null,
    @TongTien DECIMAL(18, 2),
    @TrangThai NVARCHAR(50)
AS
BEGIN
    UPDATE DonBan
    SET NgayBan = @NgayBan,
        MaNhanVien = @MaNhanVien,
        MaKhachHang = @MaKhachHang,
        TongTien = @TongTien,
        TrangThai = @TrangThai
    WHERE MaDonBan = @MaDonBan;
END;
go

CREATE OR ALTER PROCEDURE Xoa_DonBan
    @MaDonBan INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    -- Update the quantity in ThuCung table
    UPDATE tc
    SET tc.soLuong = tc.soLuong + ctdb.soLuong
    FROM ThuCung tc
    INNER JOIN ChiTietDonBan ctdb ON tc.maThuCung = ctdb.maThuCung
    WHERE ctdb.maDonBan = @MaDonBan;

    -- Delete the related records in ChiTietDonBan
    DELETE FROM ChiTietDonBan WHERE maDonBan = @MaDonBan;

    -- Delete the DonBan record
    DELETE FROM DonBan WHERE MaDonBan = @MaDonBan;
    
    IF @@ERROR <> 0
    BEGIN
        ROLLBACK;
        SELECT 0 AS Result; -- Deletion failed
    END
    ELSE
    BEGIN
        COMMIT;
        SELECT 1 AS Result; -- Deletion successful
    END
END;
go
go

CREATE PROCEDURE Get_DonBan_ByMaKH
   @MaKhachHang int 
AS
BEGIN
    SELECT 
    db.maDonBan,
    db.ngayBan,
    db.tongTien,
    db.trangThai,
    kh.tenKhachHang,
    kh.diaChi_KH,
    kh.soDienThoai_KH,
    tc.tenThuCung,
    ctdb.soLuong,
    ctdb.giaBan
FROM 
    DonBan db
    INNER JOIN ChiTietDonBan ctdb ON db.maDonBan = ctdb.maDonBan
    INNER JOIN ThuCung tc ON ctdb.maThuCung = tc.maThuCung
    INNER JOIN KhachHang kh ON db.maKhachHang = kh.maKhachHang
WHERE 
    db.maKhachHang = @MaKhachHang
ORDER BY 
    db.maDonBan DESC
END;
go
CREATE PROCEDURE Get_All_ChiTietDonNhap
AS
BEGIN
    SELECT * FROM ChiTietDonNhap;
END;
go
--=============================================CHI TIET DON NHAP 
CREATE PROCEDURE Get_All_ChiTietDonNhap
AS
BEGIN
    SELECT * FROM ChiTietDonNhap;
END;
GO

CREATE PROCEDURE Get_ChiTietDonNhap_ById
    @MaDonNhap INT
AS
BEGIN
    SELECT ct.maDonNhap,ct.maThuCung,ct.giaNhap,ct.soLuong,tc.tenThuCung FROM ChiTietDonNhap ct inner join ThuCung tc on ct.maThuCung=tc.maThuCung
    WHERE maDonNhap = @MaDonNhap;
END;
GO

CREATE PROCEDURE Them_ChiTietDonNhap
    @MaDonNhap INT,
    @MaThuCung INT,
    @SoLuong INT,
    @GiaNhap DECIMAL(18, 2)
AS
BEGIN
	update ThuCung set soLuong+= @SoLuong where maThuCung= @MaThuCung;
    INSERT INTO ChiTietDonNhap (MaDonNhap, MaThuCung, SoLuong, GiaNhap)
    VALUES (@MaDonNhap, @MaThuCung, @SoLuong, @GiaNhap);
END;
GO
CREATE PROCEDURE Sua_ChiTietDonNhap
    @MaDonNhap INT,
    @MaThuCung INT,
    @SoLuong INT,
    @GiaNhap DECIMAL(18, 2)
AS
BEGIN
    UPDATE ChiTietDonNhap
    SET SoLuong = @SoLuong,
        GiaNhap = @GiaNhap
    WHERE MaDonNhap = @MaDonNhap AND MaThuCung = @MaThuCung;
END;
GO
CREATE PROCEDURE Xoa_ChiTietDonNhap
    @MaDonNhap INT
AS
BEGIN
    DELETE FROM ChiTietDonNhap
    WHERE MaDonNhap = @MaDonNhap;
    SELECT @@ROWCOUNT;
END;
--============================================CHI TIẾT ĐƠN BÁN ===============================
go
CREATE PROCEDURE Get_All_ChiTietDonBan
AS
BEGIN
    SELECT * FROM ChiTietDonBan;
END;
go

CREATE PROCEDURE Get_ChiTietDonBan_ById
    @MaDonBan INT
AS
BEGIN
    SELECT ct.maThuCung,tc.tenThuCung,ct.maDonBan,ct.soLuong,ct.giaBan FROM ChiTietDonBan ct inner join ThuCung tc on ct.maThuCung=tc.maThuCung
    WHERE MaDonBan = @MaDonBan;
END;
go

CREATE PROCEDURE Them_ChiTietDonBan
    @MaDonBan INT,
    @MaThuCung INT,
    @SoLuong INT,
    @GiaBan DECIMAL(18, 2)
AS
BEGIN
	update ThuCung set soLuong-= @SoLuong where maThuCung=@MaThuCung;
    INSERT INTO ChiTietDonBan (MaDonBan, MaThuCung, SoLuong, GiaBan)
    VALUES (@MaDonBan, @MaThuCung, @SoLuong, @GiaBan);
END;
go

CREATE PROCEDURE Sua_ChiTietDonBan
    @MaDonBan INT,
    @MaThuCung INT,
    @SoLuong INT,
    @GiaBan DECIMAL(18, 2)
AS
BEGIN
    UPDATE ChiTietDonBan
    SET SoLuong = @SoLuong,
        GiaBan = @GiaBan
    WHERE MaDonBan = @MaDonBan AND MaThuCung = @MaThuCung;
END;
go
CREATE PROCEDURE Xoa_ChiTietDonBan
    @MaDonBan INT
AS
BEGIN
    DELETE FROM ChiTietDonBan
    WHERE MaDonBan = @MaDonBan;

    -- Trả về 1 nếu xóa thành công, 0 nếu không thành công
    SELECT @@ROWCOUNT;
END;
--========================================GIO HANG
GO

CREATE PROCEDURE Get_GioHang_ByTaiKhoan
    @TaiKhoan NVARCHAR(50)
AS
BEGIN

    SELECT tc.maThuCung,gh.soLuong,l.tenLoai,tc.giaBan,tc.anh,tc.tenThuCung FROM GioHang gh inner join ThuCung tc on gh.maThuCung=tc.maThuCung inner join Loai  l on tc.maLoai=l.maLoai
    WHERE gh.taiKhoan = @TaiKhoan;
END;
GO
CREATE PROCEDURE Them_GioHang
    @TaiKhoan NVARCHAR(50),
    @MaThuCung INT,
    @SoLuong INT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM GioHang WHERE taiKhoan = @TaiKhoan AND maThuCung = @MaThuCung)
    BEGIN
        -- Nếu mục đã tồn tại, tăng số lượng
        UPDATE GioHang
        SET soLuong = soLuong + @SoLuong
        WHERE taiKhoan = @TaiKhoan AND maThuCung = @MaThuCung;
    END
    ELSE
    BEGIN
        -- Nếu mục chưa tồn tại, thêm mới
        INSERT INTO GioHang (taiKhoan, maThuCung, soLuong)
        VALUES (@TaiKhoan, @MaThuCung, @SoLuong);
    END
END;
GO

CREATE PROCEDURE Xoa_GioHang
    @TaiKhoan NVARCHAR(50),
    @MaThuCung INT
AS
BEGIN
   SET NOCOUNT ON;

    -- No need to check for constraints as this is a transient table

    -- Attempt to delete
    DELETE FROM GioHang
    WHERE taiKhoan = @TaiKhoan AND maThuCung = @MaThuCung;
    
    IF @@ROWCOUNT > 0
        SELECT 1; -- Deletion successful
    ELSE
        SELECT 0; 
END;
GO

CREATE PROCEDURE Sua_GioHang
    @TaiKhoan NVARCHAR(50),
    @MaThuCung INT,
    @Action INT -- 0 là tăng, 1 là giảm
AS
BEGIN
    IF @Action = 0
    BEGIN
        -- Tăng số lượng lên 1
        UPDATE GioHang
        SET soLuong = soLuong + 1
        WHERE taiKhoan = @TaiKhoan AND maThuCung = @MaThuCung;
    END
    ELSE IF @Action = 1
    BEGIN
        -- Giảm số lượng xuống 1, nhưng không giảm dưới 1
        UPDATE GioHang
        SET soLuong = CASE 
                        WHEN soLuong > 1 THEN soLuong - 1 
                        ELSE soLuong 
                      END
        WHERE taiKhoan = @TaiKhoan AND maThuCung = @MaThuCung;
    END
END;
go
CREATE PROCEDURE Sua_GioHang_u
    @TaiKhoan NVARCHAR(50),
    @MaThuCung INT,
    @SoLuong int
AS
BEGIN
        UPDATE GioHang
        SET soLuong =@SoLuong
        WHERE taiKhoan = @TaiKhoan AND maThuCung = @MaThuCung;
END;
go

--===================================================================	 DATA ========================================
-- Thêm dữ liệu vào bảng TaiKhoan
INSERT INTO TaiKhoan (taiKhoan, matKhau, vaiTro) VALUES
('admin', 'admin123', 0),
('nv001', 'nv001123', 1),
('nv002', 'nv002123', 1),
('nv003', 'nv003123', 1),
('nv004', 'nv004123', 1),
('kh001', 'kh001123', 2),
('kh002', 'kh002123', 2),
('kh003', 'kh003123', 2),
('kh004', 'kh004123', 2),
('kh005', 'kh005123', 2);

-- Thêm dữ liệu vào bảng KhachHang
INSERT INTO KhachHang (taiKhoan, tenKhachHang, diaChi_KH, soDienThoai_KH) VALUES
('kh001', N'Nguyễn Văn A', N'123 Đường ABC, Quận 1, TP.HCM', '0901234567'),
('kh002', N'Trần Thị B', N'456 Đường XYZ, Quận 2, TP.HCM', '0912345678'),
('kh003', N'Lê Văn C', N'789 Đường DEF, Quận 3, TP.HCM', '0923456789'),
('kh004', N'Phạm Thị D', N'101 Đường GHI, Quận 4, TP.HCM', '0934567890'),
('kh005', N'Hoàng Văn E', N'202 Đường JKL, Quận 5, TP.HCM', '0945678901'),
(NULL, N'Đỗ Thị F', N'303 Đường MNO, Quận 6, TP.HCM', '0956789012'),
(NULL, N'Ngô Văn G', N'404 Đường PQR, Quận 7, TP.HCM', '0967890123'),
(NULL, N'Vũ Thị H', N'505 Đường STU, Quận 8, TP.HCM', '0978901234'),
(NULL, N'Đặng Văn I', N'606 Đường VWX, Quận 9, TP.HCM', '0989012345'),
(NULL, N'Bùi Thị K', N'707 Đường YZA, Quận 10, TP.HCM', '0990123456');

-- Thêm dữ liệu vào bảng NhanVien
INSERT INTO NhanVien (taiKhoan, tenNhanVien, diaChi, soDienThoai, chucVu, anhThe) VALUES
('admin', N'Admin', N'Địa chỉ công ty', '0987654321', N'Quản lý', 'admin.jpg'),
('nv001', N'Nguyễn Thị L', N'808 Đường BCD, Quận 11, TP.HCM', '0901112233', N'Nhân viên bán hàng', 'nv001.jpg'),
('nv002', N'Trần Văn M', N'909 Đường EFG, Quận 12, TP.HCM', '0912223344', N'Nhân viên kho', 'nv002.jpg'),
('nv003', N'Lê Thị N', N'111 Đường HIJ, Quận Bình Thạnh, TP.HCM', '0923334455', N'Nhân viên bán hàng', 'nv003.jpg'),
('nv004', N'Phạm Văn O', N'222 Đường KLM, Quận Tân Bình, TP.HCM', '0934445566', N'Nhân viên kho', 'nv004.jpg'),
(NULL, N'Hoàng Thị P', N'333 Đường NOP, Quận Phú Nhuận, TP.HCM', '0945556677', N'Nhân viên bán hàng', 'nv005.jpg'),
(NULL, N'Đỗ Văn Q', N'444 Đường QRS, Quận Gò Vấp, TP.HCM', '0956667788', N'Nhân viên kho', 'nv006.jpg'),
(NULL, N'Ngô Thị R', N'555 Đường TUV, Quận Bình Tân, TP.HCM', '0967778899', N'Nhân viên bán hàng', 'nv007.jpg'),
(NULL, N'Vũ Văn S', N'666 Đường WXY, Quận Tân Phú, TP.HCM', '0978889900', N'Nhân viên kho', 'nv008.jpg'),
(NULL, N'Đặng Thị T', N'777 Đường ZAB, Quận Thủ Đức, TP.HCM', '0989990011', N'Nhân viên bán hàng', 'nv009.jpg');

-- Thêm dữ liệu vào bảng NhaCungCap
INSERT INTO NhaCungCap (tenNhaCungCap, soDienThoai, diaChi) VALUES
(N'Công ty TNHH Thú Cưng A', '0123456789', N'123 Đường Supplier, Quận 1, TP.HCM'),
(N'Công ty TNHH Thú Cưng B', '0234567890', N'456 Đường Vendor, Quận 2, TP.HCM'),
(N'Công ty TNHH Thú Cưng C', '0345678901', N'789 Đường Provider, Quận 3, TP.HCM'),
(N'Công ty TNHH Thú Cưng D', '0456789012', N'101 Đường Distributor, Quận 4, TP.HCM'),
(N'Công ty TNHH Thú Cưng E', '0567890123', N'202 Đường Wholesaler, Quận 5, TP.HCM'),
(N'Công ty TNHH Thú Cưng F', '0678901234', N'303 Đường Importer, Quận 6, TP.HCM'),
(N'Công ty TNHH Thú Cưng G', '0789012345', N'404 Đường Exporter, Quận 7, TP.HCM'),
(N'Công ty TNHH Thú Cưng H', '0890123456', N'505 Đường Manufacturer, Quận 8, TP.HCM'),
(N'Công ty TNHH Thú Cưng I', '0901234567', N'606 Đường Producer, Quận 9, TP.HCM'),
(N'Công ty TNHH Thú Cưng J', '0012345678', N'707 Đường Breeder, Quận 10, TP.HCM');

-- Thêm dữ liệu vào bảng Loai
INSERT INTO Loai (tenLoai) VALUES
(N'Chó'),
(N'Mèo'),
(N'Cá'),
(N'Chim'),
(N'Thỏ'),
(N'Chuột Hamster'),
(N'Rùa'),
(N'Rắn'),
(N'Iguana'),
(N'Nhím');

-- Thêm dữ liệu vào bảng ThuCung
INSERT INTO ThuCung (tenThuCung, maLoai, soLuong, giaNhap, giaBan, anh, moTa) VALUES
(N'Chó Corgi', 1, 5, 5000000, 7000000, NULL, N'Chó Corgi đáng yêu, thông minh'),
(N'Mèo Anh lông ngắn', 2, 3, 4000000, 6000000, NULL, N'Mèo Anh lông ngắn quý phái'),
(N'Cá Koi', 3, 10, 500000, 800000, NULL, N'Cá Koi đẹp, mang lại may mắn'),
(N'Vẹt xám châu Phi', 4, 2, 10000000, 15000000, NULL, N'Vẹt xám thông minh, biết nói'),
(N'Thỏ Angora', 5, 4, 1000000, 1500000, NULL, N'Thỏ Angora lông mềm mịn'),
(N'Chuột Hamster Bear', 6, 8, 200000, 350000, NULL, N'Chuột Hamster Bear nhỏ nhắn'),
(N'Rùa Sulcata', 7, 3, 3000000, 4500000, NULL, N'Rùa Sulcata sống lâu'),
(N'Rắn Python', 8, 2, 5000000, 7500000, NULL, N'Rắn Python đẹp, dễ nuôi'),
(N'Iguana xanh', 9, 3, 2000000, 3000000, NULL, N'Iguana xanh độc đáo'),
(N'Nhím Pygmy', 10, 5, 1500000, 2500000, NULL, N'Nhím Pygmy dễ thương');

-- Thêm dữ liệu vào bảng GioHang
INSERT INTO GioHang (taiKhoan, maThuCung, soLuong) VALUES
('kh001', 1, 1),
('kh001', 3, 2),
('kh002', 2, 1),
('kh002', 5, 1),
('kh003', 4, 1),
('kh003', 6, 3),
('kh004', 7, 1),
('kh004', 9, 1),
('kh005', 8, 1),
('kh005', 10, 2);

-- Thêm dữ liệu vào bảng DonNhap
INSERT INTO DonNhap (ngayNhap, maNhaCungCap, maNhanVien, tongTien, trangThai) VALUES
('2023-01-15', 1, 2, 50000000, N'Đã nhập'),
('2023-02-20', 2, 3, 40000000, N'Đã nhập'),
('2023-03-25', 3, 4, 30000000, N'Đã nhập'),
('2023-04-30', 4, 5, 60000000, N'Đã nhập'),
('2023-05-05', 5, 2, 35000000, N'Đã nhập'),
('2023-06-10', 6, 3, 45000000, N'Đã nhập'),
('2023-07-15', 7, 4, 55000000, N'Đã nhập'),
('2023-08-20', 8, 5, 25000000, N'Đã nhập'),
('2023-09-25', 9, 2, 70000000, N'Đã nhập'),
('2023-10-30', 10, 3, 40000000, N'Đã nhập');

-- Thêm dữ liệu vào bảng ChiTietDonNhap
INSERT INTO ChiTietDonNhap (maDonNhap, maThuCung, soLuong, giaNhap) VALUES
(1, 1, 5, 5000000),
(1, 2, 3, 4000000),
(2, 3, 10, 500000),
(2, 4, 2, 10000000),
(3, 5, 4, 1000000),
(3, 6, 8, 200000),
(4, 7, 3, 3000000),
(4, 8, 2, 5000000),
(5, 9, 3, 2000000),
(5, 10, 5, 1500000);

-- Thêm dữ liệu vào bảng DonBan
INSERT INTO DonBan (ngayBan, maNhanVien, maKhachHang, tongTien, trangThai) VALUES
('2023-11-01', 2, 1, 7800000, N'Đã giao'),
('2023-11-02', 3, 2, 7500000, N'Đã giao'),
('2023-11-03', 4, 3, 16050000, N'Đã giao'),
('2023-11-04', 5, 4, 7500000, N'Đã giao'),
('2023-11-05', 2, 5, 12500000, N'Đã giao'),
('2023-11-06', 3, 1, 6000000, N'Đã giao'),
('2023-11-07', 4, 2, 4500000, N'Đã giao'),
('2023-11-08', 5, 3, 15000000, N'Đã giao'),
('2023-11-09', 2, 4, 3000000, N'Đã giao'),
('2023-11-10', 3, 5, 7500000, N'Đã giao');

-- Thêm dữ liệu vào bảng ChiTietDonBan
INSERT INTO ChiTietDonBan (maDonBan, maThuCung, soLuong, giaBan) VALUES
(1, 1, 1, 7000000),
(1, 3, 1, 800000),
(2, 2, 1, 6000000),
(2, 5, 1, 1500000),
(3, 4, 1, 15000000),
(3, 6, 3, 350000),
(4, 7, 1, 4500000),
(4, 9, 1, 3000000),
(5, 8, 1, 7500000),
(5, 10, 2, 2500000);


go 
create proc	Get_NV_TaiKhoan	
	@TaiKhoan nvarchar(50)
as
	BEGIN 
		SELECT *FROM NhanVien WHERE taiKhoan=@TaiKhoan;
	END

GO
CREATE PROCEDURE Get_KH_TaiKhoan
	@TaiKhoan nvarchar(50)
AS
	BEGIN 
		SELECT * FROM KhachHang WHERE taiKhoan=@TaiKhoan;
	END
GO
CREATE PROC Get_SP_MaLoai
	@MaLoai int
	AS
	BEGIN 
		SELECT top 5 * FROM ThuCung WHERE maLoai=@MaLoai;
	END
go


CREATE PROCEDURE Get_Top5_Loai
AS
BEGIN
    SELECT TOP 5 
        l.maLoai,
        l.tenLoai,
        COUNT(p.maThuCung) AS SoLuongSanPham
    FROM 
        Loai l
    JOIN 
        ThuCung p ON l.MaLoai = p.MaLoai
    GROUP BY 
        l.MaLoai, l.TenLoai
    ORDER BY 
        SoLuongSanPham DESC;
END;
GO
CREATE PROCEDURE Get_Top10_Loai
AS
BEGIN
    SELECT TOP 14
        l.maLoai,
        l.tenLoai,
        COUNT(p.maThuCung) AS SoLuongSanPham
    FROM 
        Loai l
    JOIN 
        ThuCung p ON l.MaLoai = p.MaLoai
    GROUP BY 
        l.MaLoai, l.TenLoai
    ORDER BY 
        SoLuongSanPham DESC;
END;
GO
CREATE PROCEDURE Get_Top5_SP
AS
BEGIN
    SELECT TOP 5
        t.maThuCung,
        t.tenThuCung,
        t.maLoai,
        t.soLuong,
        t.giaNhap,
        t.giaBan,
        t.anh,
        t.moTa,
        COUNT(ct.maThuCung) AS SoLuongSanPham
    FROM 
        ThuCung t
    JOIN 
        ChiTietDonBan ct ON t.maThuCung = ct.maThuCung
    GROUP BY 
        t.maThuCung,
        t.tenThuCung,
        t.maLoai,
        t.soLuong,
        t.giaNhap,
        t.giaBan,
        t.anh,
        t.moTa
    ORDER BY 
        SoLuongSanPham DESC;
END;
GO


create proc get_gh_tk_id
	@taiKhoan nvarchar(50),
	@maThuCung int 
	as
	BEGIN 
		SELECT*FROM GioHang WHERE taiKhoan=@taiKhoan and maThuCung=@maThuCung
		END
		GO
	
CREATE PROC DELETE_GH_TK
	@TaiKhoan nvarchar(50)
	AS BEGIN
		DELETE FROM GioHang WHERE taiKhoan=@TaiKhoan;
		IF @@ROWCOUNT > 0
        SELECT 1; 
    ELSE
        SELECT 0;
		END
		GO
	CREATE PROC GetAllTk 
	AS
	BEGIN
		SELECT*FROM TaiKhoan
	END
	GO
	CREATE  PROC GetAllByTk
		@TaiKhoan nvarchar(50)
		AS 
			BEGIN	
				SELECT *FROM TaiKhoan WHERE taiKhoan=@TaiKhoan
			END
	GO
	CREATE PROC DELETE_TK
		@TaiKhoan nvarchar(50) 
		AS
			BEGIN 
				DELETE FROM TaiKhoan WHERE taiKhoan=@TaiKhoan
			END

			go

CREATE PROCEDURE Search_DonBan
    @TrangThai NVARCHAR(50) = NULL,
    @TenKhachHang NVARCHAR(50) = NULL,
    @NgayBan DATE = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        db.maDonBan,
        db.ngayBan,
        db.maNhanVien,
        db.maKhachHang,
        db.tongTien,
        db.trangThai,
        nv.tenNhanVien,
        kh.tenKhachHang,
        kh.soDienThoai_KH,
        kh.diaChi_KH 
    FROM 
        DonBan db 
        LEFT JOIN NhanVien nv ON db.maNhanVien = nv.maNhanVien 
        INNER JOIN KhachHang kh ON db.maKhachHang = kh.maKhachHang
    WHERE 
        (@TrangThai IS NULL OR db.trangThai LIKE N'%' + @TrangThai + N'%')
        AND (@TenKhachHang IS NULL OR kh.tenKhachHang LIKE N'%' + @TenKhachHang + N'%')
        AND (@NgayBan IS NULL OR CAST(db.ngayBan AS DATE) = @NgayBan)
    ORDER BY 
        db.ngayBan DESC
END



GO
CREATE PROCEDURE ThongKeDoanhThu
AS
BEGIN
    -- Tổng tiền nhập
    DECLARE @TongTienNhap DECIMAL(18, 2);
    SELECT 
        @TongTienNhap = SUM(cdn.soLuong * cdn.giaNhap)
    FROM ChiTietDonNhap cdn
    INNER JOIN DonNhap dn ON cdn.maDonNhap = dn.maDonNhap
    WHERE dn.trangThai = N'Đã nhập'; -- Chỉ tính đơn nhập đã hoàn tất

    -- Tổng tiền bán
    DECLARE @TongTienBan DECIMAL(18, 2);
    SELECT 
        @TongTienBan = SUM(cdb.soLuong * cdb.giaBan)
    FROM ChiTietDonBan cdb
    INNER JOIN DonBan db ON cdb.maDonBan = db.maDonBan
    WHERE db.trangThai = N'Đã giao hàng'; -- Chỉ tính đơn bán đã hoàn tất

    -- Doanh thu = Tổng tiền bán - Tổng tiền nhập
    DECLARE @DoanhThu DECIMAL(18, 2);
    SET @DoanhThu = @TongTienBan - @TongTienNhap;

    -- Kết quả trả về
    SELECT 
        @TongTienNhap AS TongTienNhap,
        @TongTienBan AS TongTienBan,
        @DoanhThu AS DoanhThu,
        CASE 
            WHEN @TongTienNhap = 0 THEN 0 -- Tránh chia cho 0
            ELSE (@DoanhThu * 100.0 / @TongTienNhap) 
        END AS LaiXuat; -- Lãi xuất tính theo phần trăm
END;
GO
EXEC ThongKeDoanhThu


GO

CREATE PROCEDURE ThongKeDoanhThu_ThangHienTai
AS
BEGIN
    -- Tổng tiền nhập trong tháng hiện tại
    DECLARE @TongTienNhap DECIMAL(18, 2);
    SELECT 
        @TongTienNhap = SUM(cdn.soLuong * cdn.giaNhap)
    FROM ChiTietDonNhap cdn
    INNER JOIN DonNhap dn ON cdn.maDonNhap = dn.maDonNhap
    WHERE dn.trangThai = N'Đã nhập'
      AND MONTH(dn.ngayNhap) = MONTH(GETDATE())
      AND YEAR(dn.ngayNhap) = YEAR(GETDATE()); -- Lọc tháng và năm hiện tại

    -- Tổng tiền bán trong tháng hiện tại
    DECLARE @TongTienBan DECIMAL(18, 2);
    SELECT 
        @TongTienBan = SUM(cdb.soLuong * cdb.giaBan)
    FROM ChiTietDonBan cdb
    INNER JOIN DonBan db ON cdb.maDonBan = db.maDonBan
    WHERE db.trangThai = N'Đã giao hàng'
      AND MONTH(db.ngayBan) = MONTH(GETDATE())
      AND YEAR(db.ngayBan) = YEAR(GETDATE()); -- Lọc tháng và năm hiện tại

    -- Doanh thu = Tổng tiền bán - Tổng tiền nhập
    DECLARE @DoanhThu DECIMAL(18, 2);
    SET @DoanhThu = @TongTienBan - @TongTienNhap;

    -- Kết quả trả về
    SELECT 
        ISNULL(@TongTienNhap, 0) AS TongTienNhap,
        ISNULL(@TongTienBan, 0) AS TongTienBan,
        ISNULL(@DoanhThu, 0) AS DoanhThu,
        CASE 
            WHEN ISNULL(@TongTienNhap, 0) = 0 THEN 0 -- Tránh chia cho 0
            ELSE (@DoanhThu * 100.0 / @TongTienNhap) 
        END AS LaiXuat; -- Lãi suất tính theo phần trăm
END;
GO


EXEC ThongKeDoanhThu_ThangHienTai

select *from DonBan


go

--==========================================TÌM KIẾM 
-- 1. Search KhachHang
CREATE PROCEDURE SearchKhachHang
    @TenKhachHang NVARCHAR(100) = NULL,
    @SoDienThoai VARCHAR(20) = NULL
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX)
    SET @SQL = 'SELECT * FROM KhachHang WHERE 1=1'
    
    IF @TenKhachHang IS NOT NULL
        SET @SQL = @SQL + ' AND tenKhachHang LIKE ''%'' + @TenKhachHang + ''%'''
    IF @SoDienThoai IS NOT NULL
        SET @SQL = @SQL + ' AND soDienThoai_KH LIKE ''%'' + @SoDienThoai + ''%'''
    
    EXEC sp_executesql @SQL, N'@TenKhachHang NVARCHAR(100), @SoDienThoai VARCHAR(20)', 
                       @TenKhachHang, @SoDienThoai
END
GO

-- 2. Search NhanVien

CREATE PROCEDURE SearchNhanVien
    @TenNhanVien NVARCHAR(100) = NULL,
    @ChucVu NVARCHAR(50) = NULL
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX)
    SET @SQL = 'SELECT * FROM NhanVien WHERE 1=1'
    
    IF @TenNhanVien IS NOT NULL
        SET @SQL = @SQL + ' AND tenNhanVien LIKE N''%'' + @TenNhanVien + ''%'''
    IF @ChucVu IS NOT NULL
        SET @SQL = @SQL + ' AND chucVu LIKE ''%'' + @ChucVu + ''%'''
    
    EXEC sp_executesql @SQL, N'@TenNhanVien NVARCHAR(100), @ChucVu NVARCHAR(50)', 
                       @TenNhanVien, @ChucVu
END
GO

-- 3. Search NhaCungCap
CREATE PROCEDURE SearchNhaCungCap
    @TenNhaCungCap NVARCHAR(100) = NULL,
    @SoDienThoai VARCHAR(20) = NULL
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX)
    SET @SQL = 'SELECT * FROM NhaCungCap WHERE 1=1'
    
    IF @TenNhaCungCap IS NOT NULL
        SET @SQL = @SQL + ' AND tenNhaCungCap LIKE ''%'' + @TenNhaCungCap + ''%'''
    IF @SoDienThoai IS NOT NULL
        SET @SQL = @SQL + ' AND soDienThoai LIKE ''%'' + @SoDienThoai + ''%'''
    
    EXEC sp_executesql @SQL, N'@TenNhaCungCap NVARCHAR(100), @SoDienThoai VARCHAR(20)', 
                       @TenNhaCungCap, @SoDienThoai
END
GO

-- 4. Search ThuCung
CREATE PROCEDURE SearchThuCung
    @TenThuCung NVARCHAR(100) = NULL,
    @MaLoai INT = NULL,
    @GiaBanMin DECIMAL(18, 2) = NULL,
    @GiaBanMax DECIMAL(18, 2) = NULL
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX)
    SET @SQL = 'SELECT t.*, l.tenLoai FROM ThuCung t JOIN Loai l ON t.maLoai = l.maLoai WHERE 1=1'
    
    IF @TenThuCung IS NOT NULL
        SET @SQL = @SQL + ' AND t.tenThuCung LIKE ''%'' + @TenThuCung + ''%'''
    IF @MaLoai IS NOT NULL
        SET @SQL = @SQL + ' AND t.maLoai = @MaLoai'
    IF @GiaBanMin IS NOT NULL
        SET @SQL = @SQL + ' AND t.giaBan >= @GiaBanMin'
    IF @GiaBanMax IS NOT NULL
        SET @SQL = @SQL + ' AND t.giaBan <= @GiaBanMax'
    
    EXEC sp_executesql @SQL, N'@TenThuCung NVARCHAR(100), @MaLoai INT, @GiaBanMin DECIMAL(18, 2), @GiaBanMax DECIMAL(18, 2)', 
                       @TenThuCung, @MaLoai, @GiaBanMin, @GiaBanMax
END
GO

-- 5. Search DonNhap

CREATE PROCEDURE SearchDonNhap
    @NgayNhapStart DATE = NULL,
    @NgayNhapEnd DATE = NULL,
    @MaNhaCungCap INT = NULL,
    @TrangThai NVARCHAR(50) = NULL
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX)
    SET @SQL = 'SELECT dn.*, ncc.tenNhaCungCap, nv.tenNhanVien ,ncc.soDienThoai,ncc.diaChi
                FROM DonNhap dn 
                JOIN NhaCungCap ncc ON dn.maNhaCungCap = ncc.MaNhaCungCap 
                LEFT JOIN NhanVien nv ON dn.maNhanVien = nv.maNhanVien 
                WHERE 1=1'
    
    IF @NgayNhapStart IS NOT NULL
        SET @SQL = @SQL + ' AND dn.ngayNhap >= @NgayNhapStart'
    IF @NgayNhapEnd IS NOT NULL
        SET @SQL = @SQL + ' AND dn.ngayNhap <= @NgayNhapEnd'
    IF @MaNhaCungCap IS NOT NULL
        SET @SQL = @SQL + ' AND dn.maNhaCungCap = @MaNhaCungCap'
    IF @TrangThai IS NOT NULL
        SET @SQL = @SQL + ' AND dn.trangThai = @TrangThai'
    
    EXEC sp_executesql @SQL, N'@NgayNhapStart DATE, @NgayNhapEnd DATE, @MaNhaCungCap INT, @TrangThai NVARCHAR(50)', 
                       @NgayNhapStart, @NgayNhapEnd, @MaNhaCungCap, @TrangThai
END
GO
-- 6. Search DonBan
CREATE PROCEDURE SearchDonBan
    @NgayBanStart DATE = NULL,
    @NgayBanEnd DATE = NULL,
    @TenKhachHang NVARCHAR(50) = NULL,
    @TrangThai NVARCHAR(50) = NULL
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX)
    SET @SQL = 'SELECT db.*, kh.tenKhachHang, nv.tenNhanVien,kh.diaChi_KH,kh.soDienThoai_KH 
                FROM DonBan db 
                JOIN KhachHang kh ON db.maKhachHang = kh.maKhachHang 
                LEFT JOIN NhanVien nv ON db.maNhanVien = nv.maNhanVien 
                WHERE 1=1'
    IF @NgayBanStart IS NOT NULL
        SET @SQL = @SQL + ' AND db.ngayBan >= @NgayBanStart'
    IF @NgayBanEnd IS NOT NULL
        SET @SQL = @SQL + ' AND db.ngayBan <= @NgayBanEnd'
    IF @TenKhachHang IS NOT NULL
		SET @SQL = @SQL + ' AND kh.tenKhachHang LIKE N''%'' + @TenKhachHang + ''%'''
    IF @TrangThai IS NOT NULL
        SET @SQL = @SQL + ' AND db.trangThai = @TrangThai'
    
    EXEC sp_executesql @SQL, N'@NgayBanStart DATE, @NgayBanEnd DATE,@TenKhachHang NVARCHAR(50), @TrangThai NVARCHAR(50)', 
                       @NgayBanStart, @NgayBanEnd, @TenKhachHang, @TrangThai
END
GO

