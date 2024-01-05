<template>
  <!-- SEARCH -->
  <div class="search-section">
    <div class="search-section__container">
      <!-- RELATIVE -->
      <div class="search-section__container--form">
        <input v-model="inpt_id" type="text" class="search-quote-inpt" placeholder="Search by Quote ID" required />
      </div>
    </div>

    <div class="filter-container">
      <div class="filter-container__box">
        <label for="countries">Sort by Port</label>
        <select @change="sortByPort"
          class="filter-container__sortByPort--select filter-container__sortByPort--selectPort">
          <option selected value="All">All</option>
          <option v-for="port in ports" :value="port.port_name" :key="port">
            {{ port.port_name }}
          </option>
        </select>
      </div>

      <div class="filter-container__box">
        <label for="countries">Sort by Operation</label>
        <select @change="sortByOperation">
          <option selected value="All">All</option>
          <option value="Import">Import</option>
          <option value="Export">Export</option>
        </select>
      </div>

      <div class="filter-container__box">
        <label for="countries">Sort by Date</label>
        <select @change="sortByDate">
          <option selected value="All">All</option>
          <option value="newer">Newer</option>
          <option value="older">Older</option>
        </select>
      </div>
      <div class="filter-container__box">
        <label for="month">
          Sort by Month
        </label>
        <select @change="sortByMonth">
          <option value="">All Months</option>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
      </div>
    </div>
  </div>

  <main>
    <Card>
      <div class="quotes-section">
        <div class="table-container">
          <table v-if="quotesFromApi" class="table-container__table">
            <thead class="sectionQuotes__thead">
              <tr class="sectionQuotes__tableSticky">
                <th scope="col">QUOTEID</th>
                <th scope="col">MODE</th>
                <th scope="col">STATUS</th>
                <th scope="col">POL</th>
                <th scope="col">DELIVERY ADDRESS</th>
                <th scope="col">EQUIPMENT</th>
                <th scope="col">CONTAINER SIZE</th>
                <th scope="col">CONTAINER TYPE</th>
                <th scope="col">WEIGHT</th>
                <th scope="col">COMMODITY</th>
                <th scope="col">HAZARDOUS</th>
                <th scope="col">BONDED</th>
                <th scope="col">LOAD TYPE</th>
                <th scope="col">DATE</th>
                <th scope="col">COORDINATOR</th>
              </tr>
            </thead>
            <tbody v-if="!isQuotesEmpty" class="tbody">
              <tr v-for="quote in quotes" :key="quote.id" class="trbody">
                <td v-for="(item, index) in quote" :key="index">
                  <select v-if="index === 'quoteStatus'" @change="(e) => changeStatus(quote.quoteID, e)"
                    v-model="quote[index]" :class="changeColorStatus(quote[index])">
                    <option value="1">Requested</option>
                    <option value="2">Carrier rate provided</option>
                    <option value="3">Quote Sent</option>
                    <option value="4">Followed Up</option>
                    <option value="5">Client Approved</option>
                    <option value="6">Client Rejected</option>
                  </select>
                  <span v-else-if="index === 'date'">
                    {{ formatDate(quote.date) }}
                  </span>
                  <span v-else>
                    {{ item }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="sectionQuotes__spin" v-else>
            <div class="d-flex justify-content-center my-3">
             <Spinner /> 
            </div>
          </div>
          <div class="error-message-box" v-if="isQuotesEmpty">
            <i class="bi bi-exclamation-triangle"></i>
            <span> Nothing was found!</span> Try using
            different options.
          </div>
        </div>
      </div>
    </Card>
  </main>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { getApi, postApi } from '../../../services/apiServices'
import { formatDate } from '../../../utils/utils';
import Card from '../../Card/Card.vue';
import Spinner from '../../Spinner/Spinner.vue';

const isQuotesEmpty = ref(false);
const quotes = ref();
const quotesFromApi = ref();
const ports = ref([]);
const inpt_id = ref();
const filterOptions = ref({
  srtPort: '',
  srtOperation: '',
  srtDate: '',
  srtMonth: '',
})


onMounted(async () => {
  getApi(`${import.meta.env.VITE_APP_API}/get/ports`)
    .then((data) => (ports.value = data))
    .catch((error) => console.log(error))

  getApi(`${import.meta.env.VITE_APP_API}/get/allQuotes`)
    .then((data) => {
      quotesFromApi.value = data
      quotes.value = quotesFromApi.value.reverse();
    })
    .catch((error) => console.log(error))
})


watch(inpt_id, () => {
  performSearch()
})

const performSearch = () => {
  const inputValue = inpt_id.value.trim().toUpperCase()
  if (inputValue === '') {
    quotes.value = quotesFromApi.value
    checkQuotesLength()
  } else {
    const getQuoteByID = quotesFromApi.value.filter((item) =>
      item.quoteID.trim().startsWith(inputValue),
    )
    quotes.value = getQuoteByID;
    checkQuotesLength();
  }
}

const checkQuotesLength = () => {
  quotes.value.length === 0
    ? (isQuotesEmpty.value = true)
    : (isQuotesEmpty.value = false)
}

const changeColorStatus = (id) => {
  if (id == 1) {
    return 'selectOptionRequest'
  }
  if (id == 2) {
    return 'selectOptionCarrier'
  }
  if (id == 3) {
    return 'selectOptionQuote'
  }
  if (id == 4) {
    return 'selectOptionFollowed'
  }
  if (id == 5) {
    return 'selectOptionApproved'
  }
  if (id == 6) {
    return 'selectOptionRejected'
  }
}

const changeStatus = async (id, status) => {
  const newQuote = {
    id,
    status: status.target.value,
  }
  postApi(`${import.meta.env.VITE_APP_API}/post/change-status-quote`, newQuote)
    .then((data) => data)
    .catch((error) => console.log(error))
}

//Filter functions
const sortByDate = (e) => {
  if (e.target.value === 'All') {
    quotes.value = quotesFromApi.value
    return
  }
  if (e.target.value === 'newer') {
    quotes.value.sort((a, b) => new Date(b.date) - new Date(a.date))
  } else {
    quotes.value.sort((a, b) => new Date(a.date) - new Date(b.date))
  }
}

const sortByOperation = (e) => {
  if (isQuotesEmpty.value) {
    quotes.value = quotesFromApi.value
    isQuotesEmpty.value = false
  }
  if (e.target.value === 'All') {
    filterOptions.value.srtOperation = ''
  } else {
    filterOptions.value.srtOperation = e.target.value
  }
  filterQuotes()
}

const sortByPort = (e) => {
  if (isQuotesEmpty.value) {
    quotes.value = quotesFromApi.value
    isQuotesEmpty.value = false
  }
  if (e.target.value === 'All') {
    filterOptions.value.srtPort = ''
  } else {
    filterOptions.value.srtPort = e.target.value
  }
  filterQuotes()
}

const sortByMonth = (e) => {
  if (isQuotesEmpty.value) {
    quotes.value = quotesFromApi.value
    isQuotesEmpty.value = false
  }
  if (e.target.value === 'All') {
    filterOptions.value.srtMonth = ''
  } else {
    filterOptions.value.srtMonth = e.target.value
  }
  filterQuotes()
}

const filterQuotes = () => {
  const newQuotes = quotesFromApi.value
    .filter(filterOperation)
    .filter(filterPort)
    .filter(filterMonth)
  if (newQuotes.length) {
    quotes.value = newQuotes
  } else {
    isQuotesEmpty.value = true
  }
}

const filterOperation = (quote) => {
  if (filterOptions.value.srtOperation) {
    return quote.modeOfOperation === filterOptions.value.srtOperation
  }
  return quote
}

const filterPort = (quote) => {
  if (filterOptions.value.srtPort) {
    return quote.pol === filterOptions.value.srtPort
  }
  return quote
}

const filterMonth = (quote) => {
  if (filterOptions.value.srtMonth) {
    const quoteMonth = new Date(quote.date).getMonth().toString()
    return quoteMonth === filterOptions.value.srtMonth;
  }
  return quote
}
</script>

<style lang="scss" scoped>
@import './AllQuotesTable.scss'
</style>