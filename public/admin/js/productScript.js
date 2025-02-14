// GIAO DIỆN FRONT END CUA TRANG PRODUCT


// THAY ĐỔI ĐẠNG THÁI HOẠT DỘNG HAY DỪNG HOẠT ĐỘNG
const buttonChangeStatus = document.querySelectorAll("[button-change-status]"); // lấy ra các nút button
const formChangeStatus = document.querySelector("#form-change-status"); // lấy ra các nút form từ PUG
let path = formChangeStatus.getAttribute("data-path"); // lấy đường dẫn tới router change status

if (buttonChangeStatus.length > 0 ) {
    buttonChangeStatus.forEach(item => {
        item.addEventListener("click", () => {
            let status = item.getAttribute("data-status");  // lấy ra status
            let id = item.getAttribute("data-id");  // lấy ra id
            
            // đổi tình trạng của status sau khi bấm vào
            let changeStatus = status == "active" ? "inactive" : "active"; // Câu điều kiện
            
            formChangeStatus.action = path + `/${changeStatus}/${id}?_method=PATCH` // đưa status và ID đã thay đổi vào action để đưa dến trang web tình trạng mới  
            formChangeStatus.submit(); // gửi trang web sang tình trạng link đã thay đổi 

            //?_method=PATCH" cập nhật dữ liểu bằng phương thức PATCH , Nếu ngdung dùng phương thức get thì ko chạy vào logic này
        })
    });
}



// checkbox : XỬ LỸ CÁC Ô VUÔNG và gửi đến formChange để đưa sang backend
const checkboxMulti=document.querySelector("[checkbox-multi]"); // lấy thẻ của form chứa các ô vuông all và con
if(checkboxMulti) { 
const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']"); // Tìm thẻ <input> có name='checkall' bên trong checkboxMulti. : ô all
const inputsId = checkboxMulti.querySelectorAll("input[name='id']"); // Tìm thẻ <input> có name='id' bên trong checkboxMulti. : ô con

// THẺ checkboxMulti
    // table(
    //     checkbox-multi
    //     )
    //     thead 
    //     tr
    //         th  
    //         input(type ="checkbox" name = "checkall")              <===  THẺ inputCheckAll
    //         th STT
    //         th Hình ảnh
    //         th Tiêu đề th Giá
    //         th Trạng thái
    //         th Hành động

    //     tbody 
    //     +Data(DataOfPro)                                             <===  THẺ inputsId   
                //   input(
                //     name="id"
                //   )
    // +pagination(pagination) 
    inputCheckAll.addEventListener("click", () => {        // duyệt thẻ check toàn bộ
    if(inputCheckAll.checked) {                             // .check là thẻ đã check 
    inputsId.forEach (input => {         // sau khi tick vào thể all thì các thẻ con cũng phải tick theo 
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
        const countChecked = checkboxMulti.querySelectorAll(      // sau khi click lấy ra số lượng các ô vuông đã được check
            "input[name='id']:checked"
        ).length;                                          // :checked của css tìm ô đã check

        if ( countChecked == inputsId.length) { // số lượng các ô vuông đã được check = với số lượng ô vuông con thì ô vuông all cũng phải  tích theo
            inputCheckAll.checked = true;
        } else {
            inputCheckAll.checked = false;
        }
        });
    });
}

// formChange 
const formchangeMulti  = document.querySelector("[form-change-multi]")  // lấy thẻ form chứa đường dẫn action
if ( formchangeMulti) {
    formchangeMulti.addEventListener("submit", (e) => {                 // SAU KHI SUBMIT CÁI FORM
     e.preventDefault();                                                // sau khi submit thì sẽ laod lại web nên dùng lệnh này
     const table = document.querySelector("[checkbox-multi]")           // lấy ra thẻ table
     const check = table.querySelectorAll("input[name ='id']:checked"); // lấy ra  thẻ con checkbox trong thẻ table


     // tính năng xóa nhiều sản phẩm
    const typeChange = e.target.elements.type.value; // value của form group select sau khi submit form
    if ( typeChange == "delete-all") { // nếu chọn xóa 
        const isConfirm = confirm("bạn có chắc muốn xóa những sản phẩm này ")
       if (!isConfirm) { // nếu chọn không thì ko chạy xuống code dưới để submit form
        return ;
       }
    } 

     
     if (check.length > 0 ) {
        let ids = [];
        const valueid = formchangeMulti.querySelector("input[name ='input']") // lấy thẻ input đứng từ ô form
        check.forEach(tick => {
            const id =tick.value; // lấy ID của từng sản phẩm đã tick

            // tính năng thay đổi vị trí ( thêm position lẫn ID)
            if (typeChange == "change-position") {
              const position = tick.closest("tr").querySelector("input[name='position']").value;// vì tick là thẻ con của check mà check thì không đi vào được vào thẻ input ( thẻ vị trí) khác nên phải đi ra thẻ tr (row)
              ids.push(`${id}-${position}`); // đẩy lên form cả vị trí của thẻ luôn

            } else {    
            ids.push(id);
            }
        })
        // GỬI ĐẾN BE
        valueid.value = ids.join(", ");                                  // chuyển giá trị ô input thành string và gán lại cho ô input
        formchangeMulti.submit();                                        // form gửi đến BE những class có tên name = " "  / phải dùng cái này để gửi về có e.prevent default
     } else {
        alert("Vui lòng chọn ít nhất 1 bản ghi")
     }
    });
}





// BUTTON DELETE
const ButtonDelete = document.querySelectorAll("[button-delete]");
const formDelete = document.querySelector("#delete-element");
let DeletePath = formDelete.getAttribute("data-path"); // lấy đường dẫn tới router change status
ButtonDelete.forEach(item => { // duyệt qua các thẻ xóa
    item.addEventListener("click", () => { // bắt sự kiện click nút xóa
        let id = item.getAttribute("data-id");  // lấy ra id
        formDelete.action = DeletePath + `/${id}?_method=PATCH`
        formDelete.submit();
    })
})
// let path = formChangeStatus.getAttribute("data-path"); // lấy đường dẫn tới router change status


// Show Alert
const showAlert = document.querySelector("[show-alert]");
if ( showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"))
    console.log(time)
    setTimeout(() => {
        showAlert.classList.add("alert-hidden"); // thêm giá trị cho thuộc tính class
    }, time);
    
    const closeAlert = document.querySelector("[close-alert]");
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
    
}


// Create new product
const buttonNewProduct = document.querySelector("#form-create-product");
if (buttonNewProduct) {
    console.log(buttonNewProduct)
}