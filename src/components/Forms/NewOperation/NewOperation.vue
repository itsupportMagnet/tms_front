<template>
  <div class="container-fluid">
    <div class="main">
      <div class="form_container" id="form">
        <form id="formu">
          <div class="row">

            <div class="col-md-3 col">
              <label> Cordinator </label>
              <select class="form-select" disabled>
                <option selected disabled value="{{ userName }}">
                  {{ userName }}
                </option>
              </select>
            </div>

            <div class="col-md-4 col">
              <label for="id">ID Operation</label>
              <input v-model="getIdUltimate" type="number" class="form-control" placeholder="Write down the ID here..."
                aria-label="default input example" id="id" disabled />
            </div>

            <div class="col col-md-4">
              <label>Quote ID</label>
              <select class="form-select" v-model="slctQuoteId" @blur="(e) => checkInpt(e)"
                @change="e => getQuoteInfo(e)">
                <option selected disabled value="">Select a Quote ID</option>
                <option>I'll define it later</option>
                <template v-if="allFloridaQuotesId && allQuoteIds">
                  <option v-for="item in allFloridaQuotesId" :key="item">{{ item.quoteID }}</option>
                  <option v-for="(item, index) in allQuoteIds" :key="index">{{ item.quoteID }}</option>
                </template>
              </select>
            </div>

            <!-- COMIENZO FORMULARIO-->

            <div class="col-md-6 col">
              <div class="card">
                <div class="card-header cardHeader">
                  General Operation
                </div>
                <div class="card-body">
                  <div class="col d-flex gap-3 flex-wrap justify-content-center">
                    <div class="col-md-3 col-12 col">
                      <label>Operation Mode</label>
                      <select class="form-select form-select-sm" id="slct_ModeOfOperation" v-model="slctModeOfOperation"
                        @blur="(e) => checkInpt(e)">
                        <option value="">Select a mode of operation</option>
                        <option selected value="IMPORT">IMPORT</option>
                        <option value="EXPORT">EXPORT</option>
                      </select>
                    </div>

                    <div class="col-md-4 col">
                      <label>Client</label>
                      <select class="form-select form-select-sm" id="slct_Customer" v-model="slctCustomer"
                        @blur="(e) => checkInpt(e)">
                        <option selected disabled value="">
                          Select a Customer
                        </option>
                        <template v-if="customers">
                          <option v-for="item in customers" :key="item.id">
                            {{ item.customer_name }}
                          </option>
                        </template>
                      </select>
                    </div>

                    <div class="col-12 col-md-4 col">
                      <label>Provider</label>
                      <select id="mySelect" v-model="slctProvider" class="form-select form-select-sm"
                        :class="paintOption(slctProvider)" @blur="(e) => checkInpt(e)">
                        <option selected disabled value="">
                          Select a provider
                        </option>
                        <template v-if="providers">
                          <option v-for="item in providers" :key="item.id">
                            {{ item.provider_name }}
                          </option>
                        </template>
                      </select>
                    </div>

                    <div class="col-12 col-md-3 col">
                      <label>State</label>
                      <select v-model="slctState" @change="statesOnChange" size="sm" @blur="(e) => checkInpt(e)"
                        class="form-select">
                        <option selected disabled value="">
                          Select a State
                        </option>
                        <template v-if="states">
                          <option v-for="item in states" :key="item.stateId">
                            {{ item.stateName }}
                          </option>
                        </template>
                      </select>
                    </div>

                    <div class="col-12 col col-md-4" v-if="!isCityEmpty">
                      <label class="label_city" for="slct_city">Choose your city</label>
                      <select v-model="slctCity" @change="$emit('cityName', $event.target.value)" name="City"
                        class="form-select">
                        <option selected disabled>Select a City</option>
                        <option v-for="item in cities" :key="item.index">
                          {{ item.cityName }}
                        </option>
                      </select>
                    </div>

                    <div class="col col-md-4">
                      <label>Operation Date</label>
                      <input v-model="slctOperationDate" class="inpt_date" type="date" size="sm"
                        @blur="(e) => checkInpt(e)" />
                    </div>

                    <div class="col col-md-4 col-12">
                      <label>Warehouse Location</label>
                      <input v-model="inptWarehouseLocation" placeholder="Add Warehouse Location" class="form-control"
                        @blur="(e) => checkInpt(e)" />
                    </div>

                    <div class="col col-12 col-md-3">
                      <label>Ports</label>
                      <select v-model="slctPort" @change="portOnChange" @blur="(e) => checkInpt(e)" class="form-select">
                        <option selected disabled value="">
                          Select a Ports
                        </option>
                        <option v-for="item in ports" :key="item.id">
                          {{ item.port_name }}
                        </option>
                      </select>
                    </div>

                    <div class="col col-12 col-md-4">
                      <label>Operation Status</label>
                      <select class="form-select" aria-label="Default select example" id="slct_Status"
                        v-model="slctStatus" :class="rowBG(slctStatus)" @blur="(e) => checkInpt(e)">
                        <option selected disabled value="">
                          Select a status
                        </option>
                        <option value="1">PENDING</option>
                        <option value="2">IN PROCESS</option>
                        <option value="3">DONE</option>
                        <option value="4">CANCELED</option>
                        <option value="5">INVOICE</option>
                      </select>
                    </div>

                    <div class="col col-12 col-md-4" v-if="!isTerminalEmpty">
                      <label class="label_terminal" for="slct_terminal">Choose your terminal</label>
                      <select v-model="slctTerminal" @change="$emit('terminalName', $event.target.value)"
                        name="Port Terminal" class="form-select">
                        <option selected disabled>Select a Terminal</option>
                        <option v-for="item in terminals" :key="item.index">
                          {{ item.terminal }}
                        </option>
                      </select>
                    </div>

                    <div class="col col-md-6">
                      <label>Full Pick Up Location</label>
                      <input v-model="inptFullLocation" placeholder="Add Full Pick Up Location"
                        @blur="(e) => checkInpt(e)" class="form-control" />
                    </div>

                    <div class="col col-md-5">
                      <label>Empty Pick Up Location </label>
                      <input v-model="inptEmptyLocation" placeholder="Add Empty Pick Up Location"
                        @blur="(e) => checkInpt(e)" type="text" class="form-control" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 col">
              <div class="card">
                <div class="card-header cardHeader"> Container </div>
                <div class="card-body">
                  <div class="col d-flex gap-3 flex-wrap justify-content-center">
                    <div class="col col-md-3" v-if="slctModeOfOperation == 'EXPORT'">
                      <label>Booking/BL</label>
                      <input v-model="inptBookingBL" placeholder="Add Booking/BL" type="text" class="form-control" />
                    </div>

                    <div class="col col-md-3" v-if="slctModeOfOperation == 'IMPORT'">
                      <label for="LFD"> LFD</label>
                      <input placeholder="Add LFD" @blur="(e) => checkInpt(e)" type="text" class="form-control"
                        v-model="inptLFD" />
                    </div>

                    <div class="col col-md-4">
                      <label>SSLINE</label>
                      <select v-model="slctSSline" size="sm" @blur="(e) => checkInpt(e)" class="form-select">
                        <option selected disabled value="">
                          Select SSLINE
                        </option>
                        <option>CMA</option>
                        <option>EVERGREEN</option>
                        <option>HAPAG</option>
                        <option>MAERSK</option>
                        <option>MSC</option>
                        <option>SEABOARD</option>
                        <option>SEALAND</option>
                        <option>ZIM</option>
                      </select>
                    </div>
                    <div class="col col-md-4" v-if="slctModeOfOperation == 'EXPORT'">
                      <label>Cargo Cut</label>
                      <input v-model="slctCargoCut" class="inpt_date" type="date" @blur="(e) => checkInpt(e)" />
                    </div>

                    <div class="col col-md-4">
                      <label>Container ID</label>
                      <input type="text" @blur="(e) => checkInpt(e)" v-model="inptContainerId"
                        placeholder="Add Container ID" class="form-control" />
                    </div>

                    <div class="col col-md-5">
                      <label>Container Size</label>
                      <select class="form-select" v-model="slctContainerSize" @blur="(e) => checkInpt(e)">
                        <option selected disabled value="">
                          Select Size
                        </option>
                        <option>20'</option>
                        <option>40'</option>
                        <option>45'</option>
                      </select>
                    </div>

                    <div class="col col-12 col-md-6">
                      <label>Container Type</label>
                      <select v-model="slctContainerType" class="form-select" @blur="(e) => checkInpt(e)">
                        <option selected disabled value>
                          Select Container Type
                        </option>
                        <option value="General Purpose">
                          GENERAL PURPOSE
                        </option>
                        <option value="Flexitank">FLEXITANK</option>
                        <option value="NOR">NOR</option>
                        <option value="Faltbed">FLATBED</option>
                        <option value="Isotank">ISOTANK</option>
                        <option value="LTL">LTL</option>
                        <option value="FTL">FTL</option>
                        <option value="High Cube">HIGH CUBE</option>
                        <option value="Flat Rack">FLAT Rack</option>
                        <option value="Standard">STANDARD</option>
                        <option value="HQ">HQ</option>
                        <option value="Reefer">REEFER</option>
                        <option value="Open Top">OPEN TOP</option>
                      </select>
                    </div>

                    <div class="col col-md-4">
                      <label>Commodity</label>
                      <select v-model="slctCommodity" @change="commodityOnchange" class="form-select">
                        <option selected disabled value="">Select Commodity</option>
                        <option>FAK</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div class="col col-md-4" :class="{ hidden: !isOtherCommodity }">
                      <label>Other Commodity</label>
                      <input type="text" class="form-control" v-model="inptOtherCommodity"
                        placeholder="Add Other Commodity" @blur="(e) => checkInpt(e)" />
                    </div>

                    <div class="col col-md-4">
                      <label>Weight (ʟʙ)</label>
                      <input type="text" v-model="inptWeight" placeholder="Add Weight" min="0" class="form-control"
                        @blur="(e) => checkInpt(e)" />
                    </div>

                    <div class="col col-12 col-md-4">
                      <label>Equipment</label>
                      <select v-model="slctEquipment" class="form-select" @blur="(e) => checkInpt(e)">
                        <option selected disabled value="">
                          Select Equipment
                        </option>
                        <option>DRY</option>
                        <option>REEFER</option>
                      </select>
                    </div>

                    <div class="col-md-4">
                      <strong>
                        <label class="form-label">Container Status</label>
                      </strong>
                      <select v-model="slctContainerStatus" @blur="(e) => checkInpt(e)" class="form-select"
                        v-if="containerStatus">
                        {{ slctStatus }}
                        <option value="" selected disabled>
                          Select a Status
                        </option>
                        <option v-for="item in containerStatus" :key="item.id">
                          {{ item.status }}
                        </option>
                      </select>
                    </div>

                    <div class="col col-12 col-md-3">
                      <label class="NewOperation__label">Hazardous</label>
                      <br />

                      <input name="HazardousYes" class="NewOperation__chckInput" type="radio" id="chckHazardousYes"
                        value="YES" v-model="chckHazardous" @click="hazardousOnChange" />
                      <label class="newOperation__chckLabel" for="chckHazardousYes">Yes</label>

                      <input name="HazardousNo" size="sm" class="NewOperation__chckInput" type="radio"
                        id="chckHazardousNo" value="NO" v-model="chckHazardous" @click="hazardousOnChange" />
                      <label class="newOperation__chckLabel" for="chckHazardousNo">No</label>
                    </div>
                    <div :class="{ hidden: !isHazardous }" class="col col-md-4">
                      <label class="col">Select hazardous class</label>
                      <select name="Port carrier" :class="{ hidden: !isHazardous }" v-model="slctHazardous"
                        class="form-select">
                        <option selected disabled value="">Select one</option>
                        <option value="Class 1: Explosives">
                          Class 1: Explosives
                        </option>
                        <option value="Class 2: Gases">Class 2: Gases</option>
                        <option value="Class 3: Flammable Liquid and Combustible Liquid">
                          Class 3: Flammable Liquid and Combustible Liquid
                        </option>
                        <option value="Class 4: Flammable Solid, Spontaneously Combustible, adm Damgerous When Wet">
                          Class 4: Flammable Solid, Spontaneously Combustible,
                          adm Damgerous When Wet
                        </option>
                        <option value="Class 5: Oxidizer and Organic Peroxide">
                          Class 5: Oxidizer and Organic Peroxide
                        </option>
                        <option value="Class 6: Poison (Toxic) and Poison Inhalation Hazard">
                          Class 6: Poison (Toxic) and Poison Inhalation Hazard
                        </option>
                        <option value="Class 7: Radioactive">
                          Class 7: Radioactive
                        </option>
                        <option value="Class 8: Corrosive">
                          Class 8: Corrosive
                        </option>
                        <option value="Class 9: Miscellaneous">
                          Class 9: Miscellaneous
                        </option>
                        <option value="Dangerous">Dangerous</option>
                      </select>
                    </div>

                    <div class="col col-12 col-md-3">
                      <div>
                        <label>Bonded</label>
                        <br />
                        <input name="BondedYes" class="newOperation__chckInput" type="radio" id="chckBondedYes"
                          value="YES" v-model="chckBonded" />
                        <label class="newOperation__chckLabel" for="chckBondedYes">Yes</label>

                        <input name="BondedNo" class="newOperation__chckInput" type="radio" id="chckBondedNo" value="NO"
                          v-model="chckBonded" />
                        <label class="newOperation__chckLabel" for="chckBondedNo">No</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a note here" id="floatingTextarea" v-model="inptNote">
                  </textarea>
                <label for="floatingTextarea">Notes</label>
              </div>
            </div>

            <div :class="{ hidden: !isLoading2 }">
              <div class="d-flex justify-content-center my-3">
                <!-- <Spinner v-if="isLoading2" /> -->
              </div>
            </div>

            <div class="d-flex justify-content-center mb-3 mt-3">
              <button @click="handleSubmit" :name="nameButton">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineExpose } from 'vue'
