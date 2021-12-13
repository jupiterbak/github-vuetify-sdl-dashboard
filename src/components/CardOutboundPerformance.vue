<template>
  <v-card
    class="mx-auto"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class=" mb-1">
          Outbound Performance
        </v-list-item-title>
        <v-divider></v-divider>
        <v-list-item-subtitle>Total Shipments: <code class="font-weight-bold">14k</code></v-list-item-subtitle>
        <v-list-item-subtitle>Delayed Delivery Rate: <code class="font-weight-bold">30.21%</code></v-list-item-subtitle>
        
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      >
        <v-icon
            class="brown lighten-1"
            x-large
            dark
          >
            mdi-human-dolly
          </v-icon>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
  export default {}
</script>