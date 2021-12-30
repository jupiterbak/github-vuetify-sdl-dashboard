<template>
  <v-card tile class="mx-auto" @tracking-status="addTrackingData($event)">
    <v-toolbar
      rounded
      dense
    >
        <v-toolbar-title class="text-md-body-1">Live Monitoring</v-toolbar-title>
        <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                bottom
                color="grey accent-4"
                height="2"
              ></v-progress-linear>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon>
                    <v-icon
                    v-bind="attrs"
                    v-on="on"
                    @click="getLatestTrackingStatuses()"
                    >
                        mdi-refresh
                    </v-icon>
                </v-btn>
            </template>
            <span>Refresh</span>
        </v-tooltip>
        
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon>
                    <v-icon
                    v-bind="attrs"
                    v-on="on"
                    >
                        mdi-cog
                    </v-icon>
                </v-btn>
            </template>
            <span>Settings</span>
        </v-tooltip>
    </v-toolbar>
    <v-container style="height: 640px;" v-if="init_loading">
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
    </v-container>
    
    <v-container v-else>
        <v-row>
          <template >
            <v-col
              cols="12"
              md="12"
            >
            <v-tabs fixed-tabs centered center-active slider-size="1">
                <v-tab href="#shipments">Shipments</v-tab>
                <v-tab-item value="shipments">
                  <v-data-iterator
                    :items="trackings"
                    item-key="ax4_id"
                    :items-per-page="5"
                  >
                    <template  v-slot:default="{ items}">
                      <v-list dense v-for="tracking in items" :key="tracking.ax4_id">
                          <v-list-group >
                              <template v-slot:activator  >
                                  <v-list-item-avatar>
                                      <material-donut-chart :serie="getMaterialDonutSerie(tracking.materials)"></material-donut-chart>
                                  </v-list-item-avatar>
                                  <v-list-item-content>
                                    <v-list-item-title class="text-sm-body-2"><a :href="getShipmentDetailLink(tracking.shipmentid)">{{ tracking.shipmentid }} </a></v-list-item-title>
                                    <v-list-item-subtitle class="text-sm-body-2"><v-chip small label>{{ tracking.status_EN }}</v-chip></v-list-item-subtitle>
                                  </v-list-item-content>
                                  <v-list-item-action>
                                    <v-list-item-action-text >{{ new Date(tracking.shipment.predicted_delivery_date).toLocaleDateString("en-US") }}</v-list-item-action-text>
                                    <v-list-item-subtitle class="text-sm-body-2"><code>{{ new Date(tracking.shipment.delivery_date).toLocaleDateString("en-US") }}</code></v-list-item-subtitle>
                                                                    
                                  </v-list-item-action>
                              </template>
                              <v-list-item>
                                  <v-list-item-content>
                                      <v-list-item-subtitle>
                                          <v-list-item-content>
                                            <v-list-item-title class="text-sm-body-2">ShipmentID: {{ tracking.shipmentid }} </v-list-item-title>
                                            <v-list-item-subtitle class="text-sm-body-2">Status: {{ tracking.status_EN }}</v-list-item-subtitle>
                                            <v-list-item-subtitle class="text-sm-body-2" >From: <code>{{ tracking.shipment.sender.city }}</code> - To: <code>{{ tracking.shipment.receiver.city }}</code></v-list-item-subtitle>
                                            <v-list-item-subtitle class="text-sm-body-2">Planned: <code>{{ new Date(tracking.shipment.pickup_date).toLocaleDateString("en-US") }}</code> - Predicted: <code>{{ new Date(tracking.shipment.pickup_date).toLocaleDateString("en-US") }}</code></v-list-item-subtitle>
                                          </v-list-item-content>
                                      </v-list-item-subtitle>
                                      
                                      <v-list-item-subtitle>
                                          <v-data-table dense single-select hide-default-footer
                                              :headers="headers"
                                              :items="tracking.materials"
                                              item-key="subId"
                                              class="elevation-1"
                                          >
                                            <template v-slot:item.risk2="{ item }">
                                              <v-avatar small label
                                                :color="getColor(item.risk)"
                                                size="22"
                                              >
                                              </v-avatar>
                                            </template>
                                          
                                          </v-data-table>
                                      </v-list-item-subtitle>
                                  </v-list-item-content>
                              </v-list-item>
                          </v-list-group>
                      </v-list>
                    </template>
                    
                  </v-data-iterator>
                </v-tab-item>
                <v-tab href="#orders">Orders</v-tab>
                <v-tab-item value="orders">
                </v-tab-item>
            </v-tabs>
            </v-col>
          </template>
        </v-row>  
    </v-container>    
  </v-card>
