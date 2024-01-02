<template>
  <!-- Modal newOperation -->
  <div ref="newOperationModal" class="modal fade" id="newOperation" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add New Operation</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <NewOperationForm :key="newOperationKey" ref="newOperationRef" />
        </div>
      </div>
    </div>
  </div>
  <!-- Modal updateOperation -->
  <div ref="updateOperationModal" class="modal fade" id="updateOperation" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="updateOperationModalTitle">Update Operation</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <NewOperationForm :idOperation="idOperationValue" />
        </div>
      </div>
    </div>
  </div>

  <div ref="accesorialModalDone" class="modal fade" id="accesorialModalDone" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content" :key="newDoneModalKey">
        <div class="modal-header">
          <h5 class="modal-title" id="accesorialModalTitle">Done Operation Modal</h5>
          <button @click="closeAccesorialModal" type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>

        <!-- First Modal Before Continue Button -->

        <div class="modal-body" v-if="isTableSummaryModal">
          <div class="container-fluid">
            <Card>
              <div class="table-row">
                <div class="table-responsive table-container summary-table">
                  <div class="buy-summary-title">
                    <h2>Buy Summmary</h2>
                  </div>
                  <table class="table-container__table table-spacer">
                    <thead class="table__header">
                      <tr class="table__row">
                        <th class="table__cell" scope="col"># OF ITEM</th>
                        <th class="table__cell" scope="col">PRODUCT</th>
                        <th class="table__cell" scope="col">QUANTITY</th>
                        <th class="table__cell" scope="col">RATE</th>
                        <th class="table__cell" scope="col">AMOUNT</th> <!-- Calculo Quantity x Rate -->
                      </tr>
                    </thead>
                    <tbody class="tbody">
                      <tr>
                        <td>1</td>
                        <td>Drayage :</td>
                        <td><input type="number" v-model="inptDrayageBuyQuantity" min="1" disabled /></td>
                        <td><input type="number" v-model="inptBuySummaryDrayage" disabled /></td>
                        <td><input type="number" v-model="inptBuySummaryDrayage" disabled /></td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Chassis :</td>
                        <td><input type="number" v-model="inptChassisBuyQuantity" step="1" min="1" /></td>
                        <td><input type="number" v-model="inptChassisBuyRate" disabled /></td>
                        <td><input type="number" v-model="inptTotalBuyChassisAmount" disabled /></td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="sell-summary-title">
                    <h2>Sell Summmary</h2>
                  </div>
                  <table class="table-container__table table-spacer">
                    <thead class="table__header">
                      <tr class="table__row">
                        <th class="table__cell" scope="col"># OF ITEM</th>
                        <th class="table__cell" scope="col">PRODUCT</th>
                        <th class="table__cell" scope="col">QUANTITY</th>
                        <th class="table__cell" scope="col">RATE</th>
                        <th class="table__cell" scope="col">AMOUNT</th> <!-- Calculo Quantity x Rate -->
                      </tr>
                    </thead>
                    <tbody class="tbody">
                      <tr>
                        <td>1</td>
                        <td>Drayage :</td>
                        <td><input type="number" v-model="inptDrayageSellQuantity" step="1" min="1" disabled /></td>
                        <td><input type="number" v-model="inptSellSummaryDrayage" disabled /></td>
                        <td><input type="number" v-model="inptSellSummaryDrayage" disabled /></td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Chassis :</td>
                        <td><input type="number" v-model="inptChassisSellQuantity" min="1" /></td>
                        <td><input type="number" v-model="inptChassisSellRate" disabled /></td>
                        <td><input type="number" v-model="inptTotalSellChassisAmount" disabled /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <!-- Second Modal Before Continue Button -->
        <div class="modal-body" v-if="isAccesorialModal">
          <div class="carriers-fee">
            <div class="main-container">
              <div :if="accesorials">
                <div class="buy-rates-section">
                  <div class="rates-title">
                    <h2>Buy Accesorials</h2>
                  </div>

                  <div class="buy-accesorials-container">
                    <div class="buy-accesorials-container__col" v-for="item in accesorials" :key="item.id">
                      <label>
                        <input type="checkbox" :value="item.accesorial" v-model="accesorialSelected[item.accesorial]" />
                        {{ item.accesorial }}
                      </label>
                      <input v-if="accesorialSelected[item.accesorial]" class="accesorialValue" type="number"
                        v-model="carrierAccesorialValues[item.accesorial]" @input="accesorialValuesOnChange" />
                    </div>
                  </div>
                </div>
                <!-- MAGNET FEE -->
                <div class="sell-rates-section">
                  <div class="rates-title">
                    <h2>Sell Accesorials</h2>
                  </div>

                  <div class="sell-accesorials-container">
                    <div class="sell-accesorials-container__col" v-for="(value, name, index) in accesorialSelected"
                      :key="index">
                      <label v-if="value">
                        {{ name }}
                        <input v-model="magnetAccesorialValues[name]" type="number" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Third Modal After Continue Button -->
        <div class="modal-body modal-done-status" v-if="isAccesorialModal3">
          <table>
            <!-- <tr v-for="(item, index) in modalInfo" style="border: 1px solid #000" :key="index">
              <th style="background-color: #1d4ed8; color: #fff; padding: 0 10px">
                {{ formatAndCapitalize(index) }}
              </th>
              <td style="padding: 0 10px">{{ item }}</td>
            </tr> -->
            <tr style="border: 1px solid #000">
              <th style="background-color: #1d4ed8; color: #fff; padding: 0 10px">
                ID Operation
              </th>
              <td style="padding: 0 10px">{{sale.operation_id}}</td>
            </tr>
            <tr style="border: 1px solid #000">
              <th style="background-color: #1d4ed8; color: #fff; padding: 0 10px">
                Booking/BL
              </th>
              <td style="padding: 0 10px">{{ sale.booking_bl }}</td>
            </tr>
            <tr style="border: 1px solid #000">
              <th style="background-color: #1d4ed8; color: #fff; padding: 0 10px">
                Container ID
              </th>
              <td style="padding: 0 10px">{{sale.container_id}}</td>
            </tr>
            <tr style="border: 1px solid #000">
              <th style="background-color: #1d4ed8; color: #fff; padding: 0 10px">
                SSLine
              </th>
              <td style="padding: 0 10px">{{operation.ssline}}</td>
            </tr>
            <tr style="border: 1px solid #000">
              <th style="background-color: #1d4ed8; color: #fff; padding: 0 10px">
                Customer
              </th>
              <td style="padding: 0 10px">{{sale.customer}}</td>
            </tr>
            <tr style="border: 1px solid #000">
              <th style="background-color: #1d4ed8; color: #fff; padding: 0 10px">
                Total Charges
              </th>
              <td style="padding: 0 10px">total</td>
            </tr>
            <tr style="border: 1px solid #000">
              <th style="background-color: #1d4ed8; color: #fff; padding: 0 10px">
                Total Amount
              </th>
              <td style="padding: 0 10px">total</td>
            </tr>
          </table>
        </div>


        <!-- Footer Buttons -->
        <div class="modal-footer" v-if="isTableSummaryModal">
          <button @click="handleContinueToAccesorials" v-if="isTableSummaryModal" type="button"
            class="btn btn-success">Continue</button>
        </div>

        <div class="modal-footer" v-if="isAccesorialModal">
          <button @click="handleGoBackToSummaryTableModal" type="button" class="btn btn-danger">Go Back</button>
          <button @click="handleContinueToChargesTable" v-if="isAccesorialModal" type="button"
            class="btn btn-success">Continue</button>
        </div>

        <div class="modal-footer" v-if="isAccesorialModal3">
          <button @click="handleGoBackToAccesorialModal" type="button" class="btn btn-danger">Go
            Back</button>
          <button @click="copyHtmlBtnDoneStatus" type="button" class="btn btn-primary">
            Copy Info
          </button>
        </div>
      </div>
    </div>
  </div>

  <div ref="modalRef" class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Status
          </h1>
          <button @click="closeModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body modal-status">
          <table v-if="modalInfo">
            <tr v-for="(item, index) in modalInfo" style="border: 1px solid #000" :key="index">
              <th style="background-color: #1d4ed8; color: #fff; padding: 0 10px">
                {{ index }}
              </th>
              <td style="padding: 0 10px">{{ item }}</td>
            </tr>
          </table>
        </div>

        <div class="modal-footer">
          <button @click="copyHtmlBtn" type="button" class="btn btn-primary">
            Copy Info
          </button>
        </div>
      </div>
    </div>
  </div>

  <div ref="modalRefContainer" class="modal fade" id="modalContainer" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Container Status
          </h1>
          <button @click="closeContainerModal" type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>

        <div class="modal-body modal-container-status">
          <table v-if="modalInfoContainer">
            <tr v-for="(item, index) in modalInfoContainer" style="border: 1px solid #000" :key="index">
              <th style="background-color: #1d4ed8; color: #fff; padding: 0 10px">
                {{ index }}
              </th>
              <td style="padding: 0 10px">{{ item }}</td>
            </tr>
          </table>
        </div>

        <div class="modal-footer">
          <button @click="copyHtmlBtnContainerStatus" type="button" class="btn btn-primary">
            Copy Info
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- MODAL -->
  <div ref=modalRefNotes class="modal fade" id="note" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Notes</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">ID Operation :</label>
              <input type="text" class="form-control" id="recipient-name" v-model="idOperation" disabled />
            </div>
            <div class="mb-3">
              <label for="textarea" class="form-label">Message</label>
              <textarea id="textarea" v-model="message" class="form-control" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="saveNote">
            Save Note
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="deleteOperationModal" tabindex="-1" aria-labelledby="deleteOperationModal"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Confirm Delete Operation</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to do this action?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="confirmDelete" data-bs-dismiss="modal">Confirm</button>
        </div>
      </div>
    </div>
  </div>


  <div class="container-fluid">
    <div class="header">
      <div class="add-operation-btn">
        <PrimaryButton type="button" data-bs-toggle="modal" data-bs-target="#newOperation">
          Add new operation +
        </PrimaryButton>
      </div>

      <div class="filter-container">
        <div class="filter-container__box">
          <strong>
            <label for="date" class="form-label">Sort By Date</label>
          </strong>
          <input type="date" class="form-control" v-model="inpt_date" @change="sortByDate" />
        </div>

        <div class="filter-container__box">
          <strong>
            <label class="form-label">Sort By Status</label>
          </strong>
          <select @change="sortByStatus" class="form-select">
            <option value="" selected>ALL</option>
            <option value="1">PENDING</option>
            <option value="2">IN PROCESS</option>
            <option value="3">DONE</option>
            <option value="4">CANCELLED</option>
          </select>
        </div>

        <div class="filter-container__box">
          <strong>
            <label class="form-label">Sort By Mode</label>
          </strong>
          <select @change="sortByMode" class="form-select">
            <option value="" selected>ALL</option>
            <option value="IMPORT">IMPORT</option>
            <option value="EXPORT">EXPORT</option>
          </select>
        </div>

        <div class="filter-container__box">
          <strong>
            <label class="form-label">Sort By Carrier</label>
          </strong>
          <select @change="sortByCarrier" class="form-select">
            <template v-if="carriers">
              <option value="">ALL</option>
              <option v-for="item in carriers" :key="item.id">{{ item.provider_name }}</option>
            </template>
          </select>
        </div>

        <div class="filter-container__box">
          <strong>
            <label class="form-label">Sort By Container</label>
          </strong>
          <select @change="sortByContainerStatus" class="form-select">
            <option value="" selected>ALL</option>
            <template v-if="containerStatus">
              <option v-for="item in containerStatus" :key="item.id">{{ item.status }}</option>
            </template>
          </select>
        </div>
      </div>
    </div>

    <div class="table-container">
      <Card>
        <div class="table-row">
          <div v-if="operationsFromApi" class="table-responsive table-container">
            <table v-if="operations" class="table-container__table">
              <thead class="table__header">
                <tr class="table__row">
                  <th class="table__cell" scope="col">ID</th>
                  <th class="table__cell" scope="col">OPERATION DATE</th>
                  <th class="table__cell" scope="col">OPERATION STATUS</th>
                  <th class="table__cell" scope="col">CONTAINER ID</th>
                  <th class="table__cell" scope="col">CONTAINER STATUS</th>
                  <th class="table__cell" scope="col">BOOKING /BL</th>
                  <th class="table__cell" scope="col">CUSTOMER</th>
                  <th class="table__cell" scope="col">PROVIDER</th>
                  <th class="table__cell" scope="col">WAREHOUSE LOCATION</th>
                  <th class="table__cell" scope="col">TERMINAL</th>
                  <th class="table__cell" scope="col">PORT</th>
                  <th class="table__cell" scope="col">EMPTY LOCATION</th>
                  <th class="table__cell" scope="col">FULL LOCATION</th>
                  <th class="table__cell" scope="col">CONTAINER SIZE</th>
                  <th class="table__cell" scope="col">CONTAINER TYPE</th>
                  <th class="table__cell" scope="col">EQUIPMENT</th>
                  <th class="table__cell" scope="col">WEIGHT</th>
                  <th class="table__cell" scope="col">SS LINE</th>
                  <th class="table__cell" scope="col">HAZARDOUS</th>
                  <th class="table__cell" scope="col">BONDED</th>
                  <th class="table__cell" scope="col">CARGO CUT</th>
                  <th class="table__cell" scope="col">COMMODITY</th>
                  <th class="table__cell" scope="col">CITY</th>
                  <th class="table__cell" scope="col">STATE</th>
                  <th class="table__cell" scope="col">MODE OF OPERATION</th>
                  <th class="table__cell" scope="col">QUOTE ID</th>
                  <th class="table__cell" scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody class="tbody">
                <tr v-for="(objOperation, rowIndex) in operations" :key="rowIndex">
                  <td v-for="(key, cellIndex) in Object.keys(objOperation).slice(0, 26)" :key="cellIndex">
                    <span v-if="key == 'operationDate'">
                      {{ americanFormatDate(objOperation[key]) }}
                    </span>
                    <select class="select" v-else-if="key === 'status'" v-model="objOperation[key]"
                      @change="(e) => statusOnChange(objOperation, e)" :class="rowClass(objOperation[key])">
                      <option value="1">PENDING</option>
                      <option value="2">IN PROCESS</option>
                      <option value="3">DONE</option>
                      <option value="4">CANCELLED</option>
                    </select>
                    <input type="text" v-else-if="key == 'quoteID'" v-model="objOperation[key]"
                      class="allOperations__inptBookingBl" @change="changeQuoteId(objOperation[key], objOperation)" />
                    <select class="select" v-else-if="key === 'containerStatus'" v-model="objOperation[key]" @change="(e) =>
                      containerStatusOnChange(objOperation, e)
                      ">
                      <option v-for="cargoStatus in containerStatus" :key="cargoStatus.id" :value="cargoStatus.status"
                        :selected="cargoStatus.status === objOperation.containerStatus
                          ">
                        {{ cargoStatus.status }}
                      </option>
                    </select>
                    <input class="allOperations__inptBookingBl" aria-label="Default input example"
                      v-else-if="key === 'bookingBl'" v-model="objOperation[key]" @blur="(e) =>
                        inputBlurHandlerBooking(objOperation.idOperation, e)
                        " />
                    <input class="allOperations__inptContainerId" aria-label="Default input example"
                      v-else-if="key === 'containerId'" v-model="objOperation[key]" @blur="(e) =>
                        inputBlurHandlerContainer(objOperation.idOperation, e)
                        " />
                    <!-- <input v-else-if="key == 'weight'" type="number" class="allOperations__inptBookingBl"
                    v-model="objOperation[key]" @blur="(e) => inputBlurHandlerWeight(objOperation.idOperation, e)" /> -->
                    <span v-else>
                      {{ objOperation[key] }}
                    </span>
                  </td>
                  <td class="actionButtons">
                    <button type="button" class="btn-action" data-bs-toggle="modal" data-bs-target="#updateOperation"
                      @click="sendIdOperation(objOperation.idOperation)"><i class="bi bi-pencil-square icon-blue"></i>
                    </button>
                    <button class="btn-action" data-bs-toggle="modal" data-bs-target="#deleteOperationModal"
                      @click="showDialog(objOperation.idOperation)">
                      <i class="bi bi-x-square-fill icon-red"></i>
                    </button>
                    <button type="button" class="btn btnNotes" data-bs-toggle="modal" data-bs-target="#note"
                      data-bs-whatever="@mdo" @click="handleBtnNote(objOperation, e)">
                      <i class="bi bi-journal-bookmark"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div v-else>
              <div class="text-center my-3">
                <div class="spinner-grow" style="width: 3rem; height: 3rem" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { getApi, postApi, deleteApi } from '@/services/apiServices'
