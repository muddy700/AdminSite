import axios from 'axios';

export default axios.create({
    baseURL: '/api/v1/'
});

// const fetchUsers = async() =>{

//     // callbacks
//     //  axios.get("users").then(response =>{
//     //         response.data
//     //  }).catch()


//    try {
    
//        console.log(response.data)
//    } catch (error) {
        
//    }
// }

export async function fetchAllUsers(){
   const response = await axios.get("/api/v1/users")
   return response.data
}

export async function createUser(payload){
const response = await axios.post("/api/v1/users/create",null,{
    params: payload
})
    return response.data
}

export async function editUser(id , payload){
const response = await axios.put(`/api/v1/users/create/${id}`,null,{
    params: payload
})
    return response.data
}

// const ids = [1,2,3,5]



// async function deleteMult(payloasds){
//     const requests = payloasds.map((item) => axios.delete(`users/${item}`))
//     responseArray = await axios.all([...requests])

// }
// axios.all([...requests])