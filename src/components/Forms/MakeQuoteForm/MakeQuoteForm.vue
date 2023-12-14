<template>
  <main class="main">
    <div class="container main-container form">
      <form method="POST" id="form" class="mt-10">
        <div :class="{ hidden: !isLoading }">
          <div class="drayage__spin">
            <Spin />
          </div>
        </div>

        <div class="drayage" v-if="!isEmptyPort">
          <div class="drayage__business">
            <label class="drayage__business--label" for="slct_operation">Coordinator </label>
            <input type="text" class="drayage__input" :value="inptCordinator" disabled>
          </div>

          <div class="drayage__business">
            <label class="drayage__business--label" for="slct_operation">Mode of Operation</label>
            <select class="drayage__business--select" @change="operationOnChange" id="slct_operation" name="ModeOperation"
              v-model="slctOperation">
              <option selected disabled value>Select one</option>
              <option value="Import">Import</option>
              <option value="Export">Export</option>
            </select>
          </div>

          <div class="drayage__flex">
            <div class="drayage__flex--pol">
              <div class="drayage__port">
                <label class="drayage__label" for="slct_pol">{{
                  isExport ? 'POL' : 'POD'
                }}</label>
                <select @change="portOnChange" v-model="slctPOL" class="drayage__select" id="slct_pol" name="POL">
                  <option selected disabled value>Select one</option>
                  <option v-for="port in ports" :value="port.port_name" :key="port.id">
                    {{ port.port_name }}
                  </option>
                </select>
              </div>

              <div :class="{ hidden: !slctPOL }">
                <div class="drayage__spin" v-if="isEmptyCarrier">
                  <Spin />
                </div>
                <div v-else>
                  <label class="drayage__label drayage__labelCarrier" for="slct_carrier">Choose your carrier</label>
                  <select multiple v-model="slctCarrier" @change="$emit('carrierEmail', $event.target.value)"
                    class="drayage__select" name="Port carrier">
                    <option v-for="item in carrier" :key="item.index">
                      {{ item.email_address }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- <img class="drayage__image img-fluid" width="400"
                  src="http://www.magnetlogisticscorp.com/wp-content/uploads/2023/08/port-1845350_1280.jpg"
                  alt="Port of Loading Image" /> -->
            </div>

            <div class="drayage__flex--address">
              <label class="drayage__label" for="inpt_address">{{
                isExport ? 'Pick Up Address ' : 'Delivery Address'
              }}</label>

              <input class="drayage__input" placeholder="Ex: 173-133 Edgewater St, Staten Island" type="text"
                name="address" v-model="inptAddress" />

              <!-- <img
          class="drayage__image img-fluid"
          width="400"
          src="../../../public/carrier.jpg"
          alt="Delivery Image"
        /> -->
            </div>
          </div>

          <div class="drayage__equipment">
            <label class="drayage__equipment--label" for="slct_equipment">Equipment</label>
            <select class="drayage__equipment--select" id="slct_equipment" name="Equipment" v-model="slctEquipment">
              <option selected disabled value>Select one</option>
              <option value="Dry">Dry</option>
              <option value="Reefer">Reefer</option>
            </select>
          </div>

          <div class="drayage__containerSizeAndType">
            <div class="drayage__containerSizeAndType--sectionInput">
              <label class="drayage__label" for="slct_size">Container Size</label>
              <select class="drayage__select" id="slct_size" name="ContainerSize" v-model="slctSize">
                <option selected disabled value>Select one</option>
                <option value="20">20'</option>
                <option value="40">40'</option>
                <option value="45">45'</option>
              </select>
            </div>

            <div class="drayage__containerSizeAndType--sectionInput">
              <label class="drayage__label" for="slct_type">Container type</label>
              <select class="drayage__select" id="slct_type" name="ContainerType" v-model="slctType">
                <option selected disabled value>Select one</option>
                <option value="General Purpose">GENERAL PURPOSE</option>
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
          </div>

          <div class="drayage__weightCommodity">
            <div class="drayage__weightCommodity--sectionInput">
              <label class="drayage__label" for="inpt_weight">Weight</label>
              <input type="number" id="inpt_weight" class="drayage__select" placeholder="Ex: 12200"
                v-model="inptWeight" />
            </div>

            <div class="drayage__weightCommodity--sectionInput">
              <label class="drayage__label" for="slct_commodity">Commodity</label>
              <select class="drayage__select" id="slct_commodity" name="Commodity" v-model="slctCommodity"
                @change="commodityOnchange">
                <option selected disabled value="">Select one</option>
                <option value="FAK">FAK</option>
                <option value="Other">Other</option>
              </select>

              <div class="otherCommodity_box" :class="{ hidden: !isOtherCommodity }">
                <label class="drayage__label" for="inpt_other">What is the other?</label>
                <input type="text" name="Other commodity" class="drayage__select" id="inpt_other"
                  placeholder="Comment here..." v-model="inptOtherCommodity" />
              </div>
            </div>
          </div>

          <div class="drayage__heading">
            <h1 class="drayage__heading--subtitle">Cargo Type:</h1>
          </div>

          <div class="drayage__hazardousBonded">
            <div class="drayage__hazardousBonded--hazardous">
              <div>
                <label class="drayage__label">Hazardous</label>
                <input name="HazardousYes" class="drayage__chckInput" type="radio" id="chckHazardousYes" value="Yes"
                  v-model="chckHazardous" @change="hazardousOnChange" />
                <label class="drayage__chckLabel" for="chckHazardousYes">Yes</label>

                <input name="HazardousNo" class="drayage__chckInput" type="radio" id="chckHazardousNo" value="No"
                  v-model="chckHazardous" @change="hazardousOnChange" />
                <label for="chckHazardousNo">No</label>
              </div>

              <div :class="{ hidden: !isHazardous }">
                <label class="drayage__label drayage__labelHazard">Select hazardous class</label>
                <select class="drayage__select" name="Port carrier" :class="{ hidden: !isHazardous }"
                  v-model="slctHazardous">
                  <option selected disabled value="">Select one</option>
                  <option value="Class 1: Explosives">Class 1: Explosives</option>
                  <option value="Class 2: Gases">Class 2: Gases</option>
                  <option value="Class 3: Flammable Liquid and Combustible Liquid">
                    Class 3: Flammable Liquid and Combustible Liquid
                  </option>
                  <option value="Class 4: Flammable Solid, Spontaneously Combustible, adm Damgerous When Wet">
                    Class 4: Flammable Solid, Spontaneously Combustible, adm Damgerous
                    When Wet
                  </option>
                  <option value="Class 5: Oxidizer and Organic Peroxide">
                    Class 5: Oxidizer and Organic Peroxide
                  </option>
                  <option value="Class 6: Poison (Toxic) and Poison Inhalation Hazard">
                    Class 6: Poison (Toxic) and Poison Inhalation Hazard
                  </option>
                  <option value="Class 7: Radioactive">Class 7: Radioactive</option>
                  <option value="Class 8: Corrosive">Class 8: Corrosive</option>
                  <option value="Class 9: Miscellaneous">
                    Class 9: Miscellaneous
                  </option>
                  <option value="Dangerous">Dangerous</option>
                </select>
              </div>
            </div>
            <div class="drayage__hazardousBonded--bonded">
              <label class="drayage__label">Bonded</label>
              <input name="BondedYes" class="drayage__chckInput" type="radio" id="chckBondedYes" value="Yes"
                v-model="chckBonded" />
              <label class="drayage__chckLabel" for="chckBondedYes">Yes</label>

              <input name="BondedNo" class="drayage__chckInput" type="radio" id="chckBondedNo" value="No"
                v-model="chckBonded" />
              <label for="chckBondedNo">No</label>
            </div>
          </div>

          <div class="drayage__loadType">
            <div class="drayage__loadType--business">
              <label class="drayage__label" for="slct_loadType">Load Type</label>
              <select v-model="slctLoadType" class="drayage__select" id="slct_loadType" name="loadType">
                <option selected disabled value>Select one</option>
                <option value="Drop and Pick Up">Drop and Pick Up</option>
                <option value="Live Load">Live Load</option>
                <option value="Live Unload">Live Unload</option>
                <option value="Drop Hook">Drop and Hook</option>
              </select>
            </div>
          </div>

          <div class="py-3" :class="{ hidden: !isLoading2 }">
            <div class="d-flex justify-content-center">
              <Spin />
            </div>
          </div>

          <div class="drayage__btn">
            <SendButton @click="handleSubmit" name="Submit" />
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import 'mosha-vue-toastify/dist/style.css';
import { showToast } from '@/helpers/helpers.js'
// import Spin from '../../components/Spinner.vue';
import { getApi, postApi } from '@/services/apiServices';
import SendButton from '../../Buttons/SendButton/SendButton.vue';
// import ButtonSubmit from '@/views/pricingTool/ButtonSubmit.vue';
// import router from '@/router';
const isEmptyPort = ref(true);
const isEmptyCarrier = ref(true);
const inptCordinator = localStorage.getItem('userName');
let isExport = ref();
let slctOperation = ref('');
let slctEquipment = ref('');
let slctSize = ref('');
let slctType = ref('');
let slctCommodity = ref('');
let slctLoadType = ref('');
let slctPOL = ref('');
let slctCarrier = ref('');
let slctHazardous = ref('');
let chckHazardous = ref('');
let chckBonded = ref('');
let inptAddress = ref('');
let inptWeight = ref('');
let inptOtherCommodity = ref('');
let slctQuoteStatus = ref(1);
let carrier = ref([]);
let isHazardous = ref(false);
let isOtherCommodity = ref(false);
let isLoading = ref(false);
let isLoading2 = ref(false);
const ports = ref([]);

onMounted(async () => {
  isLoading.value = true
  getApi(`${import.meta.env.VITE_APP_API}/get/ports`)
    .then((data) => (ports.value = data))
    .catch((error) => console.log(error))
    .finally(() => {
      isEmptyPort.value = false
      isLoading.value = false
      isEmptyCarrier.value = false
    })
})

const portOnChange = () => {
  isEmptyCarrier.value = true
  const selectedPort = ports.value.find(
    (port) => port.port_name === slctPOL.value,
  )
  if (selectedPort) {
    getApi(`${import.meta.env.VITE_APP_API}/get/carriers/${selectedPort.id}`)
      .then((data) => (carrier.value = data))
      .catch((error) => console.log(error))
      .finally(() => {
        isEmptyCarrier.value = false
      })
  }
}

const operationOnChange = (e) => {
  if (e.target.value === 'Export') {
    isExport.value = true
    return
  }
  isExport.value = false
}

const commodityOnchange = (e) => {
  if (e.target.value === 'Other') {
    isOtherCommodity.value = true
    return
  }
  isOtherCommodity.value = false
}

const hazardousOnChange = (e) => {
  if (e.target.value === 'Yes') {
    isHazardous.value = true
    return
  }
  if (e.target.value === 'No') {
    isHazardous.value = false
  }
}

const handleSubmit = async (e) => {
  e.preventDefault()
  isLoading2.value = true

  if (
    !slctOperation.value ||
    !slctEquipment.value ||
    !inptAddress.value ||
    !slctSize.value ||
    !slctType.value ||
    !inptWeight.value ||
    !slctCommodity.value ||
    !slctLoadType.value ||
    !slctPOL.value ||
    !chckHazardous.value ||
    !chckBonded.value ||
    !slctCarrier.value
  ) {
    showToast('Please, fill out all the inputs', 'danger', 'red')
    isLoading2.value = false
    return
  }

  if (isOtherCommodity.value && !inptOtherCommodity.value) {
    showToast('Please, fill out all the inputs', 'danger', 'red')
    isLoading2.value = false
    return
  }

  if (chckHazardous.value === 'Yes' && !slctHazardous.value) {
    showToast('Please, fill out all the inputs', 'danger', 'red')
    isLoading2.value = false
    return
  }

  e.target.style.cssText = 'opacity: .5; cursor: not-allowed;'

  const quoteInfo = {
    operation: slctOperation.value,
    pol: slctPOL.value,
    address: inptAddress.value,
    carrier: slctCarrier.value,
    equipment: slctEquipment.value,
    containerSize: slctSize.value,
    ContainerType: slctType.value,
    weight: inptWeight.value,
    commodity: isOtherCommodity.value ? inptOtherCommodity.value : slctCommodity.value,
    hazardous: isHazardous.value ? slctHazardous.value : chckHazardous.value,
    bonded: chckBonded.value,
    loadType: slctLoadType.value,
    isExport: isExport.value,
    quoteStatus: slctQuoteStatus.value,
    cordinator: localStorage.getItem('userName')
  }

  postApi(`${import.meta.env.VITE_APP_API}/createQuote`, quoteInfo)
    .then((data) => {
      if (data.message === 'ok') {
        isLoading2.value = false
        router.push({ path: '/pricingtool/allQuotes' })
        showToast('The quote has been created successfully', 'success', 'green')
      }
    })
    .catch((error) => {
      console.log(error)
      showToast('Contact IT', 'danger', 'red')
      isLoading2.value = false
    })
}
</script>

<style  scoped>
@import './MakeQuoteForm.scss';
</style>
