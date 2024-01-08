<template>
<main class="main">
    <div class="d-flex justify-content-center toast1" v-if="showError">
      <!-- <ToastCoreUI :title="showMessage" :color="showColor" /> -->
    </div>

    <div class="main-container">
      <form method="POST" id="form" class="sendQuote__form">
        <label class="sendQuote__form--labelId" for="inpt_id">Quote ID</label>
        <input type="text" placeholder="Wrote the Quote ID Here..." class="sendQuote__form--inputId" id="inpt_id"
          name="LineBusiness" v-model="inptId" />
        <ButtonSubmit class="sendQuote__form--btnSubmit" @click="handleIdSubmit" name="Get Quote" />
        <div v-if="isLoading1">
          <div class="spinner-container">
            <Spinner />
          </div>
        </div>
      </form>

      <div v-if="quote" class="quoteContainer" ref="pdfContent">
        <div id="to-convert">
          <header class="quoteContainer__header">
            <div style="display: flex; justify-content: center" class="quoteContainer__header--imgContanier">
              <img width="150" src="/dashboard/logo-black.png" alt="logo" />
            </div>
            <div style="
                margin-top: 40px;
                display: flex;
                justify-content: space-between;
                font-size: 15px;
              " class="quoteContainer__header--headerInfo">
              <div class="magnet-info">
                <p>
                  <b>Address:</b> 3115 Terramar St, 14, Fort Lauderdale, FL
                  33304
                </p>
                <p><b>Web Page:</b> www.magnetlogisticscorp.com</p>

                <p>
                  <b>Name: </b>
                  <span> {{ userName }} </span>
                </p>

                <p><b>Phone:</b> 754 242 5988</p>
                <p>
                  <b>Email: </b>
                  <span class="underline decoration-2 decoration-gray-500">sales@magnetlogisticscorp.com</span>
                </p>
              </div>

              <div class="customer-info">
                <p class="customer-section">
                  <b>Customer:</b>
                  <select class="select" v-if="customers" v-model="customer" @change="(e) => customerOnChange(e)">
                    <option selected disabled>Choose one</option>
                    <option v-for="(item, index) in customers" :key="index">
                      {{ item.customer_name }}
                    </option>
                  </select>
                </p>

                <p class="customer-section">
                  <b>Generated: </b>
                  {{ getTodaysDate() }}
                </p>

                <p class="customer-section">
                  <b>Expires: </b>
                  {{ getDateOneMonthLater(getTodaysDate()) }}
                </p>
              </div>
            </div>
          </header>

          <div class="quoteContainer__main" style="margin-top: 1rem">
            <div class="quoteContainer__main--locationsDetails" style="
                display: flex;
                padding: 1.5rem 0;
                justify-content: center;
                align-items: center;
                border: 1px solid #9ca3af;
                text-align: center;
              ">
              <div class="locationsDetails__box" style="flex-basis: 20%">
                <i class="fa-solid fa-location-dot locationsDetails__box--icon" style="color: #a5a5a5"></i>
                <h3 class="locationsDetails__box--text" style="
                    font-size: 1.1rem;
                    margin-top: 0.75rem;
                    text-align: center;
                  ">
                  {{ quote.pol }}
                </h3>
              </div>

              <div class="locationSection">
                <img class="locationSection--img" style="width: 120px" src="/dashboard/magnet-truck.png"
                  alt="magnet truck" />
                <h3 class="mt-2 locationsDetails__box--text" style="
                    font-size: 1.1rem;
                    margin-top: 0.75rem;
                    text-align: center;
                  ">
                  Miles
                </h3>
                <input style="text-align: center" class="inptMiles" placeholder="Miles" type="number" v-model="miles" />
              </div>

              <div class="locationsDetails__box locationsDetails__box--icon" style="flex-basis: 20%">
                <i class="fa-solid fa-location-dot text-4xl" style="color: #a5a5a5"></i>
                <h3 class="mt-3 text-center locationsDetails__box--text" style="
                    font-size: 1.1rem;
                    margin-top: 0.75rem;
                    text-align: center;
                  ">
                  {{ quote.deliveryAddress }}
                </h3>
              </div>
            </div>

            <div class="quoteContainer__main--shipmentDetails" style="margin-top: 2rem">
              <h1 class="cardTitle"
                style="padding: 0.25rem; font-size: 1.125rem; line-height: 1.75rem; text-align: center; background-color: #1d4ed8; color: white; border: 1px solid white border: 1px solid white;">
                SHIPMENT DETAILS
              </h1>

              <table class="sendTable" style="width: 100%; margin-top: 1rem">
                <tr class="sendTr" style="border: 2px solid #bdbdbd">
                  <th class="sendTh" style="
                      background-color: #1d4ed8;
                      padding: 3px 15px;
                      font-size: 13px;
                      width: 20%;
                      text-align: center;
                      color: white;
                      border: 1px solid white;
                    ">
                    Quote ID
                  </th>
                  <td class="sendTd" style="padding-left: 7px; font-size: 13px; font-weight: 500">
                    {{ quote.quoteID }}
                  </td>
                </tr>
                <tr class="sendTr" style="border: 2px solid #bdbdbd; border-top: none">
                  <th class="sendTh" style="
                      background-color: #1d4ed8;
                      padding: 3px 15px;
                      font-size: 13px;
                      width: 20%;
                      text-align: center;
                      color: white;
                      border: 1px solid white;
                    ">
                    Mode of Operation
                  </th>
                  <td class="sendTd" style="padding-left: 7px; font-size: 13px; font-weight: 500">
                    {{ quote.modeOfOperation }}
                  </td>
                </tr>
                <tr class="sendTr" style="border: 2px solid #bdbdbd; border-top: none">
                  <th class="sendTh" style="
                      background-color: #1d4ed8;
                      padding: 3px 15px;
                      font-size: 13px;
                      width: 20%;
                      text-align: center;
                      color: white;
                      border: 1px solid white;
                    ">
                    {{ quote.modeOfOperation === 'Import' ? 'POD' : 'POL' }}
                  </th>
                  <td class="sendTd" style="padding-left: 7px; font-size: 13px; font-weight: 500">
                    {{ quote.pol }}
                  </td>
                </tr>
                <tr class="sendTr" style="border: 2px solid #bdbdbd; border-top: none">
                  <th class="sendTh" style="
                      background-color: #1d4ed8;
                      padding: 3px 15px;
                      font-size: 13px;
                      width: 20%;
                      text-align: center;
                      color: white;
                      border: 1px solid white;
                    ">
                    {{
                      quote.modeOfOperation === 'Import'
                      ? 'Delivery Adrress'
                      : 'Pick Up Address'
                    }}
                  </th>
                  <td class="sendTd" style="padding-left: 7px; font-size: 13px; font-weight: 500">
                    {{ quote.deliveryAddress }}
                  </td>
                </tr>
                <tr class="sendTr" style="border: 2px solid #bdbdbd; border-top: none">
                  <th class="sendTh" style="
                      background-color: #1d4ed8;
                      padding: 3px 15px;
                      font-size: 13px;
                      width: 20%;
                      text-align: center;
                      color: white;
                      border: 1px solid white;
                    ">
                    Equipment
                  </th>
                  <td class="sendTd" style="padding-left: 7px; font-size: 13px; font-weight: 500">
                    {{ quote.equipment }}
                  </td>
                </tr>
                <tr class="sendTr" style="border: 2px solid #bdbdbd; border-top: none">
                  <th class="sendTh" style="
                      background-color: #1d4ed8;
                      padding: 3px 15px;
                      font-size: 13px;
                      width: 20%;
                      text-align: center;
                      color: white;
                      border: 1px solid white;
                    ">
                    Container Size
                  </th>
                  <td class="sendTd" style="padding-left: 7px; font-size: 13px; font-weight: 500">
                    {{ quote.containerSize }}
                  </td>
                </tr>
                <tr class="sendTr" style="border: 2px solid #bdbdbd; border-top: none">
                  <th class="sendTh" style="
                      background-color: #1d4ed8;
                      padding: 3px 15px;
                      font-size: 13px;
                      width: 20%;
                      text-align: center;
                      color: white;
                      border: 1px solid white;
                    ">
                    Container Type
                  </th>
                  <td class="sendTd" style="padding-left: 7px; font-size: 13px; font-weight: 500">
                    {{ quote.containerType }}
                  </td>
                </tr>
                <tr class="sendTr" style="border: 2px solid #bdbdbd; border-top: none">
                  <th class="sendTh" style="
                      background-color: #1d4ed8;
                      padding: 3px 15px;
                      font-size: 13px;
                      width: 20%;
                      text-align: center;
                      color: white;
                      border: 1px solid white;
                    ">
                    Weight
                  </th>
                  <td class="sendTd" style="padding-left: 7px; font-size: 13px; font-weight: 500">
                    {{ quote.weight }}
                  </td>
                </tr>
                <tr class="sendTr" style="border: 2px solid #bdbdbd; border-top: none">
                  <th class="sendTh" style="
                      background-color: #1d4ed8;
                      padding: 3px 15px;
                      font-size: 13px;
                      width: 20%;
                      text-align: center;
                      color: white;
                      border: 1px solid white;
                    ">
                    Commodity
                  </th>
                  <td class="sendTd" style="padding-left: 7px; font-size: 13px; font-weight: 500">
                    {{ quote.commodity }}
                  </td>
                </tr>
                <tr class="sendTr" style="border: 2px solid #bdbdbd; border-top: none" v-if="quote.otherCommodity">
                  <th class="sendTh" style="
                      background-color: #1d4ed8;
                      padding: 3px 15px;
                      font-size: 13px;
                      width: 20%;
                      text-align: center;
                      color: white;
                      border: 1px solid white;
                    ">
                    Other Commodity
                  </th>
                  <td class="sendTd" style="padding-left: 7px; font-size: 13px; font-weight: 500">
                    {{ quote.otherCommodity }}
                  </td>
                </tr>
                <tr class="sendTr" style="border: 2px solid #bdbdbd; border-top: none">
                  <th class="sendTh" style="
                      background-color: #1d4ed8;
                      padding: 3px 15px;
                      font-size: 13px;
                      width: 20%;
                      text-align: center;
                      color: white;
                      border: 1px solid white;
                    ">
                    Hazardous
                  </th>
                  <td class="sendTd" style="padding-left: 7px; font-size: 13px; font-weight: 500">
                    {{ quote.hazardous }}
                  </td>
                </tr>
                <tr class="sendTr" style="border: 2px solid #bdbdbd; border-top: none" v-if="quote.hazardousClass">
                  <th class="sendTh" style="
                      background-color: #1d4ed8;
                      padding: 3px 15px;
                      font-size: 13px;
                      width: 20%;
                      text-align: center;
                      color: white;
                      border: 1px solid white;
                    ">
                    Hazardous Class
                  </th>
                  <td class="sendTd" style="padding-left: 7px; font-size: 13px; font-weight: 500">
                    {{ quote.hazardousClass }}
                  </td>
                </tr>
                <tr class="sendTr" style="border: 2px solid #bdbdbd; border-top: none">
                  <th class="sendTh" style="
                      background-color: #1d4ed8;
                      padding: 3px 15px;
                      font-size: 13px;
                      width: 20%;
                      text-align: center;
                      color: white;
                      border: 1px solid white;
                    ">
                    Bonded
                  </th>
                  <td class="sendTd" style="padding-left: 7px; font-size: 13px; font-weight: 500">
                    {{ quote.bonded }}
                  </td>
                </tr>
                <tr class="sendTr" style="border: 2px solid #bdbdbd; border-top: none">
                  <th class="sendTh" style="
                      background-color: #1d4ed8;
                      padding: 3px 15px;
                      font-size: 13px;
                      width: 20%;
                      text-align: center;
                      color: white;
                      border: 1px solid white;
                    ">
                    Load Type
                  </th>
                  <td class="sendTd" style="padding-left: 7px; font-size: 13px; font-weight: 500">
                    {{ quote.loadType }}
                  </td>
                </tr>
                <tr class="sendTr" style="border: 2px solid #bdbdbd; border-top: none">
                  <th class="sendTh" style="
                      background-color: #1d4ed8;
                      padding: 3px 15px;
                      font-size: 13px;
                      width: 20%;
                      text-align: center;
                      color: white;
                      border: 1px solid white;
                    ">
                    Date
                  </th>
                  <td class="sendTd" style="padding-left: 7px; font-size: 13px; font-weight: 500">
                    {{ quote.date }}
                  </td>
                </tr>
              </table>
            </div>

            <div class="quoteContainer__main--priceDetails" style="margin-top: 2rem">
              <h1 class="cartTitle" style="
                  padding: 0.25rem;
                  font-size: 1.125rem;
                  line-height: 1.75rem;
                  text-align: center;
                  background-color: #1d4ed8;
                  color: white;
                  border: 1px solid white;
                ">
                QUOTE DETAILS
              </h1>

              <table class="priceTable" style="width: 100%; text-align: center">
                <tbody>
                  <tr class="trHead" style="font-size: 14px; font-weight: 700">
                    <td style="width: 20%">Concept</td>
                    <td style="width: 20%">Quantity</td>
                    <td style="width: 20%">Unit</td>
                    <td style="width: 20%">Unit Price</td>
                    <td style="width: 20%">Total Concept</td>
                    <!-- <td class="">Total Price</td> -->
                  </tr>
                  <!-- DRAYAGE -->
                  <tr class="drayageConcept" style="
                      margin-top: 0.25rem;
                      text-align: center;
                      font-size: 13px;
                    ">
                    <td style="text-align: center;">Drayage</td>
                    <td>
                      <input type="number" v-model="drayageQuantity" @change="" min="0"
                        inputmode="numeric" pattern="[0-9]*" oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                        style="text-align: center" />
                    </td>
                    <td>Per container</td>
                    <td>${{ quote.sellDrayageUnitRate }}</td>
                    <td>${{ totalDrayageToSend }}</td>
                  </tr>


                  <!-- CHASSIS -->
                  <tr class="chassisConcept" style="text-align: center; font-size: 13px">
                    <td class="tdChassis"> Chassis
                      <!-- <input v-model="inptChassisType" type="text" style="text-align: center" /> -->
                    </td>
                    <td>
                      <input type="number" v-model="chassisQuantity" @change="" min="0"
                        inputmode="numeric" pattern="[0-9]*" oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                        style="text-align: center" />
                    </td>
                    <td>Per day</td>
                    <td>${{ quote.sellChassisUnitRate }}</td>
                    <td>${{ totalChassisToSend }}</td>
                  </tr>
                </tbody>
              </table>

              <div class="totalPriceContainer" style="
                  display: flex;
                  align-items: center;
                  margin-top: 2rem;
                  gap: 1.25rem;
                  justify-content: flex-end;
                  width: 100%;
                  font-size: 1rem;
                  font-weight: 600;
                  line-height: 1.75rem;
                ">
                <h1 class="totalPriceTitle" style="font-size: 1.2rem; font-weight: 700">
                  TOTAL
                </h1>
                <h2 class="totalPrice" style="
                    border-top: 3px solid #9ca3af;
                    width: 13rem;
                    text-align: center;
                    font-size: 1rem;
                  ">
                  ${{ totalFeeToSent }}
                </h2>
              </div>
            </div>

            <div v-if="quote.notes" class="noteContainer" style="margin-top: 1rem;">
              <h1 class="cartTitle" style="
                  padding: 0.25rem;
                  margin-top: 1.5rem;
                  font-size: 1.125rem;
                  line-height: 1.75rem;
                  text-align: center;
                  background-color: #1d4ed8;
                  color: white;
                  border: 1px solid white;
                ">
                SPECIAL NOTES
              </h1>
              <p style="text-align: center;">{{ quote.notes }}</p>
            </div>

            <div class="quoteContainer__main--mayApplyDetails">
              <h1 class="cartTitle" style="
                  padding: 0.25rem;
                  margin-top: 1.5rem;
                  font-size: 1.125rem;
                  line-height: 1.75rem;
                  text-align: center;
                  background-color: #1d4ed8;
                  color: white;
                  border: 1px solid white;
                " v-if="Object.keys(quote.sellAccesorials).length > 0">
                ACCESORIAL CHARGES THAT WILL APPLY
              </h1>

              <div v-if="Object.keys(quote.buyAccesorials).length > 0" class="accesorialContainer" style="
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 0.3rem;
                    justify-content: space-evenly;
                ">
                <div v-for="(value, item, index) in totalAccesorials" :key="index"
                  class="accesorialContainer__accesorialColumn" style="
                    margin-top: 0.7rem;
                    text-align: center;
                    flex-basis: 25%;
                    font-size: 0.9rem;
                    font-weight: 600;
                  ">
                  <p>{{ item }}: ${{ value }}</p>
                </div>
              </div>

              <h1 style="
                  margin: 2rem 0;
                  padding: 0.25rem;
                  margin-top: 1.5rem;
                  font-size: 1.125rem;
                  line-height: 1.75rem;
                  text-align: center;
                  background-color: #1d4ed8;
                  color: white;
                  border: 1px solid white;
                ">
                ACCESORIAL CHARGES THAT MAY APPLY
              </h1>

              <div class="noValueAccesorialsList" style="
                  text-align: center;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  column-gap: 0.5rem;
                ">
                <p v-for="(item, index) in allAccesorials" :key="index" style="flex-basis: 12%; font-size: 0.9rem">
                  {{ item.accesorial }}
                </p>
              </div>
            </div>

            <div class="quoteContainer__main--remarksDetails" style="margin-top: 1rem">
              <h1 class="cardTitle" style="
                  padding: 0.25rem;
                  margin-top: 1.5rem;
                  font-size: 1.125rem;
                  line-height: 1.75rem;
                  text-align: center;
                  background-color: #1d4ed8;
                  color: white;
                  border: 1px solid white;
                ">
                SPECIAL REMARKS
              </h1>

              <p class="cardDescription" style="font-size: 0.7rem">
                Magnet Logistics will not accept liability for Detention/Per
                Diem/ Demurrage, including but not limited to per diem charges
                that begin accruing after the date an intermodal unit is dropped
                at a shipper/consignee and/or Special Equipment. This rate quote
                is valid for 2 days. Fuel surcharge included. 1 free hour
                loading/discharge included ($80 per hour after that). Trucker
                availability may change according to demand. If you want to lock
                rate 25 % deposit. All requests for availability and work orders
                should be sent to sales@magnetlogisticscorp.com for Florida, and
                to sales@magnetlogisticscorp.com for National Wide. Rate quote
                is not confirmation that Magnet Logistics will haul your
                shipment. In case of cancelation, fee will be applied.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="quote" class="emailInputContainer">
        <!-- <div class="emailInputContainer__box">
            <label for="inpt_subjectEmail">Subject email</label>
            <input type="text" id="inpt_subjectEmail" placeholder="Write down the email subject here..."
              v-model="inptSubjectEmail" />

            <div class="customerSlct-container" v-if="clientEmailsList.length">
              <label for="inpt_clientEmail">Client email</label>
              <input
              type="text"
              id="inpt_clientEmail"
              placeholder="example@domine.com"
              class="inptEmail mb-2"
            />
              <select
                class="slct_customerEmails"
                multiple
                v-model="slctCustomerEmails"
              >
                <option v-for="(item, index) in clientEmailsList" :key="index">
                  {{ item }}
                </option>
              </select>
            </div>
          </div> -->
        <!-- <button @click="addEmailInput" class="btnAddEmail">+</button> -->

        <div v-if="isLoading2">
          <div class="d-flex justify-content-center">
            <Spin />
          </div>
        </div>

        <button class="btnSubmit" @click="generatePdf">Download PDF</button>
      </div>
    </div>
  </main>
