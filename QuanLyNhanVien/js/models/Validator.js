function Validator() {
    this.kiemTraRong = function(value, spanId, mess) {
        if(!value) {
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }
        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = '';
        return true;
    }
    this.kiemTraDoDaiKiTu = function(value, spanId, mess, min, max) {
        if(value.length >= min && value.length <= max){
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraChuoi = function(value, spanId, mess) {
        var letter = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
        if(letter.test(value)) {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraEmail = function(value, spanId, mess){
        var email = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if(email.test(value)) {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraMatKhau = function(value, spanId, mess,) {
        var password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
        if(value.match(password)) {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraNgayThang = function(value, spanId, mess) {
        var dateRegex =/^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
        if(value.match(dateRegex)){
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraChucVu = function(value, spanId, mess) {
        if(value.selectedIndex === 0){
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }
        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = '';
        return true;

    }
    this.kiemTraGiaTri = function(value, spanId, mess, min, max) {
        if(value >= min && value <= max){
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
}