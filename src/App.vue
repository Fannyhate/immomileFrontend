<script setup>
import {RouterLink, RouterView, useRoute} from 'vue-router'
import { watch, onMounted, ref } from 'vue'
import {useAuth} from "@okta/okta-vue";
import './views/styles/navbar.css'
import './views/styles/base.css'
const authenticated = ref(false)

const {router} = useRoute()

const {auth} = useAuth()
async function logout() {
  await auth.signOut()
}

async function isAuthenticated () {
  authenticated.value = await auth?.isAuthenticated()
}

watch(() => {router?.path}, async () => {
  await isAuthenticated()
})

onMounted(async () => {
  await isAuthenticated()
  auth?.authStateManager.subscribe(isAuthenticated)
})

</script>

<template>
  <header>
    <nav sticky>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><a href="options">MY Houses</a></li>
        <li> <RouterLink to="/login" v-if="!authenticated">
          Login
        </RouterLink>
        </li>
        <li style="float:right"><RouterLink to="/about">About</RouterLink> </li>
        <li>
          <RouterLink to="/profile" v-if="authenticated" >
            Profile
          </RouterLink>
        </li>
        <li> <a v-if="authenticated" v-on:click="logout()">
          Logout
        </a>
        </li>
      </ul>

    </nav>
  </header>

  <RouterView />
</template>

<style scoped>

</style>