</template>

<script setup>

import { ref, onMounted, watch } from 'vue'
import Spinner from '../../Spinner/Spinner.vue';
import 'mosha-vue-toastify/dist/style.css'
import { showToast } from '@/helpers/helpers.js'
import { getApi } from '../../../services/apiServices';
import ButtonSubmit from '../../../components/Buttons/ButtonSubmit/ButtonSubmit.vue'
import html2pdf from 'html2pdf.js'

const inptId = ref('');
const quote = ref('');
const allAccesorials = ref('');
const clientEmailsList = ref([]);
const userName = ref(localStorage.getItem('userName'));
const customer = ref('');
const miles = ref(0);
const drayageQuantity = ref(1);
const chassisQuantity = ref(1);
const totalDrayage = ref();
const totalChassis = ref();
const totalDrayageToSend = ref();
const totalChassisToSend = ref();
const totalAccesorials = ref({});
const totalFeeToSent = ref();
const isLoading1 = ref(false);
const isLoading2 = ref(false);
const hasError = ref(false);
const showError = ref(false);
const customers = ref('');
const pdfContent = ref(null);
let sellDrayageUnitRate = ref(0);
let sellChassisUnitRate = ref(0);

onMounted(async () => {
  getApi(`${import.meta.env.VITE_APP_API}/get/clients`)
    .then((data) => {
      customers.value = data
    })
    .catch((error) => console.log(error))
})

