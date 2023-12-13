<template>
  <div class="row">
    <div v-if="sales" class="table-responsive table-container">
      <table class="table-container__table table-striped table-hover">
        <thead class="table__header">
          <tr class="table__row">
            <th class="table__cell" scope="col">Id</th>
            <th class="table__cell" scope="col">Operation Id</th>
            <th class="table__cell" scope="col">Booking Bl</th>
            <th class="table__cell" scope="col">Container Id</th>
            <th class="table__cell" scope="col">Provider</th>
            <th class="table__cell" scope="col">Provider Invoice</th>
            <th class="table__cell" scope="col">Status</th>
            <th class="table__cell" scope="col">Buy</th>
            <th class="table__cell" scope="col">Sell</th>
            <th class="table__cell" scope="col">Profit</th>
            <th class="table__cell" scope="col">Customer</th>
            <th class="table__cell" scope="col">Invoice</th>
            <th class="table__cell" scope="col">Month of Invoice</th>
            <th class="table__cell" scope="col">Action</th>
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
          <CIcon :icon="cilWarning" />
          <span class="font-medium"> Nothing was found!</span> Try using
          different options.
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
const props = defineProps(['sales'])
</script>

<style scoped></style>