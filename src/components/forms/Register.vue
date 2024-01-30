<<template xmlns="http://www.w3.org/1999/html">>
  <div class="form">
    <div class="container">
      <h2>Registierung Zur Immo Mile One</h2>

      <input v-model="firstName" class="form-control" type="text" placeholder="Name" name="uname" required>

      <input v-model="lastName" class="form-control" type="text" placeholder="Vorname" name="uname" required>


      <input v-model="email"  class="form-control" type="email" placeholder="Email" name="uname" required>

      <input v-model="password" class="form-control" type="password" placeholder="Enter Password" name="psw" required>

      <label for="Sie Sind auf Wohnungssuche?" > Sind Sie Eigentumer ? </label>

      <select v-model="owner" style="margin-top: 10px" class="form-control" >
        <option value="0">Nein</option>
        <option value="1">Ja</option>
      </select>

      <div  class="containerOption">
        <a class="custom_a" href="/login"> Einloggen </a>
        <button @click="this.register()" class="custom_a">register</button>
      </div>


    </div>

  </div>

</template>

<script>
import './styles/formStyle.css'
import axios from "axios";
import md5 from 'md5'
export default {
  name: "Register",
  data() {
    return {
      firstName:"", email:"", password:"", lastName:"", owner:false
    }
  },
  methods: {
    async register() {

      let data = {
        "firstName": this.firstName,
        "lastName": this.lastName,
        "isRenter": Boolean(Number(this.owner)),
        "email": this.email,
        "password": md5(this.password)
      }
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
      let response = (await axios.post(baseUrl + "/api/person", data, config)).data
      if(response?.id> 0){
        window.location.href ="/login"
      }

    }
  }
}
</script>

<style scoped>

</style>