import { showToast } from '@/helpers/helpers.js'
import NewOperationForm from '@/components/Forms/NewOperationForm/NewOperationForm.vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton/PrimaryButton.vue';
import Card from '../../Card/Card.vue';

const operations = ref()
const operation = ref();
const operationsFromApi = ref([])
const containerStatus = ref()
const inpt_date = ref('')
const isEmptyOperationsFromApi = ref(false)
const modalInfo = ref()
const modalInfoExtra = ref()
const modalInfoContainer = ref()
const modalRef = ref(null)
const modalRefContainer = ref(null)
const modalRefNotes = ref(null)
const newOperationModal = ref(null);
const updateOperationModal = ref(null);
const accesorialModalDone = ref(null);

const inptDrayageBuyQuantity = ref(1);
const inptChassisBuyQuantity = ref(1);
const inptTotalBuyChassisAmount = ref();

const inptDrayageSellQuantity = ref(1);
const inptChassisSellQuantity = ref(1);
const inptTotalSellChassisAmount = ref();

const inptBuySummaryDrayage = ref();
const inptChassisBuyRate = ref();
const inptSellSummaryDrayage = ref();
const inptChassisSellRate = ref();

const slctStatus = ref()
const slctContainerStatus = ref()
const message = ref()
const idOperation = ref()
const idOperationValue = ref()
const idQuoteModal = ref()
const newOperationRef = ref(null)
const OperationIdToDelete = ref(null)
const carriers = ref();
const accesorials = ref();
let newOperationKey = ref(0)
let newDoneModalKey = ref(0)
const isTableSummaryModal = ref(true)
const isAccesorialModal = ref(false)
const isAccesorialModal3 = ref(false)
const isOpenQuote = ref(false)
const openQuoteInfo = ref();
const closedQuoteInfo = ref();
const salesGrossInfo = ref();
const accesorialSelected = ref({});
const carrierAccesorialValues = ref({}); //Se deben borrar al cerrar el modal
const magnetAccesorialValues = ref({}); //Se deben borrar al cerrar el modal
const totalAccesorialValues = ref({}) //Se deben borrar al cerrar el modal
const closedQuoteBuyChassis = ref();
const closedQuoteSellChassis = ref();

