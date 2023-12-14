<template>
  <!-- Modal newOperation -->
  <div ref="newClientModal" class="modal fade" id="newClient" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add New Client</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <AddClient />
        </div>
      </div>
    </div>
  </div>

  <div class="filterRow d-flex justify-content-between animate__animated animate__flipInX column-gap-3">
    <div class="mt-2">
      <PrimaryButton type="button" data-bs-toggle="modal" data-bs-target="#newClient">
        Add new Client +
      </PrimaryButton>
    </div>
    <div>
      <strong>
        <label class="label">Sort By Client</label>
      </strong>
      <select class="form-select" @change="sortByCustomer">
        <option selected value="All">All</option>
        <option v-for="sortClient in clientsFromApi" :value="sortClient.customer_name.split('').join('')"
          :key="sortClient">
          {{ sortClient.customer_name }}
        </option>
      </select>
    </div>
  </div>
  <div class="g-4">
    <div class="card">
      <div>
        <div class="section">
          <div v-if="isLoad" class="d-flex justify-content-center my-3">
            <Spinner />
          </div>
          <div v-else class="sectionSales__tableContainer">
            <table class="sectionSales__tableContainer--table">
              <thead class="sectionQuotes__thead">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NAME</th>
                  <th scope="col">ADDRESS</th>
                  <th scope="col">PHONE</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">CONTACT</th>
                  <th scope="col">TYPE</th>
                </tr>
              </thead>
              <tbody class="tbody" v-if="slicedClients">
                <tr v-for="client in slicedClients" :key="client.id">
                  <td class="text-center" v-for="(item, index) in Object.values(client).slice(1)" :key="index">
                    <select v-if="Array.isArray(item) && item.length > 1" class="select">
                      <option v-for="(value, subIndex) in item" :key="subIndex" :value="value">
                        {{ value }}
                      </option>
                    </select>
                    <template v-else-if="Array.isArray(item) && item.length == 1">
                      {{ item[0] }}
                    </template>
                    <template v-else>
                      {{ item }}
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getApi } from '../../../services/apiServices';
import Spinner from '../../Spinner/Spinner.vue';
import PrimaryButton from '../../../components/Buttons/PrimaryButton/PrimaryButton.vue'
</script>

<style scoped></style>