var callApi = new CallApi();
var validation = new Validation();

function getEle(id) {
    return document.getElementById(id);
}

function getListEmployee() {
    callApi
        .layDanhSachNhanVien()
        .then(function (result) {
            renderEm(result.data)
        })
        .catch(function (error) {
            console.error(error);
        });
}
getListEmployee();

function handleDelete(id) {
    callApi.xoaNhanVien(id)
        .then(function (result) {
            getListEmployee();
        })
        .catch(function (error) {
            console.error(error);
        });
}
function handleEdit(id) {
    getEle("add").innerHTML = `<button class="btn btn-success" onclick="handleUpdate(${id})">Cập nhật</button>`;
    callApi.layThongTinNhanVien(id)
        .then(function (result) {
            var nv = result.data;
            getEle("maNhanVien").disabled = true;
            getEle("maNhanVien").value = nv.maNhanVien;
            getEle("tenNhanVien").value = nv.tenNhanVien;
            getEle("chucVu").value = nv.chucVu;
            getEle("heSoChucVu").value = nv.heSoChucVu;
            getEle("luongCoBan").value = nv.luongCoBan;
            getEle("soGioLamTrongThang").value = nv.soGioLamTrongThang;
        })
        .catch(function (error) {
            console.error(error);
        });
}
function handleUpdate(id) {
    var tenNhanVien = getEle("tenNhanVien").value;
    var chucVu = getEle("chucVu").value;
    var heSoChucVu = getEle("heSoChucVu").value;
    var luongCoBan = getEle("luongCoBan").value;
    var soGioLamTrongThang = getEle("soGioLamTrongThang").value;
    var isValid = true;
    isValid &=
        validation.kiemTraRong(tenNhanVien, "notiName", "(*) Vui lòng nhập tên") &&
        validation.kiemTraChuoiKyTu(tenNhanVien, "notiName", "Tên nhân viên phải là chữ");
    isValid &= validation.kiemTraChucVu(
        "chucVu",
        "notiPosition",
        "Yêu cầu chọn chức vụ"
    );
    isValid &= validation.kiemTraRong(heSoChucVu, "notiCoefficient", "(*) Vui lòng nhập hệ số lương");
    isValid &=
        validation.kiemTraRong(luongCoBan, "notiSalary", "(*) Vui lòng nhập lương") &&
        validation.kiemTraSo(
            luongCoBan,
            "notiSalary",
            "(*) Lương không hợp lệ",
            1000000,
            20000000
        );
    isValid &=
        validation.kiemTraRong(soGioLamTrongThang, "notiHours", "(*) Vui lòng nhập giờ") &&
        validation.kiemTraSo(soGioLamTrongThang, "notiHours", "(*) Giờ không hợp lệ", 50, 150);
    if (!isValid) return null;
    var nv = new employee(maNhanVien, tenNhanVien, chucVu, heSoChucVu, luongCoBan, soGioLamTrongThang);
    callApi
        .capNhatThongTinNhanVien(nv)
        .then(function () {
            getListEmployee();
        })
        .catch(function (error) {
            console.error(error);
        });
    getEle("button").innerHTML = "<button class='btn btn-success' onclick='handleAdd()'>Thêm nhân viên</button>";
    getEle("maNV").disabled = false;
    getEle("maNV").value = "";
    getEle("tenNV").value = "";
    getEle("chucVu").value = "Chọn chức vụ";
    getEle("heSo").value = "";
    getEle("luong").value = "";
    getEle("gio").value = "";
}
function handleAdd() {

    var maNhanVien = getEle("maNhanVien").value;
    var tenNhanVien = getEle("tenNhanVien").value;
    var chucVu = getEle("chucVu").value;
    var heSoChucVu = getEle("heSoChucVu").value;
    var luongCoBan = getEle("luongCoBan").value;
    var soGioLamTrongThang = getEle("soGioLamTrongThang").value;
    var isValid = true;
    isValid &=
        validation.kiemTraRong(maNhanVien, "notiID", "(*) Vui lòng nhập mã nhân viên") &&
        validation.kiemTraDoDaiKyTu(
            maNhanVien,
            "notiID",
            "Độ dài ký tự phải từ 4 đến 6",
            4,
            6
        );
    // validation.kiemTraMaNVTonTai(
    //     maNhanVien,
    //     "notiID",
    //     "(*) MaNV da ton tai",
    //     dsnv.arr
    // );
    isValid &=
        validation.kiemTraRong(tenNhanVien, "notiName", "(*) Vui lòng nhập tên") &&
        validation.kiemTraChuoiKyTu(tenNhanVien, "notiName", "Tên nhân viên phải là chữ");
    isValid &= validation.kiemTraChucVu(
        "chucVu",
        "notiPosition",
        "Yêu cầu chọn chức vụ"
    );
    isValid &= validation.kiemTraRong(heSoChucVu, "notiCoefficient", "(*) Vui lòng nhập hệ số lương");
    isValid &=
        validation.kiemTraRong(luongCoBan, "notiSalary", "(*) Vui lòng nhập lương") &&
        validation.kiemTraSo(
            luongCoBan,
            "notiSalary",
            "(*) Lương không hợp lệ",
            1000000,
            20000000
        );
    isValid &=
        validation.kiemTraRong(soGioLamTrongThang, "notiHours", "(*) Vui lòng nhập giờ") &&
        validation.kiemTraSo(soGioLamTrongThang, "notiHours", "(*) Giờ không hợp lệ", 50, 150);
    if (!isValid) return null;
    var nv = new employee(maNhanVien, tenNhanVien, chucVu, heSoChucVu, luongCoBan, soGioLamTrongThang);
    callApi
        .themNhanVien(nv)
        .then(function () {
            getListEmployee();
        })
        .catch(function (error) {
            console.error(error);
        });
    getEle("maNhanVien").disabled = false;
    getEle("maNhanVien").value = "";
    getEle("tenNhanVien").value = "";
    getEle("chucVu").value = "Chọn chức vụ";
    getEle("heSoChucVu").value = "";
    getEle("luongCoBan").value = "";
    getEle("soGioLamTrongThang").value = "";
}
function renderEm(data) {
    console.log(data);
    var content = "";
    data.forEach(function (nv) {
        var tongLuong = nv.luongCoBan * nv.soGioLamTrongThang;
        content += `<tr>
        <td>${nv.maNhanVien}</td>
        <td>${nv.tenNhanVien}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.heSoChucVu}</td>
        <td>${nv.luongCoBan}</td>
        <td>${nv.soGioLamTrongThang}</td>
        <td>${tongLuong}</td>
        <td>
          <button class="btn btn-success" onclick="handleEdit('${nv.maNhanVien}')">Sửa</button>
          <button class="btn btn-danger" onclick="handleDelete('${nv.maNhanVien}')">Xóa</button>
        </td>
      </tr>`;
    });
    getEle("list").innerHTML = content;
}