const sale = ref();
const isDoneOperationUpdate = ref(false);
const doneModalInfo = ref();
const filterObj = ref({
  date: '',
  status: '',
  mode: '',
  carrier: '',
  containerStatus: ''
})

watch(accesorialSelected.value, () => {
  Object.entries(accesorialSelected.value).forEach(([key, value]) => {
    if (!value) {
      delete carrierAccesorialValues.value[key]
      delete magnetAccesorialValues.value[key]
    }
  })
});


onMounted(async () => {
  loadAllOperations();

  getApi(`${import.meta.env.VITE_APP_API}/get/providers`)
    .then(data => carriers.value = data)
    .catch(error => {
      console.log(error)
      showToast('Error Please Contact IT', 'warning', 'red')
    })

  modalRef.value.addEventListener('hidden.bs.modal', () => {
    closeModal()
  })

  newOperationModal.value.addEventListener('hidden.bs.modal', () => {
    loadAllOperations()
    newOperationRef?.value.clearFormFields();
    resetNewOperation()
  })

  updateOperationModal.value.addEventListener('hidden.bs.modal', () => {
    loadAllOperations()
  })

  modalRefContainer.value.addEventListener('hidden.bs.modal', () => {
    closeContainerModal()
  })

  modalRefNotes.value.addEventListener('hidden.bs.modal', () => {
    loadAllOperations()
  })

  accesorialModalDone.value.addEventListener('hidden.bs.modal', () => {
    closeAccesorialModal()
    loadAllOperations()
    resetAtDismissModal() //resetear valores al cerrar el modal
    watch(accesorialSelected.value, () => {
      Object.entries(accesorialSelected.value).forEach(([key, value]) => {
        if (!value) {
          delete carrierAccesorialValues.value[key]
          delete magnetAccesorialValues.value[key]
        }
      })
    });
  })
})

