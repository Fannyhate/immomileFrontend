<template>

  <form>

    <div class="container">
      <h2>Login</h2>

      <h2>Willkommen bei Immo Mile Deutschland </h2>

      <input v-model="email"  class="form-control" type="text" placeholder="Enter Email"  required>

      <input v-model="password" class="form-control" type="password" placeholder="Enter Password" required>

      <div  class="containerOption">
        <a  class="custom_a" href="/register"> Register </a>

        <button @click="this.authentication()"  class="custom_a"> login </button>
      </div>



    </div>

  </form>

</template>

<script>
import './styles/formStyle.css'
import axios from "axios";
import md5 from "md5";
export default {
  name: "Login",
  methods: {
    async authentication() {

      let passwordHash = md5(this.password)
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
      let loginUrl = baseUrl + "/api/login?email="+ this.email + "&password=" + passwordHash
      let response = (await axios.get(loginUrl)).data
      if (response?.id > 0) {
        window.localStorage.setItem("userInfo", JSON.stringify(response) )
        window.location.href = "/options"
      }
    }
  },
  data(){
    return {
      email:"", password: ""
    }
  }
}
</script>

<style scoped>

body {
  font-family: Manrope Serif;
}
</style>