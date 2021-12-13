<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <card-page-title title="Shipment" icon='mdi-package-variant-closed'></card-page-title>
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
              <card-shipment-statuses :loading="loading" :shipment="shipment" :trackings="trackings"></card-shipment-statuses>
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
            <card-shipment-detail-tabs :loading="loading" :shipment="shipment" :trackings="trackings"></card-shipment-detail-tabs>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CardPageTitle from '../components/CardPageTitle.vue'
import CardMaterialRisk from '../components/CardMaterialRisk.vue'
import CardShipmentDetailTabs from '../components/CardShipmentDetailTabs.vue'
import CardShipmentStatuses from '../components/CardShipmentStatuses.vue'

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
  name: 'Shipment',
  //props:["dataset_values"],
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Dashboard',
  },
  components: {
    CardPageTitle,
    CardMaterialRisk,
    CardShipmentDetailTabs,
    CardShipmentStatuses,
  },
  data () {
    return {
      search: '',
      loading: true,
      trackings: [],
      shipment: null,
      s_total:0,
      s_risk:0,
      s_missed:0,
      s_critical:0,
      s_on_time:0,
      s_early:0,
      childKey:0,
    }
  },
  methods: {
    buildStatistics(item) {
      this.s_total = computeTotalMaterial(item);
      this.s_missed = computeTotalMissedMaterial(item);
      this.s_risk = computeTotalRiskMaterial(item);
      this.s_critical =computeTotalCriticalMaterial(item);
      this.s_on_time = computeTotalOnTimeMaterial(item);
      this.s_early = computeTotalEarlyMaterial(item);
    }, 
    fortmatResponse(res) {
        return JSON.stringify(res, null, 2);
    },

    async getLatestTrackingStatuses(shipment_id) {
        try {        
          const res = await axiosInstance.get(`shipments/${shipment_id}/Statuses`);
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
          return trackings;
        } catch (err) {
          return [];
        }
    },
    async getShipmentInfos(shipmentid) {
        try {
          const res = await axiosInstance.get("shipments/"+shipmentid);
          this.shipment = res.data;
          return res.data;
        } catch (err) {
          return [];
        }
    },
  },
  async mounted(){
    try {
      this.loading = true;
      this.trackings = await this.getLatestTrackingStatuses(this.$route.params.shipment_id);
      var shipmen_info = await this.getShipmentInfos(this.$route.params.shipment_id);
      this.buildStatistics(shipmen_info);
      this.shipment = shipmen_info;
      this.loading = false;
      this.$forceUpdate();
    } catch (err) {
      console.log(err);
    }
  }
};
</script>
