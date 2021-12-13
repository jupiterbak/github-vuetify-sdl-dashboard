<template>
  <v-card
    class="mx-auto"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class=" mb-1">
          Production Performance
        </v-list-item-title>
        <v-divider></v-divider>
        <v-list-item-subtitle>OEE: <code class="font-weight-bold">89.98%</code></v-list-item-subtitle>
        <v-list-item-subtitle>Downtime: <code class="font-weight-bold">01.63%</code></v-list-item-subtitle>
        
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      >
        <v-icon
            class="indigo lighten-1"
            x-large
            dark
          >
            mdi-factory
          </v-icon>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
  export default {}
</script>