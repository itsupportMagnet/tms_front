<template>
  <div class="container-fluid mainContainer">
    <div class="row">
      <div class="tableContainer">
        <div v-if="spinnerLoad" class="d-flex justify-content-center my-3">
          <Spinner />
        </div>
        <table class="genericTable table table-hover">
          <thead class="table-header">
            <th scope="col" v-for="(columnName, index) in columnNames" :key="index"> {{ columnName }}</th>
          </thead>
          <tbody class="genericTBody">
            <tr v-for="row in tableData" :key="row.id">
              <td v-for="(value, key) in row" :key="key"> {{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import Spinner from '../../Spinner/Spinner.vue';
const props = defineProps(['tableData', 'columnNames', 'spinnerLoad'])
</script>

<style lang="scss" scoped>
@import './GenericTable.scss';
</style>