import { getApi, postApi } from '@/services/ApiServices'
import { showToast } from '@/helpers/helpers.js'
// import Spinner from '@/components/Spinner.vue'
// import ButtonSubmit from '@/components/ButtonSubmit.vue'
import 'mosha-vue-toastify/dist/style.css'

const props = defineProps(['idOperation'])
let slctQuoteId = ref('')
let slctCustomer = ref('')
let slctStatus = ref('')
let slctModeOfOperation = ref('IMPORT')
let slctBusinessLine = ref('DRAYAGE') //revisar en conjunto con el input de date // Se trae por Defecto el valor de Drayage
let slctOperationDate = ref('')
let slctIdCoordinator = ref('')
let inptBookingBL = ref('')
let inptContainerId = ref('')
let slctProvider = ref('')
let slctCargoStatus = ref('')
let inptFullLocation = ref('')
let inptEmptyLocation = ref('')
let inptWarehouseLocation = ref('')
let slctPort = ref('')
let slctSSline = ref('')
let slctState = ref('')
let slctCity = ref('')
let slctEquipment = ref('')
let slctContainerSize = ref('')
let slctContainerType = ref('')
let inptWeight = ref('')
let slctCommodity = ref('')
let inptOtherCommodity = ref('')
let slctHazardous = ref('')
let inptNote = ref('')
let slctContainerStatus = ref('')
let chckHazardous = ref('')
let chckBonded = ref('')
let inptLFD = ref()
let userName = localStorage.getItem('userName')
let isHazardous = ref(false)
let isOtherCommodity = ref(false)
let isLoading2 = ref(false)
let isCityEmpty = ref(true)
let isTerminalEmpty = ref(true)
let slctTerminal = ref('')
let providers = ref();
let customers = ref();
let ports = ref([]);
let cities = ref();
let states = ref();
let containerStatus = ref();
let terminals = ref([]);
let slctCargoCut = ref();
let rangeTime = ref(50);
let operations = ref([]);
let allOperationIds = ref([]);
let getIdUltimate = ref();
let allQuoteIds = ref();
let allFloridaQuotesId = ref();
let operation = ref()
let nameButton = ref('Submit')

