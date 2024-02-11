
const getLocalUser = ()=>{
   let userInfo = window.localStorage.getItem("userInfo")
    if(userInfo){
        let user = JSON.parse(userInfo)
        return user
    }
    else {
        if(!window.location.href.includes("/login")){
            if(!window.location.href.includes("/register")){
                window.localStorage.setItem("userInfo", "")
                window.location.href ="/login"
            }


        }


    }
}

function logOut(){
    window.localStorage.removeItem("userInfo")
    window.location.href ="/login"
}
export default  {getLocalUser, logOut}