const loadAllOperations = async () => {
  try {
    const [
      operationsData,
      containerStatusData,
      salesGrossData,
    ] = await Promise.all([
      getApi(`${import.meta.env.VITE_APP_API}/get/allOperationsTable`),
      getApi(`${import.meta.env.VITE_APP_API}/get/container-status`),
      getApi(`${import.meta.env.VITE_APP_API}/get/salesGross`)
    ]);
    operations.value = operationsData.reverse();
    containerStatus.value = containerStatusData;
    isEmptyOperationsFromApi.value = false
    operationsFromApi.value = operations.value
    salesGrossInfo.value = salesGrossData
  } catch (error) {
    console.log(error)
  }
}

//Filter Functions

const sortByDate = e => {
  filterObj.value.date = e.target.value;
  filterOperations();
}

const sortByStatus = e => {
  filterObj.value.status = e.target.value;
  filterOperations();
}

const sortByMode = e => {
  filterObj.value.mode = e.target.value;
  filterOperations();
}

const sortByCarrier = e => {
  filterObj.value.carrier = e.target.value;
  filterOperations();
}

const sortByContainerStatus = e => {
  filterObj.value.containerStatus = e.target.value;
  filterOperations();
}

const filterOperations = () => {
  const newOperations = operationsFromApi.value.filter(filterMonth).filter(filterStatus).filter(filterMode).filter(filterCarrier).filter(filterContainerStatus);
  if (newOperations.length) {
    operations.value = newOperations
  } else {
    operations.value = false
  }
}

const filterMonth = (operation) => {
  if (filterObj.value.date) {
    return operation.operationDate === filterObj.value.date
  }
  return operation
}

const filterStatus = (operation) => {
  if (filterObj.value.status) {
    return operation.status === parseInt(filterObj.value.status)
  }
  return operation;
}

const filterMode = (operation) => {
  if (filterObj.value.mode) {
    return operation.modeOfOperation === filterObj.value.mode;
  }
  return operation;
}

const filterCarrier = (operation) => {
  if (filterObj.value.carrier) {
    return operation.provider === filterObj.value.carrier;
  }
  return operation;
}

const filterContainerStatus = operation => {
  if (filterObj.value.containerStatus) {
    return operation.containerStatus === filterObj.value.containerStatus;
  }
  return operation;
}
//Fin de funciones de filtros

const sendIdOperation = (id) => {
  idOperationValue.value = id
}

const americanFormatDate = (dateString) => {
  let dateParts = dateString.split('-');
  let americanDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  let americanMonth = americanDate.getMonth() + 1;
  let americanDay = americanDate.getDate();
  let americanYear = americanDate.getFullYear();
  let formattedDate = americanMonth + '-' + americanDay + '-' + americanYear;
  return formattedDate;
}

const changeQuoteId = async (quote, objOperation) => {
  const newQuoteID = {
    quoteID: quote,
    idOperation: objOperation.idOperation
  }
  postApi(`${import.meta.env.VITE_APP_API}/post/change-quoteid`, newQuoteID)
    .then()
    .catch((data) => console.log(data))
}

const saveNote = async () => {
  const newNote = {
    idOperation: idOperation.value,
    note: message.value,
  }
  postApi(`${import.meta.env.VITE_APP_API}/post/change-notes`, newNote)
    .then(() => {
      getApi(`${import.meta.env.VITE_APP_API}/get/all-operations`)
        .then((data) => {
          operationsFromApi.value = data
          showToast('Note Saved Sucessfully', 'success', 'green')
        })
    })
    .catch((error) => console.log(error))
}

const handleBtnNote = async (objOperation) => {
  idOperation.value = objOperation.idOperation
  message.value = objOperation.notes
}

const rowClass = (id) => {
  if (id == 0) {
    return 'form-select-pending'
  }
  if (id == 1) {
    return 'form-select-pending'
  }
  if (id == 2) {
    return 'form-select-progress'
  }
  if (id == 3) {
    return 'form-select-done'
  }
  if (id == 4) {
    return 'form-select-cancelled'
  }
}

const statusOnChange = async (objOperation, e) => {
  const parseStatus = parseInt(e.target.value)
  operation.value = objOperation;
  const newStatus = {
    idOperation: objOperation.idOperation,
    status: parseStatus,
  }
  postApi(`${import.meta.env.VITE_APP_API}/post/change-status`, newStatus)
    .then()
    .catch((error) => console.log(error))
  feedingOperationTableModal(objOperation, e)
}

