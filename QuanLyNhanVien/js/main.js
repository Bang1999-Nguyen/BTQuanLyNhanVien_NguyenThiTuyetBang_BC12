var getEle = function(id) {
    return document.getElementById(id);
}

var validator = new Validator();
var DanhSachNhanVien = new danhSachNhanVien();

var resetForm = function() {
    document.getElementById("formNV").reset();
}

// Refresh Forms
var lamMoiForm = function() {
    getEle('msnv').value = '';
    getEle('name').value = '';
    getEle('email').value = '';
    getEle('password').value = '';
    getEle('datepicker').value = '';
    getEle('luongCoBan').value = '';
    getEle('chucvu').value = '';
    getEle('gioLam').value ='';
}
//End refresh forms

// Input validation
var kiemTraHopLe = function() {
    var maNV = getEle('msnv').value;
    var tenNV = getEle('name').value;
    var email = getEle('email').value;
    var matKhau = getEle('password').value;
    var ngaySinh = getEle('datepicker').value;
    var luongCoBan = getEle('luongCoBan').value;
    var chucVu = getEle('chucvu').value;
    var gioLam = getEle('gioLam').value;
    var isValid = true;
    isValid &= validator.kiemTraRong(maNV,'tbMaNV','(*) Mã nhân viên không được rỗng')
            && validator.kiemTraDoDaiKiTu(maNV,'tbMaNV','(*) Vui lòng nhập từ 4 - 6 ký số', 4, 6);
    isValid &= validator.kiemTraRong(tenNV, 'tbTen', '(*) Tên nhân viên không được rỗng')
        && validator.kiemTraChuoi(tenNV, 'tbTen', '(*) Tên nhân viên phải là chữ');
    isValid &= validator.kiemTraRong(email, 'tbEmail', '(*) Email không được rỗng')
        && validator.kiemTraEmail(email, 'tbEmail','(*) Email phải đúng định dạng');
    isValid &= validator.kiemTraRong(matKhau,'tbMatKhau', '(*) Mật khẩu không được rỗng')
            && validator.kiemTraMatKhau(matKhau, 'tbMatKhau', '(*) Mật khẩu chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt và phải chứa từ 6 -10 kí tự)');
    isValid &= validator.kiemTraRong(ngaySinh, 'tbNgay', '(*) Ngày làm không được rỗng')
            && validator.kiemTraNgayThang(ngaySinh,'tbNgay','Ngày làm định dạng mm/dd/yyyy');
    isValid &= validator.kiemTraRong(luongCoBan, 'tbluong', '(*) Vui lòng điền lương cơ bản') 
            && validator.kiemTraGiaTri(luongCoBan, 'tbluong', '(*) Vui lòng điền mức lương cơ bản từ 1000000 - 20000000', 1000000, 20000000);
    isValid &= validator.kiemTraChucVu(chucvu, 'tbChucVu', '(*) Vui lòng chọn chức vụ');
    isValid &= validator.kiemTraRong(gioLam, 'tbgioLam', '(*) Vui lòng điền số giờ làm việc')
            && validator.kiemTraGiaTri(gioLam, 'tbgioLam', '(*) Số giờ làm việc trong tháng từ 80 - 200 giờ', 80, 200);
    if(!isValid) return;
    return isValid;
}
// End Input Validation

// RenderTable
var renderTable = function(mangNV) {
    var content = '';
    mangNV.map(function(nv, index) {
        var Index = index;
        content += `
            <tr>
                <td>${nv.maNV}</td>
                <td>${nv.tenNV}</td>
                <td>${nv.email}</td>
                <td>${nv.ngaySinh}</td>
                <td>${nv.luongCoBan}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.gioLam}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.xepLoai}</td>
                <td>
                    <button class="btn btn-success" data-toggle="modal"
                    data-target="#myModal" onclick="capNhatNhanVien('${Index}')">Sửa</button>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${Index}')">Xóa</button>
                </td>
            </tr>
        `
    })
    getEle('tableDanhSach').innerHTML = content;
}
// End Render Table

