// GIAO DIEN FRONT END
// DÙNG DỂ THAY ĐỔI ĐƯỜNG LINK (window.location.href)

// bộ lộc và tìm kiếm
// thay vi go status truc tiep tren link URL thi dung JS va HTML cua FE de thay the 
const buttonstatus = document.querySelectorAll("[button-status]"); // lấy value của thuộc tính tự tạo 
if (buttonstatus.length > 0 ) {
 let url = new URL(window.location.href) // lay link cua URL hien tai 
 buttonstatus.forEach(item => {
    item.addEventListener("click", () => {
        let status = item.getAttribute("button-status"); // lay gia tri thuoc tinh ( active hay inactive hoac rong)

        if ( status) { 
            url.searchParams.set("status", status) // neu co thi gan tinh trang moi cho status cua link URL hien tai 
        } else {
            url.searchParams.delete("status") // khong co thi giu nguyen
        }
        window.location.href =  url.href // roi gan link co status da duoc thay doi cho link url hien tai
    })
});
}

//  formSearch
const formSearch = document.querySelector("#form-search");  // lay the formsearch
if (formSearch) {  
    let url = new URL(window.location.href);  // lay link hien tai

    formSearch.addEventListener("submit", (e) => {    
        e.preventDefault();  // ngăn chặn activities mặc định, ví dụ sau khi submit thì web sẽ load lại và mất đi thao tác của code bộ lọc và tìm kiếm
        const keyword = e.target.elements.keyword.value;  // tìm đến phần lưu giá trị sau khi nhập

        if (keyword) {  
            url.searchParams.set("keyword", keyword);  
        } else {  
            url.searchParams.delete("keyword");  
        }  

        window.location.href = url.href;  
    });  
}  


//Pagination
const pagi = document.querySelectorAll("[data-page]");
if (pagi.length > 0 ) {
    let url = new URL(window.location.href) // lay link cua URL hien tai 
    pagi.forEach(item => {
       item.addEventListener("click", () => {
           let NumOfPage = item.getAttribute("data-page"); 
           if ( !isNaN(NumOfPage)) { 
               url.searchParams.set("page", NumOfPage) 
           } else {
               url.searchParams.delete("page")
           }
           window.location.href =  url.href 
       })
   });
   }

