
const getLocalUser = ()=>{
   let userInfo = window.localStorage.getItem("userInfo")
    if(userInfo){
        let user = JSON.parse(userInfo)
        return user
    }
    else {
        window.location.href ="/login"
    }
}
export default  getLocalUser