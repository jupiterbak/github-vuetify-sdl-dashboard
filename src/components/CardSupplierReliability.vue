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
                        <v-chart style="height: 300px; width: 100%" class="chart mx-auto" :option="option" theme="dark"/>
                    </v-col>
                </v-row>
            </v-container>
        </v-img>
    </v-card>
</template>

<script>
var _ = require('lodash');

function computeTotalMaterial(item) {
  var mat_count = _.reduce(item.packages, (result, p) => { return result + p.material.length}, 0);
  return mat_count==0?item.packages.length:mat_count;
}

export default {
    props:["loading","dataset_values"],
    data() {
        return {
            option: {
                responsive:true,
                color: ["#1565C0"],
                title: {
                    text: 'Suppliers'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'cross' }
                },
                calculable : true,
                backgroundColor: 'transparent',
                grid: {
                    left: '3%',
                    right: '1%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    show: false,
                },
                yAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: this.getSupliernames(this.dataset_values)
                },
                series: [
                    {
                        name: 'Suppliers',
                        type: 'bar',
                        barWidth: 20,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'inside'
                                }
                            }
                        },
                        data: this.getSuplierValues(this.dataset_values)
                    }
                ]
            }
        };
    },
    methods: {
        getSupliernames(items) {
            var supliers = _.groupBy(items, item => { return item.sender.name});
            var _sup = Object.keys(supliers);
            return _.map(_sup, (s => {
                return _.truncate(s, {'length': 10,})
            }));
        },
        getSuplierValues(items) {
            var supliers = _.groupBy(items, item => {return item.sender.name});
            var _values = [];
            _.forOwn(supliers, function(_items) {
                _values.push(_.reduce(_items, (_result, _item) => { return _result + computeTotalMaterial(_item)}, 0));
            });
            return _values;
        },
    },
    mounted(){
    }
};
</script>