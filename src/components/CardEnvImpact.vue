<template>
  <v-card
    class="mx-auto"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class=" mb-1">
          Environmental Impact
        </v-list-item-title>
        <v-divider></v-divider>
        <v-list-item-subtitle>CO2 Emissions: <code class="font-weight-bold">123</code></v-list-item-subtitle>
        <v-list-item-subtitle>Energy Consumption: <code class="font-weight-bold">123</code></v-list-item-subtitle>
        
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      >
        <v-icon
            class="teal lighten-1"
            large
            dark
          >
            mdi-tree
          </v-icon>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
  export default {}
</script>