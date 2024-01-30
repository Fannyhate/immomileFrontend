<template>

  <div style="position: relative">

    <img class="optionHeader" src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">

    <div class="containerOption">


      <a v-if="isRenter" href="/owner"  class="card">
        <img src="https://res.cloudinary.com/einszweidreimakler/image/upload/v1470670086/static/let_house.jpg" alt="Avatar" style="width:100%">
        <div class="container">
          <h4><b>Vermeitung </b></h4>
          <p> Bitte jetzt ist nur für Eigentumer </p>
        </div>
      </a>

      <a href="/houses"  class="card">
        <img src="https://www.software24.com/wp-content/uploads/2023/05/Untermieter.png" alt="Avatar" style="width:100%">
        <div class="container">
          <h4><b>Untermeiter </b></h4>
          <p> Bitte anklicken hier für weitere Raum  </p>
        </div>
      </a>

    </div>

  </div>


</template>

<script>
import checkUser from './utils/authentication'
import './styles/options.css'
export default {
  name: "OptionsMenu",
  methods :{
      getRenterStatus(){
        let user = checkUser()
        this.isRenter = user?.isRenter
      }
  },
  data(){
    return {
      isRenter:false
    }
  },
  mounted() {
    this.getRenterStatus()
  }

}
</script>

<style scoped>

</style>