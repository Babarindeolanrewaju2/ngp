<template>
    <v-content>
      <v-container>
        <v-row>
          <v-col xs="12" md="6" lg="12">
            <p class="font-italic mb-2 mt-4 text-center">
              {{disclaimer}}
            </p>
            <p class="font-weight-light mb-2 text-center">{{dateTime(time.updated)}}</p>
            <p v-if="error" class="font-weight-light mt-7 text-center red accent-2" color="error">{{error}}</p>
            <movable class="testmove" posTop="444" :grid="20" posLeft="222" shiftKey="true">
                <chart :chart-data="datacollection" :options="options"></chart>
            </movable>
            </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>
<script>
import Chart from "./../Chart.js";
import axios from 'axios';
import moment from 'moment'

export default {
  components: {
    Chart
  },
  data() {
    return {
      datacollection: null,
      loaded: false,
      labels: [],
      data_set: [],
      disclaimer: "",
      time:"",
      error: "",
      options: {
          scales: {
              yAxes: [{
                    ticks: {
                          beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                  }]
                },
                legend: {
                    display: true
                },
                responsive: true,
          maintainAspectRatio: false
      }
    };
  },
  async mounted () {
    this.loaded = false

    try {
      const response = await axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2019-12-31')
      this.loaded = true
      this.disclaimer = response.data.disclaimer
      this.time = response.data.time

      // for (var property in this.chartdata) {

      //  if ( !this.chartdata.hasOwnProperty(property)) {
      //       continue;
      //   }

      // this.labels.push(property);
      // this.data_set.push(this.chartdata[property]);
      
      // }

            for (let [key, value] of Object.entries(response.data.bpi)) {
                this.labels.push(key);
                this.data_set.push(value);
            }

            this.datacollection = {
              labels: this.labels,
              datasets: [
                {
                  label: response.data.disclaimer,
                  backgroundColor: "#f87979",
                  data: this.data_set
                },
              ]
            }

   // eslint-disable-next-line   
    /* eslint-disable */
    } catch (e) {
      this.error = e.message
      console.error(e)
    }
  },
    methods: {
    dateTime(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    }
  }
};
</script>

<style>
      div{
        width:1000px;
        margin: 0px auto;
      }
        .testmove {
        display:block;
        z-index: 999;
      }
</style>