const feedingOperationTableModal = (objOperation, e) => {
  if (e.target.value === '1') {
    modalInfo.value = {
      'ID Operation': objOperation.idOperation,
      'Booking/BL': objOperation.bookingBl,
      'Container ID': objOperation.containerId,
      'Operation Efective Day': objOperation.operationDate,
      'Size Container': objOperation.containerSize,
      'Operation mode': objOperation.modeOfOperation,
      'Warehouse location': objOperation.warehouseLocation,
      Port: objOperation.port,
      Customer: objOperation.customer,
    }
    e.target.setAttribute('data-bs-toggle', 'modal')
    e.target.setAttribute('data-bs-target', '#modal')
    slctStatus.value = e.target
    return
  }

  if (e.target.value === '3') {
    e.target.setAttribute('data-bs-toggle', 'modal');
    e.target.setAttribute('data-bs-target', '#accesorialModalDone');
    slctStatus.value = e.target;

    loadAllOperations()

    // idQuoteModal.value = objOperation.quoteID;

    if (doesOperationExist(operation.value.idOperation)) {

      console.log(sale.value)
      const { buyDrayageUnitRate, buyQtyChassis, buyChassisUnitRate, sellDrayageUnitRate, sellQtyChassis, sellChassisUnitRate, sellChassis, buyAccesorials, sellAccesorials } = sale.value;
      console.log(sale.value)
      feedModalSummaryTable(buyDrayageUnitRate, buyQtyChassis, buyChassisUnitRate, sellDrayageUnitRate, sellQtyChassis, sellChassisUnitRate, sellChassis, buyAccesorials, sellAccesorials);

      feedModalAccesorial(buyAccesorials, sellAccesorials)

    } else {

      if (chckIsAnOpenOperation(operation.value.quoteID)) {

        getApi(`${import.meta.env.VITE_APP_API}/get/get-normal-quote/${operation.value.quoteID}`)
          .then(data => sale.value = data)
          .catch(error => console.log(error))

        e.target.setAttribute('data-bs-toggle', 'modal')
        e.target.setAttribute('data-bs-target', '#accesorialModalDone')
        slctStatus.value = e.target
      }
    }











    // if (operation.value.quoteID.includes('MGT')) {
    //   const selectedIdOpenQuote = {
    //     id: objOperation.quoteID
    //   }
    //   isOpenQuote.value = false

    //   getApi(`${import.meta.env.VITE_APP_API}/get/get-normal-quote/${selectedIdOpenQuote.id}`)
    //     .then((data) => {
    //       openQuoteInfo.value = data
    //       buySummaryDrayage.value = data.carrierFee
    //       chassisBuyRate.value = data.carrierChassis
    //       sellSummaryDrayage.value = data.magnetFee
    //       chassisSellRate.value = data.magnetChassis
    //       totalBuyChassisAmount.value = chassisBuyRate.value * chassisBuyQuantity.value
    //       totalSellChassisAmount.value = chassisSellRate.value * chassisSellQuantity.value
    //       carrierAccesorialValues.value = data.carrierAccesorials
    //       magnetAccesorialValues.value = data.magnetAccesorials
    //       for (let key in data.carrierAccesorials) {
    //         accesorialSelected.value[key] = true;
    //       }
    //       for (let key in data.magnetAccesorials) {
    //         accesorialSelected.value[key] = true;
    //       }
    //     })
    //     .catch((error) => console.log(error))

    //   modalInfo.value = {
    //     'ID Operation': objOperation.idOperation,
    //     'Booking/BL': objOperation.bookingBl,
    //     'Container ID': objOperation.containerId,
    //     'Container Type': objOperation.containerType,
    //     SSLine: objOperation.ssline,
    //     Customer: objOperation.customer,
    //     totalCharges: '',
    //     totalAmount: ''
    //   }

    //   modalInfoExtra.value = {
    //     'Provider': objOperation.provider,
    //     'Quote ID': objOperation.quoteID
    //   }
    // }
    // else {
    //   const selectedClosedQuote = {
    //     id: objOperation.quoteID
    //   }

    //   isOpenQuote.value = true
    //   getApi(`${import.meta.env.VITE_APP_API}/get/get-florida-quote/${selectedClosedQuote.id}`)
    //     .then((data) => {
    //       closedQuoteInfo.value = data
    //       console.log(data.carrierDrayage)
    //       buySummaryDrayage.value = convertToNumber(data.carrierDrayage)
    //       chassisBuyRate.value = convertToNumber(data.carrierChassis)
    //       sellSummaryDrayage.value = convertToNumber(data.customerDrayage)
    //       chassisSellRate.value = convertToNumber(data.customerChassis)

    //     })
    //     .catch((error) => console.log(error))

    //   modalInfo.value = {
    //     'ID Operation': objOperation.idOperation,
    //     'Booking/BL': objOperation.bookingBl,
    //     'Container ID': objOperation.containerId,
    //     'Container Type': objOperation.containerType,
    //     SSLine: objOperation.ssline,
    //     Customer: objOperation.customer,
    //     totalCharges: '',
    //     totalAmount: '',
    //   }

    //   modalInfoExtra.value = {
    //     'Provider': objOperation.provider,
    //     'Quote ID': objOperation.quoteID
    //   }
    // }

    getApi(`${import.meta.env.VITE_APP_API}/get/accesorials`).then(
      (data) => (accesorials.value = data)
    );

    if (idQuoteModal.value.includes("I'll define it later")) {
      showToast('El Quote ID no esta definido', 'danger', 'red')
    } else {
      e.target.setAttribute('data-bs-toggle', 'modal')
      e.target.setAttribute('data-bs-target', '#accesorialModalDone')
      slctStatus.value = e.target
      return
    }
  }
}

const containerStatusOnChange = async (objOperation, e) => {
  const status = e.target.value
  const newContainerStatus = {
    idOperation: objOperation.idOperation,
    containerStatus: status,
  }

  postApi(`${import.meta.env.VITE_APP_API}/post/change-containerStatus`, newContainerStatus)
    .then()
    .catch((error) => console.log(error))
  feedingContainerModal(objOperation, e)
}

const inputBlurHandlerBooking = async (id, setBookingBl) => {
  const newBookingBl = setBookingBl.target.value.trim()
  const updateBookingBl = {
    idOperation: id,
    bookingBl: newBookingBl,
  }
  postApi(`${import.meta.env.VITE_APP_API}/post/updateBookingBl`, updateBookingBl)
    .then()
    .catch((error) => console.log(error))
}

const inputBlurHandlerContainer = async (id, setContainerId) => {
  const newContainerId = setContainerId.target.value.trim()
  const updateContainerId = {
    idOperation: id,
    containerId: newContainerId,
  }
  postApi(`${import.meta.env.VITE_APP_API}/post/updateContainerId`, updateContainerId)
    .then()
    .catch((error) => console.log(error))
}