onMounted(async () => {
  try {
    const [
      clientsData,
      portsData,
      statesData,
      providersData,
      operationsData,
      containerStatusData,
      quoteIds,
      floridaQuotesId
    ] = await Promise.all([
      getApi(`${import.meta.env.VITE_APP_API}/get/clients`),
      getApi(`${import.meta.env.VITE_APP_API}/get/ports`),
      getApi(`${import.meta.env.VITE_APP_API}/get/states`),
      getApi(`${import.meta.env.VITE_APP_API}/get/providers`),
      getApi(`${import.meta.env.VITE_APP_API}/get/all-operations`),
      getApi(`${import.meta.env.VITE_APP_API}/get/container-status`),
      getApi(`${import.meta.env.VITE_APP_API}/get/getQuoteIds`),
      getApi(`${import.meta.env.VITE_APP_API}/get/get-florida-quoteId`)
    ])

    customers.value = clientsData
    ports.value = portsData
    states.value = statesData
    providers.value = providersData
    operations.value = operationsData
    containerStatus.value = containerStatusData
    operations.value.forEach((operation) =>
      allOperationIds.value.push(operation.idOperation),
    )
    getIdUltimate.value = allOperationIds.value.at(-1) + 1 || 'NULL'
    allQuoteIds.value = quoteIds.reverse();
    allFloridaQuotesId.value = floridaQuotesId;
  } catch (error) {
    console.log(error)
  }
})