const handleIdSubmit = async (e) => {
  showError.value = false
  e.preventDefault()
  isLoading1.value = true

  if (inptId.value.trim() === '') {
    isLoading1.value = false
    showToast("Input quote's in blank", 'danger', 'red')
    hasError.value = true
    return
  }

  const idValue = inptId.value.toUpperCase()
  
  getApi(`${import.meta.env.VITE_APP_API}/get/quotes-fees/${idValue}`)
    .then((data) => {
      if (Object.keys(data).length === 0) {
        isLoading1.value = false
        showToast("There's no fee on this quote", 'danger', 'red')
        return
      }
      getApi(`${import.meta.env.VITE_APP_API}/get/accesorials`)
        .then((data) => (allAccesorials.value = data))
        .catch((error) => console.log(error))
      isLoading1.value = false
      
      quote.value = getCheapestFee(data);
      sellDrayageUnitRate.value = quote.value.sellDrayageUnitRate
      sellChassisUnitRate.value = quote.value.sellChassisUnitRate
      totalDrayage.value = parseFloat(quote.value.buyDrayageUnitRate).toFixed(2);
      totalChassis.value = parseFloat(quote.value.buyAccesorials).toFixed(2);
      totalDrayageToSend.value = parseFloat(quote.value.sellDrayageUnitRate).toFixed(2)
      totalChassisToSend.value = parseFloat(quote.value.sellAccesorials).toFixed(2)
      totalChassisToSend.value = parseFloat(quote.value.sellChassisUnitRate).toFixed(2)
      totalFeeToSent.value = (
        parseFloat(totalDrayageToSend.value) +
        parseFloat(totalChassisToSend.value)
      ).toFixed(2);
      totalAccesorials.value = quote.value.sellAccesorials;
    })
    .catch((error) => {
      console.log(error)
      showToast(
        'Something went wrong, please, contact somebody from IT departament',
        'danger',
        'red',
      )
    })
}

