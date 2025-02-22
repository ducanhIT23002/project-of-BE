// permission

const tablePermissions = document.querySelector("[table-permissions]")
if(tablePermissions) {
    const button = document.querySelector("[button-submit]")
    button.addEventListener("click",() =>{
        let permission =[];
        const row = tablePermissions.querySelectorAll("[data-name]")
        // duyệt qua các hàng
        row.forEach(row => {
            const name = row.getAttribute("data-name")
            const input = row.querySelectorAll("input")

            if (name == "id"){
                input.forEach(inputs => {
                    const id = inputs.value;
                    permission.push({
                        id :id,
                        permissions : []
                    })
                })
            } else {
                input.forEach((item,index) => {
                    const check = item.checked
                    if (check) {
                    permission[index].permissions.push(name);
                    }
                })
            }
        })
        if (permission.length > 0 ) {
            const formchangePermission = document.querySelector("#form-change-permissions")
            const inputPermission = formchangePermission.querySelector("input[name='permissions']")
            inputPermission.value = JSON.stringify(permission);
            formchangePermission.submit();
        }
    })
}

// data Permission in FE
const records = document.querySelector("[data-records]")
if(records) {
    const dataRecord = JSON.parse(records.getAttribute("data-records")) // content
    const table = document.querySelector("[table-permissions]")
    dataRecord.forEach((item,index) => { // 2 domain
      const per = item.permissions; // trả ra một mảng gồm các mục đã check
      per.forEach((inpu) => { // duyệt qua nó 
        const row = document.querySelector(`[data-name ="${inpu}"]`) // lấy ra các hàng chứa mục đó
        const inp = row.querySelectorAll("input")[index] // lấy ra các ô input
        inp.checked = true;
      })
    })
}