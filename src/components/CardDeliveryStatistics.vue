<template>
  <v-card
    class="mx-auto"
    elevation="6"
  >
    
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-list-item>
            <v-list-item-content class="pa-0 text-center">
              <v-list-item-subtitle class="text-caption"># Shipments</v-list-item-subtitle>
              <v-list-item-title class="text-lg-h5 ">{{shipments_count}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-list-item>
            <v-list-item-content class="pa-0 text-center">
              <v-list-item-subtitle class="text-caption"># Received Items</v-list-item-subtitle>
              <v-list-item-title class="text-lg-h5 ">{{item_count}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-list-item>
            <v-list-item-content class="pa-0 text-center">
              <v-list-item-subtitle class="text-caption"># Forwarder</v-list-item-subtitle>
              <v-list-item-title class="text-lg-h5 ">{{forwarder_count}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-list-item>
            <v-list-item-content class="pa-0 text-center">
              <v-list-item-subtitle class="text-caption"># Suppliers</v-list-item-subtitle>
              <v-list-item-title class="text-lg-h5 ">{{suppliers_count}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>

export default {
  props: ['shipments_count', 'item_count', 'forwarder_count', 'suppliers_count'],
  data: () => ({
    items: [
        {
          text: 'Inbound',
          disabled: true,
          href: 'breadcrumbs_dashboard',
        }
      ],
  })
};
</script>