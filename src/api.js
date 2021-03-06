import  axios from 'axios'
import baseLink from './base'
// const fetchUsers = async() =>{

//     // callbacks
//     //  axios.get("users").then(response =>{
//     //         response.data
//     //  }).catch()
// }

export async function fetchAllUsers(){
   const response = await baseLink.get("users")
   return response.data
}

export async function getSingleUser(id){
    const response = await baseLink.get(`users/${id}`)
    return response
}

export async function createUser(payload){
const response = await baseLink.post("users/create",null,{
    params: payload
})
    return response
}

export async function deleteUser(id){
    const response = await baseLink.delete(`users/${id}`)
    return response
}

export async function editUser(id , payload){
const response = await baseLink.put(`users/${id}`,null,{
    params: payload
})
    return response
}

export async function deleteMult(payloasds){
    const requests = payloasds.map((item) => baseLink.delete(`users/${item}`))
   const  responseArray = await axios.all([...requests])
   return responseArray

}


// let users = [{name: "juma", age: 12}]
// let user = {name: "kelvin"}
// Object.keys(user)
// let querystring = ""
// function filterUser(user){

//     for (let key in Object.keys(user)){
//         if(user[key].toString().includes(querystring)) return true
//     }
//     return false
// }
// users.filter(filterUser) 