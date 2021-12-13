<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <card-page-title title="Inbound" icon='mdi-truck-fast'></card-page-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="3"
      >
        <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <card-delivery-statistics :loading="loading" :shipments_count="shipments_count" :suppliers_count="suppliers_count" :forwarder_count="forwarder_count" :item_count="item_count" title="Inbound" icon='mdi-truck-fast'></card-delivery-statistics>
            </v-col>
        </v-row>
        <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <card-supplier-reliability :loading="loading" :dataset_values="dataset_values" :key="childKey" ></card-supplier-reliability>
            </v-col>
        </v-row>
        <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <card-delivery-cost :transport_costs="transport_costs" :delay_costs="delay_costs" :exception_cost="exception_cost" ></card-delivery-cost>
              </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="9"
      >
        <v-row>
          <v-col
            cols="12"
            md="2"
          >
            <card-material-risk :value_graph="Math.floor(100 * (s_total/s_total))" :value="s_total" color="grey darken-1" label="Total"></card-material-risk>
          </v-col>
          <v-col
            cols="12"
            md="2"
          >
            <card-material-risk :value_graph="Math.floor(100 * (s_missed/s_total))" :value="s_missed" color="grey darken-4" label="Missed"></card-material-risk>
          </v-col>
          <v-col
            cols="12"
            md="2"
          >
            <card-material-risk :value_graph="Math.floor(100 * (s_critical/s_total))" :value="s_critical" color="deep-orange darken-4" label="Critical"></card-material-risk>
          </v-col>
          <v-col
            cols="12"
            md="2"
          >
            <card-material-risk :value_graph="Math.floor(100 * (s_risk/s_total))" :value="s_risk" color="orange lighten-1" label="At Risk"></card-material-risk>
          </v-col>
          <v-col
            cols="12"
            md="2"
          >
            <card-material-risk :value_graph="Math.floor(100 * (s_on_time/s_total))" :value="s_on_time" color="teal darken-1" label="On Time"></card-material-risk>
          </v-col>
          
          <v-col
            cols="12"
            md="2"
          >
            <card-material-risk :value_graph="Math.floor(100 * (s_early/s_total))" :value="s_early" color="blue darken-3" label="Early"></card-material-risk>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <card-material-delivery :dataset_values="dataset_values" :loading="loading" :key="childKey"></card-material-delivery>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <card-shipment-table :loading="loading" :shipments="shipments" :trackings="trackings" @itemSelected="onNewItems"></card-shipment-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CardPageTitle from '../components/CardPageTitle.vue'
import CardMaterialRisk from '../components/CardMaterialRisk.vue'
import CardShipmentTable from '../components/CardShipmentTable.vue'
import CardMaterialDelivery from '../components/CardMaterialDelivery.vue'
import CardDeliveryStatistics from '../components/CardDeliveryStatistics.vue'
import CardDeliveryCost from '../components/CardDeliveryCost.vue'
import CardSupplierReliability from '../components/CardSupplierReliability.vue'

import axiosInstance from "../http-common";

var _ = require('lodash');

function computeTotalMaterial(item) {
  var mat_count = _.reduce(item.packages, (result, p) => { return result + p.material.length}, 0);
  return mat_count==0?item.packages.length:mat_count;
}

function computeTotalMissedMaterial(item) {
    return _.reduce(item.packages, (result, p) => { 
      return result + _.reduce(p.material, (__r, m) => { return __r + ((m.risk > 0.9)?1:0);}, 0);
    }, 0);
}

function computeTotalCriticalMaterial(item) {
    return _.reduce(item.packages, (result, p) => { 
      return result + _.reduce(p.material, (__r, m) => { return __r + ((m.risk > 0.7 && m.risk < 0.9)?1:0)}, 0);
    }, 0);
}

function computeTotalRiskMaterial(item) {
    return _.reduce(item.packages, (result, p) => { 
      return result + _.reduce(p.material, (__r, m) => { return __r + ((m.risk > 0.5 && m.risk < 0.7)?1:0)}, 0);
    }, 0);
}

function computeTotalOnTimeMaterial(item) {
    return _.reduce(item.packages, (result, p) => { 
      return result + _.reduce(p.material, (__r, m) => { return __r + ((m.risk > 0.1 && m.risk < 0.5)?1:0)}, 0);
    }, 0);
}

