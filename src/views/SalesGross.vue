<template>
  <div class="g-4">
    <div class="animate__animated animate__flipInX">
      <strong>
        <label class="label">Sort By Provider</label>
      </strong>
      <select @change="sortByProvider" class="form-select">
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
      <select @change="sortByMonth" class="form-select">
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

    <SalesGrossTable :sales="sales" />
  </div>
</template>

<script setup>
import SalesGrossTable from '../components/Tables/SalesGrossTable/SalesGrossTable.vue';
import { ref , onMounted } from 'vue'
import { getApi } from '../services/apiServices'

const sales = ref([])
const salesFromApi = ref()
const isSalesEmpty = ref(false)
const providers = ref()
const customers = ref()
const isLoad = ref(true)
const deleteOperationModalRef = ref(null)
const saleId = ref();
const inpt_BookingBL = ref()
const filterOpt = ref({
  srtProvider: '',
  srtMonth: '',
  srtProfit: '',
  srtCustomer: '',
})

onMounted(async () => {
  loadSaleGross()
  deleteOperationModalRef.value.addEventListener('hidden.bs.modal', () => {
    loadSaleGross()
  })
})

const loadSaleGross = async() => {
  try{
    const[
      providersData,
      salesGrossData,
      customersData,
    ] = await Promise.all([
    getApi(`${import.meta.env.VITE_APP_API}/get/providers`),
    getApi(`${import.meta.env.VITE_APP_API}/get/salesGross`),
    getApi(`${import.meta.env.VITE_APP_API}/get/clients`),  
    ])

    salesFromApi.value = salesGrossData.reverse();
    customers.value = customersData;
    sales.value = salesFromApi.value;
    isLoad.value = false;
    providers.value = providersData;
  }catch(error){
    console.log(error)
  }
}

const sendIdOperation = (obj) => {
  saleId.value = obj.id;
}

const confirmDelete = async () => {
  const sale_id = saleId.value;

  deleteApi(`${import.meta.env.VITE_APP_API}/delete/delete-sale/${sale_id}`)
    .then(() => {
      showToast('Sale Deleted Successfully', 'success', 'green')
  })
    .catch(error => {
      console.log(error);
      showToast('Contact IT', 'danger', 'red')
    })

}

const validateInputBuy = (objSalesGross, key) => {
  if (key === 'buy') {
    const numberValue = objSalesGross[key]
    objSalesGross[key] = Math.max(0, numberValue)
    const updateBuy = {
      idSalesGross: objSalesGross.id,
      buySalesGross: objSalesGross[key],
    }

    postApi(`${import.meta.env.VITE_APP_API}/post/updateBuySalesGross`, updateBuy)
      .then()
      .catch((error) => console.log(error))

    objSalesGross.profit = objSalesGross.sell - objSalesGross.buy  //Operacion para calcular profit

    const updateProfit = {
      idSalesGross: objSalesGross.id,
      profitSalesGross: objSalesGross.profit
    }
    postApi(`${import.meta.env.VITE_APP_API}/post/updateProfitSalesGross`, updateProfit)
      .then()
      .catch((error) => console.log(error))
  }
}

const validateInputSell = (objSalesGross, key) => {
  if (key === 'sell') {
    const numberValue = objSalesGross[key]
    objSalesGross[key] = Math.max(0, numberValue)

    const updateSell = {
      idSalesGross: objSalesGross.id,
      sellSalesGross: objSalesGross[key]
    }
    postApi(`${import.meta.env.VITE_APP_API}/post/updateSellSalesGross`, updateSell)
      .then()
      .catch((error) => console.log(error))
  }
  objSalesGross.profit = objSalesGross.sell - objSalesGross.buy
  const updateProfit = {
    idSalesGross: objSalesGross.id,
    profitSalesGross: objSalesGross.profit
  }
  postApi(`${import.meta.env.VITE_APP_API}/post/updateProfitSalesGross`, updateProfit)
    .then()
    .catch((error) => console.log(error))
}

const filterProvider = (salesFromApi) => {
  if (filterOpt.value.srtProvider) {
    return salesFromApi.provider === filterOpt.value.srtProvider
  }
  return salesFromApi
}

