<template>


    <div class="containerOption">
      <div class="houseCard">


        <img  v-bind:src="imageUrl[0]?.urlImg"  alt="Avatar" style="width:100%">
        <h2>test</h2>



        <div class="informationContainer">

          <p> Ort</p>

          <p> {{this.location}} </p>

        </div>


        <div class="informationContainer">

          <p> Preis</p>

          <p>{{this.price}} € </p>

        </div>

        <div class="informationContainer">

          <p> Etage</p>

          <p> {{this.floor}} </p>

        </div>


        <div class="informationContainer">

          <p> PLZ</p>

          <p> {{this.postcode}} </p>

        </div>

        <div v-if="!this.checkUserOptions()" class="informationContainer">
          <p></p>
          <button onclick="this.openDetailsApply()"> BEWERBEN</button>

        </div>

        <div v-if="this.checkUserOptions()" class="informationContainer">
          <button @click="this.updateHouse(this.house?.id)"> Editieren</button>
          <button @click="this.deleteHouse(this.house?.id)"  class="deleteButton"> Entfernen </button>

        </div>


      </div>
    </div>


  <div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" @click="this.closeDetailsApply()">&times;</a>

  </div>


  





</template>

<script>

import '../styles/house.css'
import getLocalUser from "@/components/utils/authentication.js";
import axios from "axios";
export default {
  name: "HouseItem",
  props : {
    price: Number,
    room: Number,
    location: String,
    imageUrl: [],
    floor: Number,
    postcode: String,
    house: {},
    connectedUser: getLocalUser()

  },
  methods: {
    checkUserOptions(){
      let user  = getLocalUser()
      if(this.house?.myHome?.id === user.id){
        return true
      }
      return false
    },
    closeDetailsApply(){
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft= "0";
    },
    openDetailsApply(){
      document.getElementById("mySidenav").style.width = "450px";
      document.getElementById("main").style.marginLeft = "250px";
    },
    deleteHouse(id){
      debugger
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
      const deleteHouseUrl = baseUrl + "/api/deleteHouse?houseId=" + id
      axios.delete( deleteHouseUrl).then(()=>{
        window.location.reload()
      })
    },
    updateHouse(id){
      window.location.href="/owner/"+id
    }

  },
  mounted() {
    this.checkUserOptions()
  }
}
</script>

<style scoped>

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

#main {
  transition: margin-left .5s;
  padding: 16px;
}
</style>