<template>
  <v-card
    class="mx-auto"
    elevation="6"
    :color="color"
  >
    <v-list-item>
      <v-list-item-avatar
        tile
      >
        <v-progress-circular
          :rotate="360"
          :size="40"
          :value="value_graph"
          color="grey lighten-2"
          class="text-caption pa-0"
        >
          {{ value_graph }}%
        </v-progress-circular>
      </v-list-item-avatar>
      <v-list-item-content class="pa-0">
        <v-list-item-title class="text-lg-h5 ">{{value}}</v-list-item-title>
        <v-list-item-subtitle class="text-caption">{{label}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>

export default {
  props: ['title', 'value_graph', 'value', "label", "color"],
  // data: () => ({
  //   items: [
  //       {
  //         text: 'Inbound',
  //         disabled: true,
  //         href: 'breadcrumbs_dashboard',
  //       }
  //     ],
  // })
};
</script>