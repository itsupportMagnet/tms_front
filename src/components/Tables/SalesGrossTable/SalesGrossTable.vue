<template>
  <div class="row">
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
import { onMounted } from 'vue'
const props = defineProps(['sales'])
// import { loadSaleGross } from '../../../views/SalesGross.vue'

onMounted(async () => {
  deleteOperationModalRef.value.addEventListener('hidden.bs.modal', () => {
    loadSaleGross()
  })
})

const sendIdOperation = (obj) => {
  saleId.value = obj.id;
}

const confirmDelete = async () => {
  const sale_id = saleId.value;

  deleteApi(`${process.env.API}/delete/delete-sale/${sale_id}`)
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

    postApi(`${process.env.API}/post/updateBuySalesGross`, updateBuy)
      .then()
      .catch((error) => console.log(error))

    objSalesGross.profit = objSalesGross.sell - objSalesGross.buy  //Operacion para calcular profit

    const updateProfit = {
      idSalesGross: objSalesGross.id,
      profitSalesGross: objSalesGross.profit
    }
    postApi(`${process.env.API}/post/updateProfitSalesGross`, updateProfit)
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
    postApi(`${process.env.API}/post/updateSellSalesGross`, updateSell)
      .then()
      .catch((error) => console.log(error))
  }
  objSalesGross.profit = objSalesGross.sell - objSalesGross.buy
  const updateProfit = {
    idSalesGross: objSalesGross.id,
    profitSalesGross: objSalesGross.profit
  }
  postApi(`${process.env.API}/post/updateProfitSalesGross`, updateProfit)
    .then()
    .catch((error) => console.log(error))
}

</script>

<style lang="scss" scoped>
@import './SalesGrossTable.scss'
</style>