const checkInpt = (e) => {
  const parentElement = e.target.parentElement
  let p_validate = parentElement.querySelector('.text-danger')
  if (e.target.value === '' || e.target.value == 0) {
    e.target.classList.remove('border-success-subtle')
    e.target.classList.add('border', 'border-danger')
    if (!p_validate) {
      p_validate = document.createElement('span')
      p_validate.style.fontSize = '12px'
      p_validate.innerHTML = 'Required field'
      p_validate.classList.add('text-danger', 'fs-7')
      p_validate.id = 'validate'
      parentElement.appendChild(p_validate)
    }
  } else {
    e.target.classList.remove('border-danger')
    e.target.classList.add('border-success-subtle')
    if (p_validate) {
      parentElement.removeChild(p_validate)
    }
  }
}

watch(
  () => props.idOperation,
  async () => {
    nameButton.value = 'Update'
    getApi(`${import.meta.env.VITE_APP_API}/get/getOperation/${props.idOperation}`)
      .then((data) => {
        operation.value = data[0]
        if (operation.value.hazardous !== 'No') {
          chckHazardous.value = 'Yes'
          isHazardous.value = true
          slctHazardous.value = operation.value.hazardous
        } else {
          chckHazardous.value = operation.value.hazardous
          isHazardous.value = false
          slctHazardous.value = ''
        }
        if (operation.value.commodity !== 'FAK') {
          slctCommodity.value = 'Other'
          isOtherCommodity.value = true
          inptOtherCommodity.value = operation.value.commodity
        } else {
          slctCommodity.value = operation.value.commodity
          isOtherCommodity.value = false
          inptOtherCommodity.value = ''
        }

        slctTerminal.value = operation.value.terminal
        slctCargoCut.value = operation.value.cargoCut
        getIdUltimate.value = operation.value.idOperation
        inptWeight.value = operation.value.weight
        slctSSline.value = operation.value.ssline
        slctContainerSize.value = operation.value.containerSize
        slctProvider.value = operation.value.provider
        slctCustomer.value = operation.value.customer
        slctOperationDate.value = operation.value.operationDate
        inptWarehouseLocation.value = operation.value.warehouseLocation
        inptFullLocation.value = operation.value.fullLocation
        inptEmptyLocation.value = operation.value.emptyLocation
        chckBonded.value = operation.value.bonded
        slctContainerStatus.value = operation.value.containerStatus
        slctEquipment.value = operation.value.equipment
        slctContainerType.value = operation.value.containerType
        slctStatus.value = operation.value.status
        inptNote.value = operation.value.notes
        slctQuoteId.value = operation.value.quoteID
        slctModeOfOperation.value = operation.value.modeOfOperation
        slctState.value = operation.value.state
        slctPort.value = operation.value.port
        slctCity.value = operation.value.city
        inptBookingBL.value = operation.value.bookingBl
        inptContainerId.value = operation.value.containerId
        slctTerminal.value = operation.value.terminal
        inptLFD.value = operation.value.lfd
      })
      .catch((error) => console.log(error))
  },
)

