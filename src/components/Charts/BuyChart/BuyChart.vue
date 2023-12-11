<script setup>
import { ref, defineProps, watchEffect } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

const { totalBuy } = defineProps(['totalBuy']);

Chart.register(...registerables);

const colorPalette = [
  '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
  '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
  '#1a8433', '#e53935', '#3949ab', '#fbc02d', '#558b2f',
  '#8e24aa', '#757575', '#ffca28', '#0097a7', '#ef6c00'
];

const chartData = ref({
  labels: [],
  datasets: [],
});

watchEffect(() => {
  const uniqueCustomers = [...new Set(totalBuy.map(item => item.provider))];

  chartData.value.labels = [...new Set(totalBuy.map(item => item.month))];
  chartData.value.datasets = uniqueCustomers
    .map((provider, index) => {
      const backgroundColor = colorPalette[index % colorPalette.length];
      const providerData = totalBuy.filter(item => item.provider === provider);

      // Filtra los proveedores cuyo totalBuy es menor a 500
      const filteredProviderData = providerData.filter(item => item.totalBuy >= 2000);

      return {
        label: provider,
        data: chartData.value.labels.map(month => {
          const dataForMonth = filteredProviderData.find(item => item.month === month);
          return dataForMonth ? dataForMonth.totalBuy : 0;
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
      <h2>Total Buy</h2>
    </div>
    <BarChart :chartData="chartData" />
  </div>
</template>

<style scoped>
@import './BuyChart.scss';
</style>
  