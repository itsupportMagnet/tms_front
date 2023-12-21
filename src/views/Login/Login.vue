<template>
<div class="bg-img">
    <div class="toast1">
    </div>
    <div class="d-flex justify-content-center">
      <div class="col-md-3 content">
        <h1 class="text-white fs-1 pt-5">Login</h1>
        <form class="px-3 mt-3 mb-3">
          <div class="field mb-3">
            <span class="fa fa-user"></span>
            <input
              type="text"
              required
              placeholder="Enter your email"
              v-model="email"
            />
          </div>
          <div class="field space mb-3">
            <span class="fa fa-lock"></span>
            <input
              placeholder="Password"
              class="pass-key"
              :type="passwordType"
              v-model="password"
            />
            <span class="show" @click="togglePassword">{{ buttonText }}</span>
          </div>
          <div class="d-flex justify-content-center my-3" v-if="isLoad">
            <div class="spinner-grow text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div class="field space mb-5">
            <input type="submit" value="Login" @click.prevent="handleClick" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { showToast } from '../../helpers/helpers.js'
import router from '../../router/Router';
import 'mosha-vue-toastify/dist/style.css'

const email = ref('')
const password = ref('')
const isLoad = ref(false)
const isButtonDisabled = ref(false)
const store = useStore()
const showPassword = ref(false)
const passwordType = computed(() => (showPassword.value ? 'text' : 'password'))
const buttonText = computed(() => (showPassword.value ? 'HIDE' : 'SHOW'))
const handleClick = async () => {
  isLoad.value = true
  isButtonDisabled.value = true
  const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
  if (!emailRegex.test(email.value.trim())) {
    showToast('Please enter a valid email', 'danger', 'red')
    isLoad.value = false
    isButtonDisabled.value = false
    return
  }
  try {
    const res = await store.dispatch('login', {
      email: email.value,
      password: password.value,
    })
    if (Object.prototype.hasOwnProperty.call(res, 'message')) {
      isLoad.value = false
      isButtonDisabled.value = false
      if (res.message == 'password incorrect! ') {
        showToast('Password incorrect !', 'danger', 'red')
      } else {
        showToast('Access Denied', 'danger', 'red')
      }
      return
    }
    isLoad.value = false
    isButtonDisabled.value = false
    localStorage.setItem('email', email.value)
    router.push('/dashboard')
  } catch (error) {
    console.log(error)
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}



</script>

<style lang="scss" scoped>
@import './Login.scss';

</style>