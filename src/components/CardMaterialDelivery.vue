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
import moment from 'moment';
var _ = require('lodash');

export default {
    props:["loading", "trackings", "shipments", "dataset_values"],
    data() {
        return {
            option: {
                responsive:true,
                color: ["#121212","#BF360C","#FFA726","#00897B","#1565C0","#BF360C"],
                title : {
                    text: 'Material Risk per Delivery',
                },
                toolbox: {
                    feature: {
                        restore: {},
                        dataZoom: {
                            yAxisIndex: false
                        },
                        saveAsImage: {
                            pixelRatio: 2
                        },

                    }
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    intersect: true,   
                    borderWidth: 0,
                    position: function (pt) {
                        return [pt[0], '10%'];
                    },
                    backgroundColor:'rgba(255, 255, 255, 0.8)',
                    extraCssText: 'width: 170px'
                },
                legend: {},
                grid: [
                    {
                        left: 30,
                        right: 5,
                    }
                ],
                dataZoom: [
                    {
                        type: 'inside',
                        start: 95,
                        end: 120
                    },
                    {
                        type: 'slider'
                    }
                ],
                calculable : true,
                backgroundColor: 'transparent',
                xAxis : [
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
                yAxis : [
                    {
                        type : 'value',
                        splitArea: {
                            show: false
                        }
                    },
                ],
                series : [
                    {
                        name:'Missed',
                        type:'bar',
                        barWidth: 5,
                        stack: 'Ad',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: _.map(this.dataset_values, function(item){
                            return [item.delivery_date, item.missed, item.ax4_id]
                        })
                    },
                    {
                        name:'Critical',
                        type:'bar',
                        barWidth: 5,
                        stack: 'Ad',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: _.map(this.dataset_values, function(item){
                            return [item.delivery_date, item.critical, item.ax4_id]
                        }),
                        markLine : {
                            silent: true, // ignore mouse events
                            label: {show: false},
                            data : [
                                // Horizontal Axis (requires valueIndex = 0)
                                {type: 'average', name: 'Line Marker', valueIndex: 0},
                            ]
                        },
                    },
                    {
                        name:'Risk',
                        type:'bar',
                        barWidth: 5,
                        stack: 'Ad',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: _.map(this.dataset_values, function(item){
                            return [item.delivery_date, item.risk, item.ax4_id]
                        })
                    },
                    {
                        name:'On Time',
                        type:'bar',
                        barWidth: 5,
                        stack: 'Ad',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: _.map(this.dataset_values, function(item){
                            return [item.delivery_date, item.on_time, item.ax4_id]
                        }),
                    },
                    {
                        name:'Early',
                        type:'bar',
                        barWidth: 5,
                        stack: 'Ad',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: _.map(this.dataset_values, function(item){
                            return [item.delivery_date, item.early, item.ax4_id]
                        }),
                        
                    },
                    {
                        name:'Today',
                        type:'bar',
                        barWidth: 5,
                        stack: 'Ad',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: _.map(this.dataset_values, function(item){
                            return [moment(item.delivery_date).endOf('month').fromNow() , 0, item.ax4_id]
                        }),
                        markLine : {
                            silent: true, // ignore mouse events
                            label: {show: false},
                            data : [
                                // Horizontal Axis (requires valueIndex = 0)
                                {type: 'average', name: 'Line Marker', valueIndex: 0},
                            ]
                        },
                    },
                ]
            }
        };
    },
    mounted(){
    }
};
</script>