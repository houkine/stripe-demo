'use strict';
const fs = require('fs');
const path = require('path')
const dbFile = path.resolve(__dirname, './user.json')

// let student = { 
//     name: 'Mike',
//     age: 23, 
//     gender: 'Male',
//     department: 'English',
//     car: 'Honda' 
// };
 
// let data = JSON.stringify(student);
// fs.writeFileSync('student-2.json', data);

const getUsers = () => {
    let rawdata = fs.readFileSync(dbFile);
    let users = JSON.parse(rawdata);
    // console.log(users);
    return users
}

const addUser  = (user) => {
    let users = getUsers()
    users.push(user)
    let data = JSON.stringify(users);
    fs.writeFileSync(dbFile, data);   
}

const updateUser = (user) => {
    let users = getUsers()
    for (let index = 0; index < users.length; index++) {
        if(users[index].cus_id == user.cus_id){
            users[index]=user
        }
    }
    let data = JSON.stringify(users);
    fs.writeFileSync(dbFile, data);   
}

const findUser = (cus_id) => {
    let users = getUsers()
    for (let index = 0; index < users.length; index++) {
        if(users[index].cus_id == cus_id){
            return users[index]
        }
    }
}
module.exports = {
    getUsers,addUser,updateUser,findUser,
}