const copyHtmlBtn = () => {
  const modalBody = document.querySelector('.modal-status')
  const range = document.createRange()
  range.selectNode(modalBody)
  window.getSelection().removeAllRanges()
  window.getSelection().addRange(range)
  try {
    document.execCommand('copy')
    showToast('Copied Succesfully', 'success', 'green')
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err)
  } finally {
    window.getSelection().removeAllRanges()
  }
}

const copyHtmlBtnDoneStatus = () => {
  const modalBody = document.querySelector('.modal-done-status')
  const range = document.createRange()
  range.selectNode(modalBody)
  window.getSelection().removeAllRanges()
  window.getSelection().addRange(range)
  try {
    document.execCommand('copy')
    showToast('Copied Succesfully', 'success', 'green')
  } catch (err) {
    console.error('Error Clipboard Copy:', err)
  } finally {
    window.getSelection().removeAllRanges()
  }
}

const copyHtmlBtnContainerStatus = () => {
  const modalBody = document.querySelector('.modal-container-status')
  const range = document.createRange()
  range.selectNode(modalBody)
  window.getSelection().removeAllRanges()
  window.getSelection().addRange(range)
  try {
    document.execCommand('copy')
    showToast('Copied Succesfully', 'success', 'green')
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err)
  } finally {
    window.getSelection().removeAllRanges()
  }
}

const getMonthName = (monthNumber) => {
  const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY",
    "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
  return months[monthNumber]
}


const closeModal = () => {
  slctStatus.value.removeAttribute('data-bs-toggle')
  slctStatus.value.removeAttribute('data-bs-target')
}

const formatAndCapitalize = (value) => {
  const formattedKey = value.replace(/([a-z])([A-Z])/g, "$1 $2");
  return formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
};

const feedingContainerModal = (objOperation, e) => {
  modalInfoContainer.value = {
    'ID Operation': objOperation.idOperation,
    'Status Container': objOperation.containerStatus,
    'Booking/BL': objOperation.bookingBl,
    'Container ID': objOperation.containerId,
    'Container Type': objOperation.containerType,
    'Customer': objOperation.customer
  }
  e.target.setAttribute('data-bs-toggle', 'modal')
  e.target.setAttribute('data-bs-target', '#modalContainer')
  slctContainerStatus.value = e.target
}

const closeContainerModal = () => {
  slctContainerStatus.value.removeAttribute('data-bs-toggle')
  slctContainerStatus.value.removeAttribute('data-bs-target', '#modalContainer')
}

const closeAccesorialModal = () => {
  slctStatus.value.removeAttribute('data-bs-toggle')
  slctStatus.value.removeAttribute('data-bs-target', '#accesorialModalDone')
}

const deleteOperation = async (idOperation) => {
  deleteApi(`${import.meta.env.VITE_APP_API}/delete/deleteOperation/${idOperation}`)
    .then(() => {
      loadAllOperations()
      showToast('Operation deleted succesfully', 'success', 'green')
    })
    .catch(error => {
      console.log(error)
      showToast('Error Please Contact IT', 'warning', 'red')
    })
}

const resetNewOperation = () => {
  newOperationKey.value++;
}

const showDialog = (idOperation) => {
  OperationIdToDelete.value = idOperation;
}

const confirmDelete = async () => {
  await deleteOperation(OperationIdToDelete.value)
}

const handleContinueToAccesorials = () => {
  isTableSummaryModal.value = false;
  isAccesorialModal.value = true;
  isAccesorialModal3.value = false;

  sale.value.buyChassis = inptTotalSellChassisAmount.value;


  // if (idQuoteModal.value.includes('MGT')) {
  //   console.log('Estoy con la quote Abierta')
  //   console.log('Primer Console Log TotalAmount: ' + totalSellChassisAmount.value)

  //   // const toSalesGrossFromOpenSummary = {
  //   //   operationId: modalInfo.value['ID Operation'],
  //   //   chassisBuyQuantity: chassisBuyQuantity.value,
  //   //   chassisBuySummary: chassisBuyRate.value,
  //   //   totalBuyChassisAmount: totalBuyChassisAmount.value,
  //   //   chassisSellQuantity: chassisSellQuantity.value,
  //   //   chassisSellSummary: chassisSellRate.value,
  //   //   totalSellChassisAmount: totalSellChassisAmount.value
  //   // }

  //   if (salesGrossInfo.value.some(item => item.operation_id === modalInfo.value['ID Operation'])) {
  //     postApi(`${import.meta.env.VITE_APP_API}/post/updateSummarySalesGross`, toSalesGrossFromOpenSummary)
  //       .then(loadAllOperations())
  //       .catch((error) => console.log(error))
  //   } else {
  //     postApi(`${import.meta.env.VITE_APP_API}/post/newSummarySalesGross`, toSalesGrossFromOpenSummary)
  //       .then(loadAllOperations())
  //       .catch((error) => console.log(error))
  //   }
  //   console.log(toSalesGrossFromOpenSummary)
  // } else {
  //   console.log('Estoy con la quote Cerrada')
  //   console.log('Primer Log' + totalSellChassisAmount.value)
  //   const toSalesGrossFromClosedSummary = {
  //     operationId: modalInfo.value['ID Operation'],
  //     chassisBuyQuantity: chassisBuyQuantity.value,
  //     chassisBuySummary: chassisBuyRate.value,
  //     totalBuyChassisAmount: totalBuyChassisAmount.value,
  //     chassisSellQuantity: chassisSellQuantity.value,
  //     chassisSellSummary: chassisSellRate.value,
  //     totalSellChassisAmount: totalSellChassisAmount.value
  //   }

  //   if (salesGrossInfo.value.some(item => item.operation_id === modalInfo.value['ID Operation'])) {
  //     postApi(`${import.meta.env.VITE_APP_API}/post/updateSummarySalesGross`, toSalesGrossFromClosedSummary)
  //       .then(loadAllOperations())
  //       .catch((error) => console.log(error))
  //   } else {
  //     postApi(`${import.meta.env.VITE_APP_API}/post/newSummarySalesGross`, toSalesGrossFromClosedSummary)
  //       .then(loadAllOperations())
  //       .catch((error) => console.log(error))
  //   }
  //   console.log(toSalesGrossFromClosedSummary)
  // }
}

