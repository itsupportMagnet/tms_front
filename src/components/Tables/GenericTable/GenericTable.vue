<template>
  <div class="container-fluid mainContainer">
    <div v-if="spinnerLoad" class="d-flex justify-content-center my-3">
      <Spinner />
    </div>
    <Card>
      <div class="card__tableContainer">
        <table class="genericTable table table-hover">
          <thead class="table-header">
            <th scope="col" v-for="(columnName, index) in columnNames" :key="index"> {{ columnName }}</th>
          </thead>
          <tbody class="genericTBody">
            <tr v-for="row in tableData" :key="row.id">
              <td v-for="(item, key) in Object.values(row)" :key="key">
                <select v-if="Array.isArray(item) && item.length > 1" class="form-select">
                  <option v-for="(value, subIndex) in item" :key="subIndex" :value="value">
                    {{ value }}
                  </option>
                </select>
                <template v-else-if="Array.isArray(item) && item.length == 1">
                  {{ item[0] }}
                </template>
                <template v-else>
                  {{ item }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import Spinner from '../../Spinner/Spinner.vue';
import Card from '../../Card/Card.vue';
const props = defineProps(['tableData', 'columnNames', 'spinnerLoad'])
</script>

<style lang="scss" scoped>
@import './GenericTable.scss';
</style>