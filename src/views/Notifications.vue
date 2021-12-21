<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <card-page-title title="Notification Center" icon='mdi-bell-ring'></card-page-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CardPageTitle from '../components/CardPageTitle.vue'


export default {
  name: 'Notifiction Center',
  //props:["dataset_values"],
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Notification Center',
  },
  components: {
    CardPageTitle,
  },
  data () {
    return {
      loading: true,
      
    }
  },
  methods: {
  },
  async mounted(){
    this.$forceUpdate();
  }
};
</script>
