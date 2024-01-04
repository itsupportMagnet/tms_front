<template>
  <main class="main">
    <div class="carriers-fee">
      <form method="POST" id="form" class="carriers-fee__form">
        <label class="label" for="inpt_id">
          Quote ID
        </label>
        <input type="text" placeholder="Wrote the Quote ID Here..." class="input-search" id="inpt_id" name="LineBusiness"
          v-model="inptId" />
        <ButtonSubmit @click="handleGetQuote" name="Get Quote" />
      </form>

      <div class="spin-container" v-if="isLoading">
        <Spinner />
      </div>

      <div v-if="quote" class="main-container">
        <table border="1" cellpadding="8" class="main-container__table">
          <tr v-for="(value, key, index) in quote" :key="index">
            <th v-if="value !== '' && value !== null">
              {{ formatColumnName(key) }}
            </th>
            <td v-if="value !== '' && value !== null">
              {{ value }}
            </td>
          </tr>
        </table>

        <div :if="accesorials">
          <div class="buy-rates-section">
            <div class="rates-title">
              <h2>Buy Rates</h2>
            </div>

            <div class="inpt-row">
              <div class="inpt-col">
                <label for="carrierEmail"> Carrier Email </label>
                <input placeholder="Write down the answer here.." id="carrierEmail" type="text"
                  v-model="inptCarrierEmail" />
              </div>

              <div class="inpt-col">
                <label for="carrierEmail"> Buy Fee </label>
                <input placeholder="Write down the answer here.." id="carrierEmail" type="number"
                  v-model="inptBuyDrayageUnitRate" />
              </div>

              <div class="inpt-col">
                <label for="carrierChassis">Chassis Value </label>
                <input placeholder="Chassis value per day.." id="carrierChassis" type="number"
                  v-model="inptBuyChassisUnitRate" />
              </div>
            </div>
            <!-- ACCESORIAL -->
            <h2 class="accesorials-title">Accesorials</h2>

            <div class="buy-accesorials-container">
              <div class="buy-accesorials-container__col" v-for="item in accesorials" :key="item.id">
                <label>
                  <input type="checkbox" :value="item.accesorial" @change="accesorialOnChange"
                    v-model="accesorialSelected[item.accesorial]" />
                  {{ item.accesorial }}
                </label>
                <input v-if="accesorialSelected[item.accesorial]" class="accesorialValue" type="number"
                  v-model="buyAccesorialValues[item.accesorial]" @input="accesorialValuesOnChange" />
              </div>
            </div>
          </div>
          <!-- MAGNET FEE -->
          <div class="sell-rates-section">
            <div class="rates-title">
              <h2>Sell Rates</h2>
            </div>


            <div class="inpt-row">
              <div class="inpt-col">
                <label for="fee-label">Sell Fee</label>
                <input id="fee-label" type="number" placeholder="Write down the answer here.." v-model="inptSellDrayageUniteRate" />
              </div>

              <div class="inpt-col">
                <label for="chassis-label">Chassis Value</label>
                <input placeholder="Write down the answer here.." id="chassis-label" type="number"
                  v-model="inptSellChassisUnitRate" />
              </div>
            </div>
            <!-- ACCESORIAL -->
            <h2 class="sell-accesorials-subtitle" v-if="Object.keys(accesorialSelected).length">Accesorials</h2>
            <div class="sell-accesorials-container">
              <div class="sell-accesorials-container__col" v-for="(value, name, index) in accesorialSelected"
                :key="index">
                <label v-if="value">
                  {{ name }}
                  <input v-model="sellAccesorialValues[name]" type="number" />
                </label>
              </div>
            </div>
          </div>

          <div class="note-container">
            <h2 class="note-title">Any Note?</h2>
            <textarea v-model="inptNotes" class="inpt_note"></textarea>
          </div>
        </div>

        <div class="spinContainer" :class="{ hidden: !isLoading2 }">
          <Spinner />
        </div>
        <button class="btn-save-fee" @click="saveFee" id="addCarrierBtn">
          Save Fee
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { getApi, postApi } from '@/services/apiServices';
import { formatColumnName } from '@/utils/utils.js'
import ButtonSubmit from '@/components/Buttons/ButtonSubmit/ButtonSubmit.vue'
import { showToast } from '@/helpers/helpers.js'
import Spinner from '@/components/Spinner/Spinner.vue';

const inptId = ref("");
const quote = ref("");
const accesorials = ref([]);
const formatDate = ref("");
const inptCarrierEmail = ref("");
const inptBuyDrayageUnitRate = ref(0);
const inptBuyChassisUnitRate = ref(0);
const inptSellDrayageUniteRate = ref(0);
const inptSellChassisUnitRate = ref(0);
const inptNotes = ref();
const isLoading = ref(false);
const isLoading2 = ref(false);
const accesorialSelected = ref({});
const buyAccesorialValues = ref({});
const sellAccesorialValues = ref({});

const handleGetQuote = async (e) => {
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
      getApi(`${import.meta.env.VITE_APP_API}/get/accesorials`)
      .then(data => accesorials.value = data);
    })
    .catch((error) => console.log(error));
};

const accesorialOnChange = (e) => {
  const value = e.target.value;
  if (value in buyAccesorialValues.value) {
    delete buyAccesorialValues.value[value];
    delete sellAccesorialValues.value[value];
    return;
  }
  buyAccesorialValues.value[value] = null;
};

const saveFormInfo = () => {
  isLoading2.value = false;

  quote.value.carrierEmail = inptCarrierEmail.value;
  quote.value.buyDrayageUnitRate = inptBuyDrayageUnitRate.value;
  quote.value.buyChassisUnitRate = inptBuyChassisUnitRate.value;
  quote.value.buyAccesorials = buyAccesorialValues.value;
  quote.value.sellDrayageUniteRate = inptSellDrayageUniteRate.value;
  quote.value.sellChassisUnitRate = inptSellChassisUnitRate.value;
  quote.value.sellAccesorials = sellAccesorialValues.value;
  quote.value.notes = inptNotes.value;
}

const saveFee = async () => {
  if (validateForm()) {
    saveFormInfo();
    postApi(
      `${import.meta.env.VITE_APP_API}/post/save-fee`, quote.value)
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
  }
};

const validateForm = () => {
  isLoading2.value = true;

  const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  if (!emailRegex.test(inptCarrierEmail.value.trim())) {
    showToast('Please enter a valid Email', 'danger', 'red')
    isLoading2.value = false;
    return false;
  }

  if (
    !inptCarrierEmail.value.trim() ||
    !inptBuyDrayageUnitRate.value ||
    !inptSellDrayageUniteRate.value
  ) {
    isLoading2.value = false;
    showToast('Please, fill out all the inputs', 'danger', 'red')
    return false;;
  }

  return true;
}
</script>

<style lang="scss" scoped>
@import './AddQuoteFeeForm.scss';
</style>