const customerOnChange = (e) => {
  const customerEmails = customers.value.filter(
    (i) => i.customer_name === e.target.value,
  )
  clientEmailsList.value = customerEmails[0].customer_email
}

const getCheapestFee = (carriersArray) => {
  if (carriersArray.length === 0)
    return null
  const lowestFee = carriersArray.reduce((el, acc) => {
    return el.buyDrayageUnitRate > acc.buyDrayageUnitRate ? acc : el
  })
  return lowestFee
}

// const addEmailInput = () => {
//   const inptBox = document.querySelector('.emailInputContainer__box')
//   const inpt = document.createElement('input')
//   inpt.classList.add('inptEmail', 'mb-2', 'py-2')
//   inpt.placeholder = 'example@domine.com'
//   inptBox.appendChild(inpt)
// }

// const readAllEmails = () => {
//   isAnyEmailEmpty.value = false
//   const inputElements = document.querySelectorAll('.inptEmail')

//   inputElements.forEach((i) => {
//     if (!i.value) {
//       isAnyEmailEmpty.value = true
//       return
//     }

//     clientEmailsList.value.push(i.value)
//   })
// }

// const sendQuoteFee = async () => {
//   if (checkEmptyInputs()) {
//     quote.value.userName = userName.value
//     quote.value.miles = miles.value
//     quote.value.drayageQuantity = drayageQuantity.value
//     quote.value.drayageUnitPrice = quote.value.totalFee
//     quote.value.drayageTotalConcept = totalDrayageToSend.value
//     quote.value.chassisType = inptChassisType.value
//     quote.value.chassisQuantity = chassisQuantity.value
//     quote.value.chassisUnitPrice = totalChassis.value
//     quote.value.chassisTotalConcept = totalChassisToSend.value
//     quote.value.totalFeeToSend = totalFeeToSent.value
//     quote.value.accesorialsWithFee = totalAccesorials.value
//     quote.value.accesorialsList = allAccesorials.value
//     // quote.value.emailSubject = inptSubjectEmail.value;
//     quote.value.client = customer.value
//     quote.value.clientEmailsList = slctCustomerEmails.value
//     delete quote.value.totalFee
//     const newQuoteInfo = JSON.parse(JSON.stringify(quote.value))

