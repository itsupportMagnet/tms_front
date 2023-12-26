<template>
  <div class="modal fade" id="newCarrier" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add New Carrier</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <AddCarriersForm />
        </div>
      </div>
    </div>
  </div>

  <PrimaryButton type="button" data-bs-toggle="modal" data-bs-target="#newCarrier">
    Add new Carrier +
  </PrimaryButton>

  <GenericTable :tableData="slicedCarriers" :columnNames="formattedColumnNames" :isLoading="isLoading" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getApi } from '@/services/apiServices';
import { formatColumnNameCarriers } from '@/utils/utils.js';
import GenericTable from '@/components/Tables/GenericTable/GenericTable.vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton/Primarybutton.vue';
import AddCarriersForm from '@/components/Forms/AddCarriersForm/AddCarriersForm.vue';

const carriers = ref();
const slicedCarriers = ref([]);
const carriersFromApi = ref();
const formattedColumnNames = ref([]);
const isLoading = ref(true);
const newCarrierModal = ref(null);


onMounted(async () => {
  isLoading.value = true;
  loadAllCarriers();

  newCarrierModal.value.addEventListener('hidden.bs.modal', () => {
    loadAllCarriers();
  });
})

const loadAllCarriers = async () => {
  try {
    const [
      carriersData
    ] = await Promise.all([
      getApi(`${import.meta.env.VITE_APP_API}/get/carriers`)
    ]);
    carriersFromApi.value = carriersData;
    carriers.value = carriersFromApi.value;
    slicedCarriers.value = carriersData.map(({ line_of_business, ...rest }) => rest);
    formattedColumnNames.value = Object.keys(slicedCarriers.value[0]).map(formatColumnNameCarriers);
    isLoading.value = false;
  } catch (error) {
    console.log(error)
  }
}
</script>