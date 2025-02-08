module.exports = (query) => {
    let object = {
        keyword : ""
    }
    if (query.keyword) { // xem co van ban nao duoc nhap hay khong 
      object.keyword = query.keyword; // neu co van ban duoc nhap thi trich xuat data theo van ban do ( title)
      const regex = new RegExp(object.keyword,"i"); // ham dung de tim kiem keyword khong can chinh xac 100%
      object.title = regex; // dua vao dieu kien de trich xuat data
    } 
 return object;
}