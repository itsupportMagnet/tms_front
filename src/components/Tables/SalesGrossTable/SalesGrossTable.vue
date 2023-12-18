<template>
  <div class="row">

      <div class="filter-container">
        <div class="d-flex">
          <div class="animate__animated animate__flipInX filter-container__box">
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

          <div class="animate__animated animate__flipInX filter-container__box">
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

          <div class="animate__animated animate__flipInX filter-container__box">
            <strong>
              <label class="label">Sort By Profit</label>
            </strong>
            <select @change="sortByProfit" class="form-select">
              <option disabled hidden selected>All</option>
              <option value="MOST">Most Profit</option>
              <option value="LEAST">Least Profit</option>
            </select>
          </div>

          <div class="animate__animated animate__flipInX filter-container__box">
            <strong>
              <label class="label">Sort By Customer</label>
            </strong>
            <select @change="sortByCustomer" class="form-select">
              <option selected value="All">All</option>
              <option v-for="client in customers" :value="client.customer_name.split('').join('')" :key="client">
                {{ client.customer_name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="salesGrossContainer">
        <div class="searchSection">
          <div class="searchSection__container">
            <!-- RELATIVE -->
            <div class="searchSection__container--form">
              <div class="searchSection__goBackIconContainer">
                <svg class="searchSection__searchIconFrame" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input v-model="inpt_BookingBL" type="text" id="default-search"
                class="searchSection__input searchSection__inputSearchID" placeholder="Search by Booking Bl" required />
            </div>
          </div>
        </div>

        <div v-if="sales" class="table-responsive table-container">
          <table class="table-container__table table-striped table-hover">
            <thead class="table__header">
              <tr class="table__row">
                <th class="table__cell" scope="col">ID</th>
                <th class="table__cell" scope="col">OPERATION ID</th>
                <th class="table__cell" scope="col">BOOKING BL</th>
                <th class="table__cell" scope="col">CONTAINER ID</th>
                <th class="table__cell" scope="col">PROVIDER</th>
                <th class="table__cell" scope="col">PROVIDER INVOICE</th>
                <th class="table__cell" scope="col">STATUS</th>
                <th class="table__cell" scope="col">BUY</th>
                <th class="table__cell" scope="col">SELL</th>
                <th class="table__cell" scope="col">PROFIT</th>
                <th class="table__cell" scope="col">CUSTOMER</th>
                <th class="table__cell" scope="col">INVOICE</th>
                <th class="table__cell" scope="col">MONTH OF INVOICE</th>
                <th class="table__cell" scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody class="tbody" v-if="!isSalesEmpty">
              <tr v-for="(objSalesGross, rowIndex) in sales" :key="rowIndex">
                <td v-for="(key, cellIndex) in Object.keys(objSalesGross).slice(0, 13)" :key="cellIndex">
                  <input v-if="key === 'provider_invoice'" v-model="objSalesGross[key]"
                    @blur="(e) => inputBlurHandlerProvider(objSalesGross.id, e)" />

                  <select v-else-if="key === 'status'" v-model="objSalesGross[key]"
                    @change="(e) => statusOnChange(objSalesGross, e)">
                    <option value="0">NOT STATUS</option>
                    <option value="1">PAID</option>
                    <option value="2">PENDING TO PAY</option>
                  </select>

                  <span v-else-if="cellIndex === 'status'">
                    {{
                      objSalesGross[key] === 1
                      ? 'PAY'
                      : objSalesGross[key] === 2
                        ? 'PENDING TO PAY'
                        : objSalesGross[key]
                    }}
                  </span>

                  <input type="number" v-else-if="key === 'buy'" @blur="validateInputBuy(objSalesGross, key)"
                    v-model="objSalesGross[key]" min="0" />

                  <input type="number" v-else-if="key === 'sell'" @blur="validateInputSell(objSalesGross, key)"
                    v-model="objSalesGross[key]" min="0" />

                  <input v-else-if="key === 'profit'" v-model="objSalesGross[key]" disabled />

                  <input v-else-if="key === 'invoice'" v-model="objSalesGross[key]"
                    @blur="(e) => inputBlurHandlerCustomerInvoice(objSalesGross.id, e)" />

                  <span v-else>
                    {{ objSalesGross[key] }}
                  </span>
                </td>

                <td>
                  <button class="btn-action btn-delete" data-bs-toggle="modal" data-bs-target="#deleteOperationModal"
                    @click="sendIdOperation(objSalesGross)">
                    <i class="bi bi-x-square-fill icon-red"></i>
                  </button>
                </td>
              </tr>
            </tbody>

          </table>
          <div v-if="isSalesEmpty" class="sectionSales__saleEmpty" role="alert">
            <span class="sr-only">Info</span>
            <div>
              <i class="bi bi-exclamation-triangle"></i>
              <span class="font-medium"> Nothing was found!</span> Try using
              different options.
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Delete Modal -->
    <div ref="deleteOperationModalRef" class="modal fade" id="deleteOperationModal" tabindex="-1"
      aria-labelledby="deleteOperationModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Confirm Action</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete the sale?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="confirmDelete">Confirm</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getApi, postApi } from '../../../services/apiServices'
// const props = defineProps(['sales'])
// import { loadSaleGross } from '../../../views/SalesGross.vue'

// onMounted(async () => {
//   deleteOperationModalRef.value.addEventListener('hidden.bs.modal', () => {
//     loadSaleGross()
//   })
// })

// const sendIdOperation = (obj) => {
//   saleId.value = obj.id;
// }

// const confirmDelete = async () => {
//   const sale_id = saleId.value;

//   deleteApi(`${process.env.API}/delete/delete-sale/${sale_id}`)
//     .then(() => {
//       showToast('Sale Deleted Successfully', 'success', 'green')
//     })
//     .catch(error => {
//       console.log(error);
//       showToast('Contact IT', 'danger', 'red')
//     })

// }

// const validateInputBuy = (objSalesGross, key) => {
//   if (key === 'buy') {
//     const numberValue = objSalesGross[key]
//     objSalesGross[key] = Math.max(0, numberValue)
//     const updateBuy = {
//       idSalesGross: objSalesGross.id,
//       buySalesGross: objSalesGross[key],
//     }

//     postApi(`${process.env.API}/post/updateBuySalesGross`, updateBuy)
//       .then()
//       .catch((error) => console.log(error))

//     objSalesGross.profit = objSalesGross.sell - objSalesGross.buy  //Operacion para calcular profit

//     const updateProfit = {
//       idSalesGross: objSalesGross.id,
//       profitSalesGross: objSalesGross.profit
//     }
//     postApi(`${process.env.API}/post/updateProfitSalesGross`, updateProfit)
//       .then()
//       .catch((error) => console.log(error))
//   }
// }

// const validateInputSell = (objSalesGross, key) => {
//   if (key === 'sell') {
//     const numberValue = objSalesGross[key]
//     objSalesGross[key] = Math.max(0, numberValue)

//     const updateSell = {
//       idSalesGross: objSalesGross.id,
//       sellSalesGross: objSalesGross[key]
//     }
//     postApi(`${process.env.API}/post/updateSellSalesGross`, updateSell)
//       .then()
//       .catch((error) => console.log(error))
//   }
//   objSalesGross.profit = objSalesGross.sell - objSalesGross.buy
//   const updateProfit = {
//     idSalesGross: objSalesGross.id,
//     profitSalesGross: objSalesGross.profit
//   }
//   postApi(`${process.env.API}/post/updateProfitSalesGross`, updateProfit)
//     .then()
//     .catch((error) => console.log(error))
// }

// Esto queda comentado por ahora, ya que era lo que utilizaba cuando tenia dividido por componentes

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

const loadSaleGross = async () => {
  try {
    const [
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
  } catch (error) {
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

watch(inpt_BookingBL, () => {
  performSearch()
})

const checkBookingLength = () => {
  sales.value.length === 0
    ? (isSalesEmpty.value = true)
    : (isSalesEmpty.value = false)
}

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

<style lang="scss" scoped>
@import './SalesGrossTable.scss';
</style>