function danhSachNhanVien() {
    this.arr = [];
    this.themNhanVien = function(nhanVien) {
        this.arr.push(nhanVien);
    }
    this.xoaNhanVien = function(index) {
        DanhSachNhanVien.arr.splice(index, 1);
    }
    this.timNhanVien = function(dsnv, chuoiTK){
        return DanhSachNhanVien.arr.filter(function(nv){
            return nv.xepLoai.toLowerCase().indexOf(chuoiTK.toLowerCase()) !== -1;
        })
    }
}