const handleGoBackToSummaryTableModal = () => {
  isTableSummaryModal.value = true;
  isAccesorialModal.value = false;
  isAccesorialModal3.value = false;
}

const handleContinueToChargesTable = async () => {
  const currentDate = new Date();
  isTableSummaryModal.value = false;
  isAccesorialModal.value = false;
  isAccesorialModal3.value = true;

  sale.value.date = currentDate;
  console.log(sale.value)

  if(isDoneOperationUpdate.value){
    postApi(`${import.meta.env.VITE_APP_API}/post/updateSaleGross`, sale.value)
    .then(()=> console.log("Se updateo correctamente"))
    .catch(error => console.log(error))
  }
  

  
  // saveAccesorials();

  loadAllOperations();
  // if (idQuoteModal.value.includes('MGT')) {
  //   sumAccesorialValues()
  //   const customerDrayageNumber = parseFloat(openQuoteInfo.value.magnetFee)
  //   const carrierDrayageNumber = parseFloat(openQuoteInfo.value.carrierFee)
  //   const carrierChassisNumber = parseFloat(openQuoteInfo.value.carrierChassis)
  //   const magnetChassisNumber = parseFloat(openQuoteInfo.value.magnetChassis)
  //   const totalAccesorialCharges = calculateTotalAccesorialCharges(magnetAccesorialValues.value)
  //   const totalCarrierAccesorialCharges = sumCarrierAccesorialValues();
  //   const totalMagnetAccesorialCharges = sumMagnetAccesorialValues();
  //   const totalChassisCharges = parseFloat(totalSellChassisAmount.value)
  //   const buyCalculatedNumber = carrierDrayageNumber + totalCarrierAccesorialCharges + convertToNumber(totalBuyChassisAmount.value)
  //   const sellCalculatedNumber = customerDrayageNumber + totalMagnetAccesorialCharges + convertToNumber(totalSellChassisAmount.value)
  //   const profitCalculatedNumber = sellCalculatedNumber - buyCalculatedNumber
  //   modalInfo.value.totalCharges = `Drayage: $${openQuoteInfo.value.magnetFee} + Chassis: $${totalChassisCharges} ${printTotalCharges(magnetAccesorialValues.value)}`
  //   modalInfo.value.totalAmount = `$${customerDrayageNumber + totalAccesorialCharges + totalChassisCharges}`

  //   const toSalesGrossFromNormalQuotes = {
  //     operationId: modalInfo.value['ID Operation'],
  //     bookingBl: modalInfo.value['Booking/BL'],
  //     containerId: modalInfo.value['Container ID'],
  //     provider: modalInfoExtra.value['Provider'],
  //     customer: modalInfo.value.Customer,
  //     buy: buyCalculatedNumber,
  //     sell: sellCalculatedNumber,
  //     profit: profitCalculatedNumber,
  //     date: getMonthName(currentDate.getMonth()),
  //     carrierAccesorials: JSON.stringify(carrierAccesorialValues.value),
  //     magnetAccesorials: JSON.stringify(magnetAccesorialValues.value),
  //     buyChassis: totalBuyChassisAmount.value,
  //     sellChassis: totalSellChassisAmount.value
  //   }

  //   if (salesGrossInfo.value.some(item => item.operation_id === modalInfo.value['ID Operation'])) {
  //     postApi(`${import.meta.env.VITE_APP_API}/post/updateSaleGrossFromFloridaQuotes`, toSalesGrossFromNormalQuotes)
  //       .then(loadAllOperations())
  //       .catch((error) => console.log(error))
  //   } else {
  //     postApi(`${import.meta.env.VITE_APP_API}/post/newSaleGrossFromFloridaQuotes`, toSalesGrossFromNormalQuotes)
  //       .then(loadAllOperations())
  //       .catch((error) => console.log(error))
  //   }

  // } else {
  //   // if (!closedQuoteBuyChassis.value || closedQuoteBuyChassis.value === '0') {
  //   //   showToast('Please Add Buy Chassis Value', 'danger', 'red')
  //   //   return
  //   // }
  //   // if (!closedQuoteSellChassis.value || closedQuoteSellChassis.value === '0') {
  //   //   showToast('Please add Sell Chassis Value', 'danger', 'red')
  //   //   return
  //   // }
  //   sumAccesorialValues();
  //   console.log(closedQuoteInfo.value.customerDrayage)
  //   console.log(closedQuoteInfo.value.carrierDrayage)
  //   console.log(totalSellChassisAmount.value)
  //   const customerDrayageNumber = convertToNumber(closedQuoteInfo.value.customerDrayage)
  //   const carrierDrayageNumber = convertToNumber(closedQuoteInfo.value.carrierDrayage)
  //   const closedChassisNumber = convertToNumber(totalSellChassisAmount.value)
  //   const totalAccesorialCharges = calculateTotalAccesorialCharges(magnetAccesorialValues.value)
  //   const totalCarrierCharges = sumCarrierAccesorialValues();
  //   const totalMagnetCharges = sumMagnetAccesorialValues();
  //   const buyCalculatedNumber = carrierDrayageNumber + totalCarrierCharges + convertToNumber(totalBuyChassisAmount.value)
  //   const sellCalculatedNumber = customerDrayageNumber + totalMagnetCharges + convertToNumber(totalSellChassisAmount.value)
  //   const profitCalculatedNumber = sellCalculatedNumber - buyCalculatedNumber
  //   modalInfo.value.totalCharges = `Drayage: ${closedQuoteInfo.value.customerDrayage} + Chassis: $${totalSellChassisAmount.value} ${printTotalCharges(magnetAccesorialValues.value)}`
  //   modalInfo.value.totalAmount = `$${customerDrayageNumber + totalAccesorialCharges + closedChassisNumber}`
  //   const toSalesGrossFromFloridaQuotes = {
  //     operationId: modalInfo.value['ID Operation'],
  //     bookingBl: modalInfo.value['Booking/BL'],
  //     containerId: modalInfo.value['Container ID'],
  //     provider: modalInfoExtra.value['Provider'],
  //     customer: modalInfo.value.Customer,
  //     buy: buyCalculatedNumber,
  //     sell: sellCalculatedNumber,
  //     profit: profitCalculatedNumber,
  //     date: getMonthName(currentDate.getMonth()),
  //     carrierAccesorials: JSON.stringify(carrierAccesorialValues.value),
  //     magnetAccesorials: JSON.stringify(magnetAccesorialValues.value),
  //     buyChassis: totalBuyChassisAmount.value,
  //     sellChassis: totalSellChassisAmount.value
  //   }

  //   if (salesGrossInfo.value.some(item => item.operation_id === modalInfo.value['ID Operation'])) {
  //     postApi(`${import.meta.env.VITE_APP_API}/post/updateSaleGrossFromFloridaQuotes/`, toSalesGrossFromFloridaQuotes)
  //       .then(loadAllOperations())
  //       .catch((error) => console.log(error))
  //   } else {
  //     postApi(`${import.meta.env.VITE_APP_API}/post/newSaleGrossFromFloridaQuotes`, toSalesGrossFromFloridaQuotes)
  //       .then(loadAllOperations())
  //       .catch((error) => console.log(error))
  //   }
  // }
  
}

