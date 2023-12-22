<template>
  <RouterView />
</template>


<script setup>
import Sidebar from './components/SideBar/Sidebar.vue';
import { collapsed } from './components/Sidebar/sidebarState';
import Header from './components/Header/Header.vue';
import { RouterView } from 'vue-router';
</script>

<style scoped>
.body {
  /* background-color: #f6f6f6;
  min-height: 93vh;
  color: #383838; */
}
</style>