const paintOption = (id) => {
  if (id == 'CONNEL TRUCKING') {
    return 'form-select-connel'
  }
  if (id == 'TRANSFORMING GREAT DESTINATIONS INC') {
    return 'form-select-transforming'
  }
  if (id == 'W.W. ROWLAND TRUCKING COMPANY') {
    return 'form-select-w'
  }
  if (id == 'GO FREIGHT HUB') {
    return 'form-select-go'
  }
  if (id == 'FEATHER LITE LOGISTICS') {
    return 'form-select-feather'
  }
  if (id == 'ROAD ONE') {
    return 'form-select-road'
  }
  if (id == 'US40 LOGISTICS') {
    return 'form-select-us40'
  }
  if (id == 'VIPER TRANSPORT') {
    return 'form-select-viper'
  }
  if (id == 'GOLDEN LOGISTICS INC') {
    return 'form-select-golden'
  }
  if (id == 'FAST WHEELS') {
    return 'form-select-fast'
  }
  if (id == 'US ONE LOGISTICS') {
    return 'form-select-us'
  }
  if (id == 'SOUTHERN COMPANIES') {
    return 'form-select-southern'
  }
  if (id == 'QUAKER TRANSPORT') {
    return 'form-select-quaker'
  }
  if (id == 'ASSET BASED INTERMODAL') {
    return 'form-select-asset'
  }
}