//     postApi(`${import.meta.env.VITE_APP_API}/post/send-fee`, newQuoteInfo)
//       .then((data) => {
//         if (data.message === 'ok') {
//           isLoading2.value = false
//           window.location.href =
//             'http://www.magnetlogisticscorp.com/quote-sent/'
//         } else {
//           isLoading2.value = false
//           showToast(
//             'Something went wrong, please, contact somebody from IT departament',
//             'danger',
//             'red',
//           )
//         }
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }
// }

const checkEmptyInputs = () => {
  showError.value = false
  isLoading2.value = true
  // readAllEmails()
  // const numberRegex = /^[1-9]+$/;

  if (!userName.value || !miles.value) {
    showToast('Please, fill out all the inputs', 'danger', 'red')
    isLoading2.value = false
    return false
  }

  isLoading2.value = false
  return true

  // if (!numberRegex.test(miles.value) || miles.value === 0) {

  //   showToast("Please, enter whole numbers", "danger", "red")
  //   isLoading2.value = false;
  //   return;
  // }

  // if (isAnyEmailEmpty.value) {
  //   showToast("Please, write down all the email clients", "danger", "red")
  //   isLoading2.value = false
  //   return
  // }
}

const generatePdf = () => {
  if (checkEmptyInputs()) {
    const elementToConvert = document.getElementById('to-convert')
    const inputStyles = [];
    const inputFields = elementToConvert.querySelectorAll('input');
    inputFields.forEach(input => {
      inputStyles.push({ element: input, originalBorderStyle: input.style.border });
      // Oculta el borde de los campos de entrada para la creación del PDF
      input.style.border = 'none';
    });

    const selectStyles = [];
    const selectFields = elementToConvert.querySelectorAll('select');
    selectFields.forEach(select => {
      selectStyles.push({ element: select, originalBorderStyle: select.style.border });
      // Oculta el borde de los campos de selección (select) para la creación del PDF
      select.style.border = 'none';
    });
    const options = {
      margin: 10,
      filename: 'New-quotation.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: 'avoid-all' },
    }
    options.jsPDF.format = [210, 600]
    const pdfInstance = html2pdf().from(elementToConvert).set(options);

    // Restaura los estilos originales después de generar el PDF
    pdfInstance.save().then(() => {
      inputStyles.forEach(inputStyle => {
        // Restaura el estilo del borde a su valor original
        inputStyle.element.style.border = inputStyle.originalBorderStyle;
      });

      selectStyles.forEach(selectStyle => {
        // Restaura el estilo del borde a su valor original
        selectStyle.element.style.border = selectStyle.originalBorderStyle;
      });
    });
  }
}

