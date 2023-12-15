<template>
  <CContainer style="width: 42rem;">
    <CCard style="width: 42rem;">
      <CCardBody>
        <div id="to-convert">
          <div style="display: flex; justify-content: center;">
            <div style="width: 20rem; height: 32rem !important;border: 2px solid black;">
              <div style="display: flex; justify-content: center;">
                <img src="/logo-black.png" height="100" alt="Magnet Logistics Logo" />
              </div>

              <div style="height: 8rem; text-align: center;">
                <div>
                  <h5 style="
                  background: #3c78d8;
                  color: white;
                  padding: 1rem 1rem;
                  margin: 0;
                  text-align: center;
                  justify-content: space-between;
                  border: 2px solid black;

                ">
                    CONSIGNEE
                  </h5>
                </div>
                <div style="
                  height: 4.5rem;
                ">
                  <input type="text" id="consignee" placeholder="Write down the answer here..." v-model="inptConsignee"
                    style="width: 100%; 
                  text-align: center;
                  align-items: center;
                  height: 4.5rem;
                  padding-right: 2px;
                  border-radius: 0;
                  border: 2px solid black;" />
                </div>
              </div>

              <div style="height: 9rem; text-align: center;">
                <div>
                  <h5 style="
                  background: #3c78d8;
                  color: white;
                  padding: 1rem 1rem;
                  margin: 0;
                  border: 2px solid black;
                  text-align: center;
                ">
                    EMPTY PICK UP / RETURN
                  </h5>
                </div>
                <div style="

                  height: 4.5rem;
                ">
                  <input type="text" id="emptyPickUp" placeholder="Write down the answer here..."
                    v-model="inptEmptyPickUp" style="width: 100%; 
                  text-align: center;
                  height: 4.5rem;
                  border: 2px solid black;
                  border-radius: 0;
                  border: none;" />
                </div>
              </div>

              <div style="height: 8rem; text-align: center;">
                <h5 style="
                  background: #3c78d8;
                  color: white;
                  padding: 1rem 0rem;
                  border: 2px solid black;
                  margin: 0;

                ">
                  FULL PICK UP / RETURN
                </h5>
                <div style="
                  border: 2px solid black; height: 100%;              
                ">
                  <input type="text" id="fullPickUp" placeholder="Write down the answer here..." v-model="inptFullPickUp"
                    style="
                  text-align: center;
                  height: 4rem;
                  width: 100%;
                  margin: 0;
                  border: 0;
                  " />
                </div>
              </div>
            </div>


            <!-- TERMINADO -->
            <div style="width: 20rem; justify-content: center; !important; border: 2px solid black">
              <div>
                <div>
                  <h5 style="
                    background: #3c78d8;
                    color: white;
                    padding: 0 10px;
                    margin: 0;
                    border: 2px solid black;
                    text-align: center;
                    estoyaca
                  ">
                    BULL OF LANDING
                  </h5>
                  <div>
                    <tr style="border: 2px solid black">
                      <th style="
                        background-color: rgb(238, 232, 232);
                        color: black;
                        border: 2px solid black;
                        text-align: center;
                        align-items: center;
                        width: 7rem;
                      ">
                        BOL ID
                      </th>
                      <td style="
                        border: 2px solid black;
                      ">
                        <input type="text" v-model="inptBolNumber" @blur="(e) => inputBlurHandlerId(e)" style="width: 13rem;  
                      height: 6.1rem; 
                      text-align: center; 
                      border: none;" />
                      </td>
                    </tr>
                    <tr style="border: 2px solid black">
                      <th style="
                        
                        background-color: rgb(238, 232, 232);
                        color: black;
                        border: 2px solid black;
                        text-align: center;
                        
                      ">
                        DATE
                      </th>
                      <td style="
                        border: 2px solid black;
                        width: 13rem;
                      ">
                        <input type="date" v-model="inptDate"
                          style="width: 13rem;  height: 3rem; text-align: center; border: none;" />
                      </td>
                    </tr>
                    <div>
                      <h5 style="
                        background: #3c78d8;
                        color: white;
                        margin: 0;
                        border: 2px solid black;
                        text-align: center;
                      ">
                        CARRIER
                      </h5>
                      <div style="border: 2px solid black">
                        <select id="slct_Provider" v-model="slctProvider" selected style="
                        text-align: center;
                        height: 100%;
                        width: 100%;
                        margin: 0;
                        border: 0;
                        background-color: #ffffff;
                        ">
                          <option value="">Select a provider</option>
                          <option v-for="item in providers" :key="item.id">
                            {{ item.provider_name }}
                          </option>
                        </select>
                      </div>
                      <div>
                        <h5 style="
                          background: #3c78d8;
                          color: white;
                          margin: 0;
                          border: 2px solid black;
                          text-align: center;
                        ">
                          REFERENCES
                        </h5>
                        <tr style="border: 2px solid black">
                          <th style="
                            padding: 7px ;
                            background-color: rgb(238, 232, 232);
                            color: black;
                            border: 2px solid black;
                            text-align: center;
                          ">
                            BOOKING
                          </th>
                          <td style="
                            border: 2px solid black;
                            width: 100%;
                            
                          ">
                            <input type="number" placeholder="Add Booking/BL" v-model="inptBooking" style="
                            text-align: center;
                            height: 100%;
                            width: 100%;
                            margin: 0;
                            border: 0;
                            " />
                          </td>
                        </tr>

                        <tr style="border: 2px solid black">
                          <th style="
                            padding: 7px ;
                            background-color: rgb(238, 232, 232);
                            color: black;
                            border: 2px solid black;
                            text-align: center;
                          ">
                            CONTAINER
                          </th>
                          <td style="
                            border: 2px solid black;
                            width: 100%;
                          ">
                            <select style="
                            text-align: center;
                            height: 100%;
                            width: 100%;
                            background-color: #ffffff;
                            margin: 0;
                            border: 0;
                            " aria-label="Default select example" id="slct_container" v-model="slctContainer"
                              :class="rowBG(slctContainer)">
                              <option selected disabled value="">
                                Select a status
                              </option>
                              <option value="1">PENDING</option>
                              <option value="2">IN PROCESS</option>
                              <option value="3">DONE</option>
                              <option value="4">CANCELED</option>
                              <option value="5">INVOICE</option>
                            </select>
                          </td>
                        </tr>
                      </div>
                      <div>
                        <h5 style="
                          background: #3c78d8;
                          color: white;
                          padding: 0 10px;
                          margin: 0;
                          border: 2px solid black;
                          text-align: center;
                        ">
                          ADDITIONAL REFERENCES
                        </h5>
                        <tr style="border: 2px solid black">
                          <th style="
                            padding: 7px ;
                            background-color: rgb(238, 232, 232);
                            color: black;
                            border: 2px solid black;
                            text-align: center;
                          ">
                            SSL
                          </th>
                          <td style="
                            border: 2px solid black;
                            width: 100%;
                          ">
                            <select v-model="slct_ssl" style="
                            text-align: center;
                            height: 100%;
                            width: 100%;
                            background-color: #ffffff;
                            margin: 0;
                            border: 0;
                            ">
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
                          </td>
                        </tr>
                        <tr>
                          <th style="
                            padding: 7px ;
                            background-color: rgb(238, 232, 232);
                            color: black;
                            border: 2px solid black;
                            text-align: center;
                          ">
                            PORT/RAILS
                          </th>
                          <td style="
                            border: 2px solid black;
                            width: 100%;

                          ">
                            <select id="ports" v-model="slctPort" style="
                            text-align: center;
                            height: 100%;
                            width: 100%;
                            background-color: #ffffff;
                            margin: 0;
                            border: 0;
                            ">
                              <option selected disabled value="">
                                Select a port
                              </option>
                              <option v-for="item in ports" :key="item.id">
                                {{ item.port_name }}
                              </option>
                            </select>
                          </td>
                        </tr>
                        <tr style="border: 2px solid black">
                          <th style="
                            padding: 7px ;
                            background-color: rgb(238, 232, 232);
                            color: black;
                            border: 2px solid black;
                            text-align: center;
                          ">
                            B.LINE
                          </th>
                          <td style="
                            border: 2px solid black;
                            width: 100%;
                          ">
                            <select style="
                            text-align: center;
                            height: 100%;
                            width: 100%;
                            background-color: #ffffff;
                            margin: 0;
                            border: 0;
                            
                            " aria-label="Default select example" id="slctService" v-model="slctService">
                              <option selected disabled value="">
                                Select a status
                              </option>
                              <option value="DRAYAGE">DRAYAGE</option>
                              <option value="FTL">FTL</option>
                            </select>
                          </td>
                        </tr>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: center;">
            <div style="width: 40rem; justify-content: center;">
              <h5 style="
              background: #3c78d8;
              color: white;
              padding: 0 10px;
              margin: 0;
              border: 2px solid black;
              text-align: center;
            ">
                NOTES SPECIALS INSTRUCTIONS
              </h5>
              <div style="border: 2px solid black; height: 5rem; justify-content: center;">
                <input id="specialNote" cols="100" style="
              text-align: center;
              height: 100%;
              width: 100%;
              margin: 0;
              border: 0;
              " v-model="specialNote" />
              </div>
              <div style="justify-content: center;">
                <h5 style="
                background: #3c78d8;
                color: white;
                padding: 0 10px;
                margin: 0;
                border: 2px solid black;
                text-align: center;
              ">
                  INFORMATION
                </h5>

                <tr style="border: 2px solid black">
                  <th style="
                  background-color: rgb(238, 232, 232);
                  color: black;
                  border: 2px solid black;
                  text-align: center;
                ">
                    COMMODITY
                  </th>
                  <td style="border: 2px solid black; width: 50%">
                    <input type="text" id="inptCommodity" placeholder="Add Commodity" v-model="inptCommodity" style="
                  text-align: center;
                  height: 100%;
                  width: 100%;
                  margin: 0;
                  border: 0;
                  justify-content: center;
                  
                  " />
                  </td>
                </tr>

                <tr style="border: 2px solid black">
                  <th style="
                  padding: 6px 50px;
                  text-align: center;
                  background-color: rgb(238, 232, 232);
                  color: black;
                  border: 2px solid black;
                  
                  
                ">
                    CONTAINER INFO
                  </th>
                  <td style="border: 2px solid black; width: 20rem; justify-content: center;">
                    <input type="text" id="inptContainerInfo" v-model="inptContainerInfo" placeholder="Add Container Info"
                      style="
                  text-align: center;
                  height: 100%;
                  width: 100%;
                  margin: 0;
                  border: 0;
                  " />
                  </td>
                </tr>
                <!-- END ATTRIBUTE -->
                <div style="display: flex; width: 40rem; justify-content: center;">
                  <h6 style="
                  width: 50%;
                  border: 2px solid black;
                  background: #3c78d8;
                  color: white;
                  padding: 0 10px;
                  margin: 0;
                  border: 2px solid black;
                  text-align: center;
                ">
                    SHIPPER SIGNATURE / RETURN
                  </h6>

                  <h6 style="
                  width: 50%;
                  border: 2px solid black;
                  background: #3c78d8;
                  color: white;
                  padding: 0 10px;
                  margin: 0;
                  border: 2px solid black;
                  text-align: center;
                ">
                    CARRIER SIGNATURE / RETURN
                  </h6>
                </div>
                <div style="display: flex; width: 40rem; height: 5rem; justify-content: center;">
                  <div style="width: 20rem ; border: 2px solid black">
                    <input type="text" v-model="inptShipperSignature" style="
                  text-align: center;
                  height: 100%;
                  width: 100%;
                  margin: 0;
                  border: 0;
                  ">
                  </div>
                  <div style="width: 20rem;border:2px solid black;">
                    <input type="text" id="inptCarrierSignature" v-model="inptCarrierSignature" style="
                            text-align: center;
                            height: 100%;
                            width: 100%;
                            margin: 0;
                            border: 0;
                            ">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <Button class="btn btn-success text-white my-3 fs-5" @click.prevent="handleSubmit">CREATE PDF</Button>
        </div>
      </CCardBody>
    </CCard>
  </CContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getApi } from '@/services/ApiServices'