const handleGoBackToAccesorialModal = () => {
  isTableSummaryModal.value = false;
  isAccesorialModal.value = true;
  isAccesorialModal3.value = false;
  loadAllOperations()
}

const sumCarrierAccesorialValues = () => {
  let total = 0;
  for (const value of Object.values(carrierAccesorialValues.value)) {
    total += parseFloat(value) || 0 // Para convertir cada valor a numero
  }
  return total
}

const sumMagnetAccesorialValues = () => {
  let total = 0;
  for (const value of Object.values(magnetAccesorialValues.value)) {
    total += parseFloat(value) || 0
  }
  return total
}

const sumAccesorialValues = () => {
  // for (const key in carrierAccesorialValues.value) {
  //   if (Object.prototype.hasOwnProperty.call(carrierAccesorialValues.value, key)) {
  //     let sum = carrierAccesorialValues.value[key] || 0;
  //     if (magnetAccesorialValues.value[key]) {
  //       sum += magnetAccesorialValues.value[key] || 0;
  //     }
  //     totalAccesorialValues.value[key] = sum;
  //   }
  // }
  // return totalAccesorialValues;
  // Dejo la funcion en caso de volver a utilizarla a futuro, esta suma los valores de buy y sell

  for (const key in magnetAccesorialValues.value) {
    console.log(key);
    if (Object.prototype.hasOwnProperty.call(magnetAccesorialValues.value, key)) {
      totalAccesorialValues.value[key] = magnetAccesorialValues.value[key] || 0
    }
  }
  return totalAccesorialValues;
}

const printTotalCharges = (accesorialList) => {
  let formattedString = '';
  Object.entries(accesorialList).forEach(([key, value]) => {
    formattedString += `+ ${key} = $${value} `;
  });

  return formattedString;
}

const convertToNumber = (str) => {
  return parseInt(str.replace('$', ''), 10) || 0; //Funcion para remover el $ que llega desde BD
}

const calculateTotalAccesorialCharges = (accesorialList) => {
  let totalAmountValues = 0
  Object.values(accesorialList).forEach(value => {
    totalAmountValues += parseFloat(value) || 0
  })
  return totalAmountValues
}

const resetAtDismissModal = () => {
  isTableSummaryModal.value = true;
  isAccesorialModal.value = false;
  isAccesorialModal3.value = false;
  // accesorialSelected.value = {};
  // carrierAccesorialValues.value = {};
  // magnetAccesorialValues.value = {};
  // totalAccesorialValues.value = {};
  // /* First Modal Reset Values */
  // buySummaryDrayage.value = "";
  // chassisBuyRate.value = "";
  // chassisBuyQuantity.value = 1;
  // sellSummaryDrayage.value = "";
  // chassisSellRate.value = "";
  // chassisSellQuantity.value = 1;

}

const calculateTotalChassis = (summary, quantity, total) => {
  total.value = (summary.value * quantity.value).toFixed(2);
}

const buyChassisQtyOnChange = ()=> {
  sale.value.buyQtyChassis = inptChassisBuyQuantity;
}

const sellChassisQtyOnChange = ()=> {
  sale.value.sellQtyChassis = inptChassisSellQuantity;
}

const doesOperationExist = (idOperation) => {
  const foundItem = salesGrossInfo.value.find(item => item.operation_id === idOperation);

  if (foundItem) {
    isDoneOperationUpdate.value = true;
    sale.value = foundItem;
    return true;
  }
  isDoneOperationUpdate.value = false;
  sale.value = {};
  return false;
}

const chckIsAnOpenOperation = (quoteID) => {
  return quoteID.includes('MGT')
}

const feedModalSummaryTable = (drayageBuyUnit, chassisBuyQty, chassisBuyUnit, drayageSellUnit, chassisSellQty, chassisSellUnit, chassisSellTotal, buyAccesorials, sellAccesorials) => {
  inptDrayageBuyQuantity.value = 1;
  inptChassisBuyQuantity.value = chassisBuyQty;
  inptChassisBuyRate.value = chassisBuyUnit;
  inptTotalBuyChassisAmount.value = inptChassisBuyQuantity.value * inptChassisBuyRate.value;
  inptDrayageSellQuantity.value = 1;
  inptChassisSellQuantity.value = chassisSellQty;
  inptTotalSellChassisAmount.value = chassisSellTotal;
  inptBuySummaryDrayage.value = drayageBuyUnit;
  inptSellSummaryDrayage.value = drayageSellUnit;
  inptChassisSellRate.value = chassisSellUnit;
}

const feedModalAccesorial = (buyAccesorials, sellAccesorials) => {
  carrierAccesorialValues.value = buyAccesorials;
  magnetAccesorialValues.value = sellAccesorials;

  for (let key in buyAccesorials) {
    accesorialSelected.value[key] = true;
  }
  for (let key in sellAccesorials) {
    accesorialSelected.value[key] = true;
  }
}

watch([inptChassisBuyRate, inptChassisBuyQuantity], () => calculateTotalChassis(inptChassisBuyRate, inptChassisBuyQuantity, inptTotalBuyChassisAmount));

watch([inptChassisSellRate, inptChassisSellQuantity], () => calculateTotalChassis(inptChassisSellRate, inptChassisSellQuantity, inptTotalSellChassisAmount));

watch(inptChassisBuyQuantity, ()=> buyChassisQtyOnChange());
watch(inptChassisSellQuantity, ()=> sellChassisQtyOnChange());
</script>

<style lang="scss" scoped>
@import './AllOperations.scss';
@import '../../Forms/AddQuoteFeeForm/AddQuoteFeeForm.scss';
@import '../../../styles/mixin.scss';
</style>
