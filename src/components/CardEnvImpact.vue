<template>
  <v-card
    class="mx-auto"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class=" mb-1">
          Environmental Impact
        </v-list-item-title>
        <v-divider></v-divider>
        <div class="d-flex align-center flex-grow-1 flex-wrap">
          <div class="me-2">
            <div class="font-weight-semibold">
              <span class="text--primary text-base me-1">656.00 Kg</span> 
              <span aria-hidden="true" class="v-icon notranslate theme--light success--text" style="font-size: 20px; height: 20px; width: 20px;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg" style="font-size: 20px; height: 20px; width: 20px;">
                  <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
                </svg>
              </span> 
              <span class="text-xs success--text">25.8%</span>
            </div> 
            <div class="v-list-item__subtitle text-xs">CO2 Emissions</div>
          </div> 
          <div class="spacer"></div> 
          <div>
            <h4 class="font-weight-semibold">894k</h4> 
            <span class="text-xs">Kwh</span>
          </div>
        </div>
        <!-- <v-list-item-subtitle>CO2 Emissions: <code class="font-weight-bold">123</code></v-list-item-subtitle>
        <v-list-item-subtitle>Energy Consumption: <code class="font-weight-bold">123</code></v-list-item-subtitle> -->
        
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      >
        <v-icon
            class="teal lighten-1"
            large
            dark
          >
            mdi-tree
          </v-icon>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
  export default {}
</script>