</template>
<script>
  import axiosInstance from "../http-common";
  import MaterialDonutChart from './MaterialDonutChart.vue'

  var _ = require('lodash');

  export default {
    components: {
      MaterialDonutChart
    },
    data: () => ({
      loading: true,
      init_loading: true,
      trackings: [],
      headers: [
        {
          text: 'Label',
          align: 'start',
          sortable: false,
          value: 'risk2',
        },
        { text: 'Risk', value: 'risk' },
        { text: 'MaterialNr.', value: 'material_id' },
        { text: 'Quantity.', value: 'quantity' },
      ],
      timer: ''
    }),
    methods: {
      getColor (risk) {
        if (risk > 0.8) return 'danger'
        else if (risk > 0.5) return 'orange'
        else return 'teal'
      },
      getShipmentDetailLink (shipment_id) {
        return `/shipments/${shipment_id}`
      },

      fortmatResponse(res) {
        return JSON.stringify(res, null, 2);
      },

      async getLatestTrackingStatuses() {
        try {
          this.loading = true;
          const res = await axiosInstance.get("trackings?limit=20");
          var trackings = res.data;
          for (let index = 0; index < trackings.length; index++) {
            const tracking = trackings[index];
            var shipment = await this.getShipmentInfos(tracking.shipmentid);
            _.set(trackings, '[' + index+ '].shipment', shipment);
            var packages = shipment.packages;
            var materials = [];
            let key_counter = 0;
            for (let i = 0; i < packages.length; i++) {
              const element = packages[i];              
              for (let j = 0; j < element.material.length; j++) {
                _.set(element.material, '[' + j+ '].subId', key_counter++);
              }             
              materials = materials.concat(element.material);              
            }
            _.set(trackings, '[' + index+ '].materials', materials);
            //tracking["materials"] = materials;
          }
          this.trackings = trackings;
          this.loading = false;
          this.$forceUpdate();
        
          return trackings;
        } catch (err) {
          return [];
        }
      },

      async getShipmentInfos(shipmentid) {
        try {
          const res = await axiosInstance.get("shipments/"+shipmentid);
          return res.data;
        } catch (err) {
          return [];
        }
      },

      getMaterialDonutSerie (materials) {
        var serie = [
              { value: _.reduce(materials, function(sum, item) { return item.risk>0.9 && item.risk<=1.0 ?sum + 1:sum;}, 0), name: "Missed" },
              { value: _.reduce(materials, function(sum, item) { return item.risk>0.8 && item.risk<=0.9?sum + 1:sum;}, 0), name: "At Risk" },
              { value: _.reduce(materials, function(sum, item) { return item.risk>0.6 && item.risk<=0.8?sum + 1:sum;}, 0), name: "Critical" },
              { value: _.reduce(materials, function(sum, item) { return item.risk>0.1 && item.risk<=0.6?sum + 1:sum;}, 0), name: "On Time" },
              { value: _.reduce(materials, function(sum, item) { return item.risk>=0.0 && item.risk<=0.1?sum + 1:sum;}, 0), name: "Early" }
            ];
            return materials && materials.length == 0 ? [] : serie;
      },
      cancelAutoUpdate () {
          clearInterval(this.timer);
      }
    },
    async mounted(){
      this.init_loading = true;
      await this.getLatestTrackingStatuses();
      this.init_loading = false;
      this.timer = setInterval(this.getLatestTrackingStatuses, 20000);
    },
    beforeDestroy () {
      this.cancelAutoUpdate();
    }
  }
</script>