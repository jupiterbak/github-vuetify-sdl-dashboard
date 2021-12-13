<template>
    <v-card
        class="mx-auto"
        elevation="2"
    >
        <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            color="grey accent-4"
            height="2"
            ></v-progress-linear>
        <v-img style="height: 600px; width: 100%" v-if="loading">
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

        <v-tabs fixed-tabs centered center-active slider-size="1" v-else>
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#details" key="details">Shipment Details </v-tab>
            <v-tab href="#material">Material </v-tab>
            <v-tab href="#supplier">Supplier Details </v-tab>
            
            <v-tab-item value="details">
                <v-container fluid>
                    <v-row>
                        <v-col                        
                            cols="12"
                            md="6"
                        >
                            <v-row>
                                <v-col                        
                                    cols="12"
                                    md="6"
                                >
                                    <v-card flat>
                                        <v-list-item three-line>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    {{shipment.ax4_id}}
                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    Quantity: {{shipment.quantity}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    Volume: {{shipment.volume}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    Weight: {{shipment.weight}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    Term of Delivery: {{shipment.term_of_delivery}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    Insurance Value: {{shipment.insurance_value}}
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item three-line>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    Date(s)
                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    Sent Date: {{getDateFormated(shipment.sent_date)}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    PickUp Date: {{getDateFormated(shipment.pickup_date)}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    Delivery date: {{getDateFormated(shipment.delivery_date)}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    Predicted Delivery date: {{getDateFormated(shipment.predicted_delivery_date)}}
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>                                        
                                    </v-card>
                                </v-col>
                                <v-col                        
                                    cols="12"
                                    md="6"
                                >
                                    <v-card flat>
                                        <v-list-item three-line>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    Sender
                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    Name: {{shipment.sender.name}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    City: {{shipment.sender.city}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    Country: {{shipment.sender.country}}
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item three-line>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    Receiver
                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    Name: {{shipment.receiver.name}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    City: {{shipment.receiver.city}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    Country: {{shipment.receiver.country}}
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col                        
                            cols="12"
                            md="6"
                        >
                            <l-map
                                :zoom="4"
                                :center="shipment?[shipment.sender.lat, shipment.sender.long]:[49.5896744, 11.0119611]"
                                style="height: 600px; width: 100%"
                                 elevation="6"
                            >
                                <l-control-scale position="bottomleft" :imperial="false" :metric="true"></l-control-scale>
                                <l-control-scale position="bottomleft" :imperial="true" :metric="false"></l-control-scale>
                                <l-tile-layer key="Dark" name="Dark" :visible="true" url= 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                                     attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> | &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> | Siemens AG'
                                    layer-type="base"
                                />
                                <l-layer-group ref="inbound" v-if="shipment">
                                    <l-feature-group  ref="supplier">
                                        <l-tooltip > <span> Sender: {{shipment.sender.name}} - Receiver: {{shipment.receiver.name}} </span></l-tooltip>
                                        <l-polyline :lat-lngs="[[shipment.sender.lat, shipment.sender.long], [shipment.receiver.lat, shipment.receiver.long]]" :weight="2" :opacity="0.8" :color="'#BF360C'" :visible="true"></l-polyline>
                                        <l-circle
                                            :lat-lng="[shipment.sender.lat, shipment.sender.long]"
                                            :radius="30000"
                                            fill
                                            :fillColor="'#BF360C'"
                                            :stroke="false"
                                            :fillOpacity="0.8"
                                        />
                                        <l-circle
                                            :lat-lng="[shipment.receiver.lat, shipment.receiver.long]"
                                            :radius="30000"
                                            fill
                                            :fillColor="'#BF360C'"
                                            :stroke="false"
                                            :fillOpacity="0.8"
                                        />
                                    </l-feature-group>
                                </l-layer-group>
                                
                            </l-map>
                        </v-col>
                    </v-row>
                </v-container>
            </v-tab-item>
            <v-tab-item value="material">
                <v-container fluid>
                    <v-row>
                        <v-col                        
                            cols="12"
                            md="12"
                        >
                            <v-list-item-subtitle style="height: 600px; width: 100%">
                                <v-data-table dense single-select hide-default-footer
                                    :headers="headers"
                                    :items="materials"
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
                        </v-col>
                    </v-row>
                </v-container>
            </v-tab-item>
            <v-tab-item value="supplier">
                <v-container fluid>
                    <v-row>
                        <v-col                        
                            cols="12"
                            md="6"
                        >
                            <v-row>
                                <v-col                        
                                    cols="12"
                                    md="6"
                                >
                                    <v-card flat style="height: 600px; width: 100%">
                                        <v-list-item three-line>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    Supplier
                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    Name: {{shipment.sender.name}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    City: {{shipment.sender.city}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    Country: {{shipment.sender.country}}
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>                                    
                                    </v-card>
                                </v-col>
                                <v-col                        
                                    cols="12"
                                    md="6"
                                >
                                    <v-card flat >
                                        <v-list-item three-line>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    Performance(s)
                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    Delivery Rate: {{shipment.sender.delivery_rate}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    On Time Delivery Rate: {{shipment.sender.on_time_delivery_rate}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    Early Delivery Rate: {{shipment.sender.early_delivery_rate}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    Execption Delivery Rate: {{shipment.sender.exceptions_delivery_rate}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    Total Deliveries: {{shipment.sender.total_deliveries}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    Average Delivery Cost: {{shipment.sender.avg_delivery_cost}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    Average Delivery Delay: {{shipment.sender.avg_delivery_delay}}
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>                                          
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col                        
                            cols="12"
                            md="6"
                        >
                            <l-map
                                :zoom="8"
                                :center="shipment?[shipment.sender.lat, shipment.sender.long]:[49.5896744, 11.0119611]"
                                style="height: 600px; width: 100%"
                                 elevation="6"
                            >
                                <l-control-scale position="bottomleft" :imperial="false" :metric="true"></l-control-scale>
                                <l-control-scale position="bottomleft" :imperial="true" :metric="false"></l-control-scale>
                                <l-tile-layer key="Dark" name="Dark" :visible="true" url= 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                                     attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> | &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> | Siemens AG'
                                    layer-type="base"
                                />
                                <l-layer-group ref="inbound" v-if="shipment">
                                    <l-feature-group  ref="supplier">
                                        <l-tooltip > <span> Supplier: {{shipment.sender.name}}</span></l-tooltip>
                                        <l-marker
                                            :lat-lng="[shipment.sender.lat, shipment.sender.long]"
                                            :radius="30000"
                                            fill
                                            :fillColor="'#BF360C'"
                                            :stroke="false"
                                            :fillOpacity="0.8"
                                        />
                                    </l-feature-group>
                                </l-layer-group>
                                
                            </l-map>
                        </v-col>
                    </v-row>
                </v-container>
            </v-tab-item>
        </v-tabs>
    </v-card>    
</template>
<script>
    import { LMap, LTileLayer, LControlScale, LLayerGroup, LTooltip, LCircle, LPolyline, LFeatureGroup, LMarker } from "vue2-leaflet";
    import moment from 'moment';
    var _ = require('lodash');
    export default {
        props:["loading", "trackings", "shipment"],
        components: {
            LMap,
            LTileLayer,
            LControlScale,
            LLayerGroup,
            LTooltip,
            LCircle,
            LPolyline,
            LFeatureGroup,
            LMarker
        },
        data () {
            return {
                headers: [
                    {
                    text: 'Risk',
                    align: 'start',
                    sortable: false,
                    value: 'risk2',
                    },
                    { text: 'Risk score', value: 'risk' },
                    { text: 'MaterialNr.', value: 'material_id' },
                    { text: 'Name.', value: 'name' },
                    { text: 'Quantity.', value: 'quantity' },
                    { text: 'Unit of Measure', value: 'unit_of_measure' },
                    { text: 'Reference', value: 'reference' },
                ],
            }
        },
        computed: {
            materials: function () {
               try {
                    var packages = this.shipment.packages;
                    var _materials = [];
                    let key_counter = 0;
                    for (let i = 0; i < packages.length; i++) {
                        const element = packages[i];              
                        for (let j = 0; j < element.material.length; j++) {
                            _.set(element.material, '[' + j+ '].subId', key_counter++);
                        }             
                        _materials = _materials.concat(element.material);              
                    }                    
                    return _materials;
                } catch (err) {
                    return [];
                }
            }
        },
        methods: {
            getDateFormated(_date) {
                return moment(_date).format('MMMM Do YYYY');
            },
            getColor (risk) {
                if (risk > 0.8) return 'danger'
                else if (risk > 0.5) return 'orange'
                else return 'teal'
            },
        }
    }
</script>