const getTodaysDate = () => {
  const actualDate = new Date()
  const mon = String(actualDate.getMonth() + 1).padStart(2, '0')
  const day = String(actualDate.getDate()).padStart(2, '0')
  const year = actualDate.getFullYear()
  return `${mon}/${day}/${year}`
}

const getDateOneMonthLater = (date) => {
  const parts = date.split('/')
  const month = parseInt(parts[0])
  const day = parseInt(parts[1])
  const year = parseInt(parts[2])
  const currentDate = new Date(year, month - 1, day)
  currentDate.setMonth(currentDate.getMonth() + 1)
  const newMonth = String(currentDate.getMonth() + 1).padStart(2, '0')
  const newDay = String(currentDate.getDate()).padStart(2, '0')
  const newYear = currentDate.getFullYear()
  return `${newMonth}/${newDay}/${newYear}`
}

const calculateTotalChassis = () => {
  totalChassisToSend.value = (parseFloat(sellChassisUnitRate.value * chassisQuantity.value)).toFixed(2);
  totalFeeToSent.value = (
    parseFloat(totalDrayageToSend.value) + parseFloat(totalChassisToSend.value)
  ).toFixed(2)
};

const calculateTotalDrayage = () => {
  totalDrayageToSend.value = (parseFloat(sellDrayageUnitRate.value * drayageQuantity.value)).toFixed(2)
  totalFeeToSent.value = (
    parseFloat(totalDrayageToSend.value) + parseFloat(totalChassisToSend.value)
  ).toFixed(2)
}

watch(chassisQuantity, () => calculateTotalChassis());
watch(drayageQuantity, () => calculateTotalDrayage())

</script>

<style lang="scss" scoped>
@import './SendQuoteForm.scss';

</style>