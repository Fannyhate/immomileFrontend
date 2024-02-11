<template>

  <form>

    <div class="container">


      <h2 > Mein {{this.user?.firstName}} Kriterium ! </h2>

      <input v-model="this.location" placeholder="Location" class="form-control" type="text"/>

      <input v-model="this.numberOfRoom" placeholder="Anzahl des Zimmers " class="form-control" type="number"/>

      <input v-model="this.maxPrice" placeholder="Max Prices " class="form-control"  type="number"/>

      <label for="lift"> Hat es Aufzug ? </label>
      <select name="lift" v-model="this.hasLift" style="margin-top: 10px; font-size: 20px" class="form-control" >
        <option value="0">Nein</option>
        <option value="1">Ja</option>
      </select>

      <br/>

      <button @click="this.updatePrefs()"> Aktualisieren</button>
    </div>

  </form>


</template>

<script>
import axios from "axios";
import auth from '../utils/authentication'

export default {
  name: "Profile",
  methods: {

    async updatePrefs() {

      debugger
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const prefs = {
        "numberOfRoom": this.numberOfRoom,
        "hasLift": Boolean(Number(this.hasLift)),
        "person": {
          "id": this.user?.id
        },
        "maxPrice": this.maxPrice,
        "location": this.location
      }

      let myPrefsResponse = (await axios.put(baseUrl + "/api/person_ref?personId=" + this.user?.id, prefs, config)).data

      if(myPrefsResponse?.id > 0){
        await this.getMeinPrefs()
      }

    },
    async getMeinPrefs() {
      this.user = auth.getLocalUser()
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
      let preferenceUrl = baseUrl + "/api/persons_ref?personId=" + this.user?.id
      let response = (await axios.get(preferenceUrl)).data
      debugger
      if (response?.id > 0) {
       this.maxPrice = response?.maxPrice
        this.location = response?.location
        this.hasLift = Number(response?.hasLift),
        this.numberOfRoom = response?.numberOfRoom
      }
      else {
        let postPrefsUrl = baseUrl + "/api/persons_ref"

        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        }
        const prefs = {
          "numberOfRoom": 1,
          "hasLift": false,
          "person": {
            "id": this.user?.id
          },
          "maxPrice": 0.00,
          "location": " "
        }

        let myPrefsResponse = (await axios.post(postPrefsUrl, prefs, config)).data

        if(myPrefsResponse?.id > 0){
          await this.getMeinPrefs()
        }


      }
    }

  },
  mounted() {
    this.getMeinPrefs()
  },

  data(){
    return {
      maxPrice:"",
      location: "",
      numberOfRoom: "",
      hasLift : 0,
      user: {}
    }
  }
}
</script>

<style scoped>

</style>