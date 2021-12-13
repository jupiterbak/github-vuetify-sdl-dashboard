<template>
  <v-chart class="chart" :option="option"  />
</template>

<script>


export default {
  props: ["serie"],
  data() {
    return {
      option: {       
        series: [
          {
            type: "pie",
            color: [
              '#dd6b66',
              '#759aa0',
              '#e69d87',
              '#8dc1a9',
              '#009688',
              '#eedd78',
              '#73a373',
              '#73b9bc',
              '#7289ab',
              '#91ca8c',
              '#f49f42'
            ],
            radius: ['80%', '100%'],            
            data: this.serie,
            avoidLabelOverlap: false,
            emphasis: {
              label: {
                show: true,
                fontSize: '8',
                color: "grey",
                fontWeight: 'bold',
                formatter:'{d}%'
              }
            },
            label: {
              show: true,
              position: 'center',
              fontSize: '8',
                color: "grey",
                fontWeight: 'bold',
            },            
            labelLine: {
              show: false
            },
          }
        ]
      }
    };
  }
};
</script>