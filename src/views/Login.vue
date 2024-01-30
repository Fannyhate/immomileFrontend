<script >
import { oktaSignIn } from '../main'
import { onMounted, onUnmounted, nextTick } from 'vue'

onMounted(() => {
  nextTick(() => {
      oktaSignIn.showSignInAndRedirect(
        { el: '#okta-signin-container' },
    )
  })
})

onUnmounted(() => {
  oktaSignIn.remove()
})

</script>

<template>

  <h2> Welcome Login !</h2>
  <div class="login">
    <div id="okta-signin-container"></div>
  </div>
</template>

<style scoped>

</style>