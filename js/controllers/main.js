var callApi = new CallApi();
var validation = new Validation();

function getEle(id) {
    return document.getElementById(id);
}

function getListEmployee() {
    callApi.layDanhSachNhanVien()
        .then(function (result) {
            renderEm(result.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}
getListEmployee();

function handleDelete(id) {
    callApi.xoaNhanVien(id)
        .then(function (result) {
            getListEmployee();
        })
        .catch(function (result) {
            console.log(error);
        })
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
    data.forEach(function (em) {
        var tongLuong = em.luongCoBan * em.soGioLamTrongThang;
        content += `<tr>
        <td>${em.maNhanVien}</td>
        <td>${em.tenNhanVien}</td>
        <td>${em.chucVu}</td>
        <td>${em.heSoChucVu}</td>
        <td>${em.luongCoBan}</td>
        <td>${em.soGioLamTrongThang}</td>
        <td>${tongLuong}</td>
        <td>
          <button class="btn btn-success" onclick="btnSua('${em.maNhanVien}')">Sửa</button>
          <button class="btn btn-danger" onclick="handleDelete('${em.maNhanVien}')">Xóa</button>
        </td>
      </tr>`;
    });
    getEle("list").innerHTML = content;
}
