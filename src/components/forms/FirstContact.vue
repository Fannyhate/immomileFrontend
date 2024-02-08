<template>

  <form >
    <div  class="container">

      <h2> Erste Kontakt </h2>

      <input v-model="firstName" placeholder="Name" class="form-control"  type="text"/>

      <input v-model="lastName" placeholder="Vorname" class="form-control"   type="text"/>

      <input v-model="email" placeholder="Email" class="form-control"  type="email"/>
      <textarea placeholder="Anmerkungen ... max (120) " class="form-control" />
      <input placeholder="Anzahl einziehende Personen"  class="form-control"  type="number"/>

      <input placeholder="Gehalt" class="form-control"  type="number"/>

      <button @click="this.applyForHouse()" class="senderButton"> Senden </button>
    </div>
  </form>

</template>

<script>

import auth from '../utils/authentication'
import axios from "axios";

export default {
  name: "FirstContact",
  props :{
    houseId : Number
  },
  data(){
    return {
      email: "",
      firstName: "",
      lastName: "",
      id: 0
    }
  },
  methods :{
    getUserInfos (){
      let connectedUser = auth.getLocalUser()
      this.id = connectedUser?.id
      this.email = connectedUser?.email
      this.firstName = connectedUser?.firstName
      this.lastName = connectedUser?.lastName
    },
    applyForHouse(){
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
      const applyForHouseUrl = baseUrl + "/api/apply_house?house_id=" + this.houseId + "&person_id=" + this.id
      axios.post( applyForHouseUrl).then(()=>{
        window.location.reload()
      })

    }
  },
  mounted() {
    this.getUserInfos()

  }
}
</script>

<style scoped>

.senderButton {
  margin-bottom: 30px;
}
</style>