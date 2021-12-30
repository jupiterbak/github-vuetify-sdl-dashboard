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
            
            <l-layer-group v-for="(inbound,i) in inbounds" :key="i" ref="network">
              <l-feature-group  ref="inbound_" :visible="inbound_selected">                
                <l-polyline :lat-lngs="inbound.polyline" :weight="getVolumeScale(inbounds, i, 5)" :opacity="0.4" :color="'#BF360C'" >
                  <tooltip-map-sender :inbound="inbound"> </tooltip-map-sender>
                </l-polyline>
                <l-circle
                  :lat-lng="[inbound.sender.lat, inbound.sender.long]"
                  :radius="getVolumeScale(inbounds, i, 30000)"
                  fill
                  :fillColor="'#BF360C'"
                  :stroke="false"
                  :fillOpacity="0.5"
                >
                  <l-tooltip > <tooltip-map-sender :inbound="inbound"> </tooltip-map-sender> </l-tooltip>
                  <l-popup > <tooltip-map-sender :inbound="inbound"> </tooltip-map-sender> </l-popup>
                </l-circle>
                <l-circle
                  :lat-lng="[inbound.sender.lat, inbound.sender.long]"
                  :radius="getVolumeScale(inbounds, i, 15000)"
                  fill
                  :fillColor="'#FFAB00'"
                  :stroke="false"
                  :fillOpacity="0.5"
                >
                  <l-tooltip > <tooltip-map-sender :inbound="inbound"> </tooltip-map-sender></l-tooltip>
                  <l-popup > <tooltip-map-sender :inbound="inbound"> </tooltip-map-sender> </l-popup>
                </l-circle>
              </l-feature-group>
              <l-feature-group  ref="_production_site">                
                <l-circle
                  :lat-lng="[inbound.receiver.lat, inbound.receiver.long]"
                  :radius="30000"
                  fill
                  :fillColor="'#26a69a '"
                  :stroke="false"
                  :fillOpacity="0.5"
                >
                  <l-tooltip > <tooltip-map-site :receiver="inbound.receiver"> </tooltip-map-site></l-tooltip>
                  <l-popup > <tooltip-map-site :receiver="inbound.receiver"> </tooltip-map-site> </l-popup>
                </l-circle>

                <l-circle
                  :lat-lng="[inbound.receiver.lat, inbound.receiver.long]"
                  :radius="15000"
                  fill
                  :fillColor="'#FFAB00'"
                  :stroke="false"
                  :fillOpacity="0.5"
                >
                  <l-tooltip > <tooltip-map-site :receiver="inbound.receiver"> </tooltip-map-site></l-tooltip>
                  <l-popup > <tooltip-map-site :receiver="inbound.receiver"> </tooltip-map-site> </l-popup>
                </l-circle>
              </l-feature-group>
            </l-layer-group>
            <l-layer-group v-for="(outbound,i) in outbounds" :key="i" ref="o_network">
              <l-feature-group  ref="outbound_" :visible="outbound_selected">                
                <l-polyline :lat-lngs="outbound.polyline" :weight="getVolumeScale(outbounds, i, 5)" :opacity="0.4" :color="'#1A237E'" >
                  <l-tooltip > <tooltip-map-receiver :outbound="outbound"> </tooltip-map-receiver></l-tooltip>
                  <l-popup > <tooltip-map-receiver :outbound="outbound"> </tooltip-map-receiver> </l-popup>
                </l-polyline>
                <l-circle
                  :lat-lng="[outbound.receiver.lat, outbound.receiver.long]"
                  :radius="(outbounds, 30000, 5)"
                  fill
                  :fillColor="'#1A237E'"
                  :stroke="false"
                  :fillOpacity="0.5"
                >
                  <l-tooltip > <tooltip-map-receiver :outbound="outbound"> </tooltip-map-receiver></l-tooltip>
                  <l-popup > <tooltip-map-receiver :outbound="outbound"> </tooltip-map-receiver> </l-popup>
                </l-circle>
                <l-circle
                  :lat-lng="[outbound.receiver.lat, outbound.receiver.long]"
                  :radius="15000"
                  fill
                  :fillColor="'#FFAB00'"
                  :stroke="false"
                  :fillOpacity="0.5"
                >
                  <l-tooltip > <tooltip-map-receiver :outbound="outbound"> </tooltip-map-receiver></l-tooltip>
                  <l-popup > <tooltip-map-receiver :outbound="outbound"> </tooltip-map-receiver> </l-popup>
                </l-circle>
              </l-feature-group>
            </l-layer-group>
            
            <l-control position="topright" >
              <v-form ref="form">
                <v-select
                  :items="production_sites"
                  item-text="text"
                  item-value="id"
                  label="Production Site"
                  persistent-hint
                  hide-details
                  clearable
                  single-line chips
                  class="text-sm-caption"
                  @change="siteSelected"                 
                ></v-select>
                <v-checkbox
                  label="Inbound"
                  v-model="inbound_selected"
                  hide-details
                  clearable class="text-sm-caption"
                  dense
                ></v-checkbox>
                <v-checkbox
                  label="Outbound"
                  v-model="outbound_selected"
                  hide-details
                  clearable
                  dense class="text-sm-caption"
                ></v-checkbox>
              </v-form>
            </l-control>
            <l-control-layers position="bottomright"  ></l-control-layers>
            
        </l-map>
    </v-img>


  </v-card>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LControlLayers, LControl, LControlScale, LLayerGroup, LTooltip, LCircle, LPolyline, LFeatureGroup, LPopup} from "vue2-leaflet";
