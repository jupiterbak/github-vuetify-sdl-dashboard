<template>
  <v-card
    class="mx-auto rounded-card"
    elevation="20"
    dark
  >   
    <v-img style="height: 700px; width: 100%" v-if="loading">
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
    
    <v-img v-else
      class="white--text align-end"
      height="700px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <l-map
            :zoom="zoom"
            :center="center"
            style="height: 700px; width: 100%"
          >
            <l-control-scale position="bottomleft" :imperial="false" :metric="true"></l-control-scale>
            <l-control-scale position="bottomleft" :imperial="true" :metric="false"></l-control-scale>
            <l-tile-layer
              v-for="tileProvider in tileProviders"
              :key="tileProvider.name"
              :name="tileProvider.name"
              :visible="tileProvider.visible"
              :url="tileProvider.url"
              :attribution="tileProvider.attribution"
              layer-type="base"
            />
           <l-layer-group v-for="(inbound,i) in inbounds" :key="i" ref="inbound">
              <l-feature-group  ref="supplier">
                <l-tooltip > <span> Yay I was opened by {{inbound.sender.name}}</span></l-tooltip>
                <l-polyline :lat-lngs="inbound.polyline" :weight="2" :opacity="0.2" :color="'#999999'" :visible="false"></l-polyline>
                <l-circle
                  :lat-lng="[inbound.sender.lat, inbound.sender.long]"
                  :radius="15000"
                  fill
                  :fillColor="'#999999'"
                  :stroke="false"
                  :fillOpacity="0.5"
                />
                <l-circle
                  :lat-lng="[inbound.receiver.lat, inbound.receiver.long]"
                  :radius="15000"
                  fill
                  :fillColor="'#999999'"
                  :stroke="false"
                  :fillOpacity="0.5"
                />
              </l-feature-group>
            </l-layer-group>
            <!-- <l-layer-group v-for="(outbound,j) in outbounds" :key="j" ref="outbound">
              <l-feature-group  ref="customers">
                <l-tooltip > <span> Yay I was opened by {{outbound.sender.name}}</span></l-tooltip>
                <l-polyline :lat-lngs="outbound.polyline" :weight="2" :opacity="0.2" :color="colors[j]"></l-polyline>
                <l-circle
                  :lat-lng="[outbound.sender.lat, outbound.sender.long]"
                  :radius="20000"
                  fill
                  :fillColor="colors[j]"
                  :stroke="false"
                  :fillOpacity="0.5"
                />
                <l-circle
                  :lat-lng="[outbound.receiver.lat, outbound.receiver.long]"
                  :radius="20000"
                  fill
                  :fillColor="colors[j]"
                  :stroke="false"
                  :fillOpacity="0.5"
                />
              </l-feature-group> 
            </l-layer-group>-->
            <l-control-layers position="topright"  >

            </l-control-layers>
        </l-map>
    </v-img>


  </v-card>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LControlLayers, LControlScale, LLayerGroup, LTooltip, LCircle, LPolyline, LFeatureGroup } from "vue2-leaflet";
import axiosInstance from "../http-common";
var _ = require('lodash');

export default {
  name: "LogisticOverview",
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    LControlScale,
    LLayerGroup,
    LTooltip,
    LCircle,
    LPolyline,
    LFeatureGroup
  },
  data() {
    return {
      loading: true,
      zoom: 6,
      path: "/images/",
      center: [49.5896744, 11.0119611],
      marker: latLng(49.5896744, 11.0119611),
      inbounds: [],
      outbounds: [],
      caller: null,
      tileProviders: [
        {
          name: 'Dark',
          visible: true,
          url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
          attribution:
            '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> | &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> | Siemens AG',
        },
        {
          name: 'OpenStreetMap',
          visible: false,
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution:
            '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        },
        {
          name: 'Satellite | ESRI',
          visible: false,
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution:
            'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        },
      ],
      colors: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
      '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
      '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
      '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
      '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
      '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
      '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
      '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
      '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']
    };
  },
  methods: {
      async getSuppliers() {
        try {
          this.loading = true;
          const res = await axiosInstance.get("inbound/39041");
          var inbounds = res.data;
          for (let j = 0; j < inbounds.length; j++) {
            const inbound = inbounds[j]; 
            _.set(inbounds, '[' + j+ '].polyline', [[inbound.sender.lat, inbound.sender.long], [inbound.receiver.lat, inbound.receiver.long]]);
          }
          this.inbounds = inbounds;

          const res_out = await axiosInstance.get("outbound/39041");
          var outbounds = res_out.data;
          for (let j = 0; j < outbounds.length; j++) {
            const outbound = outbounds[j]; 
            _.set(outbounds, '[' + j+ '].polyline', [[outbound.sender.lat, outbound.sender.long], [outbound.receiver.lat, outbound.receiver.long]]);
          }
          this.outbounds = outbounds;

          this.loading = false;          
          this.$forceUpdate();
        } catch (err) {
          return [];
        }
      },
    },
    async mounted(){
      await this.getSuppliers();
    }
};
</script>
