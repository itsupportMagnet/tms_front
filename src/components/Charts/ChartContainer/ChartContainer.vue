<script setup>
import { watchEffect, ref } from 'vue';
import { getApi } from '@/services/apiServices';
import BuyChart from '../BuyChart/BuyChart.vue';
import SellChart from '../SellChart/SellChart.vue'

//Ref
const totalBuy = ref([]);
const totalSell = ref([])



//Functions
const calculateProviderBuyPerMonth = data => {
  data.forEach(i => {
    const provider = i.provider;
    const buy = parseFloat(i.buy);
    const month = i.month_of_invoice;

    const key = `${provider}_${month}`;
    const existingEntryIndex = totalBuy.value.findIndex(entry => entry.key === key);

    if (existingEntryIndex === -1) {
      totalBuy.value.push({ key, provider, totalBuy: buy, month });
    } else {
      totalBuy.value[existingEntryIndex].totalBuy += buy;
    }
  });
}

const calculateCustomerSellPerMonth = data => {
  data.forEach(i => {
    const customer = i.customer;
    const buy = parseFloat(i.buy);
    const month = i.month_of_invoice;

    const key = `${customer}_${month}`;
    const existingEntryIndex = totalSell.value.findIndex(entry => entry.key === key);

    if (existingEntryIndex === -1) {
      totalSell.value.push({ key, customer, totalSell: buy, month });
    } else {
      totalSell.value[existingEntryIndex].totalSell += buy;
    }
  });
}


watchEffect(() => {
  getApi(`${import.meta.env.VITE_APP_API}/get/salesGross`)
    .then(data => {
      calculateProviderBuyPerMonth(data);
      calculateCustomerSellPerMonth(data);
    })
    .catch((error) => console.log(error))
});
</script>

<template>
  <div class="">
    <div class="col-12">
      <h1 class="chart-title">Charts Dashboard</h1>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <BuyChart :totalBuy="totalBuy" />
        </div>

        <div class="col-6">
          <SellChart :totalSell="totalSell" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import './ChartContainer.scss';
</style>