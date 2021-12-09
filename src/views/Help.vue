<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-expansion-panels class="mb-6">
      <v-expansion-panel
        v-for="(item,i) in 5"
        :key="i"
      >
        <v-expansion-panel-header expand-icon="mdi-menu-down">
          Item
        </v-expansion-panel-header>
        <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'Help',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Help'
  }
};
</script>
