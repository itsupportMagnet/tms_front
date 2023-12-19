<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-4">
        <label for="customerId" class="form-label">Customer ID</label>
        <input type="text" class="form-control" id="customerId" v-model="getIdUltimate" disabled>
      </div>
      <div class="col-4">
        <label for="customerName" class="form-label">Customer Name</label>
        <input v-model="inptName" type="text" class="form-control" id="customerName"
          placeholder="Write down the answer here...">
      </div>
      <div class="col-4">
        <label for="customerNumber" class="form-label">Customer Address</label>
        <input v-model="inptAddress" type="text" class="form-control" id="customerNumber"
          placeholder="Write down the answer here...">
      </div>
    </div>

    <div class="row">
      <div class="col-4">
        <label for="customerContact" class="form-label">Customer Contact</label>
        <input v-model="inptContact" type="text" class="form-control" id="customerContact"
          placeholder="Ex: Luisa Fernada">
      </div>
      <div class="col-4">
        <label class="form-label">Business Line</label>
        <select v-model="slctBusinessLine" class="form-select">
          <option selected disabled>Select an option</option>
          <option>DRAYAGE</option>
        </select>
      </div>
      <div class="col-4">
        <label class="form-label">Customer Type</label>
        <select class="form-select" v-model="slctCustomerType">
          <option selected disabled>Select an option</option>
          <option>FW</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="inptBox inptPhoneBox">
          <label for="customerPhone" class="form-label">Customer Phone</label>
          <input type="text" class="form-control" id="customerPhone" placeholder="Write down the answer here...">
        </div>
        <div class="btnBox ">
          <button class="btnAdd" @click="addPhoneInpt">
            +
          </button>
        </div>
      </div>
      <div class="col-6">
        <div class="inptBox inptEmailBox">
          <label for="customerEmail" class="form-label">Customer Email</label>
          <input type="text" class="form-control" id="customerEmail" placeholder="Write down the answer here...">
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
        <ButtonSubmit @click="handleSubmit" name="Submit" />
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { getApi, postApi } from '../../../services/apiServices';
import { showToast } from '@/helpers/helpers.js'
import ButtonSubmit from '../../Buttons/ButtonSubmit/ButtonSubmit.vue';

const customers = ref();
const inptName = ref('');
const inptAddress = ref('');
const inptContact = ref('');
const slctBusinessLine = ref('');
const slctCustomerType = ref('');
const phoneNumbers = ref([]);
const custmoreEmails = ref([]);
const isValidEmail = ref(false);
const alertPhoneShown = ref(false);
const alertEmailShown = ref(false);
let getAllId = ref([])
let getIdUltimate = ref();

onMounted(async () => {
  getApi(`${import.meta.env.VITE_APP_API}/get/clients`)
    .then((data) => {
      customers.value = data
      customers.value.forEach((client) =>
        getAllId.value.push(client.id_Client),
      )
      getIdUltimate.value = getAllId.value.at(-1) + 1 || 1
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
  const customerPhoneBox = document.querySelector('.inptPhoneBox');
  const phoneInpts = customerPhoneBox.querySelectorAll('input');
  const customerEmailBox = document.querySelector('.inptEmailBox');
  const emailInpts = customerEmailBox.querySelectorAll('input');
  const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

  phoneInpts.forEach(i => {
    if (!i.value) {
      showToast('Please, fill out Customer Phone', 'danger', 'red');
      phoneNumbers.value = [];
      alertPhoneShown.value = true;
      return;
    }
    phoneNumbers.value.push(i.value);
    alertPhoneShown.value = false;
  })

  emailInpts.forEach(i => {
    if (!i.value) {
      showToast('Please, fill out Customer Email', 'danger', 'red');
      custmoreEmails.value = [];
      alertEmailShown.value = true
      return;
    }
    if(!emailRegex.test(i.value.trim())){
      isValidEmail.value = false
      return
    }
    custmoreEmails.value.push(i.value);
    alertEmailShown.value = false;
    isValidEmail.value = true
  })

  if(!isValidEmail.value){
    showToast("Please use a valid Email", "danger", "red")
    return
  }

  if (!inptName.value || !inptAddress.value || !inptContact.value || !slctBusinessLine.value || !slctCustomerType.value) {
    showToast('Please, fill out all the inputs', 'danger', 'red');
    return
  }

  const clientObjt = {
    customerId: getIdUltimate.value,
    name: inptName.value,
    address: inptAddress.value,
    contact: inptContact.value,
    businessLine: slctBusinessLine.value,
    customerType: slctCustomerType.value,
    phoneNumbers: phoneNumbers.value,
    customerEmails: custmoreEmails.value
  }

  postApi(`${import.meta.env.VITE_APP_API}/post/addClient`, clientObjt)
    .then(data => {
      if (data.message === 'ok') {
        showToast('Client Saved Successfully', 'success', 'green')
        getIdUltimate.value += 1
        cleanFormFields();
      }
    }).catch(error => {
      console.log(error);
      showToast('Contact IT', 'danger', 'red')
    })
}

const cleanFormFields = () => {
  const customerPhoneBox = document.querySelector('.inptPhoneBox');
  const phoneInpts = customerPhoneBox.querySelectorAll('input');
  const customerEmailBox = document.querySelector('.inptEmailBox');
  const emailInpts = customerEmailBox.querySelectorAll('input');
  inptName.value = '';
  inptAddress.value = '';
  inptContact.value = '';
  slctBusinessLine.value = 'Select an option';
  slctCustomerType.value = 'Select an option';

  phoneInpts.forEach(i => {
    i.value = '';
  })

  emailInpts.forEach(i => {
    i.value = '';
  })

  phoneNumbers.value = [];
  custmoreEmails.value = [];
}

</script>

<style lang="scss" scoped>
@import './AddClientsForm.scss';
</style>