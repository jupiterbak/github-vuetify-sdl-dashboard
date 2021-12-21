<template>
    <v-card class="mx-auto rounded-card"
        elevation="20"
        dark
    >
        <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            color="grey accent-4"
            height="2"
        >
        </v-progress-linear>
        <v-img style="height: 300px; width: 100%" v-if="loading">            
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
        <v-img v-else >
            <v-container fluid>
                <v-row
                    class="fill-height"
                    align-content="center"
                    justify="center"
                >
                    <v-col
                    class="text-sm-body-2 text-center"
                    cols="12"
                    >
                        <v-chart style="height: 300px; width: 100%" class="chart mx-auto" :option="option" theme="dark" autoresize/>
                    </v-col>
                </v-row>
            </v-container>
        </v-img>
    </v-card>
</template>

<script>
var _ = require('lodash');
import moment from 'moment';
export default {
    props:["loading", "dataset_values"],
    data() {
        return {
            material_stock:{},
            option: {
                title: {
                    text: 'Predicted Material Stock'
                },
                responsive:true,
                calculable : true,
                backgroundColor: 'transparent',
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 0,
                    top: 30,
                    bottom: 10,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        animation: false,
                        label: {
                            backgroundColor: '#505765'
                        }
                    }
                },
                // legend: {
                //     data: []
                // },
                toolbox: {
                    feature: {
                        magicType: {
                            type: ['stack']
                        },
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '120',
                    bottom: '3%',
                    containLabel: true
                },
                dataZoom: [
                  {
                    type: 'slider',
                    filterMode: 'weakFilter',
                    showDataShadow: false,
                    labelFormatter: ''
                  },
                  {
                    type: 'inside',
                  }
                ],
                xAxis: [
                    {
                        type: 'time',
                        boundaryGap:false,
                        axisLabel: {
                            formatter: (function(value){
                                return moment(value).format("YYYY-MM-DD HH:mm");
                            })
                        },
                        silent: false,
                        splitLine: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                    type: 'value'
                    }
                ],
                series: [],
                animationEasing: 'elasticOut',
            }
        };
    },
    methods: {
        getMaterialStock(items) {
            var rslts = _.transform(items, function(result, shipment) {
                shipment.packages.forEach(_package => {
                    _package.material.forEach(material => {
                        result.push({
                            delivery_date: shipment.delivery_date,
                            shipment_id: shipment.ax4_id,
                            predicted_delivery_date: shipment.predicted_delivery_date,
                            material_id: material.material_id,
                            material_status: material.status,
                            quantity: material.quantity,
                            risk	: material.risk,
                            package_reference: _package.reference,
                            material_reference: material.reference,
                            end_date: shipment.end_date
                        })
                    });
                });
            }, []);
            
            return rslts;
        },
    },
    mounted(){
        var rslts = this.getMaterialStock(this.dataset_values);
        this.material_stock = _.groupBy(rslts, function(value) {
                return value.material_id;
            });
        //console.log(this.material_stock);

        var timestamp_objects = _.groupBy(rslts, function(value) {
            return value.delivery_date;
        });
        var timestamps = _.keys(timestamp_objects);
        timestamps = _.sortBy(timestamps, [function(o) { return o; }]);
        // console.log(timestamps);

        this.option.series = _.map(this.material_stock, function(material_deliveries, material_id) { 
            return {
                        name: material_id,
                        type: 'line',
                        stack: 'Total',
                        step: 'end',
                        areaStyle: {
                            opacity: 0.5
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        // emphasis: {
                        //     itemStyle: {
                        //         shadowBlur: 10,
                        //         shadowOffsetX: 0,
                        //         shadowColor: 'rgba(0, 0, 0, 0.5)'
                        //     }
                        // },
                        data:  _.map(timestamps, function(_timestamp){
                            var cul_value = _.reduce(material_deliveries, (rslt, mat_delivery) => {return mat_delivery.delivery_date < _timestamp? rslt + mat_delivery.quantity: rslt}, 0);
                            return [_timestamp, cul_value]
                        })
                    }
        });
        //this.option.legend.data = _.keys(this.material_stock);
        // Update everything
        this.$forceUpdate();
    }
};
</script>