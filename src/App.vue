<script setup>
import {RouterLink, RouterView, useRoute} from 'vue-router'
import { watch, onMounted, ref } from 'vue'
import useAuth from "./components/utils/authentication"
import './views/styles/navbar.css'
import './views/styles/base.css'
const authenticated = ref(false)

const {router} = useRoute()


async function logout() {
  await useAuth.logOut()
}

async function isAuthenticated () {
  authenticated.value = await useAuth?.getLocalUser()
}

watch(() => {router?.path}, async () => {
  await isAuthenticated()
})

onMounted(async () => {
  await isAuthenticated()
})


</script>

<template>
  <header>
    <nav v-if="authenticated" sticky>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><a href="/options">MY Houses</a></li>
        <li> <RouterLink to="/login" v-if="!authenticated">
          Login
        </RouterLink>
        </li>
        <li style="float:right"><RouterLink to="/about">About</RouterLink> </li>
        <li>
          <RouterLink v to="/profile" v-if="authenticated" >
            Profile
          </RouterLink>
        </li>
        <li >

          <RouterLink v-on:click="logout()" to="/login" v-if="authenticated" >
            Logout
          </RouterLink>

        </li>
      </ul>

    </nav>
  </header>

  <RouterView />
</template>

<style scoped>

</style>