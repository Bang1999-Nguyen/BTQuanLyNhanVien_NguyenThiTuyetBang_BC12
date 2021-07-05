function NhanVien(maNV, tenNV, email, matKhau, ngaySinh, luongCoBan, chucvu, giolam, tongLuong, xepLoai) {
    this.maNV = maNV,
    this.tenNV = tenNV,
    this.email = email,
    this.matKhau = matKhau;
    this.ngaySinh = ngaySinh, 
    this.luongCoBan = luongCoBan,
    this.chucVu = chucvu,
    this.gioLam = giolam;
}
NhanVien.prototype.tongLuong = function() {
    if(this.chucVu === 'Sếp') {
        return this.tongLuong = this.luongCoBan * 3;
    }
    if(this.chucVu === 'Trưởng phòng') {
        return this.tongLuong = this.luongCoBan * 2;
    }
    if(this.chucVu === 'Nhân viên') {
        return this.tongLuong = this.luongCoBan * 1;
    }
};
NhanVien.prototype.xepLoai = function() {
    if(this.gioLam >= 192) {
        return this.xepLoai = 'Xuất sắc';
    }
    if(this.gioLam < 192 && this.gioLam >= 176){
        return this.xepLoai = 'Giỏi';
    }
    if(this.gioLam < 176 && this.gioLam >= 160){
        return this.xepLoai = 'Khá';
    }
    if(this.gioLam < 160){
        return this.xepLoai = 'Trung bình';
    }
}