const rowBG = (id) => {
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
  if (id == 5) {
    return 'bg-primary text-white fw-bold '
  }
}

const portOnChange = (e) => {
  const selectedPort = ports.value.find(
    (port) => port.port_name === e.target.value,
  )

  getApi(`${import.meta.env.VITE_APP_API}/get/terminals/${selectedPort.id}`)
    .then((data) => {
      if (data.length !== 0) {
        isTerminalEmpty.value = false
        terminals.value = data
      } else {
        isTerminalEmpty.value = true
        terminals.value = []
        slctTerminal.value = ''
      }
    })
    .catch((error) => console.log(error))
}

const statesOnChange = (e) => {
  const selectedState = states.value.find(
    (state) => state.stateName === e.target.value,
  )

  getApi(`${import.meta.env.VITE_APP_API}/get/cities/${selectedState.stateId}`).then((data) => {
    if (data.length !== 0) {
      isCityEmpty.value = false
      cities.value = data
    } else {
      isCityEmpty.value = true
      cities.value = []
      slctCity.value = ''
    }
  })
}

const commodityOnchange = (e) => {
  if (e.target.value === 'Other') {
    isOtherCommodity.value = true
    return
  }
  isOtherCommodity.value = false
  inptOtherCommodity.value = null
}

const hazardousOnChange = (e) => {
  if (e.target.value === 'YES') {
    isHazardous.value = true
    chckHazardous.value = 'YES'
    return
  }

  if (e.target.value === 'NO') {
    isHazardous.value = false
    slctHazardous.value = null
    chckHazardous.value = 'NO'
    return
  }
}

const getQuoteInfo = (e) => {
  const quoteID = e.target.value;
  if (quoteID.includes('MGT')) {
    return
  }
  
  getApi(`${import.meta.env.VITE_APP_API}/get/get-florida-quote/${quoteID}`)
    .then(data => fillOutForm(data))
    .catch((error) => {
      console.log(error)
      showToast('Error, contact IT', 'danger', 'red')
    })
}