import axiosInstance from "../http-common";
import TooltipMapSender from "../components/TooltipMapSender.vue"
import TooltipMapReceiver from "../components/TooltipMapReceiver.vue"
import TooltipMapSite from "../components/TooltipMapSite.vue"
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
    LFeatureGroup,
    LControl,
    TooltipMapSender,
    TooltipMapReceiver,
    TooltipMapSite,
    LPopup
  },
  data() {
    return {
      loading: true,
      inbound_selected: false,
      outbound_selected: false,
      production_sites: [],
      production_site_selected: 0,
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
    };
  },
  methods: {
      async getSuppliers(selected_item) {
        try {
          
          const res = await axiosInstance.get(`inbound/39041/${encodeURIComponent(selected_item)}`);
          var inbounds = res.data;
          for (let j = 0; j < inbounds.length; j++) {
            const inbound = inbounds[j]; 
            _.set(inbounds, '[' + j+ '].polyline', [[inbound.sender.lat, inbound.sender.long], [inbound.receiver.lat, inbound.receiver.long]]);
          }
          this.inbounds = inbounds;
          
          const res_out = await axiosInstance.get(`outbound/39041/${encodeURIComponent(selected_item)}`);
          var outbounds = res_out.data;
          for (let j = 0; j < outbounds.length; j++) {
            const outbound = outbounds[j]; 
            _.set(outbounds, '[' + j+ '].polyline', [[outbound.sender.lat, outbound.sender.long], [outbound.receiver.lat, outbound.receiver.long]]);
          }
          this.outbounds = outbounds;
                             
          this.$forceUpdate();
        } catch (err) {
          return [];
        }
      },
      async populateProductionSite() {
        try {
          const res = await axiosInstance.get("inbound/39041");
          var inbounds = res.data;
          for (let j = 0; j < inbounds.length; j++) {
            const inbound = inbounds[j]; 
            _.set(inbounds, '[' + j+ '].polyline', [[inbound.sender.lat, inbound.sender.long], [inbound.receiver.lat, inbound.receiver.long]]);
          }
          this.inbounds = inbounds;
          // Extract Production Sites
          this.production_sites = _.map(this.inbounds, (_inb) => {
            return {
                  text: `${_inb.receiver.name}-${_inb.receiver.city}-${_inb.receiver.country}`,
                  id: _inb.receiver.receiver_id
                } 
          });

          const res_outbound = await axiosInstance.get("outbound/39041");
          var outbounds = res_outbound.data;
          //console.log(outbounds);

          outbounds = _.filter(outbounds, function(o) {
            var sites = _.filter(this.production_sites, function(site){
              site.id === o.sender.sender_id;
            })  
            return sites.length > 0; 
          });
          for (let j = 0; j < outbounds.length; j++) {
            const outbound = outbounds[j]; 
            _.set(outbounds, '[' + j+ '].polyline', [[outbound.sender.lat, outbound.sender.long], [outbound.receiver.lat, outbound.receiver.long]]);
          }
          this.outbounds = outbounds;
          //console.log(this.outbounds);

        } catch (err) {
          return [];
        }
      },
      clickHandler () {
        console.log('and mischievous')
      },
      async siteSelected(selected_item) {
        await this.getSuppliers(selected_item);
      },
      scaleTo100(xs){
          const factor = 100 / 10 ** (Math .ceil (Math .log10 (Math .max (...xs))));
          return xs .map (x => x * factor);
      },
      getVolumeScale(total_arr, i, max) {
        var states = total_arr.map(item => item.transaction_quantity);
        var rslts = this.scaleTo100(states);
        return Math.ceil(max * (rslts[i]/100));
      }
    },
    async mounted(){
      this.loading = true;
      await this.populateProductionSite();
      this.loading = false;
    }
};
</script>
