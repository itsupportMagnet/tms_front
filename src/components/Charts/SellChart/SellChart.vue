<script setup>
import { ref, defineProps, watchEffect } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

const { totalSell } = defineProps(['totalSell']);

Chart.register(...registerables);

const colorPalette = [
  '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
  '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
  '#5302CD'
];

const chartData = ref({
  labels: [],
  datasets: [],
});

watchEffect(() => {
  const uniqueCustomers = [...new Set(totalSell.map(item => item.customer))];

  chartData.value.labels = [...new Set(totalSell.map(item => item.month))];
  chartData.value.datasets = uniqueCustomers
    .map((customer, index) => {
      const backgroundColor = colorPalette[index % colorPalette.length];
      const customerData = totalSell.filter(item => item.customer === customer);

      // Filtra los clientes cuyo totalSell es mayor o igual a 500
      const filteredCustomerData = customerData.filter(item => item.totalSell >= 2000);

      return {
        label: customer,
        data: chartData.value.labels.map(month => {
          const dataForMonth = filteredCustomerData.find(item => item.month === month);
          return dataForMonth ? dataForMonth.totalSell : 0;
        }),
        backgroundColor: [backgroundColor],
      };
    })
    .filter(dataset => dataset.data.some(value => value !== 0));
});

</script>
  
<template>
  <div class="container">
    <div class="title">
      <h2>Total Sell</h2>
    </div>
    <BarChart :chartData="chartData" />
  </div>
</template>

<style scoped>
@import './SellChart.scss';
</style>
  