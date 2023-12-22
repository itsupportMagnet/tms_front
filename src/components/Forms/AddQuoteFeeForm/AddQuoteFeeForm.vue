<template>
<div class="container-div">
    <main class="main">
      <div class="carriersFee container">
        <form method="POST" id="form" class="carriersFee__form">
          <label class="carriersFee__form--labelSearch" for="inpt_id">
            Quote ID
          </label>
          <input type="text" placeholder="Wrote the Quote ID Here..." class="carriersFee__form--inputSearch" id="inpt_id"
            name="LineBusiness" v-model="inptId" />
          <Button @click="handleIdSubmit" name="Get Quote" />
        </form>
        <div class="carriersFee__spinContainer" :class="{ hidden: !isLoading }">
          <Spin />
        </div>
        <div v-if="quote" class="carriersFee__tableContainer">
          <table border="1" cellpadding="8" class="carriersFee__tableContainer--table">
            <tr class="tr" v-for="(value, key, index) in quote" :key="index">
              <th class="carrierTh" v-if="value !== '' && value !== null">
                {{ formatAndCapitalize(key) }}
              </th>
              <td class="carrierTd" v-if="value !== '' && value !== null">
                {{ value }}
              </td>
            </tr>
          </table>

          <!-- CARRRIERS FEE -->
          <div :if="accesorials">
            <div class="carriersFee__tableContainer--carrirerFee">
              <h2 class="feeTitle">Buy Rates</h2>

              <div class="inptRow">
                <div class="inptCol">
                  <label for="carrierEmail"> Carrier Email </label>
                  <input placeholder="Write down the answer here.." id="carrierEmail" type="text"
                    v-model="inptCarrierEmail" />
                </div>

                <div class="inptCol">
                  <label for="carrierEmail"> Buy Fee </label>
                  <input placeholder="Write down the answer here.." id="carrierEmail" type="number"
                    v-model="inptCarrierFee" />
                </div>

                <div class="inptCol">
                  <label for="carrierChassis">Chassis Value </label>
                  <input placeholder="Chassis value per day.." id="carrierChassis" type="number"
                    v-model="inptCarrierChassis" />
                </div>
              </div>
              <!-- ACCESORIAL -->
              <h2 class="accesorialsTitle">Accesorials</h2>

              <div class="carrierAccesorialsContainer">
                <div class="carrierAccesorialsContainer__col" v-for="item in accesorials" :key="item.id">
                  <label>
                    <input type="checkbox" :value="item.accesorial" @change="accesorialOnChange"
                      v-model="accesorialSelected[item.accesorial]" />
                    {{ item.accesorial }}
                  </label>
                  <input v-if="accesorialSelected[item.accesorial]" class="accesorialValue" type="number"
                    v-model="carrierAccesorialValues[item.accesorial]" @input="accesorialValuesOnChange" />
                </div>
              </div>
            </div>
            <!-- MAGNET FEE -->
            <div class="carriersFee__tableContainer--magnetFee">
              <h2 class="feeTitle">Sell Rates</h2>
              <h3 class="feeSubtitle">
                <b>Note:</b> Just write down the profit that magnet is going to
                get from this operation, not the sum of carrier and magnet fees.
              </h3>
              <div class="magnetAccesorialContainer">
                <div class="inptRow">
                  <div class="inptCol">
                    <label for="magnetFee">Sell Fee</label>
                    <input id="magnetFee" type="number" placeholder="Write down the answer here.." v-model="inptMagnetFee"
                     />
                  </div>

                  <div class="inptCol">
                    <label for="carrierChassis">Chassis Value</label>
                    <input placeholder="Write down the answer here.." id="carrierChassis" type="number"
                      v-model="inptMagnetChassis" />
                  </div>
                </div>
                <!-- ACCESORIAL -->
                <h2 class="accesorialsTitle" v-if="Object.keys(accesorialSelected).length">Accesorials</h2>
                <div class="magnetAccesorialsContainer">
                  <div class="magnetAccesorialsContainer__col" v-for="(value, name, index) in accesorialSelected"
                    :key="index">
                    <label v-if="value">
                      {{ name }}
                      <input v-model="magnetAccesorialValues[name]" type="number" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="noteContainer">
              <h2 class="noteTitle">Any Note?</h2>
              <textarea v-model="inptNotes" class="inpt_note"></textarea>
            </div>

            <div class="feeSummary">
              <h2 class="feeTitle">Fees Summary</h2>
              <table class="feeSummary__table">
                <thead>
                  <tr>
                    <th>Carrier Fee</th>
                    <th>+</th>
                    <th>Magnet Fee</th>
                    <th>=</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${{ inptCarrierFee }}</td>
                    <td>&nbsp;</td>
                    <td>${{ inptMagnetFee }}</td>
                    <td>&nbsp;</td>
                    <td>${{ totalFee }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="carriersFee__spinContainer" :class="{ hidden: !isLoading2 }">
            <Spin />
          </div>
          <button class="carriersFee__tableContainer--btnSaveCarrier" @click="saveFee" id="addCarrierBtn">
            Save Fee
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Spin from '../../Spinner/Spinner.vue'
import { ref } from 'vue';
import 'mosha-vue-toastify/dist/style.css'
import { getApi, postApi } from '../../../services/apiServices';
import Button from '../../../components/Buttons/ButtonSubmit/ButtonSubmit.vue'
import { showToast } from '@/helpers/helpers.js'

const inptId = ref("");
const quote = ref("");
const accesorials = ref([]);
const formatDate = ref("");
const inptCarrierEmail = ref("");
const inptCarrierFee = ref(0);
const inptCarrierChassis = ref(0);
const inptMagnetFee = ref(0);
const inptMagnetChassis = ref(0);
const inptNotes = ref();
const totalFee = ref(0);
const isLoading = ref(false);
const isLoading2 = ref(false);
const accesorialSelected = ref({});
const carrierAccesorialValues = ref({});
const magnetAccesorialValues = ref({});

const handleIdSubmit = async (e) => {
  e.preventDefault();
  isLoading.value = true;
  quote.value = "";

  if (inptId.value.trim() === "") {
    showToast('Please, fill out all the inputs', 'danger', 'red')

    isLoading.value = false;
    return;
  }
  const idValue = inptId.value.toUpperCase();

  getApi(`${import.meta.env.VITE_APP_API}/get/quotes/${idValue}`)
    .then((data) => {
      if (Object.keys(data).length === 0) {
        showToast('This quote does not exist', 'danger', 'red')
        isLoading.value = false;
        return;
      }
      isLoading.value = false;
      quote.value = data.message;
      formatDate.value = data.message.date;
      getApi(`${import.meta.env.VITE_APP_API}/get/accesorials`).then(
        (data) => (accesorials.value = data)
      );
    })
    .catch((error) => console.log(error));
};

const formatAndCapitalize = (value) => {
  const formattedKey = value.replace(/([a-z])([A-Z])/g, "$1 $2");
  return formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
};

const accesorialOnChange = (e) => {
  const value = e.target.value;
  if (value in carrierAccesorialValues.value) {
    delete carrierAccesorialValues.value[value];
    delete magnetAccesorialValues.value[value];
    return;
  }
  carrierAccesorialValues.value[value] = null;
};

const saveFee = async () => {
  isLoading2.value = true;
  const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  if (!emailRegex.test(inptCarrierEmail.value.trim())) {
    showToast('Please enter a valid Email', 'danger', 'red')
    isLoading2.value = false;
    return;
  }

  if (
    !inptCarrierEmail.value.trim() ||
    !inptCarrierFee.value ||
    !inptMagnetFee.value
  ) {
    isLoading2.value = false;
    showToast('Please, fill out all the inputs', 'danger', 'red')
    return;
  }

  isLoading2.value = false;
  quote.value.carrierEmail = inptCarrierEmail.value;
  quote.value.carrierFee = inptCarrierFee.value;
  quote.value.carrierChassis = inptCarrierChassis.value;
  quote.value.carrierAccesorials = carrierAccesorialValues.value;
  quote.value.magnetFee = inptMagnetFee.value;
  quote.value.magnetChassis = inptMagnetChassis.value;
  quote.value.magnetAccesorials = magnetAccesorialValues.value;
  quote.value.notes = inptNotes.value;

  postApi(
    `${import.meta.env.VITE_APP_API}/post/save-fee`,
    quote.value
  )
    .then((data) => {
      if (data.message === "ok") {
        quote.value = "";
        inptId.value = "";
        isLoading2.value = false;
        showToast('Carrier(s) fee(s) added succesfully', 'success', 'green')
      } else {
        console.error(data);
        showToast('Something went wrong, please, contact support', 'danger', 'red')
      }
    })
    .catch((error) => {
      console.error(error);
      isLoading.value = false;
      showToast('Contact IT', 'danger', 'red')
    });
};

</script>

<style lang="scss" scoped>
@import './AddQuoteFeeForm.scss';

</style>