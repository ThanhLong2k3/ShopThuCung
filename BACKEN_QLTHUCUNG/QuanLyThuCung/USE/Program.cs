using BLL;
using BLL.Interface;
using DAL;
using DAL.Interface;
using DTO;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
{
    builder.WithOrigins("*")
           .AllowAnyMethod()
           .AllowAnyHeader();

}));
// Add services to the container.
builder.Services.AddTransient<IDatabaseHelper, DatabaseHelper>();
builder.Services.AddTransient<ILoaiThuCungRepository, LoaiThuCungRepository>();
builder.Services.AddTransient<ILoai_BLL, QL_LoaiThuCung_BLL>();
builder.Services.AddTransient<IThuCungRepository, ThuCungRepository>();
builder.Services.AddTransient<IThuCung_BLL, ThuCung_BLL>();
builder.Services.AddTransient<INhaCungCapRepository, NhaCungCapRepository>();
builder.Services.AddTransient<IBLL<NhaCungCap_DTO>, NhaCungCap_BLL>();
builder.Services.AddTransient<INhanVienRepository, NhanVienRepository>();
builder.Services.AddTransient<INhanVien_BLL, NhanVien_BLL>();
builder.Services.AddTransient<IKhachHangRepository, KhachHangRepository>();
builder.Services.AddTransient<IKhachHang_BLL, KhachHang_BLL>();
builder.Services.AddTransient<IDonNhapRepository, DonNhapRepository>();
builder.Services.AddTransient<IDonNhap_BLL, DonNhap_BLL>();
builder.Services.AddTransient<IDonBanRepository, DonBanRepository>();
builder.Services.AddTransient<IDonBan_BLL, DonBan_BLL>();
builder.Services.AddTransient<IChiTietDonNhapRepository, ChiTietDonNhapRepository>();
builder.Services.AddTransient<ICTDonNhap_BLL, ChiTietDonNhap_BLL>();
builder.Services.AddTransient<IChiTietDonBanRepository, ChiTietDonBanRepository>();
builder.Services.AddTransient<IBLL<ChiTietDonBan_DTO>, ChiTietDonBan_BLL>();
builder.Services.AddTransient<ITaiKhoanRepository, TaiKhoanRepository>();
builder.Services.AddTransient<ITaiKhoanBLL, TaiKhoan_BLL>();
builder.Services.AddTransient<IGioHangRepository, GioHangRepository>();
builder.Services.AddTransient<IGioHang_BLL, GioHang_BLL>();



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("MyPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
