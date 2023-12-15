<template>
 <GenericTable />
</template>

<script setup>
import GenericTable from '../components/Tables/GenericTable/GenericTable.vue'
import { ref } from 'vue'
import { getApi } from '@/services/apiServices'
// import AddButton from '@/components/buttons/AddButton.vue'
// import Spinner from '@/components/Spinner'
// import AddCarrier from '@/views/carriers/addCarriers/AddCarriers.vue'
const carriers = ref()
const carriersFromApi = ref()
const slicedCarriers = ref([])
const isLoad = ref(true)

getApi(`${import.meta.env.VITE_APP_API}/get/carriers`)
  .then((data) => {
    carriersFromApi.value = data
    carriers.value = carriersFromApi.value
    isLoad.value = false
    slicedCarriers.value = data.map(row => {

      const { line_of_business, ...rest } = row;
      return rest
    })
    console.log(slicedCarriers.value)
  })
  .catch((error) => console.log(error))
</script>