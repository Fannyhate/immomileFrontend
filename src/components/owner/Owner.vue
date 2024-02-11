<template>

  <div class="form" >

    <div class="container">

      <h2 v-if="!isUpdate"> Welcome Neues House einfügen </h2>
      <h2 v-if="isUpdate"> Welcome Zur Editierung des House in {{this.address}} </h2>
      <input v-model="this.address" placeholder="Location" class="form-control" name ="addresse" type="text"/>

      <input v-model="this.floor" placeholder="Etage " class="form-control"  name ="etage" type="number"/>

      <input v-model="this.price" placeholder="Preise" class="form-control"  name ="price" type="number"/>


      <input v-model="this.postcode" placeholder="Post Code " class="form-control" name ="postcode" type="text"/>


      <input v-model="this.numberOfRoom" placeholder=" Anzahl der Zimmer" class="form-control"  type="number"/>

      <input v-model="this.entryDate" class="form-control" placeholder="Verfügbar ab" type="date"/>

      <label for="aufzug"> Hat es Aufzug ? </label>

      <select v-model="this.lift" style="margin-top: 10px; font-size: 20px" class="form-control" >
        <option value="0">Nein</option>
        <option value="1">Ja</option>
      </select>


      <button @click="this.saveImages()" style="margin-bottom: 20px"> Weitere Bildern URL Eingeben</button>

      <input v-model="this.imageUrl" class="form-control" placeholder="Bildern Url eingeben" name ="image" type="text"/>


      <div v-for="imageUrl in imagesUrl" class="informationContainer">

        <img class="addHouseImage" v-bind:src="imageUrl?.urlImg" v-bind:alt="imageUrl?.id">

        <button @click="this.delete(imageUrl?.id)" class="deleteButton"> Delete this image </button>

        <hr/>

      </div>




      <br/>
      <br/>


      <button v-if="!isUpdate" @click="this.createdNewHouse()"> Hochladen</button>
      <button v-if="isUpdate" @click="this.update2()"> Aktualisieren</button>

    </div>


  </div>


</template>

<script>
import '../forms/styles/formStyle.css'
import getLocalUser from "@/components/utils/authentication.js";
import axios from "axios";
export default {
  name: "Owner",
  methods: {
    async update2(){

      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL

      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }

      let imageUrlIds = []
      for (let imageUrl of this.imagesUrl) {

        const data = {
          "urlImg": imageUrl?.urlImg, "id":0
        }
        let imagesResponse = (await axios.post(baseUrl + "/api/houseImage", data, config)).data

        if(imagesResponse?.id > 0 ){
          const imageDB = {"id": imagesResponse?.id}
          imageUrlIds.push(imageDB)
        }

      }
      const home = {
        "room": Number(this.numberOfRoom),
        //"available": this.entryDate,
        "location": this.address,
        "price": Number(this.price) ,
        "floor": Number(this.floor),
        "lift": Boolean(Number(this.lift)),
        "postalCode": this.postcode,
        "myHome": {"id": this.user?.id},
        "houseImages": imageUrlIds

      }

      let houseResponse = (await axios.put(baseUrl + "/api/house?houseId="+this.$route.params?.id, home, config)).data


      if(houseResponse?.id> 0){
        window.location.reload()
      }

      console.log(houseResponse)

    },

    async updateHouse(){
      if(this.$route.params?.id){
        let houseId = this.$route.params?.id

        const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
        const getHouseUrl = baseUrl + "/api/house?id=" + houseId
        let house = (await axios.get(getHouseUrl)).data
        this.price = house?.price
        this.lift = Number(house?.lift)
        this.address = house?.location
        this.floor = house?.floor
        this.postcode = house?.postalCode
        this.numberOfRoom = house?.room
        this.imagesUrl = house?.houseImages
        this.entryDate = house?.available
        this.isUpdate = true
      }

    },
    delete(imageId){
      let indexImage = this.imagesUrl.findIndex((image)=> image?.id === imageId)
      if(indexImage> -1 ){
        this.imagesUrl.splice(indexImage,1)
      }

    },
     async createdNewHouse() {


       const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL

       const config = {
         headers: {
           "Content-Type": "application/json"
         }
       }

       let imageUrlIds = []
       for (let imageUrl of this.imagesUrl) {

         const data = {
           "urlImg": imageUrl?.urlImg, "id":0
         }
         let imagesResponse = (await axios.post(baseUrl + "/api/houseImage", data, config)).data

         if(imagesResponse?.id > 0 ){
           const imageDB = {"id": imagesResponse?.id}
           imageUrlIds.push(imageDB)
         }

       }
       const home = {
         "room": Number(this.numberOfRoom),
         "available": this.entryDate,
         "location": this.address,
         "price": Number(this.price) ,
         "floor": Number(this.floor),
         "lift": Boolean(Number(this.lift)),
         "postalCode": this.postcode,
         "myHome": {"id": this.user?.id},
         "houseImages": imageUrlIds

       }

       let houseResponse = (await axios.post(baseUrl + "/api/house", home, config)).data

       if(houseResponse?.id> 0){
         window.location.reload()
       }
       console.log(houseResponse)
       //TODO  after creating a house what will happen


     },
    saveImages(){

      if(this.imageUrl.length> 2){
        const image = {
          id : new Date().getTime(),
          urlImg: this.imageUrl
        }
        this.imagesUrl.push(image)
        this.imageUrl =""
      }

    }
  },
  data(){
    return {
      imagesUrl : [],
      postcode:"",
      floor: '',
      address:"",
      lift: false,
      entryDate: new Date(),
      numberOfRoom : '',
      price:'',
      imageUrl:"",
      imageId: 1,
      user: getLocalUser.getLocalUser(),
      isUpdate: false

    }
  },

  mounted() {

    this.updateHouse()


  }
}
</script>

<style scoped>

.addHouseImage{
  max-height: 200px;
  max-width: 220px;
  min-width: 220px;
  min-height: 200px;
  border-radius: 10px;
}


</style>