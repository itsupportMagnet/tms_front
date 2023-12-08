<script setup>
import { toggleSidebar, sidebarWidth, collapsed } from './SidebarState.js';
import SidebarLink from './SidebarLink.vue';
</script>

<template>
  <aside class="sidebar" :style="{ width: sidebarWidth }">
    <figure>
      <img :src="collapsed ? '/logo-compact.svg' : '/logo-white.svg'" :class="collapsed ? 'logo-compacted' : 'logo'"
        alt="logo">
    </figure>

    <div class="clickElements">
      <div class="links-container">

        <div class="dropdown">
          <i class="bi bi-truck"></i>
          <p class="dropdown-toggle" data-bs-toggle="dropdown">Shipments</p>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>

        </div>

        <SidebarLink to="/" icon="bi bi-speedometer2">Dashboard</SidebarLink>
        <SidebarLink to="/about" icon="bi bi-tag-fill">Pricing</SidebarLink>
        <SidebarLink to="/a" icon="bi bi-tools">Tools</SidebarLink>
        <SidebarLink to="/c" icon="bi bi-people-fill">Clients</SidebarLink>
        <SidebarLink to="/v" icon="bi bi-truck-flatbed">Providers</SidebarLink>
        <SidebarLink to="/b" icon="bi bi-cash-stack">Sales Gross</SidebarLink>
      </div>

      <span class="collapse-icon" @click="toggleSidebar">
        <i :class="collapsed ? 'bi bi-arrows' : 'bi bi-arrows-collapse-vertical'"></i>
      </span>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@import '../../styles/global.scss';

.sidebar {
  color: white;
  background-color: #3c4b64;
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  transition: 0.3s ease;

  figure {
    display: flex;
    justify-content: center;
    margin-top: 14px;

    .logo {
      width: 100%;
      padding: 20px;
    }

    .logo-compacted {
      width: 40px;
    }
  }


  .clickElements {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 87%;

    .dropdown {
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      font-weight: 400;
      user-select: none;
      // margin: .1rem 0;
      padding: 1.5rem 1rem;
      height: 1rem;
      color: #fff;
      text-decoration: none;
      transition: all .3s;


      &.link_collapsed {
        padding: 1.5rem 1.2rem;
      }

      &:hover {
        background-color: $primary_hover;
      }

      &.active {
        background-color: $active_link;
        position: relative;

        &::after {
          content: '';
          width: 7px;
          height: 100%;
          position: absolute;
          right: 0;
          background-color: $primary_hover;
        }
      }

      .icon {
        flex-shrink: 0;
        width: 25px;
        font-size: 20px;
        margin-right: 5px;
      }
    }
  }

  .collapse-icon {
    text-align: center;
    font-size: 30px;
  }

}
</style>