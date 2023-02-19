var callApi = new CallApi();


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

function renderEm(data) {
    console.log(data);
    var content = "";
    data.forEach(function (em) {
        content += `<tr>
        <td>${em.id}</td>
        <td>${em.name}</td>
        <td>${em.position}</td>
        <td>${em.coefficient}</td>
        <td>${em.salary}</td>
        <td>${em.hours}</td>
        <td>
          <button class="btn btn-success" onclick="btnSua('${em.id}')">Sửa</button>
          <button class="btn btn-danger" onclick="btnXoa('${em.id}')">Xóa</button>
        </td>
      </tr>`;
    });
    getEle("list").innerHTML = content;
}
