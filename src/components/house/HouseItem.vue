<template>


  <div v-if="displayModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <button @click="this.closeModalsApply()" class="close">&times;</button>
      <FirstContact :houseId="houseId"></FirstContact>
    </div>

  </div>

    <div class="containerOption">
      <div class="houseCard">


        <img  v-bind:src="imageUrl[0]?.urlImg"  alt="Avatar" style="width:100%">



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

          <p> Anzahl Zimmer</p>

          <p> {{this.room }} </p>

        </div>

        <div class="informationContainer">

          <p> PLZ</p>

          <p> {{this.postcode}} </p>

        </div>

        <div v-if="!this.checkUserOptions()" class="informationContainer">
          <p></p>
          <button @click="this.openModalApply(this.house?.id)"> BEWERBEN</button>

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
import FirstContact from "@/components/forms/FirstContact.vue";
export default {
  name: "HouseItem",
  components: {FirstContact},
  props : {
    price: Number,
    room: Number,
    location: String,
    imageUrl: [],
    floor: Number,
    postcode: String,
    house: {},
    connectedUser: getLocalUser.getLocalUser()

  },
  methods: {
    checkUserOptions(){
      let user  = getLocalUser.getLocalUser()
      if(this.house?.myHome?.id === user.id){
        return true
      }
      return false
    },
    closeModalsApply(){
      this.displayModal =false
    },
    openModalApply(houseId){
      this.displayModal =true
      this.houseId = houseId
    },
    deleteHouse(id){

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

  },
  data (){
    return {
      displayModal: false,
      houseId: 0
    }
  },
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


/* The Modal (background) */
.modal {
  display: block;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}


/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>