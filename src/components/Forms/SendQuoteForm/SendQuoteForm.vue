<template>
<main class="main">
    <div class="d-flex justify-content-center toast1" v-if="showError">
      <ToastCoreUI :title="showMessage" :color="showColor" />
    </div>

    <div class="container main-container sendQuote">
      <form method="POST" id="form" class="sendQuote__form">
        <label class="sendQuote__form--labelId" for="inpt_id">Quote ID</label>
        <input type="text" placeholder="Wrote the Quote ID Here..." class="sendQuote__form--inputId" id="inpt_id"
          name="LineBusiness" v-model="inptId" />
        <ButtonSubmit class="sendQuote__form--btnSubmit" @click="handleIdSubmit" name="Get Quote" />
        <div :class="{ hidden: !isLoading1 }">
          <div class="d-flex justify-content-center my-3">
            <Spin />
          </div>
        </div>
      </form>

      <div v-if="quote" class="quoteContainer" ref="pdfContent">
        <div id="to-convert">
          <header class="quoteContainer__header">
            <div style="display: flex; justify-content: center" class="quoteContainer__header--imgContanier">
              <img width="150" src="../../../public/magnet-logo.png" alt="logo" />
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
                <img class="locationSection--img" style="width: 120px" src="../../../public/magnet-truck.png"
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
                    <td>Drayage</td>
                    <td>
                      <input type="number" v-model="drayageQuantity" @change="drayageQuantityOnChange" min="0"
                        inputmode="numeric" pattern="[0-9]*" oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                        style="text-align: center" />
                    </td>
                    <td>Per container</td>
                    <td>${{ quote.magnetFee }}</td>
                    <td>${{ totalDrayageToSend }}</td>
                  </tr>
                  <!-- CHASIS -->
                  <tr class="chassisConcept" style="text-align: center; font-size: 13px">
                    <td class="tdChassis">
                      <input v-model="inptChassisType" type="text" style="text-align: center" />
                    </td>
                    <td>
                      <input type="number" v-model="chassisQuantity" @change="chassisQuantityOnChange" min="0"
                        inputmode="numeric" pattern="[0-9]*" oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                        style="text-align: center" />
                    </td>
                    <td>Per day</td>
                    <td>${{ quote.magnetChassis }}</td>
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
                " v-if="Object.keys(quote.carrierAccesorials).length > 0">
                ACCESORIAL CHARGES THAT WILL APPLY
              </h1>

              <div v-if="Object.keys(quote.carrierAccesorials).length > 0" class="accesorialContainer" style="
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

        <div :class="{ hidden: !isLoading2 }">
          <div class="d-flex justify-content-center">
            <Spin />
          </div>
        </div>

        <!-- <button class="btnSubmit" @click="sendQuoteFee">
            Send Quote Fee
          </button> -->
        <button class="btnSubmit" @click="generatePdf">Download PDF</button>
      </div>
    </div>
  </main>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import './SendQuoteForm.scss';

</style>