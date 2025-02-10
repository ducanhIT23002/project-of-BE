const buttonChangeStatus = document.querySelectorAll("[button-change-status]"); // lấy ra các nút button
const formChangeStatus = document.querySelector("#form-change-status"); // lấy ra các nút form từ PUG
let path = formChangeStatus.getAttribute("data-path"); // lấy đường dẫn tới router change status

if (buttonChangeStatus.length > 0 ) {
    buttonChangeStatus.forEach(item => {
        item.addEventListener("click", () => {
            let status = item.getAttribute("data-status");  // lấy ra status
            let id = item.getAttribute("data-id");  // lấy ra id
            
            // đổi tình trạng của status sau khi bấm vào
            let changeStatus = status == "active" ? "inactive" : "active";
            
            formChangeStatus.action = path + `/${changeStatus}/${id}?_method=PATCH` // đưa status và ID đã thay đổi vào action để đưa dến trang web tình trạng mới  
            formChangeStatus.submit(); // gửi trang web sang tình trạng link đã thay đổi 

            //?_method=PATCH" cập nhật dữ liểu bằng phương thức PATCH , Nếu ngdung dùng phương thức get thì ko chạy vào logic này
        })
    });
}



// checkbox
const checkboxMulti=document.querySelector("[checkbox-multi]"); // lấy thẻ của nguyên cả cái table
if(checkboxMulti) { 
const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']"); // lấy thẻ của check toàn bộ 
const inputsId = checkboxMulti.querySelectorAll("input[name='id']"); // lấy 1 mảng các thẻ check

inputCheckAll.addEventListener("click", () => { // duyệt thẻ check toàn bộ
if(inputCheckAll.checked) { // .check là thẻ đã check 
   inputsId.forEach (input => {
    input.checked = true;
  });
} else {
   inputsId.forEach (input => {
    input.checked = false;
  });
 }
});

inputsId.forEach (input => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
    ).length; // :checked của css tìm ô đã check

    if ( countChecked == inputsId.length) {
        inputCheckAll.checked = true;
    } else {
        inputCheckAll.checked = false;
    }
    });
});
}

// input
const formchangeMulti  = document.querySelector("[form-change-multi]") // lấy thẻ form chứa đường dẫn action
if ( formchangeMulti) {
    formchangeMulti.addEventListener("submit", (e) => { 
     e.preventDefault();
     const table = document.querySelector("[checkbox-multi]") // lấy ra thẻ table
     const check = table.querySelectorAll("input[name ='id']:checked");// lấy ra  thẻ con checkbox trong thẻ table
    console.log(check)
     if (check.length > 0 ) {
        let ids = [];
        const valueid = formchangeMulti.querySelector("input[name ='input']") // lấy thẻ input đứng từ ô form
        check.forEach(input => {
            const id =input.value;
            ids.push(id);
        })
        valueid.value = ids.join(", "); // chuyển giá trị ô input thành string và gán lại cho ô input
        formchangeMulti.submit(); // form gửi đến BE những class có tên name = " "  / phải dùng cái này để gửi về có e.prevent default
     } else {
        alert("Vui lòng chọn ít nhất 1 bản ghi")
     }
    });
}