<template>
<div class="container-fluid">
    <div class="row">
      <div class="col-4">
        <label for="carrierId" class="form-label">ID</label>
        <input type="text" class="form-control" id="" v-model="getIdUltimate" disabled>
      </div>
      <div class="col-4">
        <label for="carrierName" class="form-label">Name</label>
        <input v-model="inptName" type="text" class="form-control" id="" placeholder="Write down the answer here...">
      </div>
      <div class="col-4">
        <label for="carrierMc" class="form-label">MC</label>
        <input v-model="inptMc" type="text" class="form-control" id="" placeholder="Write down the answer here...">
      </div>
    </div>

    <div class="row">
      <div class="col-4">
        <label for="carrierDot" class="form-label">DOT</label>
        <input v-model="inptDot" type="text" class="form-control" id="" placeholder="Add Dot">
      </div>
      <div class="col-4">
        <label for="carrierW2" class="form-label">W2</label>
        <input v-model="inptW2" type="text" class="form-control" id="" placeholder="Add W2">
      </div>
      <div class="col-4">
        <label for="carrierAddress" class="form-label">Address</label>
        <input v-model="inptAddress" type="text" class="form-control" id="" placeholder="Add Address">
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <label for="carrierZipcode" class="form-label">Zipcode</label>
        <input v-model="inptZipcode" type="text" class="form-control" id="" placeholder="Write down the answer here...">
      </div>

      <div class="col-4">
        <label class="form-label">State</label>
        <select class="form-select" v-model="slctState" aria-label="Default select example" id="slctStatus">
          <option selected disabled>Select a State</option>
          <option v-for="item in states" :key="item.stateId">
            {{ item.stateAbridged }}
          </option>
        </select>
      </div>

      <div class="col-4">
        <label for="carrierDoct" class="form-label">Days of credit terms</label>
        <input v-model="inptDoct" type="number" class="form-control" id="" placeholder="Write down the answer here...">
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <label for="carrierBLine" class="form-label">Line of business</label>
        <select class="form-select" v-model="slctBline" aria-label="Default select example" id="slctBLine">
          <option selected disabled>Select Line of Business</option>
          <option value="DRAYAGE">DRAYAGE</option>
          <option value="FTL">FTL</option>
        </select>
      </div>
      <div class="col-6">
        <label for="carrierType" class="form-label">Carrier type</label>
        <input v-model="inptCarrierType" type="text" class="form-control" id=""
          placeholder="Write down the answer here...">
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="inptBox inptPhoneBox">
          <label for="carrierPhone" class="form-label">Phone Number</label>
          <input type="text" class="form-control" id="" placeholder="Write down the answer here...">
        </div>

        <div class="btnBox ">
          <button class="btnAdd" @click="addPhoneInpt">
            +
          </button>
        </div>
      </div>

      <div class="col-6">
        <div class="inptBox inptEmailBox">
          <label for="carrierEmail" class="form-label">Carrier Email</label>
          <input type="text" class="form-control" id="" placeholder="Write down the answer here...">
        </div>

        <div class="btnBox">
          <button class="btnAdd" @click="addEmailInpt">
            +
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col btnSubmit_box">
        <button class="btnSubmit" @click="handleSubmit">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getApi, postApi } from '../../../services/apiServices';
import { showToast } from '@/helpers/helpers.js'
import 'mosha-vue-toastify/dist/style.css'

const carriers = ref();
const states = ref([]);
const inptName = ref('');
const inptMc = ref('');
const inptDot = ref('');
const inptW2 = ref('');
const inptAddress = ref('');
const inptZipcode = ref('');
const inptDoct = ref('');
const slctBline = ref('');
const inptCarrierType = ref('');
const phoneNumbers = ref([]);
const carrierMoreEmails = ref([])
const slctState = ref();
const isValidEmail = ref(false);
const isValidZipcode = ref(false);
const alertPhoneShown = ref(false);
const alertEmailShown = ref(false);
let getAllId = ref([]);
let getIdUltimate = ref();

onMounted(async () => {
  getApi(`${import.meta.env.VITE_APP_API}/get/carriers`)
    .then((data) => {
      carriers.value = data
      carriers.value.forEach((carrier) =>
        getAllId.value.push(carrier.id),
      )
      getIdUltimate.value = getAllId.value.at(-1) + 1 || 1
    })
    .catch((error) => console.log(error))

  getApi(`${import.meta.env.VITE_APP_API}/get/states`)
    .then((data) => {
      states.value = data
    })
    .catch((error) => console.log(error))
})

