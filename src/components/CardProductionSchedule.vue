<template>
  <v-card>
    <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            color="grey accent-4"
            height="2"
            >
    </v-progress-linear>
    <v-card-title class="text-h6">
      Production Schedule (Ongoing)
    </v-card-title>
    <v-img style="height: 400px; width: 100%" v-if="loading">            
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
                  <div class="hello" style="height: 400px; width: 100%" ref="chartdiv" :key="itemKey"></div>
                    <!-- <v-chart style="height: 800px; width: 100%" class="chart mx-auto" :option="option" theme="dark" :loading="loading" autoresize/> -->
                </v-col>
            </v-row>
        </v-container>
    </v-img>
  </v-card>
</template>
<script>
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import am4themes_material from "@amcharts/amcharts4/themes/material";

    am4core.useTheme(am4themes_animated);
     am4core.useTheme(am4themes_material);


    export default {
        props:["loading", "trackings", "shipments"],
        components: {
        },
        data () {
            return {
                search: '',
                itemKey: 1,
                settings: { packages: ['timeline', 'corechart', 'table', 'map'] },
                schedule_dataset: [ {
                  "category": "Module #1",
                  "start": "2016-01-01",
                  "end": "2016-01-14",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(0).brighten(0),
                  "task": "X001",
                  "client": "Siemens AG",
                  "priority": 1,
                }, {
                  "category": "Module #1",
                  "start": "2016-01-16",
                  "end": "2016-01-27",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(0).brighten(0.4),
                  "task": "X002",
                  "client": "Siemens AG",
                  "priority": 2,
                }, {
                  "category": "Module #1",
                  "start": "2016-02-05",
                  "end": "2016-04-18",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(0).brighten(0.8),
                  "task": "X001",
                  "client": "Siemens AG",
                  "priority": 1,
                }, {
                  "category": "Module #1",
                  "start": "2016-04-18",
                  "end": "2016-04-30",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(0).brighten(1.2),
                  "task": "X003",
                  "client": "BOSCH",
                  "priority": 1,
                }, {
                  "category": "Module #2",
                  "start": "2016-01-08",
                  "end": "2016-01-10",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(2).brighten(0),
                  "task": "X004",
                  "client": "Schäffler",
                  "priority": 3,
                }, {
                  "category": "Module #2",
                  "start": "2016-01-12",
                  "end": "2016-01-15",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(2).brighten(0.4),
                  "task": "X001",
                  "client": "Siemens AG",
                  "priority": 1
                }, {
                  "category": "Module #2",
                  "start": "2016-01-16",
                  "end": "2016-02-05",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(2).brighten(0.8),
                  "task": "X002",
                  "client": "Siemens AG",
                  "priority": 2,
                }, {
                  "category": "Module #2",
                  "start": "2016-02-10",
                  "end": "2016-02-18",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(2).brighten(1.2),
                  "task": "X003",
                  "client": "BOSCH",
                  "priority": 1,
                }, {
                  "category": "Module #3",
                  "start": "2016-01-02",
                  "end": "2016-01-08",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(4).brighten(0),
                  "task": "X001",
                  "client": "Siemens AG",
                  "priority": 1,
                }, {
                  "category": "Module #3",
                  "start": "2016-01-08",
                  "end": "2016-01-16",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(4).brighten(0.4),
                  "task": "X002",
                  "client": "Siemens AG",
                  "priority": 2
                }, {
                  "category": "Module #3",
                  "start": "2016-01-19",
                  "end": "2016-03-01",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(4).brighten(0.8),
                  "task": "Development"
                }, {
                  "category": "Module #3",
                  "start": "2016-03-12",
                  "end": "2016-04-05",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(4).brighten(1.2),
                  "task": "X004",
                  "client": "Schäffler",
                  "priority": 3,
                }, {
                  "category": "Module #4",
                  "start": "2016-01-01",
                  "end": "2016-01-19",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(6).brighten(0),
                  "task": "X001",
                  "client": "Siemens AG",
                  "priority": 1,
                }, {
                  "category": "Module #4",
                  "start": "2016-01-19",
                  "end": "2016-02-03",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(6).brighten(0.4),
                  "task": "X002",
                  "client": "Siemens AG",
                  "priority": 2,
                }, {
                  "category": "Module #4",
                  "start": "2016-03-20",
                  "end": "2016-04-25",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(6).brighten(0.8),
                  "task": "X003",
                  "client": "BOSCH",
                  "priority": 1,
                }, {
                  "category": "Module #4",
                  "start": "2016-04-27",
                  "end": "2016-05-15",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(6).brighten(1.2),
                  "task": "X004",
                  "client": "Schäffler",
                  "priority": 3,
                }, {
                  "category": "Module #5",
                  "start": "2016-01-01",
                  "end": "2016-01-12",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(8).brighten(0),
                  "task": "X001",
                  "client": "Siemens AG",
                  "priority": 1,
                }, {
                  "category": "Module #5",
                  "start": "2016-01-12",
                  "end": "2016-01-19",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(8).brighten(0.4),
                  "task": "X002",
                  "client": "Siemens AG",
                  "priority": 2,
                }, {
                  "category": "Module #5",
                  "start": "2016-01-19",
                  "end": "2016-03-01",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(8).brighten(0.8),
                  "task": "X004",
                  "client": "Schäffler",
                  "priority": 3,
                }, {
                  "category": "Module #5",
                  "start": "2016-03-08",
                  "end": "2016-03-30",
                  "color": am4core.color("#BECDD7"),//colorSet.getIndex(8).brighten(1.2),
                  "task": "X003",
                  "client": "BOSCH",
                  "priority": 1,
                } ],
            }
        },
        methods: {
            onItemFiltered(items) {
               this.$emit('itemSelected', items);
            },
            getShipmentDetailLink (shipment_id) {
              return `/shipments/${shipment_id}`
            },
            initializeScheduleChart(_data){
              let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
              
              chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
              
              chart.paddingRight = 10;
              chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";
              
              var colorSet = new am4core.ColorSet();
              colorSet.saturation = 0.4;
              
              chart.data = _data;
              
              chart.dateFormatter.dateFormat = "yyyy-MM-dd";
              chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
              
              var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
              categoryAxis.dataFields.category = "category";
              categoryAxis.renderer.grid.template.location = 0;
              categoryAxis.renderer.inversed = true;
              categoryAxis.title.fontWeight = "bold";
              categoryAxis.renderer.grid.template.strokeOpacity = 1;
              categoryAxis.renderer.grid.template.stroke = am4core.color("grey");
              categoryAxis.renderer.labels.template.fill = am4core.color("white");
              categoryAxis.renderer.labels.template.fontSize = 12;
              
              var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
              dateAxis.renderer.minGridDistance = 70;
              dateAxis.baseInterval = { count: 1, timeUnit: "hour" };
              dateAxis.renderer.grid.template.strokeOpacity = 1;
              dateAxis.renderer.grid.template.stroke = am4core.color("grey");
              dateAxis.renderer.labels.template.fill = am4core.color("white");
              // dateAxis.max = new Date(2018, 0, 1, 24, 0, 0, 0).getTime();
              //dateAxis.strictMinMax = true;
              dateAxis.renderer.tooltipLocation = 0;
              
              var series1 = chart.series.push(new am4charts.ColumnSeries());
              series1.columns.template.height = am4core.percent(70);
              series1.columns.template.tooltipText = "[bold]Order {task}[/]\nstarts at {openDateX}\nends at {dateX}\nfor {client}\nPriority: {priority}";
              
              series1.dataFields.openDateX = "start";
              series1.dataFields.dateX = "end";
              series1.dataFields.categoryY = "category";
              series1.columns.template.propertyFields.fill = "color"; // get color from data
              series1.columns.template.propertyFields.stroke = "color";
              series1.columns.template.strokeOpacity = 1;
              // Add scrollbars
              chart.scrollbarX = new am4core.Scrollbar();

              chart.theme ="dark";
              //this.chart = chart;
            }
        },
        async mounted(){
          this.initializeScheduleChart(this.schedule_dataset);
          this.itemKey ++;
          // Update everything
          this.$forceUpdate();
        },
        created: function () {
          
        },
        beforeDestroy() {
          if (this.chart) {
            this.chart.dispose();
          }
        }
    }
</script>

