<template>
  <v-card
    class="mx-auto pa-2"
    elevation="6"
  >
    <v-progress-linear
              :active="loading"
              :indeterminate="loading"
              absolute
              color="grey accent-4"
              height="2"
              >
    </v-progress-linear>
    <v-card-title class="text-h6">
      Tracking Statuses
    </v-card-title>
    <v-divider></v-divider>
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
    <v-timeline dense v-else>
      <v-timeline-item :color="tracking.status_type!=1?'error': 'success'" :icon="tracking.status_type!=1?'mdi-close': 'mdi-check'" v-for="(tracking) in trackings" :key="tracking.ax4_id">
        <v-card >
          <v-card-title class="pb-0 ma-0 text-subtitle-1">
             {{getDatefromNow(tracking.status_date)}}
          </v-card-title>
          <v-list-item three-line>
            <v-list-item-content class="pa-0">
              <v-list-item-title class="text-subtitle-2">
                <div class="pa-2 secondary text-no-wrap rounded">
                  {{tracking.status_EN}}
                </div>
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption">
                Code: {{tracking.milestone_code}} - Reason: {{tracking.reason_EN}}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="text-caption">
                Explaintion: {{tracking.explaination}}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="text-caption">
                Partner: {{tracking.partner}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-timeline-item>
    </v-timeline>  
  </v-card>
</template>
<script>
import moment from 'moment';
export default {
  props: ['loading', 'shipment', 'trackings'],
  data: () => ({
    e6: 1,
    items: [
        {
          text: 'Inbound',
          disabled: true,
          href: 'breadcrumbs_dashboard',
        }
      ],
  }),
  methods: {
      getDatefromNow(_date) {
          return moment(_date).fromNow()
      }
  }
};
</script>