
let  count = 0;
const createTree = (arr, parentId = "") => {
    const tree = [];// mảng lưu các giá trị con 
    arr.forEach((item) => {
      if (item.parent_id === parentId) {
        count++;
        const newItem = item;// newitem là phần tử cha hiện tại object
        newItem.index = count;
        const children = createTree(arr, item.id);// tìm phần tử con cà trả lại mảng phần tử con
        if (children.length > 0) {
          newItem.children = children; // tạo ra một thẻ childen cho phần tử cha chứ 1 mảng các phần tử con
        }
        tree.push(newItem);
      }
    });
    return tree;
  };
  
  module.exports.tree = (arr, parentId = "") => {
    count = 0;
    const tree = createTree(arr, parentId = "");
    return tree;
  };