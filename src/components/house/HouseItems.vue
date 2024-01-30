
<script >
import HouseItem from "@/components/house/HouseItem.vue";
import '../styles/house.css'
import axios from "axios";

export default {
  name: "HouseItems",
  components: {HouseItem},
  data (){
    return {
      houses: []
    }
  },
  methods: {
     async getHouses() {
       const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
       const housesData = (await axios.get(baseUrl + "/api/houses")).data

       for ( let house of housesData){
         this.houses.push(house)
       }

     }
  },

  async mounted() {
    await this.getHouses()
  }

}
</script>
<template>


  <div class="houseInformationContainer">



    <HouseItem
        v-for="(item, index) in houses"
        :house="item"
        :index="index"
        :key="item.id"
        :floor="item.floor"
        :price="item.price"
        :room="item.room"
        :postcode="item.postalCode"
        :location="item.location"
        :image-url="item?.houseImages"
    />





  </div>



</template>


<style scoped>

</style>