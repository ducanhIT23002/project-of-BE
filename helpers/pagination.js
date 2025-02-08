module.exports = (pagination,query, count) => {
        if (query.page ) {
          pagination.CurrentPage = parseInt(query.page);//req.query.page tra lai chuoi string / lấy số thứ tự trang
        }  
        pagination.skip = (pagination.CurrentPage-1) * pagination.LimitElement // bắt đầu lấy phần tử nào cho currentpage
        pagination.totalPage = Math.ceil(count/pagination.LimitElement);
 return pagination;
}