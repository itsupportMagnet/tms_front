<template>
 <GenericTable :tableData="slicedCarriers" :columnNames="formattedColumnNames"/>
</template>

<script setup>
import GenericTable from '../components/Tables/GenericTable/GenericTable.vue'
import { ref } from 'vue'
import { getApi } from '@/services/apiServices'
import { formatColumnNameCarriers } from '@/utils/utils.js'
// import AddButton from '@/components/buttons/AddButton.vue'
// import Spinner from '@/components/Spinner'
// import AddCarrier from '@/views/carriers/addCarriers/AddCarriers.vue'
const carriers = ref()
const slicedCarriers = ref([])
const carriersFromApi = ref()
const formattedColumnNames = ref([])
const isLoad = ref(true)

getApi(`${import.meta.env.VITE_APP_API}/get/carriers`)
  .then((data) => {
    carriersFromApi.value = data,
    carriers.value = carriersFromApi.value,
    slicedCarriers.value = data.map(({ line_of_business, ...rest }) => rest);
    formattedColumnNames.value = Object.keys(slicedCarriers.value[0]).map(formatColumnNameCarriers)
  })
  .catch((error) => console.log(error))
</script>