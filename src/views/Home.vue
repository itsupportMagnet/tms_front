<script setup>
  import {getApi} from '@/services/apiServices'
  import { onMounted } from 'vue';

  onMounted(()=> {
    getApi(`${import.meta.env.VUE_APP_API}/get/providers`)
    .then(data => console.log(data))
    .catch(error => {
      console.log(error)
    })
  })

</script>

<template>
  <div class="container">
    <div class="row">
      <h1>hola</h1>
    </div>
  </div>
</template>
