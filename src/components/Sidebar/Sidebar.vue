<template>
  <aside>
    <router-link to="/about">About page</router-link>
  </aside>
</template>

<script setup>
</script>

<style scoped>
/* Estilos del Sidebar */
aside {
  width: 200px;
  background-color: #f0f0f0;
  padding: 20px;
}

aside a {
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  color: #333;
}
</style>