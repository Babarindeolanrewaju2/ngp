<template>
      <v-container>
          <v-layout row wrap>
           <v-flex xs12>
            <subtitle :disclaimer="disclaimer" :time="time" :error="error"></subtitle>
                <Moveable
                    class="moveable"
                    v-bind="moveable"
                    @drag="handleDrag"
                    @resize="handleResize"
                    @scale="handleScale"
                    @rotate="handleRotate"
                    @warp="handleWarp"
                    @pinch="handlePinch"
                >
                    <chart :chartData="datacollection" :options="options"></chart>
                </Moveable>
          </v-flex>
        </v-layout>
      </v-container>    
</template>
<script>
import Chart from "./../Chart.js";
import axios from 'axios';
import Moveable from 'vue-moveable';
import Subtitle from './Subtitle.vue';

export default {
  components: {
    Moveable,
    Chart,
    Subtitle
  },
  data() {
    return {
      datacollection: null,
      loaded: false,
      labels: [],
      data_set: [],
      disclaimer: "",
      time:{},
      error: "",
      moveable: {
      draggable: true,
      throttleDrag: 0,
      resizable: false,
      throttleResize: 1,
      keepRatio: false,
      scalable: true,
      throttleScale: 0,
      rotatable: true,
      throttleRotate: 0,
      pinchable: true,
      origin: false,
      },
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
    }
  },
    methods: {
    handleDrag({ target, transform }) {
      console.log('onDrag left, top', transform);
      target.style.transform = transform;
    },
    handleResize({
      target, width, height, delta,
    }) {
      console.log('onResize', width, height);
      delta[0] && (target.style.width = `${width}px`);
      delta[1] && (target.style.height = `${height}px`);
    },
    handleScale({ target, transform, scale }) {
      console.log('onScale scale', scale);
      target.style.transform = transform;
    },
    handleRotate({ target, dist, transform }) {
      console.log('onRotate', dist);
      target.style.transform = transform;
    },
    handleWarp({ target, transform }) {
      console.log('onWarp', transform);
      target.style.transform = transform;
    },
    handlePinch({ target }) {
      console.log('onPinch', target);
    },
  }
};
</script>

<style>
</style>

