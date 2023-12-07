<script setup>
import { toggleSidebar, sidebarWidth, collapsed } from './SidebarState.js';
import SidebarLink from './SidebarLink.vue';
</script>

<template>
  <aside class="sidebar" :style="{ width: sidebarWidth }">
    <figure>
      <img src="/logo-white.svg" alt="logo" class="logo">
    </figure>

    <div class="clickElements">
      <div class="links-container">
        <SidebarLink to="/">
          home
        </SidebarLink>
        <SidebarLink to="/about">About</SidebarLink>
      </div>

      <span class="collapse-icon" @click="toggleSidebar">
        <i v-if="collapsed" class="bi bi-arrows"></i>
        <i v-else class="bi bi-arrows-collapse-vertical"></i>
      </span>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@import '../../styles/global.scss';


.sidebar {
  color: white;
  background-color: $primary;
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  transition: 0.3s ease;

  .logo{
    width: 100%;
    padding: 20px;
  }

  .clickElements {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 90%;
  }

  .collapse-icon {
    text-align: center;
    font-size: 30px;
  }

}
</style>