<script >

import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['Missed', 'Critical', 'At Risk', 'On Time', 'Early'],      
      datasets: [
        {
          data: [40, 20, 12, 39, 10],
          backgroundColor: ["red", "blue", "green", "blue", "red", "blue"],
        },
        
      ],
    },
    {
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      scales: {
        
        yAxes: [{
          display: false,
          gridLines: {}
        }]
      }
    })
  }
}
</script>