const performSearch = () => {
  const inputValue = inpt_BookingBL.value.trim().toUpperCase()
  if (inputValue === '') {
    sales.value = salesFromApi.value
    checkBookingLength()
  } else {
    const getBookingByName = salesFromApi.value.filter((item) =>
      item.booking_bl.trim().startsWith(inputValue),
    )
    sales.value = getBookingByName
    checkBookingLength()
  }
}

// watch(inpt_BookingBL, () => {
//   performSearch()
// })

// const checkBookingLength = () => {
//   sales.value.length === 0
//     ? (isSalesEmpty.value = true)
//     : (isSalesEmpty.value = false)
// }

const sortByMonth = (e) => {
  if (isSalesEmpty.value) {
    sales.value = salesFromApi.value
    isSalesEmpty.value = false
  }

  if (e.target.value === 'All') {
    filterOpt.value.srtMonth = ''
  } else {
    filterOpt.value.srtMonth = e.target.value
  }
  filterSalesGross()
}

const sortByProvider = (e) => {
  if (isSalesEmpty.value) {
    sales.value = salesFromApi.value
    isSalesEmpty.value = false
  }

  if (e.target.value === 'All') {
    filterOpt.value.srtProvider = ''
  } else {
    filterOpt.value.srtProvider = e.target.value
  }
  filterSalesGross()
}

const filterSalesGross = () => {
  const newProvider = salesFromApi.value
    .filter(filterProvider)
    .filter(filterMonth)
    .filter(filterCustomer)
  if (newProvider.length) {
    sales.value = newProvider
  } else {
    isSalesEmpty.value = true
  }
}

const filterMonth = (salesFromApi) => {
  if (filterOpt.value.srtMonth) {
    return salesFromApi.month_of_invoice === filterOpt.value.srtMonth
  }
  return salesFromApi
}

const sortByProfit = (e) => {
  if (e.target.value === 'MOST') {
    salesFromApi.value.sort((a, b) => b.profit - a.profit)
  } else {
    salesFromApi.value.sort((a, b) => a.profit - b.profit)
  }
  return salesFromApi
}

const sortByCustomer = (e) => {
  if (isSalesEmpty.value) {
    sales.value = salesFromApi.value
    isSalesEmpty.value = false
  }

  if (e.target.value === 'All') {
    filterOpt.value.srtCustomer = ''
  } else {
    filterOpt.value.srtCustomer = e.target.value
  }
  filterSalesGross()
}

const filterCustomer = (salesFromApi) => {
  if (filterOpt.value.srtCustomer) {
    return salesFromApi.customer === filterOpt.value.srtCustomer
  }
  return salesFromApi
}

const inputBlurHandlerProvider = async (id, setProviderInvoice) => {
  const newProviderInvoice = setProviderInvoice.target.value.trim() //Probar si el trim corta espacios mal
  const updateProvider = {
    idSalesGross: id,
    providerInvoice: newProviderInvoice,
  }

  postApi(`${import.meta.env.VITE_APP_API}/post/updateProviderSalesGross`, updateProvider)
    .then()
    .catch((error) => console.log(error))
}

const inputBlurHandlerCustomerInvoice = async (id, setCustomerInvoice) => {
  const newCustomerInvoice = setCustomerInvoice.target.value.trim()
  const updateCustomerInvoice = {
    idSalesGross: id,
    customerInvoice: newCustomerInvoice,
  }
  postApi(`${import.meta.env.VITE_APP_API}/post/updateCustomerInvoiceSalesGross`, updateCustomerInvoice)
    .then()
    .catch((error) => console.log(error))
}

const statusOnChange = async (objSalesGross, e) => {
  const parseStatus = parseInt(e.target.value)
  const newStatusSalesGross = {
    idSalesGross: objSalesGross.id,
    statusSalesGross: parseStatus,
  }
  postApi(`${import.meta.env.VITE_APP_API}/post/updateStatusSalesGross`, newStatusSalesGross)
    .then()
    .catch((error) => console.log(error))
}



</script>

<style scoped>

</style>