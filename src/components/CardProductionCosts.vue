<template>
  <v-card
    class="mx-auto"
    elevation="6"
  >
    <!-- <v-card-title class="text-h6">
      Total Costs
    </v-card-title>
    <v-card-subtitle class="text-xs text-caption text--secondary mb-0">
      Calculated in last 7 days
    </v-card-subtitle> -->
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-list-item>
            <v-list-item-avatar
              tile
              size="46"
              color="grey"
              class="rounded"
              
            >
              <v-icon
                  class="grey darken-1"
                  large
                  dark
                >
                  mdi-currency-usd
                </v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="pa-0">
              <v-list-item-subtitle class="font-weight-semibold text-sm mb-1">Manufacturing Costs</v-list-item-subtitle>
              <v-list-item-title class="text-lg-h6 ">$100,568.20</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
                <h3 class="text-base font-weight-bold success--text">- 1.03%</h3>
                
            </v-list-item-action>
          </v-list-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-list-item>
            <v-list-item-avatar
              tile
              size="46"
              color="grey"
              class="rounded"
              
            >
              <v-icon
                  class="grey darken-1"
                  large
                  dark
                >
                  mdi-semantic-web
                </v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="pa-0">
              <v-list-item-subtitle class="font-weight-semibold text-sm mb-1">Direct Materials</v-list-item-subtitle>
              <v-list-item-title class="text-lg-h6 ">$50,328.20</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
                <h3 class="text-base font-weight-bold error--text">+ 12.02%</h3>
                
            </v-list-item-action>
          </v-list-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-list-item>
            <v-list-item-avatar
              tile
              size="46"
              color="grey"
              class="rounded"
              
            >
              <v-icon
                  class="grey darken-1"
                  large
                  dark
                >
                  mdi-account-hard-hat
                </v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="pa-0">
              <v-list-item-subtitle class="font-weight-semibold text-sm mb-1">Direct Labour</v-list-item-subtitle>
              <v-list-item-title class="text-lg-h6 ">$25,100.70</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
                <h3 class="text-base font-weight-bold success--text">- 2.04%</h3>
                
            </v-list-item-action>
          </v-list-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-list-item>
            <v-list-item-avatar
              tile
              size="46"
              color="grey"
              class="rounded"
              
            >
              <v-icon
                  class="grey darken-1"
                  large
                  dark
                >
                  mdi-cog
                </v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="pa-0">
              <v-list-item-subtitle class="font-weight-semibold text-sm mb-1">Manufacturing Overhead</v-list-item-subtitle>
              <v-list-item-title class="text-lg-h6 ">$25,139.70</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
                <h3 class="text-base font-weight-bold success--text">- 10.04%</h3>
                
            </v-list-item-action>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>

export default {
  
};
</script>