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
              <v-list-item-subtitle class="font-weight-semibold text-sm mb-1">Transport Costs</v-list-item-subtitle>
              <v-list-item-title class="text-lg-h6 ">$48,568.20</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
                <h3 class="text-base font-weight-bold error--text">+ 12%</h3>
                
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
                  mdi-clock-outline
                </v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="pa-0">
              <v-list-item-subtitle class="font-weight-semibold text-sm mb-1">Delay Costs</v-list-item-subtitle>
              <v-list-item-title class="text-lg-h6 ">$1,328.20</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
                <h3 class="text-base font-weight-bold error--text">+ 22%</h3>
                
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
                  mdi-alert-circle-outline
                </v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="pa-0">
              <v-list-item-subtitle class="font-weight-semibold text-sm mb-1">Exeption Costs</v-list-item-subtitle>
              <v-list-item-title class="text-lg-h6 ">$2,100.70</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
                <h3 class="text-base font-weight-bold error--text">+ 02%</h3>
                
            </v-list-item-action>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>

export default {
  props: ['shipments_count', 'item_count', 'forwarder_count', 'suppliers_count'],
  data: () => ({
    items: [
        {
          text: 'Inbound',
          disabled: true,
          href: 'breadcrumbs_dashboard',
        }
      ],
  })
};
</script>