import html2pdf from 'html2pdf.js';
import { showToast } from '@/helpers/helpers.js';
import 'mosha-vue-toastify/dist/style.css'
const inptCarrierSignature = ref('')
const inptBolNumber = ref()
const inptBooking = ref('')
const inptDate = ref()
const inptShipperSignature = ref('')
const slctContainer = ref('')
const inptConsignee = ref()
const providers = ref([])
const inptCommodity = ref()
const slct_ssl = ref('')
const ports = ref([])
const slctPort = ref('')
const slctService = ref('')
const slctProvider = ref('')
const inptEmptyPickUp = ref('')
const inptFullPickUp = ref('')
const inptContainerInfo = ref('')
const doInfo = ref([]);
const handleSubmit = () => {

  if (
    doInfo.value.length === 0) {
    showToast('Please use a valid ID', 'danger', 'red')
    return
  }//Preguntar si las firmas las colocan antes o despues
  {
    const elementToConvert = document.getElementById('to-convert');
    const options = {
      margin: 10,
      filename: 'New-DO.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }, //portrait vertical - landscape horizontal
      pagebreak: { mode: 'avoid-all' }
    };
    //options.jsPDF.format = [300, 250];
    showToast('Pdf Saved', 'success', 'green')
    html2pdf().from(elementToConvert).set(options).save();
  }
  //CREATE PDF

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

onMounted(async () => {
  getApi(`${import.meta.env.VITE_APP_API}/get/providers`)
    .then((data) => {
      providers.value = data
    })
    .catch((error) => console.log(error))

  getApi(`${import.meta.env.VITE_APP_API}/get/ports`)
    .then((data) => {
      ports.value = data
    })
    .catch((error) => console.log(error))
})

const inputBlurHandlerId = (e) => {
  const setId = e.target.value.trim()
  getApi(`${import.meta.env.VITE_APP_API}/get/getOperation/${setId}`)
    .then((data) => {
      doInfo.value = data;
      inptConsignee.value = doInfo.value[0]?.warehouseLocation || 'No Info'
      inptEmptyPickUp.value = doInfo.value[0]?.emptyLocation || 'No Info'
      inptBooking.value = doInfo.value[0]?.bookingBl || 'No Info'
      inptCommodity.value = doInfo.value[0]?.commodity || 'No Info'
      slctPort.value = doInfo.value[0]?.port || 'No Info'
      slctService.value = doInfo.value[0]?.businessLine || 'No Info'
      inptDate.value = doInfo.value[0]?.operationDate || 'No Info'
      slctProvider.value = doInfo.value[0]?.provider || 'No Info'
      slct_ssl.value = doInfo.value[0]?.ssline || 'No Info'
      slctContainer.value = doInfo.value[0]?.status || 'No Info'
      inptContainerInfo.value = `${doInfo.value[0]?.containerSize} - ${doInfo.value[0]?.containerType} ${(doInfo.value[0]?.bonded === 'Yes') ? '- Bonded: Yes' : ''} ${(doInfo.value[0]?.hazardous === 'Yes') ? '- Hazmat: Yes' : ''} ${(doInfo.value[0]?.bonded === 'No' && doInfo.value[0]?.hazardous === 'No') ? '- None' : ''}`;
      inptFullPickUp.value = doInfo.value[0]?.fullLocation || 'No Info'
      if (inptConsignee.value === 'No Info') {
        showToast("This Operation doesn't exists", "danger", "red")
      }
      //Generar a futuro una funcion que limpie los campos, cuando el valor de BOL number este vacio.
    })
    .catch((error) => console.log(error))
}
</script>
