<template>
  <div class="g-4">
    <div class="animate__animated animate__flipInX">
      <strong>
        <label class="label">Sort By Provider</label>
      </strong>
      <select class="form-select">
        <option selected value="All">All</option>
        <option v-for="provider in providers" :value="provider.provider_name.split('').join('')" :key="provider">
          {{ provider.provider_name }}
        </option>
      </select>
    </div>

    <div class="animate__animated animate__flipInX">
      <strong>
        <label class="label">Sort by Month</label>
      </strong>
      <select class="form-select">
        <option selected value="All">All</option>
        <option value="MAY">MAY</option>
        <option value="JUNE">JUNE</option>
        <option value="JULY">JULY</option>
        <option value="AUGUST">AUGUST</option>
        <option value="SEPTEMBER">SEPTEMBER</option>
        <option value="OCTOBER">OCTOBER</option>
        <option value="NOVEMBER">NOVEMBER</option>
        <option value="DECEMBER">DECEMBER</option>
      </select>
    </div>

    <div class="animate__animated animate__flipInX">
      <strong>
        <label class="label">Sort By Profit</label>
      </strong>
      <select class="form-select">
        <option disabled hidden selected>All</option>
        <option value="MOST">Most Profit</option>
        <option value="LEAST">Least Profit</option>
      </select>
    </div>

    <div class="animate__animated animate__flipInX">
      <strong>
        <label class="label">Sort By Customer</label>
      </strong>
      <select class="form-select">
        <option selected value="All">All</option>
        <option v-for="client in customers" :value="client.customer_name.split('').join('')" :key="client">
          {{ client.customer_name }}
        </option>
      </select>
    </div>

    <SalesGrossTable />
  </div>
</template>

<script setup>
import SalesGrossTable from '../components/Tables/SalesGrossTable/SalesGrossTable.vue';
import { ref , onMounted } from 'vue'
</script>

<style scoped>

</style>