// SetLocalStorage
function setLocalStorage() {
    localStorage.setItem('DanhSachNhanVien', JSON.stringify(DanhSachNhanVien.arr));
}
// GetLocalStorage
function getLocalStorage() {
    if(localStorage.getItem('DanhSachNhanVien')) {
        DanhSachNhanVien.arr = JSON.parse(localStorage.getItem('DanhSachNhanVien'));
        renderTable(DanhSachNhanVien.arr);
    }
}
getLocalStorage();

// Add Employee
getEle('btnThemNV').addEventListener('click', function() {
    var maNV = getEle('msnv').value;
    var tenNV = getEle('name').value;
    var email = getEle('email').value;
    var matKhau = getEle('password').value;
    var ngaySinh = getEle('datepicker').value;
    var luongCoBan = getEle('luongCoBan').value;
    var chucVu = getEle('chucvu').value;
    var gioLam = getEle('gioLam').value;
    var KTHopLe = kiemTraHopLe();
    if(KTHopLe){
    var nhanVien = new NhanVien(maNV, tenNV, email, matKhau, ngaySinh, luongCoBan, chucVu, gioLam, tongLuong, xepLoai);
    // Calculate Salary
    var tongLuong = nhanVien.tongLuong();
    // Classification
    var xepLoai = nhanVien.xepLoai();
    DanhSachNhanVien.themNhanVien(nhanVien);
    renderTable(DanhSachNhanVien.arr);
    setLocalStorage();
    resetForm();
    // Hide modal after successful update
    document.querySelector('#myModal #btnDong').click(); 
    }
})
// End Add Employee

// Press the enter to trigger the buttton add employee
var form = getEle('formNV');
form.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("btnThemNV").click();
    }
});
// End press the enter to trigger the button add employee

// Delete Employee
var xoaNhanVien = function(Index) {
    DanhSachNhanVien.xoaNhanVien(Index);
    renderTable(DanhSachNhanVien.arr);
    setLocalStorage();
}
//End Delete Employee

// Search Employee
getEle('searchName').addEventListener('keyup', function(){
    var mang = getLocalStorage();
    var chuoiTK = getEle('searchName').value;
    var mangTimKiem = DanhSachNhanVien.timNhanVien(mang, chuoiTK);
    renderTable(mangTimKiem);
})
//End Search Employee

// Fill data in form
var capNhatNhanVien = function(Index) {
    var nv = DanhSachNhanVien.arr[Index];
    nhanVienId = Index;
    getEle('msnv').value = nv.maNV;
    getEle('name').value = nv.tenNV;
    getEle('email').value = nv.email;
    getEle('password').value = nv.matKhau;
    getEle('datepicker').value = nv.ngaySinh;
    getEle('luongCoBan').value = nv.luongCoBan;
    getEle('chucvu').value = nv.chucVu;
    getEle('gioLam').value = nv.gioLam;
    // Resolve button update
    getEle('btnThemNV').style.display = 'none';
    getEle('btnCapNhat').style.display = 'block';
}
// End Fill data in form


// Resolve button add
getEle('btnThem').addEventListener('click', function() {
    resetForm();
    getEle('btnCapNhat').style.display = 'none';
    getEle('btnThemNV').style.display = 'block';
})
// End resolve button add

// Update data in form
getEle('btnCapNhat').addEventListener('click', function() {
    var maNV = getEle('msnv').value;
    var tenNV = getEle('name').value;
    var email = getEle('email').value;
    var matKhau = getEle('password').value;
    var ngaySinh = getEle('datepicker').value;
    var luongCoBan = getEle('luongCoBan').value;
    var chucVu = getEle('chucvu').value;
    var gioLam = getEle('gioLam').value;
    var KTHopLe = kiemTraHopLe();
    if(KTHopLe){
    var nhanVien = new NhanVien(maNV, tenNV, email, matKhau, ngaySinh, luongCoBan, chucVu, gioLam, tongLuong, xepLoai);
    // Calculate Salary
    var tongLuong = nhanVien.tongLuong();
    // Classification
    var xepLoai = nhanVien.xepLoai();
    DanhSachNhanVien.arr[nhanVienId] = {maNV, tenNV, email, matKhau, ngaySinh, luongCoBan, chucVu, gioLam, nhanVien, tongLuong, xepLoai};
    resetForm();
    renderTable(DanhSachNhanVien.arr);
    setLocalStorage();
     // Hide modal after successful update
     document.querySelector('#myModal #btnDong').click(); 
    }
})
// End update data in form