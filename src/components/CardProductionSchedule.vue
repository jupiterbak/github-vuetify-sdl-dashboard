<template>
  <v-card>
    <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            color="grey accent-4"
            height="2"
            >
    </v-progress-linear>
    <v-card-title class="text-h6">
      Production Schedule (Ongoing)
    </v-card-title>
    <v-img style="height: 400px; width: 100%" v-if="loading">            
        <v-row
            class="fill-height"
            align-content="center"
            justify="center"
        >
            <v-col
                class="text-sm-body-2 text-center"
                cols="12"
            >
            Loading
            </v-col>
            <v-col cols="12"
                class="text-sm-body-2 text-center"
            >
            <v-progress-circular
                :width="3"
                color="grey"
                indeterminate
            ></v-progress-circular>
            </v-col>
        </v-row>
    </v-img>
    <v-img v-else >
        <v-container fluid>
            <v-row
                class="fill-height"
                align-content="center"
                justify="center"
            >
                <v-col
                class="text-sm-body-2 text-center"
                cols="12"
                >
                  <v-chart style="height: 400px; width: 100%" class="chart mx-auto" :option="option" theme="dark" :loading="loading" autoresize/>
                </v-col>
            </v-row>
        </v-container>
    </v-img>
  </v-card>
</template>
<script>
  const echarts = require('echarts');
  var data = [];
  var dataCount = 10;
  var startTime = +new Date();
  var categories = ['categoryA', 'categoryB', 'categoryC'];
  var types = [
    { name: 'JS Heap', color: '#7b9ce1' },
    { name: 'Documents', color: '#bd6d6c' },
    { name: 'Nodes', color: '#75d874' },
    { name: 'Listeners', color: '#e0bc78' },
    { name: 'GPU Memory', color: '#dc77dc' },
    { name: 'GPU', color: '#72b362' }
  ];
  // Generate mock data
  categories.forEach(function (category, index) {
    var baseTime = startTime;
    for (var i = 0; i < dataCount; i++) {
      var typeItem = types[Math.round(Math.random() * (types.length - 1))];
      var duration = Math.round(Math.random() * 10000);
      data.push({
        name: typeItem.name,
        value: [index, baseTime, (baseTime += duration), duration],
        itemStyle: {
          normal: {
            color: typeItem.color
          }
        }
      });
      baseTime += Math.round(Math.random() * 200);
    }
  });
  function renderItem(params, api) {
    var categoryIndex = api.value(0);
    var start = api.coord([api.value(1), categoryIndex]);
    var end = api.coord([api.value(2), categoryIndex]);
    var height = api.size([0, 1])[1] * 0.4;
    var rectShape = echarts.graphic.clipRectByRect(
      {
        x: start[0],
        y: start[1] - height / 2,
        width: end[0] - start[0],
        height: height
      },
      {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height
      }
    );
    return (
      rectShape && {
        type: 'rect',
        transition: ['shape'],
        shape: rectShape,
        style: api.style()
      }
    );
  }

  export default {
      props:["loading", "trackings", "shipments"],
      components: {
      },
      data () {
          return {
              search: '',
              itemKey: 1,
              option: {
                tooltip: {
                  formatter: function (params) {
                    return params.marker + params.name + ': ' + params.value[3] + ' ms';
                  }
                },
                responsive:true,
                calculable : true,
                backgroundColor: 'transparent',
                dataZoom: [
                  {
                    type: 'slider',
                    filterMode: 'weakFilter',
                    showDataShadow: false,
                    labelFormatter: ''
                  },
                  {
                    type: 'inside',
                  }
                ],
                grid: [
                    {
                        left: 100,
                        right: 5,
                        top: 0
                    }
                ],
                xAxis: {
                  min: startTime,
                  scale: true,
                  axisLabel: {
                    formatter: function (val) {
                      return new Date(val).toLocaleTimeString();
                    }
                  }
                },
                yAxis: {
                  data: categories
                },
                series: [
                  {
                    type: 'custom',
                    renderItem: renderItem,
                    itemStyle: {
                      opacity: 0.8
                    },
                    encode: {
                      x: [1, 2],
                      y: 0
                    },
                    data: data
                  }
                ]
              }
          }
      },
      methods: {
      },
      async mounted(){
        
        this.itemKey ++;
        // Update everything
        this.$forceUpdate();
      },
      created: function () {
        
      },
      beforeDestroy() {
        if (this.chart) {
          this.chart.dispose();
        }
      }
  }
</script>