const fillOutForm = (floridaQuote) => {
  const {customer, carrier, state, wareHouse, pol, commodity, weight, equipment, hazardous, bonded} = floridaQuote;
  slctCustomer.value = customer.trim();
  slctProvider.value = carrier;
  slctState.value = state;
  inptWarehouseLocation.value = wareHouse;
  slctPort.value = pol;
  slctCommodity.value = commodity;
  inptWeight.value = weight;
  slctEquipment.value = equipment;
  chckHazardous.value = hazardous;
  chckBonded.value = bonded;
}

const handleSubmit = async (e) => {
  e.preventDefault()
  isLoading2.value = true;
  if (!props.idOperation) {
    if (
      !slctQuoteId.value ||
      !slctCustomer.value ||
      !slctStatus.value ||
      !slctModeOfOperation.value ||
      !slctBusinessLine.value ||
      !slctOperationDate.value ||
      !slctProvider.value ||
      !inptEmptyLocation.value || //slctEmptyLocation.value
      !inptFullLocation.value || // slctFullLocation.value
      !inptWarehouseLocation.value ||
      !slctPort.value ||
      !slctSSline.value ||
      !slctState.value ||
      !slctCity.value ||
      !slctEquipment.value ||
      !slctContainerSize.value ||
      !slctContainerType.value ||
      !slctContainerStatus.value ||
      !inptWeight.value ||
      !slctCommodity.value ||
      !chckHazardous.value ||
      !chckBonded.value ||
      !userName ||
      !rangeTime.value ||
      !slctContainerStatus.value
    ) {
      showToast('Please, fill out all the inputs', 'danger', 'red')
      isLoading2.value = false
      return
    }
    if (slctModeOfOperation.value == 'IMPORT') {
      if (!inptLFD.value) {
        showToast('Please, fill out all the inputs', 'danger', 'red')
        return
      }
      ; (slctCargoCut.value = 'NULL'), (inptBookingBL.value = 'NULL')
    }

    if (slctModeOfOperation.value == 'EXPORT') {
      if (!slctCargoCut.value || !inptBookingBL.value) {
        showToast('Please, fill out all the inputs', 'danger', 'red')
        return
      }
      inptContainerId.value = 'PENDING'
      inptLFD.value = 'NULL'
    }

    if (isOtherCommodity.value && !inptOtherCommodity.value) {
      showToast('Please, fill out all the inputs', 'danger', 'red')
      isLoading2.value = false
      return
    }

    if (chckHazardous.value === 'Yes' && !slctHazardous.value) {
      showToast('Hazardous is not filled out', 'danger', 'red')
      isLoading2.value = false
      return
    }

    if (!isTerminalEmpty.value && !terminals.value) {
      showToast('Terminal is empty', 'danger', 'red')
      isLoading2.value = false
      return
    }

    const newOperationInfo = {
      quoteID: slctQuoteId.value, //
      customer: slctCustomer.value, //
      idOperation: getIdUltimate.value, //
      status: slctStatus.value, //
      containerStatus: slctContainerStatus.value, //
      modeOfOperation: slctModeOfOperation.value, //
      businessLine: slctBusinessLine.value, // por interno
      operationDate: slctOperationDate.value, //
      coordinator: userName, // por interno
      bookingBl: inptBookingBL.value, //
      containerId: inptContainerId.value, //
      provider: slctProvider.value,
      emptyLocation: inptEmptyLocation.value,
      fullLocation: inptFullLocation.value, //inptFullLocation.value
      warehouseLocation: inptWarehouseLocation.value, //
      port: slctPort.value, //
      terminal: slctTerminal.value, //
      ssline: slctSSline.value, //
      state: slctState.value, //
      city: slctCity.value, //
      equipment: slctEquipment.value, //
      containerSize: slctContainerSize.value, //
      containerType: slctContainerType.value, //
      weight: inptWeight.value, //
      commodity: isOtherCommodity.value //
        ? inptOtherCommodity.value
        : slctCommodity.value,
      hazardous: isHazardous.value ? slctHazardous.value : chckHazardous.value, //
      bonded: chckBonded.value, //
      cargoCut: slctCargoCut.value, //
      timeLine: rangeTime.value,
      notes: inptNote.value, //
    }

    postApi(`${import.meta.env.VITE_APP_API}/post/newOperation`, newOperationInfo)
      .then((data) => {
        if (data.message === 'ok') {
          isLoading2.value = false
          showToast('Operation Created Successfully', 'success', 'green')
          getIdUltimate.value += 1
          clearFormFields()
        }
      })
      .catch((error) => {
        console.log(error)
        showToast('Contact IT', 'danger', 'red')
        isLoading2.value = false
      })

    postApi(`${import.meta.env.VITE_APP_API}/post/updateOperation`, newOperationInfo)
      .then((data) => {
        if (data.message == 'ok') {
          isLoading2.value = false
          showToast('Operation Updated successfully', 'success', 'green')
        }
      })
      .catch((error) => {
        console.log(error)
        showToast('Contact IT', 'danger', 'red')
        isLoading2.value = false
      })
  } else {
    const updateOperation = {
      quoteID: slctQuoteId.value,
      status: slctStatus.value,
      containerStatus: slctContainerStatus.value,
      modeOfOperation: slctModeOfOperation.value,
      customer: slctCustomer.value,
      businessLine: slctBusinessLine.value,
      operationDate: slctOperationDate.value,
      coordinator: userName,
      bookingBl: inptBookingBL.value,
      containerId: inptContainerId.value,
      provider: slctProvider.value,
      emptyLocation: inptEmptyLocation.value,
      fullLocation: inptFullLocation.value,
      warehouseLocation: inptWarehouseLocation.value,
      port: slctPort.value,
      terminal: slctTerminal.value,
      ssline: slctSSline.value,
      state: slctState.value,
      city: slctCity.value,
      equipment: slctEquipment.value,
      containerSize: slctContainerSize.value,
      containerType: slctContainerType.value,
      weight: inptWeight.value,
      commodity: isOtherCommodity.value
        ? inptOtherCommodity.value
        : slctCommodity.value,
      hazardous: isHazardous.value ? slctHazardous.value : chckHazardous.value,
      bonded: chckBonded.value,
      cargoCut: slctCargoCut.value,
      notes: inptNote.value,
      idOperation: props.idOperation,
      lfd: inptLFD.value,
    }

    postApi(`${import.meta.env.VITE_APP_API}/post/updateOperation`, updateOperation)
      .then((data) => {
        if (data.message == 'ok') {
          isLoading2.value = false
          showToast('Operation Updated', 'success', 'green')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const clearFormFields = () => {
  ; (slctQuoteId.value = ''),
    (slctCustomer.value = ''),
    (slctStatus.value = ''),
    (slctModeOfOperation.value = ''),
    (slctOperationDate.value = ''),
    (slctIdCoordinator.value = ''),
    (inptBookingBL.value = ''),
    (inptContainerId.value = ''),
    (slctProvider.value = ''),
    (slctCargoStatus.value = ''),
    (inptEmptyLocation.value = ''),
    (inptFullLocation.value = ''),
    (inptWarehouseLocation.value = ''),
    (slctPort.value = ''),
    (slctTerminal.value = ''),
    (slctSSline.value = ''),
    (slctState.value = ''),
    (slctCity.value = ''),
    (slctEquipment.value = ''),
    (slctContainerSize.value = ''),
    (slctContainerType.value = ''),
    (inptWeight.value = ''),
    (slctCommodity.value = ''),
    (inptOtherCommodity.value = ''),
    (chckHazardous.value = ''),
    (slctHazardous.value = ''),
    (chckBonded.value = ''),
    (isCityEmpty.value = true)
  isTerminalEmpty.value = true
  isOtherCommodity.value = false
  isHazardous.value = true
}

defineExpose({ clearFormFields })
</script>

<style lang="scss" scoped>
@import './NewOperation.scss';
</style>
