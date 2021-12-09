<template>
  <v-container fluid >
        <v-row>
          <template >
            <v-col
              cols="12"
              md="3"
            >
              <card-env-impact></card-env-impact>
            </v-col>
            <v-col
              
              cols="12"
              md="3"
            >
              <card-inboud-performance></card-inboud-performance>
            </v-col>
            
            <v-col
              
              cols="12"
              md="3"
            >
              <card-production-performance></card-production-performance>
            </v-col>
            <v-col
              
              cols="12"
              md="3"
            >
              <card-outbound-performance></card-outbound-performance>
            </v-col>

          </template>
        </v-row>

        <v-row>
          <template >
            <v-col
              cols="12"
              md="3"
            >
              <card-live-monitoring></card-live-monitoring>
            </v-col>
            <v-col
              cols="12"
              md="9"
            >
              <card-inboud-performance></card-inboud-performance>
            </v-col>
          </template>
        </v-row>  
  </v-container>
</template>
<script>
import CardEnvImpact from '../components/CardEnvImpact.vue'
import CardInboudPerformance from '../components/CardInboundPerformance.vue'
import CardOutboundPerformance from '../components/CardOutboundPerformance.vue'
import CardProductionPerformance from '../components/CardProductionPerformance.vue'
import CardLiveMonitoring from '../components/CardLiveMonitoring.vue'

export default {
  name: 'Dashboard',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Dashboard'
  },
  components: {
    CardEnvImpact,
    CardProductionPerformance,
    CardInboudPerformance,
    CardOutboundPerformance,
    CardLiveMonitoring
  }
};
</script>
