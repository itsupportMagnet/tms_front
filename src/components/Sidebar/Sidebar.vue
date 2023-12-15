<template>
  <aside class="sidebar" :style="{ width: sidebarWidth }">
    <figure>
      <img :src="collapsed ? '/logo-compact.svg' : '/logo-white.svg'" :class="collapsed ? 'logo-compacted' : 'logo'"
        alt="logo">
    </figure>

    <div class="clickElements">
      <div class="links-container">

        <SidebarLink to="/" icon="bi bi-speedometer2">Dashboard</SidebarLink>

        <span class="dropdown-link" @click="() => isShipmentsDropdownClicked = !isShipmentsDropdownClicked">
          <SidebarLink  to="" icon="bi bi-truck">
            Shipments
          </SidebarLink>
          <i :class="isShipmentsDropdownClicked ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'"></i>
        </span>
        <div class="dropdown" :class="{ 'active-dropdown': isShipmentsDropdownClicked }"
          v-show="isShipmentsDropdownClicked">
          <SidebarLink to="/all-operations" icon="bi bi-list-task" class="dropdown__item"
            :class="{ 'its-collapsed': collapsed }">All Operations</SidebarLink>
          <SidebarLink to="/new-do" icon="bi bi-file-pdf-fill" class="dropdown__item"
            :class="{ 'its-collapsed': collapsed }">New DO</SidebarLink>
        </div>

        <span class="dropdown-link" @click="() => isPricingDropdownClicked = !isPricingDropdownClicked">
          <SidebarLink to="" icon="bi bi-tag-fill">
            Pricing</SidebarLink>
          <i :class="isPricingDropdownClicked ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'"></i>
        </span>
        <div class="dropdown" :class="{ 'active-dropdown': isPricingDropdownClicked }" v-show="isPricingDropdownClicked">
          <SidebarLink to="/all-quotes" icon="bi bi-list-task" class="dropdown__item"
            :class="{ 'its-collapsed': collapsed }">All Quotes</SidebarLink>
        </div>


        <span class="dropdown-link" @click="() => isToolsDropdownClicked = !isToolsDropdownClicked">
          <SidebarLink to="" icon="bi bi-calculator">
            Pricing Tools
          </SidebarLink>
          <i :class="isToolsDropdownClicked ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'"></i>
        </span>

        <div class="dropdown" :class="{ 'active-dropdown': isToolsDropdownClicked }" v-show="isToolsDropdownClicked">
          <SidebarLink to="/make-quote" icon="bi bi-clipboard2-check-fill" class="dropdown__item"
            :class="{ 'its-collapsed': collapsed }">Make a Quote</SidebarLink>
          <SidebarLink to="/add-quote-fee" icon="bi bi-database-fill-add" class="dropdown__item"
            :class="{ 'its-collapsed': collapsed }">Add Quote Fee</SidebarLink>
          <SidebarLink to="/edit-quote-fee" icon="bi bi-pencil-square" class="dropdown__item"
            :class="{ 'its-collapsed': collapsed }">Edit Quote Fee</SidebarLink>
          <SidebarLink to="/send-quote" icon="bi bi-send-fill" class="dropdown__item"
            :class="{ 'its-collapsed': collapsed }">Send Quote</SidebarLink>
          <SidebarLink to="/florida-quotes" icon="bi bi-tsunami" class="dropdown__item"
            :class="{ 'its-collapsed': collapsed }">Florida Quotes</SidebarLink>
        </div>

        <SidebarLink to="/clients" icon="bi bi-people-fill">Clients</SidebarLink>
        <SidebarLink to="/carriers" icon="bi bi-truck-flatbed">Carriers</SidebarLink>
        <SidebarLink to="/sale-gross" icon="bi bi-cash-stack">Sales Gross</SidebarLink>
      </div>
    </div>

    <span class="collapse-icon" @click="toggleSidebar">
      <i :class="collapsed ? 'bi bi-arrows' : 'bi bi-arrows-collapse-vertical'"></i>
    </span>
  </aside>
</template>

<script setup>
import { toggleSidebar, sidebarWidth, collapsed } from './SidebarState.js';
import SidebarLink from './SidebarLink.vue';
import { ref } from 'vue';

const isShipmentsDropdownClicked = ref(false);
const isPricingDropdownClicked = ref(false);
const isToolsDropdownClicked = ref(false);
</script>



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
  transition: width 0.3s ease;
  box-shadow: 3px -1px 5px 0px rgba(0,0,0,0.75);
-webkit-box-shadow: 3px -1px 5px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 3px -1px 5px 0px rgba(0,0,0,0.75);

  figure {
    display: flex;
    justify-content: center;
    height: 10%;
    background-color: #303c54;

    .logo {
      width: 100%;
      padding: 0 10px;
    }

    .logo-compacted {
      width: 40px;
    }
  }


  .clickElements {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 81%;

    .dropdown-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 20px;
      transition: background-color .3s;
      cursor: pointer;

      &:hover {
        background-color: $primary_hover;
      }

      a {
        flex-basis: 100%;
      }

      i {
        font-size: 12px;
      }
    }

    .dropdown {

      &__item {
        padding-left: 30px;
      }

      .its-collapsed {
        padding-left: 20px;
      }
    }

    .active-dropdown {}
  }

  .collapse-icon {
    display: block;
    text-align: center;
    font-size: 30px;
    cursor: pointer;
    height: 7%;
    background-color: #303c54;
    padding-top: 10px;

    // position: relative;
    // top: 50%;
    // width: 100%;
  }

}
</style>