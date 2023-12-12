<template>
  <h1> Florida Quotes</h1>
  <GenericTable :tableData="slicedApiData" :columnNames="slicedColumnNames" :spinnerLoad="spinnerLoad" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import GenericTable from '@/components/Tables/GenericTable/GenericTable.vue';
import { getApi } from '@/services/apiServices'
import { formatColumnName } from '@/helpers/helpers.js'

const apiData = ref([])
const slicedApiData = ref([])
const slicedColumnNames = ref([])
const formattedColumnNames = ref([])
const spinnerLoad = ref(true)

onMounted(() => {
  getApi(`${import.meta.env.VITE_APP_API}/get/allFloridaQuotes`)
    .then((data) => {
      console.log(data),
        apiData.value = data,
        slicedApiData.value = data.map(row => {
          const { id, ...rest } = row;
          return rest; //Funcion para cortar la columna id desde la vista
        })
      formattedColumnNames.value = Object.keys(data[0]).map(formatColumnName)
      slicedColumnNames.value = formattedColumnNames.value.slice(1)
      spinnerLoad.value = false;
    })
    .catch((error) => console.log(error))
})
</script>