const addPhoneInpt = () => {
  const phoneInptBox = document.querySelector('.inptPhoneBox');
  const newPhoneInpt = document.createElement('input');
  newPhoneInpt.classList.add('mt-2', 'form-control');
  newPhoneInpt.type = 'text';
  newPhoneInpt.placeholder = "Write the extra phone number here...";
  phoneInptBox.appendChild(newPhoneInpt);
}

const addEmailInpt = () => {
  const emailInptBox = document.querySelector('.inptEmailBox');
  const newEmailInpt = document.createElement('input');
  newEmailInpt.classList.add('mt-2', 'form-control');
  newEmailInpt.type = 'email';
  newEmailInpt.placeholder = "Write the extra email here...";
  emailInptBox.appendChild(newEmailInpt);
}

const handleSubmit = () => {
  const carrierPhoneBox = document.querySelector('.inptPhoneBox');
  const phoneInpts = carrierPhoneBox.querySelectorAll('input');
  const carrierEmailBox = document.querySelector('.inptEmailBox');
  const emailInpts = carrierEmailBox.querySelectorAll('input');
  const regexZipcode = /(^\d{5}$)|(^\d{5}-\d{4}$)/; //Regex de Zipcode USA
  const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

  phoneInpts.forEach(i => {
    if (!i.value) {
      showToast('Please, fill out Carrier Phone', 'danger', 'red');
      phoneNumbers.value = [];
      alertPhoneShown.value = true;
      return;
    }
    phoneNumbers.value.push(i.value);
    alertPhoneShown.value = false;
  })

  emailInpts.forEach(i => {
    if (!i.value) {
      showToast('Please, fill out Carrier Email', 'danger', 'red');
      carrierMoreEmails.value = [];
      alertEmailShown.value = true;
      return;
    }

    if(!emailRegex.test(i.value.trim())){
      isValidEmail.value = false
      return
    }
    carrierMoreEmails.value.push(i.value);
    alertEmailShown.value = false;
    isValidEmail.value = true

  })

  if(!isValidEmail.value){
    showToast("Please use a valid Email", "danger", "red")
    return
  }

  if (
    !inptName.value ||
    !inptMc.value ||
    !inptDot.value ||
    !inptW2.value ||
    !inptAddress.value ||
    !inptZipcode.value ||
    !slctState.value ||
    !inptDoct.value ||
    !slctBline.value ||
    !inptCarrierType.value
  ) {
    showToast('Please, fill out all the inputs', 'danger', 'red');
    return
  }

  if (!regexZipcode.test(inptZipcode.value.trim())) {
    showToast('Please enter a valid Zipcode', 'danger', 'red')
    isValidZipcode.value = false;
    return
  }
  
  const carrierObjt = {
    carrierId: getIdUltimate.value,
    name: inptName.value.toUpperCase(),
    mc: inptMc.value,
    dot: inptDot.value,
    w2: inptW2.value,
    address: inptAddress.value.toUpperCase(),
    zipcode: inptZipcode.value,
    state: slctState.value,
    doct: inptDoct.value,
    businessLine: slctBline.value,
    carrierType: inptCarrierType.value.toUpperCase(),
    phoneNumbers: phoneNumbers.value,
    carrierEmails: carrierMoreEmails.value
  }

  postApi(`${import.meta.env.VITE_APP_API}/post/addCarrier`, carrierObjt)
    .then(data => {
      if (data.message === 'ok') {
        showToast('Carrier Saved Succesfully', 'success', 'green')
        getIdUltimate.value += 1
        cleanFormFields();
      }
    }).catch(error => {
      console.log(error);
      showToast('Contact IT', 'danger', 'red')
    })
}

const cleanFormFields = () => {
  const carrierPhoneBox = document.querySelector('.inptPhoneBox');
  const phoneInpts = carrierPhoneBox.querySelectorAll('input');
  const carrierEmailBox = document.querySelector('.inptEmailBox');
  const emailInpts = carrierEmailBox.querySelectorAll('.input');
  inptName.value = '';
  inptMc.value = '';
  inptDot.value = '';
  inptW2.value = '';
  inptAddress.value = '';
  inptZipcode.value = '';
  slctState.value = '';
  inptDoct.value = '';
  slctBline.value = '';
  inptCarrierType.value = '';
  phoneNumbers.value = '';
  carrierMoreEmails.value = '';

  phoneInpts.forEach(i => {
    i.value = '';
  })

  emailInpts.forEach(i => {
    i.value = '';
  })
  phoneNumbers.value = [];
  carrierMoreEmails.value = [];
}
</script>

<style lang="scss" scoped>
@import './AddCarriersForm.scss'
</style>