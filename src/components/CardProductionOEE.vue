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
        <v-card-subtitle class="text-h5 text-center pb-0">
            OEE       
        </v-card-subtitle>
        <v-card-text  class="text-center pa-0">
            <div>This week</div>
        </v-card-text>
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
                        md="12"
                    >
                        <v-progress-circular
                            :rotate="360"
                            :size="200"
                            :width="15"
                            :value="94"
                            color="blue darken-3"
                        >
                            <v-progress-circular
                                :rotate="360"
                                :size="160"
                                :width="15"
                                :value="61"
                                color="teal"
                                >
                                <v-progress-circular
                                    :rotate="360"
                                    :size="120"
                                    :width="15"
                                    :value="73"
                                    color="orange lighten-1"
                                    >
                                    <div class="font-weight-bold text-lg-h6">78.01%</div>
                                </v-progress-circular>
                            </v-progress-circular>
                        </v-progress-circular>
                    </v-col>
                </v-row>
                <v-row
                    class="fill-height"
                    align-content="center"
                    justify="center"
                >
                    <v-col
                        class="text-sm-body-2 text-center"
                        cols="12"
                        md="3"
                    >
                        <v-list-item-content class="pa-0">
                            <v-list-item-subtitle class="font-weight-semibold text-sm text-center mb-1">Aviability</v-list-item-subtitle>
                            <v-list-item-title class="text-lg-h6 text-center">94%</v-list-item-title>
                        </v-list-item-content>
                    </v-col>
                    <v-col
                        class="text-sm-body-2 text-center"
                        cols="12"
                        md="3"
                    >
                        <v-list-item-content class="pa-0">
                            <v-list-item-subtitle class="font-weight-semibold text-sm text-center mb-1">Performance</v-list-item-subtitle>
                            <v-list-item-title class="text-lg-h6 text-center">61%</v-list-item-title>
                        </v-list-item-content>
                    </v-col>
                    <v-col
                        class="text-sm-body-2 text-center"
                        cols="12"
                        md="3"
                    >
                        <v-list-item-content class="pa-0">
                            <v-list-item-subtitle class="font-weight-semibold text-sm text-center mb-1">Quality</v-list-item-subtitle>
                            <v-list-item-title class="text-lg-h6 text-center">73%</v-list-item-title>
                        </v-list-item-content>
                    </v-col>
                    <v-col
                        class="text-sm-body-2 text-center"
                        cols="12"
                        md="3"
                    >
                        <v-list-item-content class="pa-0">
                            <v-list-item-subtitle class="font-weight-semibold text-sm text-center mb-1">OEE</v-list-item-subtitle>
                            <v-list-item-title class="text-lg-h6 text-center">78%</v-list-item-title>
                        </v-list-item-content>
                    </v-col>
                </v-row>
            </v-container>
        </v-img>
    </v-card>
</template>

<script>
export default {
    props:["loading","dataset_values"],
    data() {
        return {
            option: {
                calculable : true,
                backgroundColor: 'transparent',
                angleAxis: {
                    show: false,
                },
                radiusAxis: {
                    type: 'category',
                    data: ['OEE', 'Avia.', 'Perf.', 'Qual.'],
                    z: 100
                },
                polar: {},
                series: [
                    {
                        type: 'bar',
                        data: [78, 94, 61, 73],
                        coordinateSystem: 'polar',
                        name: 'OEE',
                        emphasis: {
                            focus: 'series'
                        }
                    },
                ]
            }
        };
    },
    methods: {
    },
    mounted(){
    }
};
</script>