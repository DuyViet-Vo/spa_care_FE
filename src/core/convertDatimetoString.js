function chuyenDoiDinhDangThoiGian(ngayGoc) {
    const ngay = new Date(ngayGoc);
    
    const nam = ngay.getFullYear();
    const thang = String(ngay.getMonth() + 1).padStart(2, '0');
    const ngayThang = String(ngay.getDate()).padStart(2, '0');
    
    const gio = String(ngay.getHours()).padStart(2, '0');
    const phut = String(ngay.getMinutes()).padStart(2, '0');
    
    const dinhDangMoi = `${nam}-${thang}-${ngayThang} ${gio}:${phut}`;
    
    return dinhDangMoi;
  }

  export { chuyenDoiDinhDangThoiGian };