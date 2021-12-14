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


export default {
    props:["loading", "trackings", "shipments", "dataset_values"],
    data() {
        return {
            option: {
                title: {
                    text: 'Predicted Material Stock'
                },
                responsive:true,
                calculable : true,
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                    }
                },
                legend: {
                    data: ['MAT0001(Screw)', 'MAT0002(Screw_M16)', 'MAT0003']
                },
                toolbox: {
                    feature: {
                    saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    }
                ],
                yAxis: [
                    {
                    type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'MAT0001(Screw)',
                        type: 'line',
                        stack: 'Total',
                        step: 'start',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: [1200, 1320, 1010, 1340, 900, 2300, 2100]
                        },
                    {
                        name: 'MAT0002(Screw_M16)',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        step: 'start',
                        emphasis: {
                            focus: 'series'
                        },
                        data: [2200, 1820, 1910, 2340, 2900, 3300, 3100]
                    },
                    {
                        name: 'MAT0003',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        step: 'start',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                ]}
        };
    },
    mounted(){
    }
};
</script>