function computeTotalEarlyMaterial(item) {
    return _.reduce(item.packages, (result, p) => { 
      return result + _.reduce(p.material, (__r, m) => { return __r + ((m.risk < 0.1)?1:0)}, 0);
    }, 0);
}

export default {
  name: 'Inbound',
  //props:["dataset_values"],
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Dashboard',
  },
  components: {
    CardPageTitle,
    CardMaterialRisk,
    CardShipmentTable,
    CardMaterialDelivery,
    CardDeliveryStatistics,
    CardDeliveryCost,
    CardSupplierReliability
  },
  data () {
    return {
      search: '',
      loading: true,
      trackings: [],
      shipments: [],
      dataset_values:[],
      s_total:0,
      s_risk:0,
      s_missed:0,
      s_critical:0,
      s_on_time:0,
      s_early:0,
      childKey:0,
      shipments_count: "",
      item_count: "",
      forwarder_count: "",
      suppliers_count: "",
      transport_costs:0,
      delay_costs:0,
      exception_cost:0
    }
  },
  methods: {
    buildStatistics(items) {
      this.s_total = _.reduce(items, (result, item) => { return result + computeTotalMaterial(item)}, 0);
      this.s_missed = _.reduce(items, (result, item) => { return result + computeTotalMissedMaterial(item)}, 0);
      this.s_risk = _.reduce(items, (result, item) => { return result + computeTotalRiskMaterial(item)}, 0);
      this.s_critical = _.reduce(items, (result, item) => { return result + computeTotalCriticalMaterial(item)}, 0);
      this.s_on_time = _.reduce(items, (result, item) => { return result + computeTotalOnTimeMaterial(item)}, 0);
      this.s_early = _.reduce(items, (result, item) => { return result + computeTotalEarlyMaterial(item)}, 0);
    },
    buildDataset(items){
      for (let index = 0; index < items.length; index++) {
        const elem = items[index];
        _.set(items, '[' + index+ '].total', computeTotalMaterial(elem));
        _.set(items, '[' + index+ '].missed', computeTotalMissedMaterial(elem));
        _.set(items, '[' + index+ '].critical', computeTotalCriticalMaterial(elem));
        _.set(items, '[' + index+ '].risk', computeTotalRiskMaterial(elem));
        _.set(items, '[' + index+ '].on_time', computeTotalOnTimeMaterial(elem));
        _.set(items, '[' + index+ '].early', computeTotalEarlyMaterial(elem));
      }
    },    
    onNewItems(items) {
      this.buildStatistics(items);
      this.buildDataset(items);
      this.dataset_values = items;
      this.childKey++;
      this.$forceUpdate();
    },
    fortmatResponse(res) {
        return JSON.stringify(res, null, 2);
    },

    async getLatestTrackingStatuses() {
        try {
        this.loading = true;
        const res = await axiosInstance.get("trackings?limit=10");
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
    async getShipments(limit, receiver_id) {
        try {
        this.loading = true;
        const res = await axiosInstance.get("shipments?limit=" + limit);
        var shipments = res.data;
        // Filter the shipment if necessary
        if(receiver_id && !_.isEmpty(receiver_id)){
          shipments = _.filter(shipments, function(o) { return o.receiver.receiver_id == receiver_id})
        }
        this.shipments = shipments;
        // Compute KPIs
        this.shipments_count = this.shipments.length;
        var forwarders = _.groupBy(this.shipments, item => {return item.logistic_provider.name});
        this.forwarder_count = Object.keys(forwarders).length;
        this.item_count = _.reduce(shipments, (result, item) => { return result + computeTotalMaterial(item)}, 0);
        var suppliers = _.groupBy(this.shipments, item => {return item.sender.name});
        this.suppliers_count = Object.keys(suppliers).length;
        this.loading = false;
        this.$forceUpdate();
        return shipments;
        } catch (err) {
        return [];
        }
    },
  },
  async mounted(){
    await this.getShipments(10000, this.$route.params.receiver_id);
    this.transport_costs = "4,000.890k";
    this.delay_costs = "4,000.890k";
    this.exception_cost = "4,000.890k";
    this.$forceUpdate();
  }
};
</script>
