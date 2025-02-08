module.exports = (query) => {
    let button = [
        { class : "",
            status : "",
          content : "Tất cả"
        },
        { class : "",
            status : "active",
            content : "Hoạt động "
          },
          { class : "",
            status : "inactive",
            content : "Dừng Hoạt động "
          },
       ]
       //req.query tra ra cac gia tri ( thuoc tinh ) tren thanh URL    

    //HAM TIM CHI SO
    //    button.findIndex((item, index, array) => {  
    //     CODE....
    // });
        if (query.status ) {
            const index = button.findIndex(item => item.status == query.status); // tim chi so
            button[index].class = "active"; // thay doi gia tri mang button
        } else {
            const index = button.findIndex(item => item.status == ""); 
            button[index].class = "active"; // thay doi gia tri mang button
        }
    return button;
}